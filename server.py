"""Server for Take a Walk app."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db
from API import hiking_data_api, yelp_data_api, weather_data_api
import crud 

app = Flask(__name__)
app.secret_key = 'dev'
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True


@app.route('/')
def homepage():
    """Render the application's homepage."""

    return render_template('index.html')


@app.route('/login', methods=['POST'])
def user_login():
    """Login an existing user."""
    
    post_request = request.get_json()

    username = post_request['username']
    password = post_request['password']

    if crud.confirm_username_and_password(username, password) == True:
        user = crud.get_user_from_username(username)
        session['current_user'] = {'user_id': user.user_id, 'username': user.username}
        return {'user_id': user.user_id, 'username': user.username}
    else:
        return {'Error': 'Invalid username or password.'}


@app.route('/register', methods=['POST'])
def user_registration():
    """Register a new user."""
    
    post_request = request.get_json()

    username = post_request['username']
    email = post_request['email']
    password = post_request['password']

    new_user = crud.create_user(username, email, password)

    if new_user:
        session['current_user'] = {'user_id': new_user.user_id, 'username': new_user.username}
        return {'user_id': new_user.user_id, 'username': new_user.username}
    else:
        return {'Error': 'This email or username already exists.'}


@app.route('/saved-walks/<username>')
def load_user_walks(username):

    walks = crud.get_user_walks(username)

    return jsonify(walks)


@app.route('/ratings/<username>')
def load_user_ratings(username):

    user_ratings = {}

    user_ratings['rest_ratings'] = crud.get_user_rest_ratings(username)
    user_ratings['trail_ratings'] = crud.get_user_trail_ratings(username)

    return jsonify(user_ratings)


@app.route('/new-walk/<username>')
def create_walk(username):

    user = crud.get_user_from_username(username)

    new_walk = crud.create_walk(user)

    return jsonify(new_walk)


@app.route('/api/weather')
def get_weather():

    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    
    return weather_data_api(latitude, longitude)


@app.route('/api/restaurants')
def get_restaurants():

    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    
    return yelp_data_api(latitude, longitude)


@app.route('/add-restaurants', methods=['POST'])
def add_restaurants():

    post_request = request.get_json()

    restaurants = post_request['restaurants']
    latitude = post_request['latitude']
    longitude = post_request['longitude']

    for name in restaurants:
        if crud.is_rest_in_db(latitude, longitude, name) == True:
            continue
        else:
            new_rest = crud.create_restaurant(latitude, longitude, name)
    
    return {'Success': 'Added to database.'} 
    
    















if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True, ssl_context='adhoc')