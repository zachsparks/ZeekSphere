Flask Chatbot with OpenAI GPT-3.5
This repository contains a web application built with Flask, integrating OpenAI's GPT-3.5 model to create an interactive chatbot.

Features
Chat Interface: Users can send messages and receive AI-generated responses.
OpenAI GPT-3.5 Integration: Leverages the power of OpenAI's GPT-3.5 model for generating conversational responses.
Conversation Context Management: Maintains a short history of the conversation for context-aware responses.

Setup and Installation
1. Clone the Repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

2. Install Dependencies
Ensure Python is installed on your system.
Install required Python packages:
pip install flask openai

3. Configuration
Create a config.json file in the root directory with your OpenAI API key:
json
Copy code
{
  "openai": {
    "key": "your-api-key-here"
  }
}

4. Running the Application
Start the Flask server:
Copy code
python app.py

Usage
Access the web interface at http://localhost:5000.
Use the chat interface to send messages and receive responses from the AI.

Note
This application is currently configured for single-user use.
Authentication and multi-user support are not implemented.

Contributing
Feel free to fork the repository, make improvements, and submit pull requests.
