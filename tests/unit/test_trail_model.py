import pytest 
from model import db, Trail


def test_create_trail(client, trail):
    """
    GIVEN an instance of a Trail model
    WHEN a new Trail is created
    THEN check that it's a Trail instance with the fields defined correctly 
    """

    assert trail.latitude == 45
    assert trail.longitude == -122
    assert trail.name == 'New Trail'
    assert trail.length == 30
    assert trail.location == 'Vancouver, WA'
    assert type(trail) == Trail


def test_serialize_trail(client, trail):
    """
    GIVEN an instance of the Trail model
    WHEN the serialize method is called
    THEN check that keys are accurate
    """

    trail_dict = trail.serialize() 
    assert set(trail_dict.keys()) == {
        'trail_id',
        'latitude',
        'longitude',
        'name',
        'length',
        'location',
        'state',
        'image',
        'hiking_id',
        'avg_star',
        'avg_diff',
        'avg_crowd'
    }


def test_trail_get_ratings(client, trail, trail_rating):
    """
    GIVEN an instance of the Trail model
    WHEN the get_ratings method is called
    THEN check that the output is accurate 
    """ 

    trail_ratings = trail.get_ratings()

    assert set(trail_ratings.keys()) == {
        'ratings'
    }

    trail.ratings.append(trail_rating)

    assert 'Wow, what a trail.' in trail.ratings[0].trail_comment


def test_repr_trail(client, trail):
    """
    GIVEN an instance of the Trail model
    WHEN the __repr__ method is called
    THEN check that output is accurate 
    """ 

    trail_repr = trail.__repr__()
    assert 'New Trail' in trail_repr


def test_trail_averages(client, trail, trail_rating_list):
    """GIVEN trail ratings 
    WHEN the averaging functions are called
    THEN check that the averages were computed correctly
    """

    trail.ratings.extend(trail_rating_list)
    assert trail.get_avg_star_rating() == 3.0
    assert trail.get_avg_difficulty() == 3.0
    assert trail.get_avg_crowding() == 50

    