from .db import db
from .user_special_interest import user_special_interests


class SpecialInterest(db.Model):
    __tablename__ = 'special_interests'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    users = db.relationship('User', secondary=user_special_interests, back_populates='special_interests')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
