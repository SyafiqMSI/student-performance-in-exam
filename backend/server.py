from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/home', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the home page"})

@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.json
    print(data)  # Tampilkan data di terminal/server log
    return jsonify({"message": "Data received", "data": data})

if __name__ == '__main__':
    app.run(debug=True)
