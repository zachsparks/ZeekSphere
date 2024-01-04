from flask import Flask, render_template, request, jsonify
import openai
import json
import os

app = Flask(__name__)

# Load configuration and set API key
with open('config.json') as f:
    config = json.load(f)

openai.api_key = config["openai"]["key"]

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/send_message", methods=["POST"])
def send_message():
    user_message = request.form['message']
    response = send_message_to_openai(user_message)
    return jsonify({'response': response})

# login - not working 
@app.route("/login")
def login():
    return render_template('login.html')

def send_message_to_openai(message):
    from openai import OpenAI
    os.environ["OPENAI_API_KEY"] = config["openai"]["key"]

    client = OpenAI()
    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": message},
    ]
    )

        # Assuming 'response' is your ChatCompletion object
    content = response.choices[0].message.content
    return content





if __name__ == "__main__":
    app.run(debug=True)
