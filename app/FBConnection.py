from utilities import *

class FBConnection:
    """
    A class to manage database connections and execute queries related to food and nutrition data.
    This class handles connections to the MySQL database and provides methods to search
    various tables for information such as food descriptions, categories, nutrients, and portions.
    """

    def __init__(self):
        """
        Initializes a connection pool to the database.

        Raises:
            Exception: If the connection pool cannot be established.
        """
        try:
            self.conn = create_connection_pool(
                host_name=HOST_NAME,
                user_name=USER_NAME,
                user_password=USER_PASSWORD,
                db_name=DB_NAME
            )

            if self.conn is None:
                raise Exception("Failed to establish a database connection")
        except Exception as e:
            raise Exception(f"Error initializing database connection: {e}")

    def search_foods(self, food_name: str):
        """
        Searches for foods in the database by matching the description with the provided name.

        Args:
            food_name (str): The name of the food to search for.

        Returns:
            list: A list of matching food items.
        """
        query = (
            """
            SELECT *
            FROM Food_Beverages
            WHERE LOWER(Description) LIKE %s
            """
        )
        try:
            params = (f"%{food_name.lower()}%",)
            return execute_read_query(self.conn, query, params)
        except Exception as e:
            print(f"Error searching for foods: {e}")

    def search_food_category(self, food_id: int):
        """
        Retrieves the category description of a given food item.

        Args:
            food_id (int): The ID of the food item.

        Returns:
            str: The category description.
        """
        query = (
            """
            SELECT Category.Description
            FROM Category, Food_Beverages
            WHERE Food_Beverages.ID = %s
            AND Food_Beverages.Category_ID = Category.ID
            """
        )
        try:
            params = (food_id,)
            return execute_read_query(self.conn, query, params)
        except Exception as e:
            print(f"Error retrieving food category: {e}")

    def search_fb_name(self, food_id: int):
        """
        Retrieves the description of a food item by its ID.

        Args:
            food_id (int): The ID of the food item.

        Returns:
            str: The description of the food item.
        """
        query = (
            """
            SELECT Description
            FROM Food_Beverages
            WHERE Food_Beverages.ID = %s
            """
        )
        try:
            params = (food_id,)
            return execute_read_query(self.conn, query, params)
        except Exception as e:
            print(f"Error retrieving food description: {e}")

    def search_food_calories(self, food_id: int, weight: float = 100.0):
        """
        Calculates the calorie content of a given food item based on the specified weight.

        Args:
            food_id (int): The ID of the food item.
            weight (float): The weight in grams to calculate the calories for (default is 100g).

        Returns:
            float: The calorie content for the specified weight.
        """
        query = (
            """
            SELECT (%s * FB_Values.Value / 100) AS Value
            FROM FB_Values
            JOIN Nutrients ON FB_Values.Nutrient_ID = Nutrients.ID
            WHERE FB_Values.FB_ID = %s AND Nutrients.Name = 'Energy';
            """
        )
        try:
            params = (weight, food_id)
            return execute_read_query(self.conn, query, params)
        except Exception as e:
            print(f"Error calculating food calories: {e}")

    def search_portions(self, food_id: int):
        """
        Retrieves portion descriptions and weights for a given food item.

        Args:
            food_id (int): The ID of the food item.

        Returns:
            list: A list of portions with their descriptions and weights.
        """
        query = (
            """
            SELECT Description, Weight
            FROM Portions_Weights
            WHERE FB_ID = %s
            """
        )
        try:
            params = (food_id,)
            return execute_read_query(self.conn, query, params)
        except Exception as e:
            print(f"Error retrieving food portions: {e}")

    def search_ingredients(self, food_id: int, weight: float = 100.0):
        """
        Retrieves ingredients for a given food item and calculates their normalized weights.

        Args:
            food_id (int): The ID of the food item.
            weight (float): The weight in grams to normalize ingredient weights for (default is 100g).

        Returns:
            list: A list of ingredients with their normalized weights.
        """
        query = (
            """
            SELECT i.ID, i.Description,
                   %s * fb.Weight / (SELECT SUM(Weight)
                                    FROM FB_Ingredients
                                    WHERE FB_ID = fb.FB_ID) AS Normalized_Weight
            FROM FB_Ingredients AS fb
            JOIN Ingredients AS i ON fb.Ingredient_ID = i.ID
            WHERE fb.FB_ID = %s
            ORDER BY fb.Weight DESC;
            """
        )
        try:
            params = (weight, food_id)
            return execute_read_query(self.conn, query, params)
        except Exception as e:
            print(f"Error retrieving food ingredients: {e}")

    def search_rdi_per_nutrient(self, food_id: int, weight: float = 100.0):
        query = """
        SELECT
            Nutrients.Name,
            %s * (FB_Values.Value / 100) / RDI.Value AS Percentage
        FROM
            FB_Values
            JOIN Nutrients
                ON FB_Values.Nutrient_ID = Nutrients.ID
            JOIN RDI
                ON Nutrients.ID = RDI.Nutrient_ID
        WHERE
            FB_ID = %s AND RDI.Value > 0
        ORDER BY 
            FIELD(Nutrients.Unit, 'kcal', 'g', 'mg', 'mcg') ASC,
            Percentage DESC;
        """
        params = (weight, food_id)
        return execute_read_query(self.conn, query, params)
    
    def search_nutrient_percentage_per_ingredient(self, food_id: int, max_ingredients: int = 65):
        query = """
        SELECT
            cte.Nutrient_Name,
            (
                cte.total_std_amount
                    / SUM(cte.total_std_amount)
                    OVER (PARTITION BY cte.FB_ID)
            ) as Percentage
        FROM
        (
            SELECT
                fb.FB_ID,
                iv.Nutrient_ID,
                n.Name AS Nutrient_Name,
                n.Unit,
                SUM(
                    CASE n.Unit
                        WHEN 'g'   THEN fb.Weight * iv.Value * 1000
                        WHEN 'mg'  THEN fb.Weight * iv.Value
                        WHEN 'mcg' THEN fb.Weight * iv.Value / 1000
                        ELSE 0
                    END
                ) AS total_std_amount
            FROM FB_Ingredients AS fb
            JOIN Ingredients_Values AS iv
                ON fb.Ingredient_ID = iv.Ingredient_ID
            JOIN Nutrients AS n
                ON iv.Nutrient_ID = n.ID
            WHERE fb.FB_ID = %s
            AND n.Unit <> 'kcal'
            GROUP BY
                fb.FB_ID,
                iv.Nutrient_ID,
                n.Unit
        ) AS cte
        ORDER BY
            cte.total_std_amount DESC
        LIMIT %s    
        """
        params = (food_id, max_ingredients)
        return execute_read_query(self.conn, query, params)
        
    def search_nutrients_per_ingredient(self, food_id: int, weight: float = 100.0):
        query = """
        SELECT
            Nutrients.Name,
            (Value * %s / 100) AS Value,
            Unit
        FROM
            FB_Values JOIN Nutrients
                ON FB_Values.Nutrient_ID = Nutrients.ID
        WHERE
            FB_ID = %s
        ORDER BY 
            FIELD(Nutrients.Unit, 'kcal', 'g', 'mg', 'mcg') ASC,
            Value DESC;
        """
        params = (weight, food_id)
        return execute_read_query(self.conn, query, params)

    
    def get_nutrition_score(self, food_id: int):
        query = (
        """
        SELECT Score * 100
        FROM Food_Beverages as fb
        WHERE fb.ID = %s
        """
        )
        try:
            params = (food_id,)
            return execute_read_query(self.conn, query, params)
        except Exception as e:
            print(f"Error retrieving fb score: {e}")

