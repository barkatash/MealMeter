from flask import request
from FBConnection import FBConnection
from ActivitiesConnection import ActivitiesConnection

db_fb = FBConnection()
db_act = ActivitiesConnection()


def search_foods():
    food_name = request.args.get('foodName', '')
    results = db_fb.search_foods(food_name)
    return results

def search_food_category(id):
    results = db_fb.search_food_category(id)
    return results

def search_fb_name(id):
    results = db_fb.search_fb_name(id)
    return results

def search_activities(calories, weight=80):
    results = db_act.search_activities_calories(weight=weight, calories=calories)
    return results

