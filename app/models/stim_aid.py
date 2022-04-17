from .db import db
from .user_stim_aid import favorite_stim_aids


class StimAid(db.Model):
    __tablename__ = 'stim_aids'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.Text, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    noise_rating = db.Column(db.Integer)
    chew_rating = db.Column(db.Integer)
    texture_rating = db.Column(db.Integer)
    consistency_rating = db.Column(db.Integer)

    owner = db.relationship('User', back_populates='owned_stim_aids')
    users = db.relationship('User', secondary=favorite_stim_aids, back_populates='stim_aids')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'image_url': self.image_url,
            'name': self.name,
            'description': self.description,
            'noise_rating': self.noise_rating,
            'chew_rating': self.chew_rating,
            'texture_rating': self.texture_rating,
            'consistency_rating': self.consistency_rating
        }
