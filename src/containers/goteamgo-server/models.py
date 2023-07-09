from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100))
    prenom = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password_hash = db.Column(db.String(128))
    organization_code = db.Column(db.String(100), nullable=True)


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100))
    categorie = db.Column(db.String(100))
    lieu = db.Column(db.String(100))
    date = db.Column(db.String(100))
    heure = db.Column(db.String(100))


class Organization(db.Model):
    __tablename__ = 'organizations'

    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100))
    code = db.Column(db.String(100), unique=True)


class CarShare(db.Model):
    __tablename__ = 'car_shares'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    direction = db.Column(db.String(50))
    seats_available_aller = db.Column(db.Integer)
    seats_available_retour = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relations
    user = db.relationship('User', backref=db.backref('car_shares', lazy=True))
    event = db.relationship('Event', backref=db.backref('car_shares', lazy=True))


class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    car_share_id = db.Column(db.Integer, db.ForeignKey('car_shares.id'))
    seats_reserved_aller = db.Column(db.Integer)
    seats_reserved_retour = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relations
    user = db.relationship('User', backref=db.backref('reservations', lazy=True))
    car_share = db.relationship('CarShare', backref=db.backref('reservations', lazy=True))
