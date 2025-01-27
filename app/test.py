import pymysql

# Configuration details
config = {
    "host": "localhost",
    "user": "team04",
    "password": "0004",
    "database": "db04"
}

try:
    # Connect to the database
    connection = pymysql.connect(
        host=config["host"],
        user=config["user"],
        password=config["password"],
        database=config["database"]
    )
    print("Connected successfully!")

    # Create a cursor, execute a test query, and fetch results
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM User LIMIT 5;")
        rows = cursor.fetchall()
        for row in rows:
            print(row)

except pymysql.MySQLError as e:
    print("MySQL error:", e)

finally:
    # Make sure we close the connection
    if 'connection' in locals() and connection:
        connection.close()
        print("Connection closed.")