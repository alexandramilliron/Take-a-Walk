"""Server for Take a Walk app."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db
from API import hiking_data_api, hiking_data_api_id, yelp_data_api, yelp_data_api_id, weather_data_api
import crud 
import pgeocode 


app = Flask(__name__)
app.secret_key = 'dev'
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True


########## Login and Registration ##########


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


########## User's Ratings ##########


@app.route('/api/ratings/<username>')
def load_user_ratings(username):
    """Get the ratings associated with this user."""

    user = crud.get_user_from_username(username)

    user_ratings = user.get_ratings() 

    return user_ratings


########## Get Location ##########


@app.route('/api/get-location')
def get_location():
    """Get latitude, longitude, city, and state from the zipcode provided by user."""

    zipcode = request.args.get('zipcode')

    nomi = pgeocode.Nominatim('us')

    location_info = nomi.query_postal_code(zipcode)

    if not location_info.empty:
        return {'latitude': location_info.latitude, 'longitude': location_info.longitude, 'city': location_info.place_name,
            'state': location_info.state_name}
    else:
        return {'Error': 'Unable to get user location.'}


########## Get Weather ##########


@app.route('/api/weather')
def get_weather():
    """Get the weather based on the provided latitude, longitude, and date."""

    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    date = request.args.get('walk_date')
    
    return weather_data_api(latitude, longitude, date)


########## Walk Routes ##########


@app.route('/api/new-walk', methods=['POST'])
def create_walk():
    """Create a new walk for this user."""

    post_request = request.get_json()
    username = post_request['user']['username']
    walk_date = post_request['date'] 

    user = crud.get_user_from_username(username)

    new_walk = crud.create_walk(user, walk_date)

    if new_walk:
        return {'walk_id': new_walk.walk_id}
    else:
        return {'Error': 'Unable to add walk.'}


@app.route('/api/saved-walks/<username>')
def load_user_walks(username):
    """Load the walks stored in the database associated with this user."""

    walks = crud.get_user_walks(username) 

    details_for_walks = [walk.get_walk_details() for walk in walks]

    walks_by_date = sorted(details_for_walks, key=lambda walk: walk['sort_date'])
    
    return jsonify(walks_by_date) 


@app.route('/api/walk-details/<walk_id>')
def load_walk_details(walk_id):
    """Get the walk details for this walk."""

    walk = crud.get_walk_details(walk_id)

    return jsonify(walk)


########## Restaurant Routes ##########


@app.route('/api/choose-restaurants')
def get_api_restaurants():
    """Call the Yelp API to return restaurants based on the provided latitude/longitude."""

    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    
    return yelp_data_api(latitude, longitude)


@app.route('/api/add-restaurants', methods=['POST'])
def add_restaurants():
    """Add the user's chosen restaurants for this walk to the database."""

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


@app.route('/api/add-rest-rating', methods=['POST'])
def add_rest_rating():
    """Add a restaurant rating from this user to the database."""

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

    if crud.create_rest_rating(restaurant, user, rest_comment, rest_star, 
                            masks_worn, socially_distanced, outdoor_seating):
        return {'Success': 'Added to database.'}
    else:
        return {'Error': 'Unable to add rating.'}


@app.route('/api/restaurants')
def get_restaurants():
    """Get all of the restaurants in the database and sort them by state."""

    restaurants = crud.get_restaurants() 

    serialized_restaurants = [r.serialize() for r in restaurants]

    restaurants_by_location = sorted(serialized_restaurants, key=lambda rest: rest['state'])

    return jsonify(restaurants_by_location)


@app.route('/api/restaurant-details')
def get_api_restaurant_details():
    """Call the Yelp API to get additional information about a restaurant."""

    rest_id = request.args.get('rest_id')
    
    rest = crud.get_rest_from_id(rest_id)
    
    return yelp_data_api_id(rest.yelp_id)


########## Trail Routes ##########


@app.route('/api/choose-trails')
def get_api_trails():
    """Call the All Trails API to return trails based on the provided latitude/longitude."""

    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')

    return hiking_data_api(latitude, longitude)


@app.route('/api/add-trails', methods=['POST'])
def add_trails():
    """Add the user's chosen trails for this walk to the database."""

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


@app.route('/api/add-trail-rating', methods=['POST'])
def add_trail_rating():
    """Add a trail rating from this user to the database."""

    post_request = request.get_json()

    username = post_request['username']
    trail_id = post_request['trail_id']
    trail_comment = post_request['trail_comment']
    trail_star = post_request['trail_star']
    difficulty_level = post_request['difficulty']
    crowded = post_request['crowded']

    user = crud.get_user_from_username(username)
    trail = crud.get_trail_from_id(trail_id)

    if crud.create_trail_rating(trail, user, trail_comment, trail_star, difficulty_level, crowded):
        return {'Success': 'Added to database.'}
    else:
        return {'Error': 'Unable to add rating.'}


@app.route('/api/trails')
def get_trails():
    """Get all of the trails in the database and sort them by state."""

    trails = crud.get_trails()

    serialized_trails = [t.serialize() for t in trails]

    trails_by_location = sorted(serialized_trails, key=lambda trail: trail['state'])

    return jsonify(trails_by_location)


@app.route('/api/trail-details')
def get_api_trail_details():
    """Call the All Trails API to get additional information about a trail."""

    trail_id = request.args.get('trail_id')
    
    trail = crud.get_trail_from_id(trail_id)

    string_trail = str(trail.hiking_id)
    
    return hiking_data_api_id(string_trail)


########## Catch-All Route ##########


@app.route('/', defaults={'input_path': ''}) 
@app.route('/<path:input_path>') 
def homepage(input_path): 
    """Render the application's homepage."""

    return render_template('index.html')




if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)