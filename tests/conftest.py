from server import app
from model import connect_to_db, db, Restaurant, RestRating, Trail, TrailRating, User
import pytest


@pytest.fixture(scope='module')
def client():
    flask_app = app
    flask_app.config['TESTING'] = True
    connect_to_db(flask_app, 'postgresql:///testdb')

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as client:
        # Establish an application context
        with flask_app.app_context():
            yield client  # This is where the testing happens!


@pytest.fixture(scope='module')
def init_database(client):
    # Create the database and the database table
    db.create_all()

    # Commit the changes 
    db.session.commit()

    yield  # This is where the testing happens!

    db.drop_all()
    

###############################
## Fixtures with Sample Data ##
###############################


@pytest.fixture
def user():
    user = User(
        username='newusername', 
        email='newuseremail@gmail.com', 
        password='newuserpassword') 

    return user


@pytest.fixture
def restaurant():
    restaurant = Restaurant(
        latitude=45,
        longitude=-122, 
        name='New Restaurant',
        price=4,
        location='Vancouver, WA'
    )

    return restaurant


@pytest.fixture
def trail():
    trail = Trail(
        latitude=45,
        longitude=-122, 
        name='New Trail',
        length=30,
        location='Vancouver, WA'
    )

    return trail 


@pytest.fixture
def rest_rating(restaurant, user):
    rest_rating = RestRating(
        restaurant=restaurant,
        user=user,
        rest_comment='Wow, what a restaurant.',
        rest_star=5,
        masks_worn=True,
        socially_distanced=True,
        outdoor_seating=True
    )

    return rest_rating


@pytest.fixture
def trail_rating(trail, user):
    trail_rating = TrailRating(
        trail=trail,
        user=user,
        trail_comment='Wow, what a trail.',
        trail_star=5,
        difficulty_level=3,
        crowded=False
    )

    return trail_rating
