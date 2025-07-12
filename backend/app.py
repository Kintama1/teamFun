from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

@app.route('/api/test')
def test():
    return jsonify({'message': 'Backend connected!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)