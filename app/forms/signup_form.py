from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

class SignUpForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=40, message='Name cannot be more than 40 characters.')])
    email = StringField('email', validators=[DataRequired(), Length(max=255, message='Email cannot be more than 255 characters.'), Email(message='Please provide a valid email.'), user_exists])
    password = StringField('password', validators=[DataRequired(), Length(max=255, message='Password cannot be more than 255 characters.'), EqualTo('confirm_password', message='Passwords must match.')])
    confirm_password = StringField('confirm_password')
