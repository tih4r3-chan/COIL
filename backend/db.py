""" db.py """

import psycopg2
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Configuración de la base de datos local
DATABASE_URL = 'postgresql://postgres:Coil2024@localhost:5432/myAppDB'

# Crear el motor de SQLAlchemy
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
db_session = Session()
Base = declarative_base()

def get_db_connection():
    # Intenta conectarse a la base de datos en AWS
    # try:
    #     connection = psycopg2.connect(
    #         host='database-1.cjf4a6x7rwd4.us-east-1.rds.amazonaws.com',
    #         database='nombre_de_tu_base_de_datos',
    #         user='coil',
    #         password='Coil2024'
    #     )
    #     return connection
    # except psycopg2.OperationalError as e:
    #     print(f"Error de conexión: {e}")
    #     return None
    return None  # Esto asegurará que no intente conectarse a AWS.

def insert_user_data(user_data):
    conn = get_db_connection()
    if conn is None:
        return  # Maneja el error de conexión

    cursor = conn.cursor()
    try:
        query = """
        INSERT INTO users (username, full_name, weight, height, age, gender, goal, physical_activity_level, health_conditions)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
        """
        cursor.execute(query, (
            user_data['username'],
            user_data['fullName'],
            user_data['weight'],
            user_data['height'],
            user_data['age'],
            user_data['gender'],
            user_data['goal'],
            user_data['physicalActivityLevel'],
            ','.join(user_data['healthConditions'])
        ))

        conn.commit()
    except Exception as e:
        print(f"Error al insertar datos: {e}")
    finally:
        cursor.close()
        conn.close()

def init_db():
    Base.metadata.create_all(engine)  # Crear todas las tablas si no existen

if __name__ == "__main__":
    connection = get_db_connection()
    if connection:
        print("Conexión exitosa.")
        connection.close()
    else:
        print("No se pudo conectar a la base de datos.")
