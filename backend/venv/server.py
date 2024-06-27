from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from analyze import perform_analysis  # Import perform_analysis dari analyze.py

app = Flask(__name__)
CORS(app)

@app.route('/api/home', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the home page"})

@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.json
    print(data)
    return jsonify({"message": "Data received", "data": data})

@app.route('/api/analyze', methods=['GET'])
def analyze():
    image_path = perform_analysis()
    return jsonify({"message": "Analysis complete", "image_path": image_path})

if __name__ == '__main__':
    app.run(debug=True)
