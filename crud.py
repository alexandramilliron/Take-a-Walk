"""CRUD operations to populate the database."""

from model import db, User, Trail, Restaurant, TrailRating, RestRating, Itinerary, ItineraryTrail, ItineraryRest, connect_to_db


def create_user(username, email, password):
    """Create and return a new user."""

    user = User(username=username, email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user


def create_trail(latitude, longitude, password):
    """Create and return a new user."""

    user = Trail(username=username, email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user


























if __name__ == '__main__':
    from server import app
    connect_to_db(app)

