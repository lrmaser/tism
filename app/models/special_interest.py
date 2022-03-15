from .db import db


class SpecialInterest(db.Model):
    __tablename__ = 'special_interests'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    # M-M relationship with users

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
