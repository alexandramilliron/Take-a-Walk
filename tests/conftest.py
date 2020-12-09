from server import app
from model import connect_to_db, db, Restaurant, RestRating, Trail, TrailRating, User, Walk
import pytest
import datetime


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
    
    db.create_all()
    load_test_data()

    yield

    db.session.close()
    db.drop_all()
    

###############################
######### Sample Data #########
###############################

def load_test_data():
    t_user = User(
        username='newusername', 
        email='newuseremail@gmail.com', 
        password='newuserpassword'
    )
    db.session.add(t_user)

    t_trail = Trail(
        latitude=45,
        longitude=-122, 
        name='New Trail',
        length=30,
        location='Vancouver, WA',
        image='trail.jpg',
        hiking_id='1234' 
    )
    db.session.add(t_trail)

    t_restaurant = Restaurant(
        latitude=45,
        longitude=-122, 
        name='New Restaurant',
        price=4,
        location='Test, Vancouver, WA',
        phone='1234567890',
        image='rest.jpg',
        yelp_id='1234'
    )
    db.session.add(t_restaurant)

    t_walk = Walk(
        user=t_user,
        walk_date=datetime.datetime(2020, 5, 17)
    )
    db.session.add(t_walk)

    t_rest_rating = RestRating(
        restaurant=t_restaurant,
        user=t_user,
        rest_comment='Wow, what a restaurant.',
        rest_star=5,
        masks_worn=True,
        socially_distanced=True,
        outdoor_seating=True
    )
    db.session.add(t_rest_rating)

    t_trail_rating = TrailRating(
        trail=t_trail,
        user=t_user,
        trail_comment='Wow, what a trail.',
        trail_star=5,
        difficulty_level=3,
        crowded=False
    )
    db.session.add(t_trail_rating)

    db.session.commit() 


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
        location='Test, Vancouver, WA',
        phone='1234567890',
        image='rest.jpg',
        yelp_id='1234'
    )

    return restaurant


@pytest.fixture
def trail():
    trail = Trail(
        latitude=45,
        longitude=-122, 
        name='New Trail',
        length=30,
        location='Vancouver, WA',
        image='trail.jpg',
        hiking_id='1234'
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


@pytest.fixture
def walk(user):
    walk = Walk(
        user=user,
        walk_date=datetime.datetime(2020, 5, 17)
    )

    return walk


@pytest.fixture
def trail_rating_list(trail, user):
    trail_rating1 = TrailRating(
        trail=trail,
        user=user,
        trail_comment='Wow, what a trail.',
        trail_star=1,
        difficulty_level=1,
        crowded=False
    )

    trail_rating2 = TrailRating(
        trail=trail,
        user=user,
        trail_comment='Wow, what a trail.',
        trail_star=5,
        difficulty_level=5,
        crowded=True
    )

    return [trail_rating1, trail_rating2]


@pytest.fixture
def rest_rating_list(restaurant, user):
    rest_rating1 = RestRating(
        restaurant=restaurant,
        user=user,
        rest_comment='Wow, what a restaurant.',
        rest_star=1,
        masks_worn=True,
        socially_distanced=True,
        outdoor_seating=True
    )

    rest_rating2 = RestRating(
        restaurant=restaurant,
        user=user,
        rest_comment='Wow, what a restaurant.',
        rest_star=5,
        masks_worn=False,
        socially_distanced=False,
        outdoor_seating=False
    )

    return [rest_rating1, rest_rating2]





