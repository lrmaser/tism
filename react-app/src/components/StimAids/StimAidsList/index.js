import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { getStimAids } from '../../../store/stim_aid';
import './StimAidsList.css';

const StimAidsList = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const stimAidsObj = useSelector(state => state.stimAids);
    const stimAids = Object.values(stimAidsObj);

    useEffect(() => {
        dispatch(getStimAids());
    }, [dispatch]);

    const handleClick = (e) => {
        e.preventDefault();

        return history.push('/stim_aids/new');
    };

    return (
        <main className='stims-page'>
            <div className='stims-page-banner'>
                <div className='stims-page-banner-left'>
                    <h1>Stim Aids</h1>
                    <p>Blurb about stim aids and language choice?</p>
                    {user ? <button type='button' onClick={handleClick}>New Stim Aid</button> : null}
                </div>
                <div className='stims-page-banner-right'>
                    Image here
                </div>
            </div>
            <div className='stims-page-bottom'>
                {stimAids?.map(stimAid => (
                    <div key={stimAid.id} className='stims-stim-container'>
                        <div className='stims-stim-image'>
                            Image here
                        </div>
                        <div className='stims-stim-info'>
                            <h2>{stimAid.name}</h2>
                            <p>{stimAid.description}</p>
                        </div>
                        <div className='stims-stim-ratings'>
                            <div className='noise-rating'>
                                Noise Rating {stimAid.noise_rating}
                            </div>
                            <div className='chew-rating'>
                                Chew Rating {stimAid.chew_rating}
                            </div>
                            <div className='texture-rating'>
                                Texture Rating {stimAid.texture_rating}
                            </div>
                            <div className='consistency-rating'>
                                Consistency Rating {stimAid.consistency_rating}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default StimAidsList;
