import requests 
import json 
import os 


HIKING_KEY = os.environ['HIKING_PROJECT_KEY']
YELP_KEY = os.environ['YELP_KEY']
WEATHER_KEY = os.environ['OPEN_WEATHER_KEY']


def hiking_data_api(latitude, longitude):
    url = 'https://www.hikingproject.com/data/get-trails'
    payload = {'key': HIKING_KEY, 'lat': latitude, 'lon': longitude}
    response = requests.get(url, params=payload)
    data = response.json() 
    return data['trails']


