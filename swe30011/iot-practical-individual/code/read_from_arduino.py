import serial
import MySQLdb
import time
from datetime import datetime

connection = MySQLdb.connect("localhost", "admin", "admin", "assignment_2", autocommit=True) or die("Could not connect to database.")
cursor = connection.cursor()
device = "/dev/ttyUSB0"
arduino = serial.Serial(device, 9600)

lastRefreshTime = 0
refreshInterval = 1000

lightManual = False
lightTmpThreshold = 30
lightOn = True
red = 255
green = 255
blue = 255
fanManual = False
mediumTmpThreshold = 20
highTmpThreshold = 25
fanOn = True
fanSpeed = "MED"

detectedPresenceSince = 0
detectingPresence = False

while True:
	try:
		currentTimeMs = round(time.time() * 1000)
		if (currentTimeMs - lastRefreshTime >= refreshInterval):
			cursor.execute("SELECT * FROM DeviceSettings WHERE SettingID = 1")
			setting = cursor.fetchall()[0]
			print(setting)
			
			lightManual = setting[1]
			lightTmpThreshold = setting[2]
			lightOn = setting[3]
			red = setting[4]
			green = setting[5]
			blue = setting[6]
			fanManual = setting[7]
			mediumTmpThreshold = setting[8]
			highTmpThreshold = setting[9]
			fanOn = setting[10]
			fanSpeed = setting[11]
			
			if (lightManual):
				if (lightOn):
					arduino.write(b"ON_LIGHT\n")
				else:
					arduino.write(b"OFF_LIGHT\n")
				arduino.write(("LIGHT%d,%d,%d\n" % (red, green, blue)).encode("utf-8"))
				
			if (fanManual):
				if (fanOn):
					arduino.write(b"ON_FAN\n")
				else:
					arduino.write(b"OFF_FAN\n")				
				arduino.write(("FAN%s\n" % (fanSpeed)).encode("utf-8"))
			
			lastRefreshTime = currentTimeMs
		
		now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
		data = arduino.readline().decode("utf-8").strip()
		print(data)
		prefix = data[:3]

		if (prefix == "TMP"):
			# Handle temperature reading.
			temperature = data[3:]
			print(temperature)
			query = "INSERT INTO TemperatureReading (`Time`, `Value`) VALUES ('%s', %s)" % (now, temperature)
			cursor.execute(query)
			
			if (not lightManual):
				if (float(temperature) >= lightTmpThreshold):
					arduino.write(b"LIGHT255,255,255\n")
					cursor.execute("UPDATE DeviceSettings SET Red = 255, Green = 255, Blue = 255 WHERE SettingID = 1")
				else:
					arduino.write(b"LIGHT175,45,0\n")
					cursor.execute("UPDATE DeviceSettings SET Red = 175, Green = 45, Blue = 0 WHERE SettingID = 1")
					
			if (not fanManual):
				if (float(temperature) >= highTmpThreshold):
					arduino.write(b"FANHIGH\n")
					cursor.execute("UPDATE DeviceSettings SET FanSpeed = 'HIGH' WHERE SettingID = 1")
				elif (float(temperature) >= mediumTmpThreshold):
					arduino.write(b"FANMED\n")
					cursor.execute("UPDATE DeviceSettings SET FanSpeed = 'MED' WHERE SettingID = 1")
				else:
					arduino.write(b"FANLOW\n")
					cursor.execute("UPDATE DeviceSettings SET FanSpeed = 'LOW' WHERE SettingID = 1")
		elif (prefix == "PRS"):
			# Handle human presence reading.
			presence = int(data[3:])
			print(presence)

			if (presence & (not detectingPresence)):
				detectedPresenceSince = datetime.now()
				detectingPresence = True
				
				if (not lightManual):
					arduino.write(b"ON_LIGHT\n")
					cursor.execute("UPDATE DeviceSettings SET LightOn = 1 WHERE SettingID = 1")
				if (not fanManual):
					arduino.write(b"ON_FAN\n")
					cursor.execute("UPDATE DeviceSettings SET FanOn = 1 WHERE SettingID = 1")

			if ((not presence) & detectingPresence):
				detectingPresence = False
				fromTime = detectedPresenceSince.strftime("%Y-%m-%d %H:%M:%S")
				toTime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
				query = "INSERT INTO HumanPresenceReading (`FromTime`, `ToTime`) VALUES ('%s', '%s')" % (fromTime, toTime)
				cursor.execute(query)
				
				if (not lightManual):
					arduino.write(b"OFF_LIGHT\n")
					cursor.execute("UPDATE DeviceSettings SET LightOn = 0 WHERE SettingID = 1")
				if (not fanManual):
					arduino.write(b"OFF_FAN\n")
					cursor.execute("UPDATE DeviceSettings SET FanOn = 0 WHERE SettingID = 1")
				
	except (KeyboardInterrupt, serial.serialutil.SerialException) as error:
		if (type(error) is KeyboardInterrupt):
			print("Ctrl + C detected.")
		else:
			print("The serial port was disconnected.")
			
		if (detectingPresence):
			fromTime = detectedPresenceSince.strftime("%Y-%m-%d %H:%M:%S")
			toTime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
			query = "INSERT INTO HumanPresenceReading (`FromTime`, `ToTime`) VALUES ('%s', '%s')" % (fromTime, toTime)
			cursor.execute(query)

		print("Closing edge server...")
		connection.commit()
		cursor.close()
		break
