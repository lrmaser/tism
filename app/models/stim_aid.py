from .db import db
# import association table here


class StimAid(db.Model):
    __tablename__ = 'stim_aids'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    noise_rating = db.Column(db.Integer)
    chew_rating = db.Column(db.Integer)
    texture_rating = db.Column(db.Integer)
    consistency_rating = db.Column(db.Integer)

    # association table relationship here

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'noise_rating': self.noise_rating,
            'chew_rating': self.chew_rating,
            'texture_rating': self.texture_rating,
            'consistency_rating': self.consistency_rating
        }
