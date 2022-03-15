from .db import db


user_stim_aids = db.Table(
    'user_stim_aids',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('stim_aid_id', db.Integer, db.ForeignKey('stim_aids.id'), primary_key=True)
)
