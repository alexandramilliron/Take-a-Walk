import pytest 
from model import Trail


@pytest.fixture
def simple_trail(init_database):
    return Trail.query.get(1)


def test_get_restaurant(client, simple_trail):
    response = client.get('/api/trails')
    trails = response.json 
    assert response.status_code == 200
    assert trails[0] == simple_trail.serialize() 


def test_add_trail(client, simple_trail):
    response = client.post('/api/add-trails', json={        
        'latitude': 45,
        'longitude': -122, 
        'walk': 1,
        'trails': [
            {
                'name': 'New Trail',
                'length': 30,
                'location': 'Test, Vancouver, WA',
                'image': 'trail.jpg',
                'hiking_id': '1234'
            }
        ]
    })
    assert response.json == {'Success': 'Added to database.'}
