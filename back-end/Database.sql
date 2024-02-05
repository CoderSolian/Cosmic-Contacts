CREATE TABLE ucf_person.Users ( ID INT NOT NULL AUTO_INCREMENT , DateCreated
DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , DateLastLoggedIn DATETIME NOT
NULL DEFAULT CURRENT_TIMESTAMP , FirstName VARCHAR(50) NOT NULL DEFAULT '' ,
LastName VARCHAR(50) NOT NULL DEFAULT '' , Login VARCHAR(50) NOT NULL DEFAULT '' ,
Password VARCHAR(50) NOT NULL DEFAULT '' , PRIMARY KEY (ID)) ENGINE = InnoDB;

CREATE TABLE ucf_person.Contacts
(
ID INT NOT NULL AUTO_INCREMENT ,
Name VARCHAR(50) NOT NULL DEFAULT '' ,
Phone VARCHAR(50) NOT NULL DEFAULT '' ,
Email VARCHAR(50) NOT NULL DEFAULT '' ,
UserID INT NOT NULL DEFAULT '0' ,
PRIMARY KEY (ID)
) ENGINE = InnoDB;


INSERT INTO ucf_person.Users (DateCreated, DateLastLoggedIn, FirstName, LastName, Login, Password)
VALUES
    (NOW(), NOW(), 'John', 'Doe', 'john_doe', 'password1'),
    (NOW(), NOW(), 'Jane', 'Smith', 'jane_smith', 'password2'),
    (NOW(), NOW(), 'Alice', 'Johnson', 'alice_johnson', 'password3'),
    (NOW(), NOW(), 'Bob', 'Williams', 'bob_williams', 'password4'),
    (NOW(), NOW(), 'Eva', 'Miller', 'eva_miller', 'password5'),
    (NOW(), NOW(), 'Charlie', 'Davis', 'charlie_davis', 'password6'),
    (NOW(), NOW(), 'Grace', 'Anderson', 'grace_anderson', 'password7'),
    (NOW(), NOW(), 'Henry', 'Taylor', 'henry_taylor', 'password8'),
    (NOW(), NOW(), 'Sophia', 'Brown', 'sophia_brown', 'password9'),
    (NOW(), NOW(), 'David', 'Moore', 'david_moore', 'password10'),
    (NOW(), NOW(), 'Olivia', 'Clark', 'olivia_clark', 'password11'),
    (NOW(), NOW(), 'Michael', 'Lewis', 'michael_lewis', 'password12'),
    (NOW(), NOW(), 'Emma', 'Lee', 'emma_lee', 'password13'),
    (NOW(), NOW(), 'William', 'Hill', 'william_hill', 'password14'),
    (NOW(), NOW(), 'Lily', 'Baker', 'lily_baker', 'password15'),
    (NOW(), NOW(), 'James', 'Ward', 'james_ward', 'password16'),
    (NOW(), NOW(), 'Ava', 'Taylor', 'ava_taylor', 'password17'),
    (NOW(), NOW(), 'Daniel', 'Smith', 'daniel_smith', 'password18'),
    (NOW(), NOW(), 'Mia', 'Evans', 'mia_evans', 'password19'),
    (NOW(), NOW(), 'Logan', 'King', 'logan_king', 'password20');
    
    
    
    INSERT INTO ucf_person.Contacts (Name, Phone, Email, UserID)
VALUES
    ('Contact1', '1234567890', 'contact1@email.com', 1),
    ('Contact2', '9876543210', 'contact2@email.com', 2),
    ('Contact3', '5555555555', 'contact3@email.com', 3),
    ('Contact4', '1112233444', 'contact4@email.com', 4),
    ('Contact5', '9998887777', 'contact5@email.com', 5),
    ('Contact6', '4443332222', 'contact6@email.com', 6),
    ('Contact7', '7776665555', 'contact7@email.com', 7),
    ('Contact8', '2221110000', 'contact8@email.com', 8),
    ('Contact9', '6665554444', 'contact9@email.com', 9),
    ('Contact10', '3332221111', 'contact10@email.com', 10),
    ('Contact11', '5556667777', 'contact11@email.com', 11),
    ('Contact12', '1112223333', 'contact12@email.com', 12),
    ('Contact13', '9990001111', 'contact13@email.com', 13),
    ('Contact14', '4445556666', 'contact14@email.com', 14),
    ('Contact15', '7778889999', 'contact15@email.com', 15),
    ('Contact16', '2223334444', 'contact16@email.com', 16),
    ('Contact17', '6667778888', 'contact17@email.com', 17),
    ('Contact18', '3334445555', 'contact18@email.com', 18),
    ('Contact19', '5554443333', 'contact19@email.com', 19),
    ('Contact20', '1112223333', 'contact20@email.com', 20);