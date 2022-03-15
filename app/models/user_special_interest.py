from .db import db


user_special_interests = db.Table(
    'user_special_interests',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('special_interest_id', db.Integer, db.ForeignKey('special_interests.id'), primary_key=True)
)
