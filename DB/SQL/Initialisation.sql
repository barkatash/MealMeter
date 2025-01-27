CREATE SCHEMA `db04` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;

CREATE TABLE `db04`.`Category` (
  `ID` SMALLINT UNSIGNED NOT NULL,
  `Description` VARCHAR(150) NULL,
  PRIMARY KEY (`ID`),
  INDEX `Category.ID_idx` (`ID` ASC) VISIBLE);

CREATE TABLE `db04`.`Food_Beverages` (
  `ID` INT UNSIGNED NOT NULL,
  `Description` VARCHAR(200) NOT NULL,
  `Extra_Description` VARCHAR(450) NULL,
  `Category_ID` SMALLINT UNSIGNED NOT NULL,
  `Score` FLOAT UNSIGNED NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `Food_Beverages.ID_idx` (`ID` ASC) VISIBLE,
  CONSTRAINT `Food_Beverages.Category_ID.ID`
    FOREIGN KEY (`Category_ID`)
    REFERENCES `db04`.`Category` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `db04`.`Portions_Weights` (
  `FB_ID` INT UNSIGNED NOT NULL,
  `Description` VARCHAR(200) NOT NULL,
  `Weight` FLOAT UNSIGNED NOT NULL,
  PRIMARY KEY (`FB_ID`, `Description`, `Weight`),
  INDEX `Portions_Weights.FB_ID_idx` (`FB_ID` ASC) VISIBLE,
  CONSTRAINT `Portions_Weights.Food_Beverages.ID`
    FOREIGN KEY (`FB_ID`)
    REFERENCES `db04`.`Food_Beverages` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `db04`.`Nutrients` (
  `ID` SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL,
  `Name` VARCHAR(50) NOT NULL,
  `Unit` ENUM("kcal", "g", "mg", "mcg") NOT NULL,
  `Importance` FLOAT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `Nutrients.ID_idx` (`ID` ASC) VISIBLE);

CREATE TABLE `db04`.`Ingredients` (
  `ID` INT UNSIGNED NOT NULL,
  `Description` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `Ingredients.ID_idx` (`ID` ASC) VISIBLE);
  
CREATE TABLE `db04`.`Ingredients_Values` (
  `Ingredient_ID` INT UNSIGNED NOT NULL,
  `Nutrient_ID` SMALLINT UNSIGNED NOT NULL,
  `Value` FLOAT UNSIGNED NOT NULL,
  PRIMARY KEY (`Ingredient_ID`, `Nutrient_ID`),
  INDEX `Ingredients_Values.Ingredient_ID_idx` (`Ingredient_ID` ASC) VISIBLE,
  INDEX `Ingredients_Values.Nutrient_ID_idx` (`Nutrient_ID` ASC) VISIBLE,
  CONSTRAINT `Ingredients_Values.Ingredients.ID`
    FOREIGN KEY (`Ingredient_ID`)
    REFERENCES `db04`.`Ingredients` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Ingredients_Values.Nutrients.Nutrient_ID`
    FOREIGN KEY (`Nutrient_ID`)
    REFERENCES `db04`.`Nutrients` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `db04`.`FB_Ingredients` (
  `FB_ID` INT UNSIGNED NOT NULL,
  `Ingredient_ID` INT UNSIGNED NOT NULL,
  `Weight` FLOAT UNSIGNED NOT NULL,
  PRIMARY KEY (`FB_ID`, `Ingredient_ID`, `Weight`),
  INDEX `FB_Ingredients.FB_ID_idx` (`FB_ID` ASC) VISIBLE,
  INDEX `FB_Ingredients.Ingredient_ID_idx` (`Ingredient_ID` ASC) VISIBLE,
  CONSTRAINT `FB_Ingredients.Ingredients.ID`
    FOREIGN KEY (`Ingredient_ID`)
    REFERENCES `db04`.`Ingredients` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FB_Ingredients.Food_Beverages.ID`
    FOREIGN KEY (`FB_ID`)
    REFERENCES `db04`.`Food_Beverages` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `db04`.`FB_Values` (
  `FB_ID` INT UNSIGNED NOT NULL,
  `Nutrient_ID` SMALLINT UNSIGNED NOT NULL,
  `Value` FLOAT UNSIGNED NOT NULL,
  PRIMARY KEY (`FB_ID`, `Nutrient_ID`),
  INDEX `FB_Values.FB_ID_idx` (`FB_ID` ASC) VISIBLE,
  INDEX `FB_Values.Nutrient_ID_idx` (`Nutrient_ID` ASC) VISIBLE,
  CONSTRAINT `FB_Values.Food_Beverages.ID`
    FOREIGN KEY (`FB_ID`)
    REFERENCES `db04`.`Food_Beverages` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FB_Values.Nutrients.ID`
    FOREIGN KEY (`Nutrient_ID`)
    REFERENCES `db04`.`Nutrients` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `db04`.`RDI` (
  `Nutrient_ID` SMALLINT UNSIGNED NOT NULL,
  `Value` FLOAT UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`Nutrient_ID`),
  INDEX `RDI.Nutrient_ID_idx` (`Nutrient_ID` ASC) VISIBLE,
  CONSTRAINT `RDI.Nutrients.ID`
    FOREIGN KEY (`Nutrient_ID`)
    REFERENCES `db04`.`Nutrients` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `db04`.`Activities` (
  `ID` SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL,
  `Description` VARCHAR(150) NOT NULL,
  `CaloriesPKG` FLOAT UNSIGNED NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `Activities.CaloriesPKG_idx` (`CaloriesPKG` ASC) VISIBLE);

CREATE TABLE `db04`.`User` (
  `ID` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `Email` VARCHAR(50) NOT NULL,
  `First_Name` VARCHAR(50) NOT NULL,
  `Last_Name` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(50) NOT NULL,
  `DOB` DATE NOT NULL,
  `Gender` ENUM("M", "F") NOT NULL,
  `Weight` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `User.ID_idx` (`ID` ASC) VISIBLE);

CREATE TABLE `db04`.`User_Food_Beverages` (
  `User_ID` INT UNSIGNED NOT NULL,
  `FB_ID` INT UNSIGNED NOT NULL,
  `Portion_Weight` FLOAT UNSIGNED NOT NULL,
  `Date_Time` DATETIME NOT NULL,
  PRIMARY KEY (`User_ID`, `FB_ID`, `Date_Time`),
  INDEX `User_Food_Beverages.User_ID_idx` (`User_ID` ASC) VISIBLE,
  INDEX `User_Food_Beverages.Date_Time_idx` (`Date_Time` DESC) VISIBLE,
  CONSTRAINT `User_Food_Beverages.Users.ID`
    FOREIGN KEY (`User_ID`)
    REFERENCES `db04`.`User` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `User_Food_Beverages.Food_Beverages.ID`
    FOREIGN KEY (`FB_ID`)
    REFERENCES `db04`.`Food_Beverages` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);