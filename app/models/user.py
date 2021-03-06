from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.Text)
    about = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False)

    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    special_interests = db.relationship('SpecialInterest', back_populates='user')
    owned_stim_aids = db.relationship('StimAid', back_populates='owner')
    favorite_stim_aids = db.relationship('FavoriteStimAid', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'profile_image': self.profile_image,
            'about': self.about,
            'created_at': self.created_at,
            'special_interests': [special_interest.to_dict() for special_interest in self.special_interests]
        }
