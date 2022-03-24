from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired
from app.models import StimAid


class StimAidForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    noise_rating = IntegerField('noise_rating')
    chew_rating = IntegerField('chew_rating')
    texture_rating = IntegerField('texture_rating')
    consistency_rating = IntegerField('consistency_rating')
