CREATE DATABASE IF NOT EXISTS `tmt`;

USE `tmt`;

CREATE TABLE IF NOT EXISTS `User` (
    `UserID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Username` VARCHAR(30) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `Password` VARCHAR(60) NOT NULL,
    `DisplayName` VARCHAR(50) NOT NULL,
    `Gender` ENUM("Male", "Female", "Non-binary", "Undisclosed") NOT NULL,
    `Birthdate` DATE NOT NULL,
    `Location` VARCHAR(100),
    `RelationshipStatus` ENUM("Single", "Dating", "Engaged", "Married", "Undisclosed"),
    `ProfilePicture` VARCHAR(100),
    `Bio` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `Post` (
    `PostID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `UserID` INT NOT NULL,
    `TimePosted` DATETIME NOT NULL,
    `TextContent` VARCHAR(255) NOT NULL,

    FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`)
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `PostMedia` (
    `PostID` INT NOT NULL,
    `MediaName` CHAR(41) NOT NULL,
    `Order` INT NOT NULL,

    FOREIGN KEY (`PostID`) REFERENCES `Post` (`PostID`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `PostReaction` (
    `PostID` INT NOT NULL,
    `ReactorID` INT NOT NULL,
    `Reaction` ENUM("Like", "Dislike") NOT NULL,

    PRIMARY KEY (`PostID`, `ReactorID`),

    FOREIGN KEY (`PostID`) REFERENCES `Post` (`PostID`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (`ReactorID`) REFERENCES `User` (`UserID`)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `Friendship` (
    `UserA` INT NOT NULL,
    `UserB` INT NOT NULL,
    `Status` ENUM("Pending", "Accepted") NOT NULL,

    PRIMARY KEY (`UserA`, `UserB`),

    FOREIGN KEY (`UserA`) REFERENCES `User` (`UserID`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (`UserB`) REFERENCES `User` (`UserID`)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);