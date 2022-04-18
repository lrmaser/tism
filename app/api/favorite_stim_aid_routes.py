from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, StimAid

favorite_stim_aid_routes = Blueprint('favorite_stim_aids', __name__)


# GET /api/favorite_stim_aids
# @favorite_stim_aid_routes.route('')


# POST /api/favorite_stim_aids
# @favorite_stim_aid_routes.route('', methods=['POST'])


# DELETE /api/favorite_stim_aids/:id
# @favorite_stim_aid_routes.route('/<int:id>', methods=['DELETE'])
