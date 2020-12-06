"""Server for Take a Walk app."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db
from API import hiking_data_api, yelp_data_api, weather_data_api
import crud 
import pgeocode 


app = Flask(__name__)
app.secret_key = 'dev'
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True


@app.route('/api/get-location')
def get_location():

    zipcode = request.args.get('zipcode')

    nomi = pgeocode.Nominatim('us')

    location_info = nomi.query_postal_code(zipcode)

    return {'latitude': location_info.latitude, 'longitude': location_info.longitude, 'city': location_info.place_name,
            'state': location_info.state_name}


@app.route('/api/login', methods=['POST'])
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


@app.route('/api/register', methods=['POST'])
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


@app.route('/api/walk-details/<walk_id>')
def load_walk_details(walk_id):

    walk = crud.get_walk_details(walk_id)

    return jsonify(walk)


@app.route('/api/saved-walks')
def load_user_walks():

    username = request.args.get('username')

    walks = crud.get_user_walks(username)

    serialized_walks = [walk.serialize() for walk in walks]
    
    return jsonify(serialized_walks)


@app.route('/api/ratings/<username>')
def load_user_ratings(username):

    user = crud.get_user_from_username(username)

    user_ratings = user.get_ratings() 

    return user_ratings


@app.route('/api/add-rest-rating', methods=['POST'])
def add_rest_rating():

    post_request = request.get_json()

    username = post_request['username']
    rest_id = post_request['rest_id']
    rest_comment = post_request['rest_comment']
    rest_star = post_request['rest_star']
    masks_worn = post_request['masks_worn']
    socially_distanced = post_request['socially_distanced']
    outdoor_seating = post_request['outdoor_seating']

    user = crud.get_user_from_username(username)
    restaurant = crud.get_rest_from_id(rest_id)

    crud.create_rest_rating(restaurant, user, rest_comment, rest_star, 
                            masks_worn, socially_distanced, outdoor_seating)

    return {'Success': 'Added to database.'}


@app.route('/api/add-trail-rating', methods=['POST'])
def add_trail_rating():

    post_request = request.get_json()

    username = post_request['username']
    trail_id = post_request['trail_id']
    trail_comment = post_request['trail_comment']
    trail_star = post_request['trail_star']
    difficulty_level = post_request['difficulty']
    crowded = post_request['crowded']

    user = crud.get_user_from_username(username)
    trail = crud.get_trail_from_id(trail_id)

    crud.create_trail_rating(trail, user, trail_comment, trail_star, difficulty_level, crowded)

    return {'Success': 'Added to database.'}


@app.route('/api/new-walk', methods=['POST'])
def create_walk():

    post_request = request.get_json()
    username = post_request['user']['username']
    walk_date = post_request['date'] 

    user = crud.get_user_from_username(username)

    new_walk = crud.create_walk(user, walk_date)

    return {'walk_id': new_walk.walk_id}


@app.route('/api/weather')
def get_weather():

    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    date = request.args.get('walk_date')
    
    return weather_data_api(latitude, longitude, date)


@app.route('/api/choose-restaurants')
def get_api_restaurants():

    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    
    return yelp_data_api(latitude, longitude)
    

@app.route('/api/choose-trails')
def get_api_trails():

    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')

    return hiking_data_api(latitude, longitude)


@app.route('/api/add-restaurants', methods=['POST'])
def add_restaurants():

    post_request = request.get_json()

    restaurants = post_request['restaurants']
    latitude = post_request['latitude']
    longitude = post_request['longitude']
    walk_id = post_request['walk']

    walk = crud.get_walk_from_id(walk_id)

    for restaurant in restaurants:
        restaurant = crud.create_restaurant(latitude, longitude, restaurant['name'], 
                        restaurant['price'], restaurant['location'], restaurant['display_phone'],
                        restaurant['image'], restaurant['yelp_id'])
        crud.create_walk_restaurant(restaurant, walk)
    
    return {'Success': 'Added to database.'} 


@app.route('/api/add-trails', methods=['POST'])
def add_trails():

    post_request = request.get_json() 

    trails = post_request['trails']
    latitude = post_request['latitude']
    longitude = post_request['longitude']
    walk_id = post_request['walk']

    walk = crud.get_walk_from_id(walk_id)
    
    for trail in trails:
        trail = crud.create_trail(latitude, longitude, trail['name'], trail['length'], trail['location'], trail['image'], trail['hiking_id'])
        crud.create_walk_trail(trail, walk)
    
    return {'Success': 'Added to database.'}
    

@app.route('/api/trails')
def get_trails():

    trails = crud.get_trails()

    serialized_trails = [t.serialize() for t in trails]

    return jsonify(serialized_trails)


@app.route('/api/restaurants')
def get_restaurants():

    restaurants = crud.get_restaurants() 

    serialized_restaurants = [r.serialize() for r in restaurants]

    return jsonify(serialized_restaurants)


@app.route('/', defaults={'input_path': ''}) 
@app.route('/<path:input_path>') 
def homepage(input_path): 
    """Render the application's homepage."""

    return render_template('index.html')




if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)