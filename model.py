"""Models for Take a Walk app."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime 
from sqlalchemy.sql import func

db = SQLAlchemy()


class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    trail_ratings = db.relationship('TrailRating')
    restaurant_ratings = db.relationship('RestRating')
    walks = db.relationship('Walk')

    # TODO: add method for validating passwords? 


    def serialize(self):
        """Return dict with this user's id, username, and email."""
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email
        }


    def get_ratings(self):
        """Return dict with this user's restaurant and trail ratings."""
        return {
            'trail_ratings': [t.serialize() for t in self.trail_ratings],
            'restaurant_ratings': [r.serialize() for r in self.restaurant_ratings],
        }

    
    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email} username={self.username}>'


class Trail(db.Model):
    """A trail."""

    __tablename__ = 'trails'

    trail_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    name = db.Column(db.String, nullable=False)
    length = db.Column(db.Float)
    location = db.Column(db.String) 
    image = db.Column(db.String)

    ratings = db.relationship('TrailRating')
    walks = db.relationship('Walk', secondary='walk_trails')


    def serialize(self):
        """Return dict with this trail's id, name, lat, and long."""
        return {
            'trail_id': self.trail_id,
            'name': self.name,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'length': self.length,
            'location': self.location,
            'image': self.image,
            'avg_star': self.get_avg_star_rating(),
            'avg_diff': self.get_avg_difficulty(),
            'avg_crowd': self.get_avg_crowding()
        }


    def get_ratings(self):
        """Return dict of user ratings for this trail."""
        return {
            'ratings': [r.serialize() for r in self.ratings]
        }

    
    def get_avg_star_rating(self):
        """Return the average star rating for this trail."""

        if len(self.ratings) == 0:
            return None

        return sum([t.trail_star for t in self.ratings]) / len(self.ratings)


    def get_avg_difficulty(self):
        """Return the average difficulty level for this trail."""

        if len(self.ratings) == 0:
            return None

        return sum([t.difficulty_level for t in self.ratings]) / len(self.ratings)

    
    def get_avg_crowding(self):
        """Return the average amount of crowding for this trail."""

        if len(self.ratings) == 0:
            return None

        crowded_total = 0 

        for rating in self.ratings:
            if rating.crowded:
                crowded_total += 1 
        
        percent = (crowded_total / len(self.ratings)) * 100

        percent = int(percent)

        return percent 


    def __repr__(self):
        return f'<Trail trail_id={self.trail_id} name={self.name}>'


class Restaurant(db.Model):
    """A restaurant."""

    __tablename__ = 'restaurants'

    rest_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.String)
    location = db.Column(db.String)
    phone = db.Column(db.String)
    image = db.Column(db.String)

    ratings = db.relationship('RestRating')
    walks = db.relationship('Walk', secondary='walk_restaurants')


    def serialize(self):
        """Return dict of this restaurant's id, name, lat, and long."""
        return {
            'rest_id': self.rest_id,
            'name': self.name,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'location': self.location,
            'phone': self.phone,
            'image': self.image,
            'avg_star': self.get_avg_star_rating(),
            'avg_mask': self.get_avg_masks_worn(),
            'avg_soc': self.get_avg_social_distance(),
            'avg_out': self.get_avg_out_seating()
        }

    
    def get_ratings(self):
        """Return dict of user ratings for this restaurant."""
        return {
            'ratings': [r.serialize() for r in self.ratings]
        }
    

    def get_avg_star_rating(self):
        """Return the average star rating for this restaurant."""

        if len(self.ratings) == 0:
            return None

        return sum([r.rest_star for r in self.ratings]) / len(self.ratings)


    def get_avg_masks_worn(self):
        """Return the average amount of masks worn for this restaurant."""

        masks_worn_total = 0 

        if len(self.ratings) == 0:
            return None

        for rating in self.ratings:
            if rating.masks_worn:
                masks_worn_total += 1 

        percent = (masks_worn_total / len(self.ratings)) * 100 

        percent = int(percent)

        return percent 

    
    def get_avg_social_distance(self):
        """Return the average amount of social distancing for this restaurant."""

        if len(self.ratings) == 0:
            return None

        soc_dist_total = 0 

        for rating in self.ratings:
            if rating.socially_distanced:
                soc_dist_total += 1 

        percent = (soc_dist_total / len(self.ratings)) * 100 

        percent = int(percent)

        return percent

    
    def get_avg_out_seating(self):
        """Return the average amount of outdoor seating for this restaurant."""
        
        if len(self.ratings) == 0:
            return None

        out_seat_total = 0

        for rating in self.ratings:
            if rating.outdoor_seating: 
                out_seat_total += 1
        
        percent = (out_seat_total / len(self.ratings)) * 100 

        percent = int(percent)

        return percent
        

    def __repr__(self):
        return f'<Restaurant rest_id={self.rest_id} name={self.name}>'


