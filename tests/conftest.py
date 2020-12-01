from server import app
from model import connect_to_db, db, User
import pytest


@pytest.fixture(scope='module')
def client():
    flask_app = app
    flask_app.config['TESTING'] = True
    connect_to_db(flask_app, 'postgresql:///testdb')

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as client:
        # Establish an application context
        with flask_app.app_context():
            yield client  # This is where the testing happens!


@pytest.fixture(scope='module')
def init_database(client):
    # Create the database and the database table
    db.create_all()

    # # Insert user data
    user1 = User(username='user1', email='user1@gmail.com', password='user1password')
    user2 = User(username='user2', email='user2@gmail.com', password='user2password')
    db.session.add(user1)
    db.session.add(user2)

    # Commit the changes for the users
    db.session.commit()

    yield  # This is where the testing happens!

    db.drop_all()



