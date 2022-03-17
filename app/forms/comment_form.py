from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired
from app.models import Comment


class CommentForm(FlaskForm):
    post_id = IntegerField('Post Id')
    body = TextAreaField('Body', validators=[DataRequired()])
