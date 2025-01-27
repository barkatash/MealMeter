from utilities import *


class UserConnection:
    """
    A class to manage user-related interactions with the database.
    It provides methods for user creation, retrieval, updates, and meal logging.
    """

    def __init__(self):
        """
        Initializes the UserConnection class by creating a connection to the database.

        Raises:
            Exception: If the connection pool cannot be established.
        """
        self.conn = create_connection_pool(
                host_name=HOST_NAME,
                user_name=USER_NAME,
                user_password=USER_PASSWORD,
                db_name=DB_NAME
            )
        if self.conn is None:
            raise Exception("Failed to establish a database connection")

    def create_user(self, email: str, first_name: str, last_name: str, password: str, dob: str, gender: str, weight: int):
        """
        Inserts a new user into the User table.

        Args:
            email (str): The user's email address.
            first_name (str): The user's first name.
            last_name (str): The user's last name.
            password (str): The user's password.
            dob (str): The user's date of birth.
            gender (str): The user's gender ('M' or 'F').
            weight (int): The user's weight in kilograms.

        Returns:
            Result of the query execution or None if an error occurs.

        Raises:
            Exception: If the query execution fails.
        """
        query = (
            """
            INSERT INTO User (Email, First_Name, Last_Name, Password, DOB, Gender, Weight)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
        )
        try:
            params = (email, first_name, last_name, password, dob, gender, weight)
            return execute_query(self.conn, query, params)
        except Exception as e:
            print(f"Error creating user: {e}")
            return None

    def get_user(self, email: str, password: str):
        """
        Retrieves a user from the User table based on their email and password.

        Args:
            email (str): The user's email address.
            password (str): The user's password.

        Returns:
            The user record if found, or None if not found.

        Raises:
            Exception: If the query execution fails.
        """
        query = "SELECT * FROM User WHERE Email = %s AND Password = %s"
        return execute_read_query(self.conn, query, (email, password), fetch_one=True)

    def get_user_weight(self, user_id: int):
        """
        Retrieves the weight of a user based on their ID.

        Args:
            user_id (int): The ID of the user.

        Returns:
            The weight of the user or None if not found.

        Raises:
            Exception: If the query execution fails.
        """
        query = "SELECT Weight FROM User WHERE ID = %s"
        return execute_read_query(self.conn, query, (user_id,), fetch_one=True)

    def get_full_name(self, user_id: int):
        """
        Retrieves the full name (first and last name) of a user based on their ID.

        Args:
            user_id (int): The ID of the user.

        Returns:
            The full name of the user as a tuple (first_name, last_name) or None if not found.

        Raises:
            Exception: If the query execution fails.
        """
        query = "SELECT First_Name, Last_Name FROM User WHERE ID = %s"
        return execute_read_query(self.conn, query, (user_id,), fetch_one=True)

    def update_user(self, user_id: int, first_name, last_name, weight: int = None):
        """
        Updates the user information in the User table. Only updates the provided fields.

        Args:
            user_id (int): The ID of the user to update.
            first_name (str, optional): The new first name of the user.
            last_name (str, optional): The new last name of the user.
            weight (int, optional): The new weight of the user.

        Returns:
            Result of the query execution or None if an error occurs.

        Raises:
            Exception: If the query execution fails.
        """
        if len(first_name) == 0 or len(last_name) == 0:
            current_name = self.get_full_name(user_id)
            first_name = current_name[0] if len(first_name) == 0 else first_name
            last_name = current_name[1] if len(last_name) == 0 else last_name
        if weight is None:
            weight = self.get_user_weight(user_id)[0]

        query = (
            """
            UPDATE User
            SET First_Name = %s, Last_Name = %s, Weight = %s
            WHERE ID = %s
            """
        )
        try:
            params = (first_name, last_name, weight, user_id)
            return execute_query(self.conn, query, params)
        except Exception as e:
            print(f"Error updating user: {e}")
            return None

    def insert_meal(self, user_id: int, fb_id: int, portion: float, date_time: str):
        """
        Inserts a meal record into the User_Food_Beverages table.

        Args:
            user_id (int): The ID of the user.
            fb_id (int): The ID of the food or beverage.
            portion (float): The portion weight consumed.
            date_time (str): The date and time of the meal.

        Returns:
            Result of the query execution or None if an error occurs.

        Raises:
            Exception: If the query execution fails.
        """
        query = (
            """
            INSERT INTO User_Food_Beverages (User_ID, FB_ID, Portion_Weight, Date_Time)
            VALUES (%s, %s, %s, %s)
            """
        )
        try:
            params = (user_id, fb_id, portion, date_time)
            return execute_query(self.conn, query, params)
        except Exception as e:
            print(f"Error inserting meal: {e}")
            return None

    def show_meals(self, user_id: int):
        """
        Retrieves all meals for a specific user, ordered by date and time in descending order.

        Args:
            user_id (int): The ID of the user.

        Returns:
            List of meal records for the user.

        Raises:
            Exception: If the query execution fails.
        """
        query = (
            """
            SELECT FB.description, User_Food_Beverages.Portion_Weight, User_Food_Beverages.Date_Time
            FROM User_Food_Beverages
            JOIN Food_Beverages FB ON User_Food_Beverages.FB_ID = FB.ID
            WHERE User_ID = %s
            ORDER BY Date_Time DESC
            """
        )
        params = (user_id,)
        return execute_read_query(self.conn, query, params)

    def get_user_static_nutrition_score(self, user_id: int):
        """
        Calculates the static nutrition score for a user based on their meal records.

        Args:
            user_id (int): The ID of the user.

        Returns:
            The static nutrition score as a float or None if not found.

        Raises:
            Exception: If the query execution fails.
        """
        query = (
            """
            SELECT AVG(FB.Score * UFB.Portion_Weight) / AVG(UFB.Portion_Weight) AS Score
            FROM User_Food_Beverages UFB
            JOIN Food_Beverages FB ON UFB.FB_ID = FB.ID
            WHERE UFB.User_ID = %s
            """
        )
        params = (user_id,)
        return execute_read_query(self.conn, query, params, fetch_one=True)

    def get_user_relative_nutrition_score(self, user_id: int):
        """
        Calculates the relative nutrition score for a user compared to other users.

        Args:
            user_id (int): The ID of the user.

        Returns:
            The relative nutrition score as a percentile rank or None if not found.

        Raises:
            Exception: If the query execution fails.
        """
        query = (
            """
            WITH User_Scores AS (
                SELECT UFB.User_ID, AVG(FB.Score * UFB.Portion_Weight) / AVG(UFB.Portion_Weight) AS Score
                FROM User_Food_Beverages UFB
                JOIN Food_Beverages FB ON UFB.FB_ID = FB.ID
                GROUP BY UFB.User_ID
            ),
            User_Relative_Scores AS (
                SELECT User_ID, Score, PERCENT_RANK() OVER (ORDER BY Score ASC) AS Relative_Score
                FROM User_Scores
            )
            SELECT Relative_Score
            FROM User_Relative_Scores
            WHERE User_ID = %s
            """
        )
        params = (user_id,)
        return execute_read_query(self.conn, query, params, fetch_one=True)
