# app.py

from flask import Flask, request, jsonify
import openai
from db import db_session, init_db
from models import User
import bcrypt
import jwt  # Agrega esto para manejar JWT
import datetime  # Para manejar la expiración del token

app = Flask(__name__)

# Inicializar la base de datos
init_db()

# Configuración de OpenAI API
openai.api_key = "sk-your-api-key"

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
        health_conditions=','.join(data.get('healthConditions', [])),  # convertimos lista a string
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
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # el token expira en 1 hora
        }, "your_secret_key", algorithm='HS256')

        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# Arrancar servidor
if __name__ == "__main__":
    app.run(debug=True)
