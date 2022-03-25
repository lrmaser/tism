import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { getStimAids, deleteStimAid } from '../../../store/stim_aid';
import EditStimAidModal from '../EditStimAidForm';
import './StimAidsList.css';

const StimAidsList = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const stimAidsObj = useSelector(state => state.stimAids);
    const stimAids = Object.values(stimAidsObj);

    stimAids.sort((a, b) => {
        let aName = a.name.toLowerCase();
        let bName = b.name.toLowerCase();

        if (aName < bName) return -1;
        if (aName > bName) return 1;

        return 0;
    });

    useEffect(() => {
        dispatch(getStimAids());
    }, [dispatch]);

    const handleClick = (e) => {
        e.preventDefault();

        return history.push('/stim_aids/new');
    };

    const handleDelete = async (e, stimAidId, stimAidName) => {
        e.preventDefault();

        if (window.confirm(`Are you sure you'd like to delete ${stimAidName}?`)) {
            await dispatch(deleteStimAid(stimAidId));
        }
    };

    return (
        <main className='stims-page'>
            <div className='stims-page-banner'>
                <div className='stims-page-banner-left'>
                    <h1>Stim Aids</h1>
                    <p>Blurb about stim aids and language choice? Mention ratings are opinions.</p>
                    {user ? <button type='button' onClick={handleClick}>New Stim Aid</button> : null}
                </div>
                <div className='stims-page-banner-right'>
                    <img src="https://media2.giphy.com/media/XGU3v296wS7KGz4gpD/giphy_s.gif" alt="Just Keep Stimming"></img>
                </div>
            </div>
            <div className='stims-page-bottom'>
                <div className='stims-page-bottom-header'>
                    <h2>Stim Aids A-Z</h2>
                    <span className='ratings-reference'>
                        <div className='noise-reference'>
                            <i className="fas fa-volume-up"></i>
                            <div>Quiet to Loud (1-5)</div>
                        </div>
                        <div className='chew-reference'>
                            <i className="fas fa-teeth"></i>
                            <div>Not Chewy to Very Chewy (1-5)</div>
                        </div>
                        <div className='texture-reference'>
                            <i className="far fa-hand-paper"></i>
                            <div>Smooth to Rough (1-5)</div>
                        </div>
                        <div className='consistency-reference'>
                            <i className="far fa-hand-rock"></i>
                            <div>Squishy to Hard (1-5)</div>
                        </div>
                    </span>
                </div>
                {stimAids?.map(stimAid => (
                    <div key={stimAid.id} className='stims-stim-container' style={{gridTemplateColumns: (stimAid.noise_rating === 0 && stimAid.chew_rating === 0 && stimAid.texture_rating === 0 && stimAid.consistency_rating === 0) ? 'auto 2fr auto auto' : 'auto 2fr 2fr auto'}}>
                        <div className='stims-stim-image'>
                            <img src="https://softsmart.co.za/wp-content/uploads/2018/06/image-not-found-1038x576.jpg" alt="Not Found"></img>
                        </div>
                        <div className='stims-stim-info'>
                            <h3>{stimAid.name}</h3>
                            <p>{stimAid.description}</p>
                        </div>
                        <div className='stims-stim-ratings'>
                            {stimAid.noise_rating === 0 ? null :
                                <div className='noise-rating'>
                                    <div>Noise</div>
                                    {[...Array(stimAid.noise_rating)].map((icon, ind) => (
                                        <i key={ind} className="fas fa-volume-up"></i>
                                    ))}
                                </div>
                            }
                            {stimAid.chew_rating === 0 ? null :
                                <div className='chew-rating'>
                                    <div>Chewy</div>
                                    {[...Array(stimAid.chew_rating)].map((icon, ind) => (
                                        <i key={ind} className="fas fa-teeth"></i>
                                    ))}
                                </div>
                            }
                            {stimAid.texture_rating === 0 ? null :
                                <div className='texture-rating'>
                                    <div>Texture</div>
                                    {[...Array(stimAid.texture_rating)].map((icon, ind) => (
                                        <i key={ind} className="far fa-hand-paper"></i>
                                    ))}
                                </div>
                            }
                            {stimAid.consistency_rating === 0 ? null :
                                <div className='consistency-rating'>
                                    <div>Consistency</div>
                                    {[...Array(stimAid.consistency_rating)].map((icon, ind) => (
                                        <i key={ind} className="far fa-hand-rock"></i>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className='stims-stim-menu'>
                            {user?.id === stimAid.owner_id && (
                                <div>
                                    <EditStimAidModal stimAidId={stimAid.id} />
                                    <button className='stim-delete' onClick={(e) => handleDelete(e, stimAid.id, stimAid.name)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default StimAidsList;
