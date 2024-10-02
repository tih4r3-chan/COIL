from flask import Flask, request, jsonify
import openai
import db

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

if __name__ == "__main__":
    app.run(debug=True)
#Ola que tal