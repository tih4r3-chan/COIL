""" db.py """

import psycopg2

def get_db_connection():
    connection = psycopg2.connect(
        host='database-1.clck8ocoinkm.us-east-2.rds.amazonaws.com', 
        database='database-1',  
        user='postgres',      
        password='Coil2024'    
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
        ','.join(user_data['disease'])  # Asegúrate de pasar la lista de enfermedades como una cadena
    ))

    conn.commit()
    cursor.close()
    conn.close()
