#app.py

from flask import Flask, request, jsonify
import openai
from db import db_session
import psycopg2
import bcrypt
from models import User

app = Flask(__name__)

# Configuración de OpenAI API
openai.api_key = "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"

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

    conn = db.get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed_password))
        conn.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    new_user = User(
        full_name=data['fullName'],
        username=data['username'],
        weight=data['weight'],
        height=data['height'],
        age=data['age'],
        gender=data['gender'],
        goal=data['goal'],
        physical_activity_level=data['physicalActivityLevel'],
        health_conditions=','.join(data['healthConditions']),  # convert list to comma-separated string
        password_hash=hash_password(data['password'])  # función para hash de la contraseña
    )
    db_session.add(new_user)
    db_session.commit()
    return jsonify({'message': 'User registered successfully'})
    
if __name__ == "__main__":
 app.run(debug=True)
