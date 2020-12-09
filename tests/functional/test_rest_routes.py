import pytest 
from model import Restaurant 


@pytest.fixture
def simple_restaurant(init_database):
    return Restaurant.query.get(1)


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
