# Commands for DB setup

Note: These queries were made using: 
`Server version: 10.11.3-MariaDB-1 Debian 12`.

You may have to adjust the queries to suit your database. Alternatively, just import the `.sql` file that I've exported for ease-of-use.

First, log in to your mysql db and create the database:

```sql
-- Create yugioh_db database
CREATE DATABASE yugioh_db;
```

Then move all `.csv` data files into `/var/mysql/lib/yugioh_db/sql-data/`.

Then you should be able to import all of the data into your database with the following commands:

```sql
-- Create duelist table
CREATE TABLE duelist (
    ID INT PRIMARY KEY,
    Name VARCHAR(50)
);

-- Load data into duelist table
LOAD DATA INFILE 'yugioh_db/sql-data/duelist.csv'
INTO TABLE duelist
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Create card_drop table
CREATE TABLE card_drop (
    Duelist VARCHAR(50),
    Grade VARCHAR(15),
    Card VARCHAR(50),
    Weight INT
);

-- Load data into card_drop table
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

-- Create table for card_list
CREATE TABLE card_list (
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

-- Load data into card_list table
LOAD DATA INFILE 'yugioh_db/sql-data/card_list.csv' 
INTO TABLE card_list
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
```
