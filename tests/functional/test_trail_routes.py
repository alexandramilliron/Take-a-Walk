import pytest 
from model import Trail, TrailRating, User


@pytest.fixture
def simple_trail(init_database):
    return Trail.query.get(1)


@pytest.fixture
def simple_trail_rating(init_database):
    return TrailRating.query.get(1)


@pytest.fixture
def simple_user(init_database):
    return User.query.get(1)


def test_get_trail(client, simple_trail):
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


def test_add_trail_rating(client, simple_trail, simple_trail_rating, simple_user):
    response = client.post('/api/add-trail-rating', json={
        'username': simple_user.username,
        'trail_id': simple_trail.trail_id,
        'trail_comment': simple_trail_rating.trail_comment,
        'trail_star': simple_trail_rating.trail_star,
        'difficulty': simple_trail_rating.difficulty_level,
        'crowded': simple_trail_rating.crowded,
        'user': simple_user.serialize(),
        'trail': simple_trail.serialize()
    })
    assert response.json == {'Success': 'Added to database.'}



