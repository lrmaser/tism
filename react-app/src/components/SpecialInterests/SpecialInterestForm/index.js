import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createSpecialInterest } from "../../../store/special_interest";
import './SpecialInterestForm.css';

const SpecialInterestForm = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [ error, setError ] = useState('');
    const [ name, setName ] = useState('');

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
            user_id: user.id,
            name
        };

        const newSpecialInterest = await dispatch(createSpecialInterest(payload));

        if (newSpecialInterest.ok) {
            setName('');
        }
    };

    return (
        <>
            <form className='special-interest-form' onSubmit={handleSubmit}>
                <div className='special-interest-form-input'>
                    <input
                        type='text'
                        value={name}
                        onChange={updateName}
                        placeholder='Add a special interest?'
                        required
                    />
                </div>
                <div className='special-interest-form-button'>
                    <button type='submit' disabled={error || !name}>
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </form>
            <div className='special-interest-error'>{error}</div>
        </>
    );
};

export default SpecialInterestForm;
