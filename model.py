"""Models for Take a Walk app."""

from flask_sqlalchemy import SQLAlchemy

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

    ratings = db.relationship('TrailRating')
    walks = db.relationship('Walk', secondary='walk_trails')


    def serialize(self):
        """Return dict with this trail's id, name, lat, and long."""
        return {
            'trail_id': self.trail_id,
            'name': self.name,
            'latitude': self.latitude,
            'longitude': self.longitude
        }


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

    ratings = db.relationship('RestRating')
    walks = db.relationship('Walk', secondary='walk_restaurants')


    def serialize(self):
        """Return dict of this restaurant's id, name, lat, and long."""
        return {
            'rest_id': self.rest_id,
            'name': self.name,
            'latitude': self.latitude,
            'longitude': self.longitude
        }


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

    trail = db.relationship('Trail')
    user = db.relationship('User')


    def serialize(self):
        """Return dict of this rating's id, the id of the associated user, and the id of the reviewed trail."""
        return {
            'trail_rating_id': self.trail_rating_id,
            'user_id': self.user_id,
            'trail_id': self.trail_id
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

    restaurant = db.relationship('Restaurant')
    user = db.relationship('User')


    def serialize(self):
        """Return dict of this rating's id, the id of the associated user, and the id of the reviewed restaurant."""
        return {
            'rest_rating_id': self.rest_rating_id,
            'user_id': self.user_id,
            'rest_id': self.rest_id
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
            'walk_date': self.walk_date,
        }


    def get_walk_details(self):
        """Return dict of trails and restaurants associated with this walk."""
        return {
            'walk_id': self.walk_id,
            'walk_date': self.walk_date,
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




# TODO: re-examine the serialize methods to see if the information they return is useful 11/23/2020
# TODO: potentially simplify the methods in the Walk class since there's overlap 




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


