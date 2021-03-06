import requests 
from datetime import datetime
import json 
import os 


def hiking_data_api(latitude, longitude):
    HIKING_KEY = os.environ['HIKING_PROJECT_KEY']
    url = 'https://www.hikingproject.com/data/get-trails'
    payload = {'key': HIKING_KEY, 'lat': latitude, 'lon': longitude}
    response = requests.get(url, params=payload)
    data = response.json() 
    return data


def hiking_data_api_id(hiking_id):
    HIKING_KEY = os.environ['HIKING_PROJECT_KEY']
    url = 'https://www.hikingproject.com/data/get-trails-by-id?ids=' + hiking_id
    payload = {'key': HIKING_KEY}
    response = requests.get(url, params=payload)
    data = response.json() 
    return data


def yelp_data_api(latitude, longitude):
    YELP_KEY = os.environ['YELP_KEY']
    url = 'https://api.yelp.com/v3/businesses/search'
    headers = {'AUTHORIZATION': 'BEARER '+ YELP_KEY}
    payload = {'latitude': latitude, 'longitude': longitude}
    response = requests.get(url, params=payload, headers=headers)
    data = response.json()
    return data


def yelp_data_api_id(yelp_id):
    YELP_KEY = os.environ['YELP_KEY']
    url = 'https://api.yelp.com/v3/businesses/' + yelp_id
    headers = headers = {'AUTHORIZATION': 'BEARER '+ YELP_KEY}
    payload = {'yelp_id': yelp_id}
    response = requests.get(url, params=payload, headers=headers)
    data = response.json()
    return data


def weather_data_api(latitude, longitude, date):
    WEATHER_KEY = os.environ['OPEN_WEATHER_KEY']
    url = 'https://api.openweathermap.org/data/2.5/onecall'
    payload = {'appid': WEATHER_KEY, 'lat': latitude, 'lon': longitude, 'exclude': 'minutely', 'units': 'imperial'}
    response = requests.get(url, params=payload)
    data = response.json() 
    
    for daily_weather_object in data['daily']: 
        timestamp = daily_weather_object['dt']
        ts_to_dt = datetime.utcfromtimestamp(timestamp).strftime('%a, %b %d, %Y')
        if ts_to_dt == date:
            return daily_weather_object

    return {'Error': 'Date out of range.'}
