from flask import request
from UserConnection import UserConnection

db_user = UserConnection()

def create_user():
    email = request.json['email']
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    password = request.json['password']
    dob = request.json['dob']
    gender = request.json['gender']
    weight = request.json['weight']
    db_user.create_user(email, first_name, last_name, password, dob, gender, weight)
    
    return "User created successfully"

def get_user(email, password):
    return db_user.get_user(email, password)

def search_user_weight(id):
    return db_user.get_user_weight(id)

def add_user_meal(id):
    fb_id = request.json['fb']
    portion = request.json['portion']
    date_time = request.json['date_time']
    db_user.insert_meal(id, fb_id, portion, date_time)
    
    return "Meal added successfully"

def get_user_meals_history(id):
    return db_user.show_meals(id)

def update_user_profile(id):
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    weight = request.json['weight']

    return db_user.update_user(id, first_name, last_name, weight)

def get_user_health_score(id):
    return db_user.get_user_static_nutrition_score(id)

def get_user_relative_health_score(id):
    return db_user.get_user_relative_nutrition_score(id)

