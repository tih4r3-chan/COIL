import psycopg2
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Configuración de la base de datos
DATABASE_URL = 'postgresql://postgres:Coil2024@database-1.clck8ocoinkm.us-east-2.rds.amazonaws.com/database-1'

# Crear el motor de SQLAlchemy
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
db_session = Session()
Base = declarative_base()

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
        user_data['fullName'],
        user_data['weight'],
        user_data['height'],
        user_data['age'],
        user_data['gender'],
        user_data['goal'],
        user_data['physicalActivityLevel'],
        ','.join(user_data['healthConditions'])  # Asegúrate de pasar la lista de enfermedades como una cadena
    ))

    conn.commit()
    cursor.close()
    conn.close()

def init_db():
    # Aquí va el código para inicializar tu base de datos, si es necesario
    Base.metadata.create_all(engine)  # Crear todas las tablas si no existen
