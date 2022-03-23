import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { createSpecialInterest } from "../../../store/special_interest";
import './SpecialInterestForm.css';

const SpecialInterestForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const profile = useSelector(state => state.profiles[id]);

    const [ name, setName ] = useState('');

    const updateName = (e) => setName(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: user.id,
            name
        };

        const newSpecialInterest = await dispatch(createSpecialInterest(payload));

        if (newSpecialInterest.ok) {
            setName('');
        }
    };

    return (
        <form className='special-interest-form' onSubmit={handleSubmit}>
            <div className='special-interest-form-input'>
                <input
                    type='text'
                    value={name}
                    onChange={updateName}
                    placeholder='Add a special interest?'
                    maxLength={50}
                    required
                />
            </div>
            <div className='special-interest-form-button'>
                <button type='submit' disabled={!name}>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        </form>
    );
};

export default SpecialInterestForm;
