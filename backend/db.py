import psycopg2

def get_db_connection():
    connection = psycopg2.connect(
        host='your-rds-endpoint',  # Cambia esto con el endpoint de RDS
        database='your-database',
        user='your-username',
        password='your-password'
    )
    return connection


def insert_user_data(user_data):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO users (username, full_name, weight, height, age, gender, goal, activity_level, disease)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
    """
    cursor.execute(query, (
        user_data['username'],
        user_data['full_name'],
        user_data['weight'],
        user_data['height'],
        user_data['age'],
        user_data['gender'],
        user_data['goal'],
        user_data['activity_level'],
        user_data['disease']
    ))

    conn.commit()
    cursor.close()
    conn.close()
