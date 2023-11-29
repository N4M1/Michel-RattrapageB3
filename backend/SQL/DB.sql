Drop database IF EXISTS ECommerce; 

CREATE DATABASE IF NOT EXISTS ECommerce;

use ECommerce;

CREATE TABLE Users
(
	id_User int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    EMail varchar(255) NOT NULL,
	PassWords varchar(255) NOT NULL,
    Address varchar(255),
    BithDate date
);

CREATE TABLE Products
(
	id_Product int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    AlbumName varchar(255) NOT NULL,
    ArtistName varchar(255) NOT NULL,
    Price double NOT NULL
);

CREATE TABLE Pictures
(
	id_Picture int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_Product int NOT NULL,
    imgPath varchar(255) NOT NULL,
    imgName varchar(255) NOT NULL
);

CREATE TABLE Orders
(
	id_Order int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_User int NOT NULL,
    Total double NOT NULL DEFAULT 0,
    OrderedDate datetime NOT NULL,
    Foreign key(id_User) REFERENCES Users(id_User)
);

CREATE TABLE OrderedProducts
(
	id_OrdProd int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_Product int NOT NULL,
    id_Order int NOT NULL,
    quantity int NOT NULL,
    Foreign key(id_Product) REFERENCES Products(id_Product),
    Foreign key(id_Order) REFERENCES Orders(id_Order)
);