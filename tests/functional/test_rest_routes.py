import pytest 
from model import Restaurant, RestRating, User
from API import yelp_data_api


@pytest.fixture
def simple_restaurant(init_database):
    return Restaurant.query.get(1)


@pytest.fixture
def simple_rest_rating(init_database):
    return RestRating.query.get(1)


@pytest.fixture
def simple_user(init_database):
    return User.query.get(1)


def test_get_restaurant(client, simple_restaurant):
    response = client.get('/api/restaurants')
    restaurants = response.json 
    assert response.status_code == 200
    assert restaurants[0] == simple_restaurant.serialize() 


def test_add_restaurant(client, simple_restaurant):
    response = client.post('/api/add-restaurants', json={        
        'latitude': 45,
        'longitude': -122, 
        'walk': 1,
        'restaurants': [
            {
                'name': 'New Restaurant',
                'price': 4,
                'location': 'Test, Vancouver, WA',
                'display_phone': '1234567890',
                'image': 'rest.jpg',
                'yelp_id': '1234'
            }
        ]
    })
    assert response.json == {'Success': 'Added to database.'}



def test_add_rest_rating(client, simple_restaurant, simple_rest_rating, simple_user):
    response = client.post('/api/add-rest-rating', json={
        'username': simple_user.username,
        'rest_id': simple_restaurant.rest_id,
        'rest_comment': simple_rest_rating.rest_comment,
        'rest_star': simple_rest_rating.rest_star,
        'masks_worn': simple_rest_rating.masks_worn,
        'socially_distanced': simple_rest_rating.socially_distanced,
        'outdoor_seating': simple_rest_rating.outdoor_seating,
        'user': simple_user.serialize(),
        'restaurant': simple_restaurant.serialize()
    })
    assert response.json == {'Success': 'Added to database.'}





