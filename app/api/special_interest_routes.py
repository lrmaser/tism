from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, SpecialInterest
from app.forms import SpecialInterestForm, EditSpecialInterestForm

special_interest_routes = Blueprint('special_interests', __name__)


# GET /api/special_interests
@special_interest_routes.route('')
def special_interests():
    special_interests = SpecialInterest.query.all()
    return {'special_interests': [special_interest.to_dict() for special_interest in special_interests]}


# POST /api/special_interests
@special_interest_routes.route('', methods=['POST'])
@login_required
def new_special_interest():
    form = SpecialInterestForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_special_interest = SpecialInterest(
            user_id = current_user.id,
            name = form.data['name']
        )

        db.session.add(new_special_interest)
        db.session.commit()

        return new_special_interest.to_dict()

    return {'error': 'Failed to submit special interest'}


# PUT /api/special_interests/:id
@special_interest_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_special_interest(id):
    form = EditSpecialInterestForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        edited_special_interest = SpecialInterest.query.get(id)

        edited_special_interest.name = form.data['name']

        db.session.commit()

        return edited_special_interest.to_dict()

    return {'error': 'Failed to update special interest'}


# DELETE /api/special_interests/:id
@special_interest_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_special_interest(id):
    special_interest = SpecialInterest.query.get(id)
    db.session.delete(special_interest)
    db.session.commit()
    return {'message': "Special interest has been deleted"}
