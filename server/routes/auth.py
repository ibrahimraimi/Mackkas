from flask import Blueprint, request, jsonify, session, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from ..extensions import db
from ..models import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.json
    if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User already exists'}), 400
    
    hashed_password = generate_password_hash(data['password'])
    new_user = User(username=data['username'], email=data['email'], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Account created successfully'}), 201

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        session['user_id'] = user.id
        session['username'] = user.username
        return jsonify({'message': 'Login successful', 'user': {'username': user.username}}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@auth_bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('main.login_page'))
