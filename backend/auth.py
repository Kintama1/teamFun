import os
from supabase import create_client, Client
from flask import Blueprint, request, jsonify
from functools import wraps
import jwt
from datetime import datetime, timedelta

# Initialize Supabase client
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_ANON_KEY')

if not supabase_url or not supabase_key:
    raise ValueError("Supabase URL and ANON_KEY must be set in environment variables")

supabase: Client = create_client(supabase_url, supabase_key)

# Create auth blueprint
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')  # Frontend sends 'name' not 'username'
        
        if not email or not password or not name:
            return jsonify({'error': 'Email, password, and name are required'}), 400
        
        # Sign up with Supabase Auth using email
        response = supabase.auth.sign_up({
            'email': email,
            'password': password,
            'options': {
                'data': {
                    'username': name  # Store as username in metadata
                }
            }
        })
        
        if response.user:
            # Insert user data into our users table
            user_data = {
                'id': response.user.id,
                'email': email,
                'username': name,  # Use 'name' from frontend as 'username' in DB
                'password_hash': 'managed_by_supabase'  # Supabase handles password hashing
            }
            
            supabase.table('users').insert(user_data).execute()
            
            return jsonify({
                'message': 'User created successfully',
                'user': {
                    'id': response.user.id,
                    'email': email,
                    'username': name
                },
                'token': response.session.access_token if response.session else None  # Frontend expects 'token'
            }), 201
        else:
            return jsonify({'error': 'Failed to create user'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        username = data.get('username')
        
        if not email or not password or not username:
            return jsonify({'error': 'Email, password, and username are required'}), 400
        
        # Sign up with Supabase Auth using email
        response = supabase.auth.sign_up({
            'email': email,
            'password': password,
            'options': {
                'data': {
                    'username': username
                }
            }
        })
        
        if response.user:
            # Insert user data into our users table
            user_data = {
                'id': response.user.id,
                'email': email,
                'username': username,
                'password_hash': 'managed_by_supabase'  # Supabase handles password hashing
            }
            
            supabase.table('users').insert(user_data).execute()
            
            return jsonify({
                'message': 'User created successfully',
                'user_id': response.user.id,
                'access_token': response.session.access_token if response.session else None
            }), 201
        else:
            return jsonify({'error': 'Failed to create user'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Sign in with Supabase Auth
        response = supabase.auth.sign_in_with_password({
            'email': email,
            'password': password
        })
        
        # Check if login was successful
        if response.user and response.session:
            # Get user data from our users table
            user_data = supabase.table('users').select('*').eq('id', response.user.id).execute()
            
            user_info = user_data.data[0] if user_data.data else {
                'id': response.user.id,
                'email': email,
                'username': email.split('@')[0]  # fallback username
            }
            
            return jsonify({
                'message': 'Login successful',
                'user': user_info,
                'token': response.session.access_token
            }), 200
        else:
            # This handles cases where Supabase returns a response but no user/session
            return jsonify({'error': 'Invalid email or password'}), 401
            
    except Exception as e:
        # Log the actual error for debugging (you can remove this in production)
        print(f"Login error: {str(e)}")
        
        # Check for specific Supabase auth errors
        error_message = str(e).lower()
        
        if any(phrase in error_message for phrase in ['invalid', 'credentials', 'password', 'email']):
            return jsonify({'error': 'Invalid email or password'}), 401
        elif 'network' in error_message:
            return jsonify({'error': 'Network error. Please try again.'}), 503
        else:
            # Generic error message for any other issues
            return jsonify({'error': 'Login failed. Please try again.'}), 500

@auth_bp.route('/logout', methods=['POST'])
def logout():
    try:
        supabase.auth.sign_out()
        return jsonify({'message': 'Logged out successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    try:
        # Get current user from Supabase
        user = supabase.auth.get_user()
        
        if user and user.user:
            # Get user data from our users table
            user_data = supabase.table('users').select('*').eq('id', user.user.id).execute()
            
            return jsonify({
                'user_id': user.user.id,
                'user': user_data.data[0] if user_data.data else None
            }), 200
        else:
            return jsonify({'error': 'Not authenticated'}), 401
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def token_required(f):
    """Decorator to require valid JWT token"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            # Verify token with Supabase
            response = supabase.auth.get_user(token)
            
            if not response.user:
                return jsonify({'error': 'Token is invalid'}), 401
            
            # Add user info to request context
            request.current_user_id = response.user.id
            
        except Exception as e:
            return jsonify({'error': 'Token is invalid'}), 401
        
        return f(*args, **kwargs)
    
    return decorated 