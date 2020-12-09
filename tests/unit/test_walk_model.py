import pytest 
import datetime
from model import db, Walk, User


def test_create_walk(client, walk, user):
    """
    GIVEN an instance of a Walk model
    WHEN a new Walk is created
    THEN check that it's a Walk instance with the fields defined correctly 
    """

    assert walk.user == user
    assert walk.walk_date == datetime.datetime(2020, 5, 17)


def test_serialize_walk(client, walk):
    """
    GIVEN an instance of the User model
    WHEN the serialize method is called
    THEN check that keys are accurate
    """

    walk_dict = walk.serialize() 

    assert set(walk_dict.keys()) == {
        'walk_id',
        'walk_date'
    }


def test_get_walk_details(client, walk, restaurant, trail):
    """
    GIVEN an instance of the Walk model
    WHEN the get_walk_details method is called
    THEN check that the output is accurate 
    """ 

    walk.trails.append(trail)
    walk.restaurants.append(restaurant)

    walk_details = walk.get_walk_details()

    assert set(walk_details.keys()) == {
        'user_id', 
        'walk_id',
        'walk_date',
        'sort_date',
        'trails',
        'restaurants'
    }

    assert walk_details['trails'] == [trail.serialize()]
    assert walk_details['restaurants'] == [restaurant.serialize()]


def test_repr_walk(client, walk):
    """
    GIVEN an instance of the Walk model
    WHEN the __repr__ method is called
    THEN check that output is accurate 
    """    

    walk_repr = walk.__repr__()
    assert '2020-05-17 00:00:00' in walk_repr