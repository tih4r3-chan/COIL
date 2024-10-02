# db.py
import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        database="mydb",
        user="myuser",
        password="mypassword",
        host="localhost",
        port="5432"
    )
    return conn
