CREATE DATABASE IF NOT EXISTS `cos30043_92C_104222196`;

USE `cos30043_92C_104222196`;

CREATE TABLE IF NOT EXISTS `unit` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `code` CHAR(8) NOT NULL,
    `desc` VARCHAR(255) NOT NULL,
    `cp` DECIMAL(3,1) NOT NULL,
    `type` VARCHAR(100) NOT NULL
);

INSERT INTO `unit` (`code`, `desc`, `cp`, `type`) VALUES
('ICT10001', 'Problem Solving with ICT', '12.5', 'Core'),
('COS10005', 'Web Development', '12.5', 'Core'),
('INF10002', 'Database Analysis and Design', '12.5', 'Core'),
('COS10009', 'Introduction to Programming', '12.5', 'Core'),
('COS20001', 'User-Centred Design', '12.5', 'Software Development'),
('TNE10005', 'Network Administration', '12.5', 'Software Development'),
('COS20016', 'Operating System Configuration', '12.5', 'Software Development'),
('INF20012', 'Enterprise Systems', '12.5', 'Systems Analysis'),
('ACC10007', 'Financial Information for Decision Making', '12.5', 'Systems Analysis'),
('INF20003', 'Requirements Analysis and Modelling', '12.5', 'Systems Analysis'),
('ACC20014', 'Management Decision Making', '12.5', 'Systems Analysis'),
('INF30001', 'Systems Acquisition & Implementation Management', '12.5', 'Systems Analysis');

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(30) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

INSERT INTO `user` (`username`, `password`) VALUES
('admin', '1234567890');