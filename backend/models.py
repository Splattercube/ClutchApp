from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    clips =db.relationship("Clip", backref="user", lazy=True)


class Clip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(255), nullable=True)
    video_path = db.Column(db.String(255), nullable=False)
    agent = db.Column(db.String(50), nullable=True)
    rank = db.Column(db.String(50), nullable=True)
    likes = db.Column(db.Integer, default=0)
    created_at =  db.Column(db.DateTime , default=datetime.now)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)