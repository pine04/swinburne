CREATE DATABASE IF NOT EXISTS `SmartParking`;

CREATE TABLE `SmartParking`.`Driver` (
    `ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(100) NOT NULL,
    `Email` VARCHAR(100) NOT NULL, 
    `Password` VARCHAR(60) NOT NULL,
    `DOB` DATE NOT NULL,
    `Phone` VARCHAR(10) NOT NULL,
    `Address` VARCHAR(100) NOT NULL
);

CREATE TABLE `SmartParking`.`Admin` (
    `ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(100) NOT NULL,
    `Email` VARCHAR(100) NOT NULL, 
    `Password` VARCHAR(60) NOT NULL
);

CREATE TABLE `SmartParking`.`Slot` (
    `SlotNumber` INT NOT NULL PRIMARY KEY,
    `Type` ENUM("motorcycle", "car") NOT NULL
);

INSERT INTO `SmartParking`.`Slot` (`SlotNumber`, `Type`) VALUES (1, 'motorcycle'), (2, 'motorcycle'), (3, 'motorcycle'), (4, 'motorcycle'), (5, 'motorcycle'), (6, 'motorcycle'), (7, 'motorcycle'), (8, 'motorcycle'), (9, 'motorcycle'), (10, 'motorcycle'), (11, 'motorcycle'), (12, 'motorcycle'), (13, 'motorcycle'), (14, 'motorcycle'), (15, 'motorcycle'), (16, 'motorcycle'), (17, 'motorcycle'), (18, 'motorcycle'), (19, 'motorcycle'), (20, 'motorcycle'), (21, 'motorcycle'), (22, 'motorcycle'), (23, 'motorcycle'), (24, 'motorcycle'), (25, 'motorcycle'), (26, 'motorcycle'), (27, 'motorcycle'), (28, 'motorcycle'), (29, 'motorcycle'), (30, 'motorcycle'), (31, 'motorcycle'), (32, 'motorcycle'), (33, 'motorcycle'), (34, 'motorcycle'), (35, 'motorcycle'), (36, 'motorcycle'), (37, 'motorcycle'), (38, 'motorcycle'), (39, 'motorcycle'), (40, 'motorcycle'), (41, 'motorcycle'), (42, 'motorcycle'), (43, 'motorcycle'), (44, 'motorcycle'), (45, 'motorcycle'), (46, 'motorcycle'), (47, 'motorcycle'), (48, 'motorcycle'), (49, 'motorcycle'), (50, 'motorcycle'), (51, 'motorcycle'), (52, 'motorcycle'), (53, 'motorcycle'), (54, 'motorcycle'), (55, 'motorcycle'), (56, 'motorcycle'), (57, 'motorcycle'), (58, 'motorcycle'), (59, 'motorcycle'), (60, 'motorcycle'), (61, 'motorcycle'), (62, 'motorcycle'), (63, 'motorcycle'), (64, 'motorcycle'), (65, 'motorcycle'), (66, 'motorcycle'), (67, 'motorcycle'), (68, 'motorcycle'), (69, 'motorcycle'), (70, 'motorcycle'), (71, 'car'), (72, 'car'), (73, 'car'), (74, 'car'), (75, 'car'), (76, 'car'), (77, 'car'), (78, 'car'), (79, 'car'), (80, 'car'), (81, 'car'), (82, 'car'), (83, 'car'), (84, 'car'), (85, 'car'), (86, 'car'), (87, 'car'), (88, 'car'), (89, 'car'), (90, 'car'), (91, 'car'), (92, 'car'), (93, 'car'), (94, 'car'), (95, 'car'), (96, 'car'), (97, 'car'), (98, 'car'), (99, 'car'), (100, 'car');

CREATE TABLE `SmartParking`.`ParkingSession` (
    `ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `DriverID` INT,
    `SlotNumber` INT NOT NULL,
    `Arrival` DATETIME NOT NULL,
    `Departure` DATETIME NOT NULL,

    FOREIGN KEY (`DriverID`) REFERENCES `Driver`(`ID`)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    FOREIGN KEY (`SlotNumber`) REFERENCES `Slot`(`SlotNumber`)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE `SmartParking`.`Payment` (
    `ParkingSessionID` INT NOT NULL PRIMARY KEY,
    `TimeOfPayment` DATETIME NOT NULL,
    `CashPaid` INT,
    `CashChange` INT,
    `CardName` VARCHAR(25),
    `CardNumber` VARCHAR(20),
    `BankName` VARCHAR(25),
    `AccountNumber` VARCHAR(20),

    FOREIGN KEY (`ParkingSessionID`) REFERENCES `ParkingSession`(`ID`)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);