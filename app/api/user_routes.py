from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
# import form here

user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


# GET /api/profiles/:id
@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# PUT /api/profiles/:id
@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_profile(id):
    # form =
    # form['csrf_token'].data = request.cookies['csrf_token']

    # if form.validate_on_submit():
    #     edited_profile = User.query.get(id)

    #     edited_profile.name = form.data['name']
    #     edited_profile.profile_image = form.data['profile_image']
    #     edited_profile.about = form.data['about']

    #     db.session.commit()

    #     return edited_profile.to_dict()

    return {'error': 'Failed to update profile'}
