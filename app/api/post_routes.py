from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Post
# import forms

post_routes = Blueprint('posts', __name__)


# GET /posts
@post_routes.route('')
def posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


# POST /posts
@post_routes.route('', method=['POST'])
def new_post():
    pass


# GET /posts/:id
@post_routes.route('/<int:id>')
def post(id):
    post = Post.query.get(id)
    return post.to_dict()


# UPDATE /posts/:id
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
