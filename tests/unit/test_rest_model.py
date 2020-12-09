import pytest 
from model import db, Restaurant


def test_create_restaurant(client, restaurant):
    """
    GIVEN an instance of a Restaurant model
    WHEN a new Restaurant is created
    THEN check that it's a Restaurant instance with the fields defined correctly 
    """
    
    assert restaurant.latitude == 45
    assert restaurant.longitude == -122
    assert restaurant.name == 'New Restaurant'
    assert restaurant.price == 4
    assert restaurant.location == 'Test, Vancouver, WA'
    assert restaurant.phone == '1234567890'
    assert restaurant.image == 'rest.jpg'
    assert restaurant.yelp_id == '1234'
    assert type(restaurant) == Restaurant 


def test_serialize_restaurant(client, restaurant):
    """
    GIVEN an instance of the Restaurant model
    WHEN the serialize method is called
    THEN check that keys are accurate
    """

    rest_dict = restaurant.serialize() 
    assert set(rest_dict.keys()) == {
        'rest_id',
        'name',
        'latitude',
        'longitude',
        'location',
        'state',
        'phone',
        'image',
        'yelp_id',
        'avg_star',
        'avg_mask',
        'avg_soc',
        'avg_out'
    }


def test_rest_get_ratings(client, restaurant, rest_rating):
    """
    GIVEN an instance of the Restaurant model
    WHEN the get_ratings method is called
    THEN check that the output is accurate 
    """ 

    rest_ratings = restaurant.get_ratings()

    assert set(rest_ratings.keys()) == {
        'ratings'
    }

    restaurant.ratings.append(rest_rating)

    assert 'Wow, what a restaurant.' in restaurant.ratings[0].rest_comment


def test_repr_rest(client, restaurant):
    """
    GIVEN an instance of the Restaurant model
    WHEN the __repr__ method is called
    THEN check that output is accurate 
    """ 

    rest_repr = restaurant.__repr__()
    assert 'New Restaurant' in rest_repr


def test_rest_averages(client, restaurant, rest_rating_list):
    """GIVEN restaurant ratings 
    WHEN the averaging functions are called
    THEN check that the averages were computed correctly
    """

    restaurant.ratings.extend(rest_rating_list)
    assert restaurant.get_avg_star_rating() == 3.0
    assert restaurant.get_avg_masks_worn() == 50
    assert restaurant.get_avg_social_distance() == 50
    assert restaurant.get_avg_out_seating() == 50

    