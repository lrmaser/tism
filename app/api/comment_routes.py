from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Post, Comment
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)


# GET /api/comments
@comment_routes.route('')
def comments(post_id): # Trying with post id, otherwise will have to do frontend
    comments = Comment.query.filter(Post.id == post_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}


# POST /api/comments
@comment_routes.route('', methods=['POST'])
@login_required
def new_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            user_id = current_user.id,
            post_id = form.data['post_id'],
            body = form.data['body'],
            created_at = datetime.now(),
            updated_at = datetime.now()
        )

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()

    return {'error': 'Failed to submit comment'}


# PUT /api/comments/:id
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    # form =
    # form['csrf_token'].data = request.cookies['csrf_token']

    # if form.validate_on_submit():
    #     edited_comment = Comment.query.get(id)

    #     edited_comment.

    #     db.session.commit()

    #     return edited_comment.to_dict()

    return {'error': 'Failed to update comment'}


# DELETE /api/comments/:id
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {'message': "Comment has been deleted"}
