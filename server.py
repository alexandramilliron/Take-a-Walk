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

    return render_template('base.html')


@app.route('/saved-walks/<username>')
def load_user_walks(username):

    walks = crud.get_user_walks(username)

    return render_template('saved-walks.html', walks=walks)


@app.route('/ratings/<username>')
def load_user_ratings(username):

    user_ratings = {}

    user_ratings['rest_ratings'] = crud.get_user_rest_ratings(username)
    user_ratings['trail_ratings'] = crud.get_user_trail_ratings(username)

    return render_template('ratings.html', user_ratings=user_ratings)


@app.route('/new-walk/<username>')
def create_walk(username):

    user = crud.get_user_from_username(username)

    new_walk = crud.create_walk(user)

    return jsonify(new_walk)
    # this will prompt an edit walk component 

    #after a user makes a choice: 
    #create_walk_restaurant 
    #create_walk_trail
    # 
    # there needs to be a route that corresponds to the data in the database  











if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)