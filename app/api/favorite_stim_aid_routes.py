from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, FavoriteStimAid

favorite_stim_aid_routes = Blueprint('favorite_stim_aids', __name__)


# GET /api/favorite_stim_aids
@favorite_stim_aid_routes.route('')
def favorite_stim_aids():
    favorite_stim_aids = FavoriteStimAid.query.all()
    return {'favorite_stim_aids': [stim_aid.to_dict() for stim_aid in favorite_stim_aids]}


# POST /api/favorite_stim_aids
@favorite_stim_aid_routes.route('', methods=['POST'])
@login_required
def favorite_a_stim_aid():
    favorite_stim_aid = FavoriteStimAid()
    favorite_data = request.get_json()

    favorite_stim_aid.user_id = favorite_data['user_id']
    favorite_stim_aid.stim_aid_id = favorite_data['stim_aid_id']

    db.session.add(favorite_stim_aid)
    db.session.commit()

    return favorite_stim_aid.to_dict()


# DELETE /api/favorite_stim_aids/:id
@favorite_stim_aid_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_favorite_stim_aid(id):
    favorite_stim_aid = FavoriteStimAid.query.get(id)
    db.session.delete(favorite_stim_aid)
    db.session.commit()
    return {'message': "Favorite stim aid has been removed"}
