from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from db import db_session, init_db, insert_user_data  # Asegúrate de tener insert_user_data aquí si lo usas
from models import User, Activity, Meal  # Asegúrate de que estos modelos existan en tu archivo models.py
import bcrypt
import jwt  # Para manejar JWT
import datetime  # Para manejar la expiración del token

app = Flask(__name__)
CORS(app)  # Esto habilita CORS para todas las rutas

# Inicializar la base de datos
init_db()

# Configuración de OpenAI API
openai.api_key = "sk-your-api-key"  # Cambia esto por tu clave real

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data.get('question')

    # Lógica de ChatGPT
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=question,
        max_tokens=150
    )
    return jsonify({"answer": response.choices[0].text.strip()})

# Ruta para registrar usuario
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Verificar si el usuario ya existe
    if db_session.query(User).filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')  # Cambiado a string

    new_user = User(
        full_name=data.get('fullName'),
        username=username,
        weight=data.get('weight'),
        height=data.get('height'),
        age=data.get('age'),
        gender=data.get('gender'),
        goal=data.get('goal'),
        physical_activity_level=data.get('physicalActivityLevel'),
        health_conditions=','.join(data.get('healthConditions', [])),  # Convertimos lista a string
        password_hash=hashed_password
    )

    db_session.add(new_user)
    db_session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Ruta para iniciar sesión
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = db_session.query(User).filter_by(username=username).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
        # Generar un token
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # El token expira en 1 hora
        }, "your_secret_key", algorithm='HS256')

        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# Ruta para agregar una actividad
@app.route('/activities', methods=['POST'])
def add_activity():
    data = request.get_json()
    new_activity = Activity(
        user_id=data['user_id'],
        activity_type=data['activity_type'],
        description=data['description'],
        date=data['date'],
    )
    db_session.add(new_activity)
    db_session.commit()
    return jsonify({'message': 'Actividad registrada exitosamente'}), 201

# Ruta para agregar una comida
@app.route('/meals', methods=['POST'])
def add_meal():
    data = request.get_json()
    new_meal = Meal(
        user_id=data['user_id'],
        meal_type=data['meal_type'],
        food_items=data['food_items'],
        calories=data['calories'],
        date=data['date'],
    )
    db_session.add(new_meal)
    db_session.commit()
    return jsonify({'message': 'Comida registrada exitosamente'}), 201

# Arrancar servidor
if __name__ == "__main__":
    app.run(debug=True)
