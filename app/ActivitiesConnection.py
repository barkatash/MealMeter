from utilities import *


class ActivitiesConnection:
    """
    A class to manage database connections and execute queries related to physical activities.
    This class handles connections to the MySQL database and provides methods to search
    activities based on calorie expenditure and user weight.
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

    def search_activities_calories(self, calories: int, weight: int = 80, max_activities: int = 4):
        """
        Searches for activities that are close to a user's calorie-burning target based on their weight.

        Args:
            calories (int): The minimum number of calories to be burned.
            weight (int): The weight of the person in kilograms (default is 80 kg).
            max_activities (int): The maximum number of activities to return (default is 4).

        Returns:
            list: A list of activities that match the criteria.
        """
        query = (
            """
            SELECT ID, Description, (CaloriesPKG * %s) AS Calories_Burned
            FROM Activities
            ORDER BY ABS(CaloriesPKG * %s - %s) ASC
            LIMIT %s
            """
        )
        try:
            params = (weight, weight, calories, max_activities)
            return execute_read_query(self.conn, query, params)
        except Exception as e:
            print(f"Error searching for activities by calories: {e}")
