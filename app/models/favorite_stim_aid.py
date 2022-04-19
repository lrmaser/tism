from flask import jsonify
from .db import db


class FavoriteStimAid(db.Model):
    __tablename__ = 'favorite_stim_aids'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stim_aid_id = db.Column(db.Integer, db.ForeignKey('stim_aids.id'), nullable=False)

    user = db.relationship('User', back_populates='favorite_stim_aids')
    stim_aid = db.relationship('StimAid', back_populates='favorite_stim_aids')

    def to_dict(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'stim_aid_id': self.stim_aid_id,
            'stim_aid': self.stim_aid.to_dict()
        }
