import pytest 
from model import db, User


def test_create_user(client, user):
    """
    GIVEN an instance of a User model
    WHEN a new User is created
    THEN check that it's a User instance with the username, email, and password fields are defined correctly 
    """

    assert user.username == 'newusername'
    assert user.email == 'newuseremail@gmail.com'
    assert user.password == 'newuserpassword'
    assert type(user) == User


def test_serialize_user(client, user):
    """
    GIVEN an instance of the User model
    WHEN the serialize method is called
    THEN check that keys are accurate
    """

    user_dict = user.serialize() 
    assert set(user_dict.keys()) == {
        'user_id',
        'username',
        'email'
    }


def test_get_user_ratings(client, user):
    """
    GIVEN an instance of the User model
    WHEN the get_ratings method is called
    THEN check that the output is accurate 
    """ 

    user_ratings = user.get_ratings()
    assert set(user_ratings.keys()) == {
        'trail_ratings',
        'restaurant_ratings'
    }

#TODO: check the values of these arrays 


def test_repr_user(client, user):
    """
    GIVEN an instance of the User model
    WHEN the __repr__ method is called
    THEN check that output is accurate 
    """    

    user_repr = user.__repr__()
    assert 'email=newuseremail@gmail.com' in user_repr
    assert 'username=newusername' in user_repr

 