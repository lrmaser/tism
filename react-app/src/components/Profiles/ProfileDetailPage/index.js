import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { getProfile } from '../../../store/profile';
import { getStimAids } from '../../../store/stim_aid';
import EditProfileModal from '../EditProfileForm';
import SpecialInterestsList from '../../SpecialInterests/SpecialInterestsList';
import SpecialInterestForm from '../../SpecialInterests/SpecialInterestForm';
import './ProfileDetailPage.css';

const ProfileDetailPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const profile = useSelector(state => state.profiles[id]);
    const stimAidsObj = useSelector(state => state.stimAids);
    const stimAidsArr = Object.values(stimAidsObj);
    const stimAids = stimAidsArr.filter(stimAid => stimAid.owner_id === +id);

    useEffect(() => {
        dispatch(getProfile(id));
        dispatch(getStimAids());
    }, [dispatch, id]);

    const handleImage = (e) => {
        e.target.src = "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";
    };

    let profileMenu = null;
    if (user && profile?.id === user.id) {
        profileMenu = (
            <div className='profile-edit-button'>
                <EditProfileModal />
            </div>
        );
    }

    if (!profile) return null;

    return (
        <main className='profile-page'>
            <div className='profile-top'>
                <div className='profile-image'>
                    {profile?.profile_image ?
                        <img
                            src={profile.profile_image}
                            alt="User's Profile"
                            onError={handleImage}
                        />
                        : <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="Default User Profile"></img>
                    }
                </div>
                <div className='profile-user-info'>
                    <div className='profile-user-header'>
                        <h1>{profile?.name}</h1>
                        {+id === 4 && (
                            <div className='github-linkedin-links'>
                                <a href='https://github.com/lrmaser' target='_blank' rel='noopener noreferrer'>
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href='https://www.linkedin.com/in/laura-maser-225196b2/' target='_blank' rel='noopener noreferrer'>
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                        )}
                    </div>
                    <p>Member since {moment(profile?.created_at).format('LL')}</p>
                    {profileMenu}
                </div>
            </div>
            <div className='profile-bottom'>
                <div className='profile-bottom-left'>
                    <div className='profile-about-user'>
                        <h2>About</h2>
                        <p>
                            {profile?.about
                                ? profile.about
                                : `${profile.name} hasn't shared anything yet!`
                            }
                        </p>
                    </div>
                    <div className='profile-special-interests'>
                        <h2>Special Interests</h2>
                        <ul className='special-interests-list'>
                            <SpecialInterestsList />
                            {user?.id === +id && (
                                <li className='special-interest-form-list-item'>
                                    <SpecialInterestForm />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className='profile-bottom-right'>
                    <h2>Favorite Stim Aids</h2>
                    <div className='profile-stims-container'>
                        {stimAids?.map(stimAid => (
                            <div className='profile-stim' key={stimAid.id}>
                                <img src={stimAid.image_url} alt="Stim Aid"></img>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfileDetailPage;
