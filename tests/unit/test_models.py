from model import User


def test_new_user():
    """
    GIVEN a User model
    WHEN a new User is created
    THEN check that the username, email, and password fields are defined correctly
    """
    user = User(username='newusername', email='newuseremail@gmail.com', password='newuserpassword')
    assert user.username == 'newusername'
    assert user.email == 'newuseremail@gmail.com'
    assert user.password == 'newuserpassword'
