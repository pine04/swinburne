CREATE DATABASE dripple;

CREATE TABLE dripple.User (
    `Address` CHAR(42) NOT NULL PRIMARY KEY,
    `Email` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(60) NOT NULL,
    `Username` VARCHAR(100) NOT NULL,
    `DisplayName` VARCHAR(100) NOT NULL,
    `DateJoined` DATE NOT NULL,
    `ProfileDescription` VARCHAR(5000) NOT NULL
);

CREATE TABLE dripple.`Transaction` (
    `TransactionHash` CHAR(66) NOT NULL PRIMARY KEY,
    `AddressFrom` CHAR(42) NOT NULL,
    `AddressTo` CHAR(42) NOT NULL,
    `Time` DATETIME NOT NULL,
    `Description` VARCHAR(1000) NOT NULL
);

CREATE TABLE dripple.Asset (
    `TokenID` BIGINT NOT NULL PRIMARY KEY,
    `Name` VARCHAR(256) NOT NULL,
    `TimeMinted` DATETIME NOT NULL,
    `Collection` VARCHAR(100) NOT NULL,
    `Type` ENUM("Clothing", "Accessories", "Footwear", "Hairstyles", "Makeup", "Body Modifications") NOT NULL,
    `Description` VARCHAR(5000) NOT NULL,
    `SplashImage` VARCHAR(100) NOT NULL
);

CREATE TABLE dripple.MarketplacePosting (
    `PostingID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `TokenID` BIGINT NOT NULL,
    `UserAddress` CHAR(42) NOT NULL,
    `Price` DECIMAL(10, 4) NOT NULL,
    `IsTraded` BOOLEAN NOT NULL,
    `TimePosted` DATETIME NOT NULL,

    FOREIGN KEY (`TokenID`)
        REFERENCES Asset(`TokenID`),

    FOREIGN KEY (`UserAddress`)
        REFERENCES User(`Address`)
);

