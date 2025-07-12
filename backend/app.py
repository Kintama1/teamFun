import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set Supabase credentials if not already set
if not os.getenv('SUPABASE_URL'):
    os.environ['SUPABASE_URL'] = 'https://wwiljupbehtjhkcyhhih.supabase.co'
if not os.getenv('SUPABASE_ANON_KEY'):
    os.environ['SUPABASE_ANON_KEY'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aWxqdXBiZWh0amhrY3loaGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMzIwNDQsImV4cCI6MjA2NzkwODA0NH0.-pzduVTfPhQ-WNIBrRwZ286jGzyTQJ7vmXvwDHqDRbY'

# Import auth blueprint after setting env vars
from auth import auth_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Register auth blueprint
app.register_blueprint(auth_bp, url_prefix='/api/auth')

@app.route('/api/test')
def test():
    return jsonify({'message': 'Backend connected!'})

@app.route('/api/health')
def health():
    return jsonify({'status': 'healthy', 'message': 'Fantasy Stocks API is running!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)