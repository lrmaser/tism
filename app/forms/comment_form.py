from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired
from app.models import Comment


class CommentForm(FlaskForm):
    body = TextAreaField('Body', validators=[DataRequired()])