class TrailRating(db.Model):
    """A trail rating."""

    __tablename__ = 'trail_ratings'

    trail_rating_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    trail_id = db.Column(db.Integer, db.ForeignKey('trails.trail_id'))
    trail_comment = db.Column(db.Text)
    trail_star = db.Column(db.Integer)
    difficulty_level = db.Column(db.Integer)
    crowded = db.Column(db.Boolean)
    rated_at = db.Column(db.DateTime, default=func.now())

    trail = db.relationship('Trail')
    user = db.relationship('User')


    def serialize(self):
        """Return dict of this rating's id, user, trail, and rating details."""
        return {
            'trail_rating_id': self.trail_rating_id,
            'user_id': self.user_id,
            'trail_id': self.trail_id,
            'trail_comment': self.trail_comment,
            'trail_star': self.trail_star,
            'difficulty_level': self.difficulty_level,
            'crowded': self.crowded,
            'trail_name': self.trail.name,
            'rated_at': self.rated_at.strftime('%a, %b %d, %Y')
        }


    def __repr__(self):
        return f'<Trail Rating trail_rating_id={self.trail_rating_id} trail_id={self.trail_id} user_id={self.user_id}>'


class RestRating(db.Model):
    """A restaurant rating."""

    __tablename__ = 'restaurant_ratings'

    rest_rating_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    rest_id = db.Column(db.Integer, db.ForeignKey('restaurants.rest_id'))
    rest_comment = db.Column(db.Text)
    rest_star = db.Column(db.Integer)
    masks_worn = db.Column(db.Boolean)
    socially_distanced = db.Column(db.Boolean)
    outdoor_seating = db.Column(db.Boolean)
    rated_at = db.Column(db.DateTime, default=func.now())

    restaurant = db.relationship('Restaurant')
    user = db.relationship('User')


    def serialize(self):
        """Return dict of this rating's id, user, restaurant, and rating details."""
        return {
            'rest_rating_id': self.rest_rating_id,
            'user_id': self.user_id,
            'rest_id': self.rest_id,
            'rest_comment': self.rest_comment,
            'rest_star': self.rest_star,
            'masks_worn': self.masks_worn,
            'socially_distanced': self.socially_distanced,
            'outdoor_seating': self.outdoor_seating,
            'rest_name': self.restaurant.name,
            'rated_at': self.rated_at.strftime('%a, %b %d, %Y'),
            'image': self.restaurant.image
            
        }


    def __repr__(self):
        return f'<Restaurant Rating rest_rating_id={self.rest_rating_id} rest_id={self.rest_id} user_id={self.user_id}>'


class Walk(db.Model):
    """A user's walk."""

    __tablename__ = 'walks'

    walk_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    walk_date = db.Column(db.DateTime)

    user = db.relationship('User')

    trails = db.relationship('Trail', secondary='walk_trails')
    restaurants = db.relationship('Restaurant', secondary='walk_restaurants')


    def serialize(self):
        """Return dict with the id and date for this walk.""" 
        return {
            'walk_id': self.walk_id,
            'walk_date': self.walk_date.strftime('%a, %b %d, %Y')
        }


    def get_walk_details(self):
        """Return dict of trails and restaurants associated with this walk."""
        return {
            'user_id': self.user_id, 
            'walk_id': self.walk_id,
            'walk_date': self.walk_date.strftime('%a, %b %d, %Y'),
            'trails': [t.serialize() for t in self.trails],
            'restaurants': [r.serialize() for r in self.restaurants]
        }


    def __repr__(self):
        return f'<Walk walk_id={self.walk_id} user_id={self.user_id} walk_date={self.walk_date}>'


class WalkTrail(db.Model):
    """A user's trails."""

    __tablename__ = 'walk_trails'

    walk_trail_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    walk_id = db.Column(db.Integer, db.ForeignKey('walks.walk_id'))
    trail_id = db.Column(db.Integer, db.ForeignKey('trails.trail_id'))

    trail = db.relationship('Trail')
    walk = db.relationship('Walk')


    def __repr__(self):
        return f'<WalkTrail walk_trail_id={self.walk_trail_id} walk_id={self.walk_id} trail_id={self.trail_id}>'


class WalkRest(db.Model):
    """A user's restaurants."""

    __tablename__ = 'walk_restaurants'

    walk_rest_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    walk_id = db.Column(db.Integer, db.ForeignKey('walks.walk_id'))
    rest_id = db.Column(db.Integer, db.ForeignKey('restaurants.rest_id'))

    restaurant = db.relationship('Restaurant')
    walk = db.relationship('Walk')


    def __repr__(self):
        return f'<WalkRestaurant walk_rest_id={self.walk_rest_id} walk_id={self.walk_id} rest_id={self.rest_id}>'









def connect_to_db(flask_app, db_uri='postgresql:///takeawalk', echo=False):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')



if __name__ == '__main__':
    from server import app

    connect_to_db(app)


