from mysql.connector import pooling, Error
import pymysql
from dbutils.pooled_db import PooledDB

HOST_NAME = "127.0.0.1"
DB_NAME = "db04"
USER_NAME = "team04"
USER_PASSWORD = "0004"
# Local modifications
USER_NAME = "root"


# Create the connection pool
def create_connection_pool(host_name, user_name, user_password, db_name, pool_name="mypool", pool_size=10):
    """
    Creates a connection pool to the MySQL database.
    Returns a connection pool object if successful, or None otherwise.
    """

    try:
        # connection_pool = pooling.MySQLConnectionPool(
        #     pool_name=pool_name,
        #     pool_size=pool_size,
        #     pool_reset_session=True,
        #     host=host_name,
        #     user=user_name,
        #     password=user_password,
        #     database=db_name
        # )
        
        connection_pool = PooledDB(
            creator=pymysql,
            mincached=1,
            maxcached=10,
            maxconnections=20,
            blocking=False,
            host='127.0.0.1',
            user='root',
            password='0004',
            database='db04',
            charset='utf8mb4'
        )
        print(f"MySQL connection pool '{pool_name}' created successfully.")
        return connection_pool
    except Error as e:
        print(f"The error '{e}' occurred.")
        return None

# Use a pooled connection to execute a query
def execute_query(connection_pool, query, params=None):
    """
    Executes a single query (INSERT, UPDATE, DELETE, CREATE, DROP, etc.).
    Use params to safely pass parameters for parameterized queries.
    """
    connection = None
    cursor = None
    try:
        # connection = connection_pool.get_connection()
        connection = connection_pool.connection()
        cursor = connection.cursor()
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        connection.commit()
        print("Query executed successfully.")
    except Error as e:
        print(f"The error '{e}' occurred.")
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# Use a pooled connection to execute a read query
def execute_read_query(connection_pool, query, params=None, fetch_one=False):
    """
    Executes a SELECT query and returns the fetched results.
    Use params to safely pass parameters for parameterized queries.
    """
    connection = None
    cursor = None
    try:
        # connection = connection_pool.get_connection()
        connection = connection_pool.connection()
        cursor = connection.cursor()
        if params:
            cursor.execute(query, params)
            if fetch_one:
                return cursor.fetchone()
            else:
                return cursor.fetchall()
        else:
            cursor.execute(query)
        result = cursor.fetchall()
        return result
    except Error as e:
        print(f"The error '{e}' occurred.")
        return None
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
