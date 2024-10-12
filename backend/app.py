""" app.py """

from flask import Flask, request, jsonify
import openai
from db import db_session, init_db
from models import User
import bcrypt
import psycopg2

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

    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

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

# Arrancar servidor
if __name__ == "__main__":
    app.run(debug=True)
