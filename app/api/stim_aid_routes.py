from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, StimAid
from app.forms import StimAidForm, EditStimAidForm

stim_aid_routes = Blueprint('stim_aids', __name__)


# GET /api/stim_aids
@stim_aid_routes.route('')
def stim_aids():
    stim_aids = StimAid.query.all()
    return {'stim_aids': [stim_aid.to_dict() for stim_aid in stim_aids]}


# POST /api/stim_aids
@stim_aid_routes.route('', methods=['POST'])
@login_required
def new_stim_aid():
    form = StimAidForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_stim_aid = StimAid(
            owner_id = current_user.id,
            name = form.data['name'],
            description = form.data['description'],
            noise_rating = form.data['noise_rating'],
            chew_rating = form.data['chew_rating'],
            texture_rating = form.data['texture_rating'],
            consistency_rating = form.data['consistency_rating']
        )

        db.session.add(new_stim_aid)
        db.session.commit()

        return new_stim_aid.to_dict()

    return {'error': 'Failed to submit stim aid'}


# GET /api/stim_aids/:id ???
@stim_aid_routes.route('/<int:id>')
def stim_aid(id):
    stim_aid = StimAid.query.get(id)
    return stim_aid.to_dict()


# PUT /api/stim_aids/:id
@stim_aid_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_stim_aid(id):
    form = EditStimAidForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        edited_stim_aid = StimAid.query.get(id)

        edited_stim_aid.name = form.data['name']
        edited_stim_aid.description = form.data['description']
        edited_stim_aid.noise_rating = form.data['noise_rating']
        edited_stim_aid.chew_rating = form.data['chew_rating']
        edited_stim_aid.texture_rating = form.data['texture_rating']
        edited_stim_aid.consistency_rating = form.data['consistency_rating']

        db.session.commit()

        return edited_stim_aid.to_dict()

    return {'error': 'Failed to update stim aid'}


# DELETE /api/stim_aids/:id
@stim_aid_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_stim_aid(id):
    stim_aid = StimAid.query.get(id)
    db.session.delete(stim_aid)
    db.session.commit()
    return {'message': "Stim aid has been deleted"}
