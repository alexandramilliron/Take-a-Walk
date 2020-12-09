import pytest
from model import Walk, User


@pytest.fixture
def simple_walk(init_database):
    return Walk.query.get(1)


@pytest.fixture
def simple_user(init_database):
    return User.query.get(1)


def test_add_walk(client, simple_user):
    response = client.post('/api/new-walk', json={        
        'date': '2020-05-17 00:00:00', 
        'username': simple_user.username,
        'user': simple_user.serialize()
    })
    assert response.json == {'walk_id': 2}