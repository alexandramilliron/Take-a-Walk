from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    trail_ratings = db.relationship('TrailRating')
    restaurant_ratings = db.relationship('RestRating')
    itinerary = db.relationship('Itinerary')

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

    def __repr__(self):
        return f'<Restaurant Rating rest_rating_id={self.rest_rating_id} rest_id={self.rest_id} user_id={self.user_id}>'


class Itinerary(db.Model):
    """A user's itinerary."""

    __tablename__ = 'itineraries'

    itin_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    itin_date = db.Column(db.DateTime)

    user = db.relationship('User')
    
    def __repr__(self):
        return f'<Itinerary itin_id={self.itin_id} user_id={self.user_id} itin_date={self.itin_date}>'


class ItineraryTrail(db.Model):
    """A user's trails."""

    __tablename__ = 'itineraty_trails'

    itin_trail_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    itin_id = db.Column(db.Integer, db.ForeignKey('intineraries.itin_id'))
    trail_id = db.Column(db.Integer, db.ForeignKey('trails.trail_id'))

    trail = db.relationship('Trail')
    itinerary = db.relationship('Itinerary')

    def __repr__(self):
        return f'<ItineraryTrail itin_trail_id={self.itin_trail_id} itin_id={self.itin_id} trail_id={self.trail_id}>'


class ItineraryRest(db.Model):
    """A user's restaurants."""

    __tablename__ = 'itineraty_restaurants'

    itin_rest_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    itin_id = db.Column(db.Integer, db.ForeignKey('intineraries.itin_id'))
    rest_id = db.Column(db.Integer, db.ForeignKey('restaurants.rest_id'))

    restaurant = db.relationship('Restaurant')
    itinerary = db.relationship('Itinerary')

    def __repr__(self):
        return f'<ItineraryRestaurant itin_rest_id={self.itin_rest_id} itin_id={self.itin_id} rest_id={self.rest_id}>'


def connect_to_db(flask_app, db_uri='postgresql:///', echo=False):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


