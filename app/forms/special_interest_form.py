from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import SpecialInterest


class SpecialInterestForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
