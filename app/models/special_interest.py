from .db import db


class SpecialInterest(db.Model):
    __tablename__ = 'special_interests'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    user = db.relationship('User', back_populates='special_interests')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
