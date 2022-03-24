import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { createStimAid } from '../../../store/stim_aid';
import './StimAidForm.css';

const StimAidForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    const [ errors, setErrors ] = useState([]);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ noise_rating, setNoiseRating ] = useState(0);
    const [ chew_rating, setChewRating ] = useState(0);
    const [ texture_rating, setTextureRating ] = useState(0);
    const [ consistency_rating, setConsistencyRating ] = useState(0);

    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateNoiseRating = (e) => setNoiseRating(e.target.value);
    const updateChewRating = (e) => setChewRating(e.target.value);
    const updateTextureRating = (e) => setTextureRating(e.target.value);
    const updateConsistencyRating = (e) => setConsistencyRating(e.target.value);

    // useEffect(() => {
    //     // Error handling
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            owner_id: user.id,
            name,
            description,
            noise_rating,
            chew_rating,
            texture_rating,
            consistency_rating
        };

        const newStimAid = await dispatch(createStimAid(payload));

        if (newStimAid.ok) history.push('/stim_aids');
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/stim_aids');
    };

    return (
        <main className='new-stim-page'>
            <form className='new-stim-form' onSubmit={handleSubmit}>
                <h1>New Stim Aid</h1>
                {/* errors */}
                <input
                    type='text'
                    className='stim-name'
                    name='name'
                    value={name}
                    onChange={updateName}
                    placeholder='Name of Stim Aid'
                    required
                />
                <textarea
                    className='stim-description'
                    name='description'
                    value={description}
                    onChange={updateDescription}
                    placeholder='How would you describe the stim aid?'
                    rows={10}
                    required
                />
                <input
                    type='number'
                    className='stim-noise-rating'
                    name='noise_rating'
                    value={noise_rating}
                    onChange={updateNoiseRating}
                    min={0}
                    max={5}
                />
                <input
                    type='number'
                    className='stim-chew-rating'
                    name='chew_rating'
                    value={chew_rating}
                    onChange={updateChewRating}
                    min={0}
                    max={5}
                />
                <input
                    type='number'
                    className='stim-texture-rating'
                    name='texture_rating'
                    value={texture_rating}
                    onChange={updateTextureRating}
                    min={0}
                    max={5}
                />
                <input
                    type='number'
                    className='stim-consistency-rating'
                    name='consistency_rating'
                    value={consistency_rating}
                    onChange={updateConsistencyRating}
                    min={0}
                    max={5}
                />
                <div className='stim-buttons'>
                    <button type='submit' className='stim-submit' disabled={errors.length > 0 || !name || !description}>
                        Submit
                    </button>
                    <button type='button' className='stim-cancel' onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
};

export default StimAidForm;
