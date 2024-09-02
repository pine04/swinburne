CREATE DATABASE `assignment3_smarthome`;

CREATE TABLE `assignment3_smarthome`.`ip_address` (
    `id` INT NOT NULL PRIMARY KEY,
    `address` VARCHAR(15) NOT NULL,
    `time_recorded` DATETIME NOT NULL
);

CREATE TABLE `assignment3_smarthome`.`debug` (
    `id` INT NOT NULL PRIMARY KEY,
    `message` VARCHAR(255) NOT NULL,
    `time_recorded` DATETIME NOT NULL
);