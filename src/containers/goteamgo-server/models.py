from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100))
    prenom = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password_hash = db.Column(db.String(128))

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100))
    categorie = db.Column(db.String(100))
    lieu = db.Column(db.String(100))
    date = db.Column(db.String(100))