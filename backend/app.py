from flask import Flask, request, jsonify
import openai
import db

app = Flask(__name__)

# Configuración de OpenAI API

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

if __name__ == "__main__":
    app.run(debug=True)
#Ola que tal