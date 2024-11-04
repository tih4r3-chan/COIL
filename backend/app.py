""" app.py """
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from db import db_session, init_db
from models import User, Activity, Meal
import bcrypt
import jwt
import datetime

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
    
    # Verificar que todos los campos están presentes
    required_fields = ['username', 'password', 'fullName', 'weight', 'height', 'age', 'gender', 'goal', 'physicalActivityLevel', 'healthConditions']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'{field} es requerido.'}), 400

    username = data['username']
    password = data['password']

    # Verificar si el usuario ya existe
    if db_session.query(User).filter_by(username=username).first():
        return jsonify({'message': 'El nombre de usuario ya existe'}), 400

    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Crear nuevo usuario
    new_user = User(
        username=data['username'],
        full_name=data['fullName'],
        weight=float(data['weight']),
        height=float(data['height']),
        age=int(data['age']),
        gender=data['gender'],
        goal=data['goal'],
        physical_activity_level=float(data['physicalActivityLevel']),
        health_conditions=data['healthConditions'],
        password_hash=hashed_password  # Aquí usamos password_hash en lugar de password
    )

    try:
        db_session.add(new_user)
        db_session.commit()
        return jsonify({'message': 'Usuario registrado exitosamente'}), 201
    except Exception as e:
        db_session.rollback()
        return jsonify({'error': str(e)}), 500

# Ruta para iniciar sesión
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Verificar que los campos de inicio de sesión estén presentes
    if not username or not password:
        return jsonify({'message': 'Usuario y contraseña son requeridos'}), 400

    user = db_session.query(User).filter_by(username=username).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
        # Generar un token
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # El token expira en 1 hora
        }, "your_secret_key", algorithm='HS256')  # Cambia 'your_secret_key' por una clave secreta adecuada

        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Credenciales inválidas'}), 401

# Rutas para agregar actividades y comidas
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
if __name__ == '__main__':
    app.run(debug=True, port=5000)
