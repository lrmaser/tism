from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Post
from app.forms import PostForm

post_routes = Blueprint('posts', __name__)


# GET /posts
@post_routes.route('')
def posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


# POST /posts
@post_routes.route('', methods=['POST'])
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
def edit_post(id):
    pass


# DELETE /posts/:id
@post_routes.route('/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return {'message': "Post has been deleted"}
