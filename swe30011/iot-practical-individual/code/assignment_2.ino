#include <AccelStepper.h>

#define MotorInterfaceType 4

const int LM35_PIN = A0;
const int LD2410_PIN = 2;
const int RED_PIN = 7;
const int GREEN_PIN = 6;
const int BLUE_PIN = 5;
const int IN1_PIN = 11;
const int IN2_PIN = 10;
const int IN3_PIN = 9;
const int IN4_PIN = 8;
const int SENSOR_EMIT_INTERVAL = 1000;
const float FAN_LOW = 300.0;
const float FAN_MED = 450.0;
const float FAN_HIGH = 600.0;
AccelStepper stepper(MotorInterfaceType, IN1_PIN, IN3_PIN, IN2_PIN, IN4_PIN);

unsigned long previousMillis = 0, currentMillis;
int temp_adc_val;
float temp_val;
int presence_val;

int red = 255;
int green = 255;
int blue = 255;

bool isLightOn = true;
bool isFanOn = true;

void setup() {
  Serial.begin(9600);

  pinMode(LM35_PIN, INPUT);
  pinMode(LD2410_PIN, INPUT);
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);

  stepper.setMaxSpeed(1000.0);
  stepper.setSpeed(FAN_MED);
}

void loop() {
  readCommandFromSerial();
  emitDataToSerial();

  if (isLightOn) {
    turnOnLight();
  } else {
    turnOffLight();
  }

  if (isFanOn) {
    runFan();
  }
}

void readCommandFromSerial() {
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');

    if (command == "ON_LIGHT") {
      isLightOn = true;
    }

    if (command == "OFF_LIGHT") {
      isLightOn = false;
    }

    if (command == "ON_FAN") {
      isFanOn = true;
    }

    if (command == "OFF_FAN") {
      isFanOn = false;
    }

    if (command.startsWith("LIGHT")) {
      String colors = command.substring(5);
      setLightColor(colors);
    }

    if (command.startsWith("FAN")) {
      String speed = command.substring(3);
      setFanSpeed(speed);
    }
  }
}

void emitDataToSerial() {
  currentMillis = millis();
  if (currentMillis - previousMillis >= SENSOR_EMIT_INTERVAL) {
    temp_adc_val = analogRead(LM35_PIN);
    temp_val = (temp_adc_val * 0.488);  // adc / 1023 * 5 (V) * 100(degC/V)
    Serial.print("TMP");
    Serial.println(temp_val);

    presence_val = digitalRead(LD2410_PIN);
    Serial.print("PRS");
    Serial.println(presence_val);

    previousMillis = currentMillis;
  }
}

void turnOnLight() {
  analogWrite(RED_PIN, red);
  analogWrite(GREEN_PIN, green);
  analogWrite(BLUE_PIN, blue);
}

void turnOffLight() {
  digitalWrite(RED_PIN, LOW);
  digitalWrite(GREEN_PIN, LOW);
  digitalWrite(BLUE_PIN, LOW);
}

void setLightColor(String colorString) {
  int searchIndex = 0;
  int commaIndex;
  String colorComponent;

  int colors[3] = { 255, 255, 255 };
  for (int i = 0; i < 3; i++) {
    commaIndex = colorString.indexOf(",", searchIndex);
    colorComponent = colorString.substring(searchIndex, commaIndex);
    colors[i] = colorComponent.toInt();
    searchIndex = commaIndex + 1;
  }

  red = colors[0];
  green = colors[1];
  blue = colors[2];
}

void runFan() {
  stepper.runSpeed();
}

void setFanSpeed(String speed) {
  if (speed == "LOW") {
    stepper.setSpeed(FAN_LOW);
  } else if (speed == "MED") {
    stepper.setSpeed(FAN_MED);
  } else if (speed == "HIGH") {
    stepper.setSpeed(FAN_HIGH);
  }
}