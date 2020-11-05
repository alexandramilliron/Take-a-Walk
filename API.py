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


def yelp_data_api(latitude, longitude):
    url = 'https://api.yelp.com/v3/businesses/search'
    headers = {'AUTHORIZATION': 'BEARER '+ YELP_KEY}
    payload = {'latitude': latitude, 'longitude': longitude}
    response = requests.get(url, params=payload, headers=headers)
    data = response.json()
    return data['businesses']


def weather_data_api(latitude, longitude):
    url = 'https://api.openweathermap.org/data/2.5/onecall'
    payload = {'appid': WEATHER_KEY, 'lat': latitude, 'lon': longitude, 'exclude': 'minutely', 'units': 'imperial'}
    response = requests.get(url, params=payload)
    data = response.json() 
    return data['current']

# timestamp = int("dtnumber")
# datetime.utcfromtimestamp(timestamp).strftime(%Y-%m-%d %H:%M:%S)

