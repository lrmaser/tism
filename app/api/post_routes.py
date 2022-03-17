from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Post
from app.forms import PostForm, EditPostForm

post_routes = Blueprint('posts', __name__)


# GET /posts
@post_routes.route('')
def posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


# POST /posts
@post_routes.route('', methods=['POST'])
@login_required
def new_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_post = Post(
            user_id = current_user.id,
            title = form.data['title'],
            body = form.data['body'],
            created_at = datetime.now(),
            updated_at = datetime.now()
        )

        db.session.add(new_post)
        db.session.commit()

        return new_post.to_dict()

    return {'error': 'Failed to submit post'}

# GET /posts/:id
@post_routes.route('/<int:id>')
def post(id):
    post = Post.query.get(id)
    return post.to_dict()


# PUT /posts/:id
@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    form = EditPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        edited_post = Post.query.get(id)

        edited_post.title = form.data['title']
        edited_post.body = form.data['body']
        edited_post.updated_at = datetime.now()

        db.session.commit()

        return edited_post.to_dict()

    return {'error': 'Failed to update post'}


# DELETE /posts/:id
@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return {'message': "Post has been deleted"}
