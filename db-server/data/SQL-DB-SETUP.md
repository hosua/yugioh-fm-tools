# Commands for DB setup

Note: These queries were made using: 
`Server version: 10.11.3-MariaDB-1 Debian 12`.

You may have to adjust the queries to suit your database. Alternatively, just import the `.sql` file that I've exported for ease-of-use.

First, log in to your mysql db and create the database:

```
-- Create yugioh_db database
CREATE DATABASE yugioh_db;
```

Then move all `.csv` data files into `/var/mysql/lib/yugioh_db/sql-data/`.

Then you should be able to import all of the data into your database with the following commands:

```

-- Create card_drop table
CREATE TABLE card_drop (
    Duelist VARCHAR(50),
    Grade VARCHAR(15),
    Card VARCHAR(50),
    Weight INT
);

-- Load data into card_drop
LOAD DATA INFILE 'yugioh_db/sql-data/card_drop.csv'
INTO TABLE card_drop
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Add primary key column to card_drop_table
ALTER TABLE card_drop
ADD COLUMN ID INT AUTO_INCREMENT PRIMARY KEY FIRST;

-- Create table for card_info
CREATE TABLE card_info (
    ID INT PRIMARY KEY,
    Name VARCHAR(50),
    `Card Type` VARCHAR(50),
    Type VARCHAR(50),
    `Guardian Star` VARCHAR(50),
    Level INT,
    ATK INT,
    DEF INT,
    Code INT,
    `Star Cost` INT
);

-- Load data into card_info table
LOAD DATA INFILE 'yugioh_db/sql-data/card_info.csv' 
INTO TABLE card_info
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES -- To skip the header row if it exists in the CSV file
(ID, Name, `Card Type`, Type, @`Guardian Star`, @Level, @ATK, @DEF, @Code, @`Star Cost`)
SET
    `Guardian Star` = NULLIF(@`Guardian Star`, ''),
    Level = NULLIF(@Level, ''),
    ATK = NULLIF(@ATK, ''),
    DEF = NULLIF(@DEF, ''),
    Code = NULLIF(@Code, ''),
    `Star Cost` = NULLIF(@`Star Cost`, '');

-- Create duelist_lookup table
CREATE TABLE duelist_lookup (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255)
);

-- Load data into duelist_lookup table
LOAD DATA INFILE 'yugioh_db/sql-data/duelist_lookup.csv'
INTO TABLE duelist_lookup
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- Create grade_lookup table
CREATE TABLE grade_lookup (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Grade VARCHAR(255)
);

-- Insert into grade_lookup table
INSERT INTO grade_lookup (ID, Grade) VALUES
(1, 'S/A POW'),
(2, 'S/A TEC'),
(3, 'B/C/D POW/TEC');

```
