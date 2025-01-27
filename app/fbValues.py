from flask import request
from FBConnection import FBConnection

db_fb = FBConnection()


def search_ingredients(id, weight=100):
    results = db_fb.search_ingredients(id, weight)
    return results

def get_calories(id, weight=100):
    results = db_fb.search_food_calories(id, weight)
    return results

def get_portions(id):
    results = db_fb.search_portions(id)
    return results

def get_nutrient_percentage_per_ingredient(id):
    results = db_fb.search_nutrient_percentage_per_ingredient(id, 5)
    return results

def get_nutrients_per_ingredient(id, weight=100):
    results = db_fb.search_nutrients_per_ingredient(id, weight)
    return results

def get_nutrients_rdi(id, weight=100):
    results = db_fb.search_rdi_per_nutrient(id, weight)
    return results

def get_fb_nutrient_score(id):
    results = db_fb.get_nutrition_score(id)
    return results

