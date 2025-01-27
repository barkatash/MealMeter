SET GLOBAL local_infile = 1;

LOAD DATA LOCAL INFILE "D:\\UNIVERSITY\\Master Courses\\Workshop in Databases\\Project\\DB\\Synth\\User.csv"
INTO TABLE `db04`.`User`
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "D:\\UNIVERSITY\\Master Courses\\Workshop in Databases\\Project\\DB\\Synth\\User_Food_Beverages.csv"
INTO TABLE `db04`.`User_Food_Beverages`
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;
