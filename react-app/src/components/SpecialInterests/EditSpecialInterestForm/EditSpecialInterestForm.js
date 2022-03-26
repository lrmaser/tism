import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { editSpecialInterest } from '../../../store/special_interest';
import './EditSpecialInterestForm.css';

const EditSpecialInterestForm = ({ onClose, specialInterestId }) => {
    const dispatch = useDispatch();

    const specialInterest = useSelector(state => state.specialInterests[specialInterestId]);

    const [ error, setError ] = useState('');
    const [ name, setName ] = useState(specialInterest?.name);

    const updateName = (e) => setName(e.target.value);

    useEffect(() => {
        if (name.length > 50) {
            setError('Special interest must not be more than 50 characters.');
        } else {
            setError('');
        }
    }, [name]);

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
            <div className='special-interest-error'>{error}</div>
            <input
                    className='edit-special-interest-name'
                    type='text'
                    value={name}
                    onChange={updateName}
                    placeholder='Edit your special interest'
                    required
                />
                <div className='edit-special-interest-buttons'>
                    <button type='submit' className='edit-special-interest-submit' disabled={error || !name}>
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
