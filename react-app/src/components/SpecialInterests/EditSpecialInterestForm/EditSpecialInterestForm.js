import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { editSpecialInterest } from '../../../store/special_interest';
import './EditSpecialInterestForm.css';

const EditSpecialInterestForm = ({ onClose, specialInterestId }) => {
    const dispatch = useDispatch();

    const specialInterest = useSelector(state => state.specialInterests[specialInterestId]);

    const [ name, setName ] = useState(specialInterest?.name);

    const updateName = (e) => setName(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...specialInterest,
            name
        };

        const editedSpecialInterest = await dispatch(editSpecialInterest(payload));

        if (editedSpecialInterest) {
            onClose(false);
        }
    };

    return (
        <form className='edit-special-interest-form' onSubmit={handleSubmit}>
            <input
                    type='text'
                    value={name}
                    onChange={updateName}
                    placeholder='Edit your special interest'
                    maxLength={50}
                    required
                />
                <div className='edit-special-interest-buttons'>
                    <button type='submit' className='edit-special-interest-submit' disabled={!name}>
                        Submit
                    </button>
                    <button type='button' className='edit-special-interest-cancel' onClick={onClose}>
                        Cancel
                    </button>
                </div>
        </form>
    );
};

export default EditSpecialInterestForm;
