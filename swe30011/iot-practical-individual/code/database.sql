CREATE DATABASE IF NOT EXISTS `assignment_2`;

CREATE TABLE IF NOT EXISTS `assignment_2`.`TemperatureReading` (
	`ReadingID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Time` DATETIME NOT NULL,
    `Value` DECIMAL(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS `assignment_2`.`HumanPresenceReading` (
	`ReadingID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `FromTime` DATETIME NOT NULL,
    `ToTime` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `assignment_2`.`DeviceSettings` (
	`SettingID` INT NOT NULL PRIMARY KEY,
    `LightManual` BOOLEAN NOT NULL,
    `LightTmpThreshold` FLOAT NOT NULL,
    `LightOn` BOOLEAN NOT NULL,
    `Red` INT NOT NULL,
    `Green` INT NOT NULL,
    `Blue` INT NOT NULL,
    `FanManual` BOOLEAN NOT NULL,
    `MediumTmpThreshold` FLOAT NOT NULL,
    `HighTmpThreshold` FLOAT NOT NULL,
    `FanOn` BOOLEAN NOT NULL,
    `FanSpeed` VARCHAR(4) NOT NULL
);

INSERT INTO `assignment_2`.`DeviceSettings` VALUES (1, false, 30.0, true, 255, 255, 255, false, 20.0, 25.0, true, "MED");
    