from flask import Flask, jsonify, send_from_directory
from flask_jwt_extended import create_access_token, JWTManager
import os
from flask_cors import CORS
from search import *
from fbValues import *
from user import *
app = Flask(__name__, static_folder='public', static_url_path='/')

app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


CORS(app)

@app.route('/api/search', methods=['GET'])
def search_foods_route():
    results = search_foods()
    return jsonify(results)

@app.route('/api/fb/category/<int:id>', methods=['GET'])
def search_food_category_route(id):
    results = search_food_category(id)
    return jsonify(results)

@app.route('/api/fb/calories/<int:id>', methods=['GET'])
def search_food_calories_route(id):
    weight = request.args.get('weight', default=100, type=float)
    results = get_calories(id, weight)
    return jsonify(results)


@app.route('/api/fb/<int:id>', methods=['GET'])
def search_food_name_route(id):
    results = search_fb_name(id)
    return jsonify(results)

@app.route('/api/fb/ingredients/<int:id>', methods=['GET'])
def search_food_ingredients_route(id):
    weight = request.args.get('weight', default=100, type=float)
    results = search_ingredients(id, weight)
    return jsonify(results)

@app.route('/api/fb/top_values/<int:id>', methods=['GET'])
def search_fb_top_values_route(id):
    results = get_nutrient_percentage_per_ingredient(id)
    return jsonify(results)

@app.route('/api/fb/values/<int:id>', methods=['GET'])
def search_fb_values_route(id):
    weight = request.args.get('weight', default=100, type=float)
    results = get_nutrients_per_ingredient(id, weight)
    return jsonify(results)

@app.route('/api/fb/portions/<int:id>', methods=['GET'])
def search_fb_portions_route(id):
    results = get_portions(id)
    return jsonify(results)

@app.route('/api/fb/rdi/<int:id>', methods=['GET'])
def search_fb_rdi_route(id):
    weight = request.args.get('weight', default=100, type=float)
    results = get_nutrients_rdi(id, weight)
    return jsonify(results)

@app.route('/api/fb/<int:id>/score', methods=['GET'])
def get_fb_score(id):
    results = get_fb_nutrient_score(id)
    return jsonify(results)

@app.route('/api/activities/<int:calories>', methods=['GET'])
def search_activities_per_calories(calories):
    weight = request.args.get('weight', default=80, type=float)
    results = search_activities(calories, weight)
    return jsonify(results)

@app.route('/api/sign-up', methods=['POST'])
def sign_up():
    results = create_user()
    return jsonify(results)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Check if user exists
    user = get_user(email, password)
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate a JWT token
    access_token = create_access_token(identity=email)
    return jsonify({"user_id": user[0], "access_token": access_token}), 200

@app.route('/api/user/weight/<int:id>', methods=['GET'])
def get_user_weight(id):
    results = search_user_weight(id)
    return jsonify(results)

@app.route('/api/user/<int:id>/fb-history', methods=['GET'])
def get_user_fb_history(id):
    results = get_user_meals_history(id)
    return jsonify(results)

@app.route('/api/user/<int:id>', methods=['PATCH'])
def update_user(id):
    results = update_user_profile(id)
    return jsonify(results)

@app.route('/api/user/<int:id>/add-meal', methods=['POST'])
def add_user_fb(id):
    results = add_user_meal(id)
    return jsonify(results)

@app.route('/api/user/<int:id>/score', methods=['GET'])
def get_user_score(id):
    results = get_user_health_score(id)
    return jsonify(results)

@app.route('/api/user/<int:id>/relative-score', methods=['GET'])
def get_user_relative_score(id):
    results = get_user_relative_health_score(id)
    return jsonify(results)



if __name__ == "__main__":
    print("a")
    app.run(
        host=os.environ.get("FLASK_HOST", "127.0.0.1"),
        port=5000,
        debug=bool(os.environ.get("FLASK_DEBUG", False))
    )


