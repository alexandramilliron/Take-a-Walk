"""CRUD operations to populate the database."""

from model import db, User, Trail, Restaurant, TrailRating, RestRating, Itinerary, ItineraryTrail, ItineraryRest, connect_to_db


def create_user(username, email, password):
    """Create and return a new user."""

    user = User(username=username, email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user


def create_trail(latitude, longitude, name, length=None, location=None):
    """Create and return a new trail."""

    trail = Trail(latitude=latitude, longitude=longitude, name=name, 
            length=length, location=location)

    db.session.add(trail)
    db.session.commit()

    return trail


def create_restaurant(latitude, longitude, name, price=None, location=None):
    """Create and return a new restaurant."""

    restaurant = Restaurant(latitude=latitude, longitude=longitude, name=name,
                price=price, location=location)

    db.session.add(restaurant)
    db.session.commit()

    return restaurant


def create_trail_rating(trail, user, trail_comment=None, trail_star=None, 
                        difficulty_level=None, crowded=False):
    """Create and return a new trail rating."""
    
    trail_rating = TrailRating(trail=trail, user=user, trail_comment=trail_comment,
                            trail_star=trail_star, difficulty_level=difficulty_level,
                            crowded=crowded)
    
    db.session.add(trail_rating)
    db.session.commit()

    return trail_rating


def create_rest_rating(restaurant, user, rest_comment=None, rest_star=None,
                        masks_worn=False, socially_distanced=False, outdoor_seating=False):
    """Create and return a new restaurant rating."""

    rest_rating = RestRating(restaurant=restaurant, user=user, rest_comment=rest_comment,
                        rest_star=rest_star, masks_worn=masks_worn, socially_distanced=socially_distanced,
                        outdoor_seating=outdoor_seating)

    db.session.add(rest_rating)
    db.session.commit() 

    return rest_rating


def create_itinerary(user, itin_date=None):
    """Create a new itinerary.""" 

    itinerary = Itinerary(user=user, itin_date=itin_date)

    db.session.add(itinerary)
    db.session.commit()

    return itinerary































if __name__ == '__main__':
    from server import app
    connect_to_db(app)

