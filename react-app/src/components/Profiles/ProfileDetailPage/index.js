import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { getProfile } from '../../../store/profile';
import EditProfileModal from '../EditProfileForm';
import SpecialInterestsList from '../../SpecialInterests/SpecialInterestsList';
import './ProfileDetailPage.css';

const ProfileDetailPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const profile = useSelector(state => state.profiles[id]);

    const [ showSpecialInterestForm, setShowSpecialInterestForm ] = useState(false);

    useEffect(() => {
        dispatch(getProfile(id));
    }, [dispatch, id]);

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
                    {profile?.profile_image
                        ? <img src={profile.profile_image} alt="User's Profile"></img>
                        : <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="Default User Profile"></img>
                    }
                </div>
                <div className='profile-user-info'>
                    <h1>{profile?.name}</h1>
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
                        <div className='profile-special-interests-header'>
                            <h2>Special Interests</h2>
                            <button type='button' onClick={() => setShowSpecialInterestForm(true)}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <ul>
                            <SpecialInterestsList />
                            {showSpecialInterestForm && (
                                <li>Add SI Form</li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className='profile-bottom-right'>
                    <h2>Favorite Stim Aids</h2>
                    <div>Stim Aids List</div>
                </div>
            </div>
        </main>
    );
};

export default ProfileDetailPage;
