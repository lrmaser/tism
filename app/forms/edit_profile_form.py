from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length, URL
from app.models import User


class EditProfileForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    profile_image = StringField('profile_image')
    about = TextAreaField('about')
