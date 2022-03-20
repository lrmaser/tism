import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

import { getProfile } from '../../../store/profile';
import EditProfileModal from '../EditProfileForm';
import './ProfileDetailPage.css';

const ProfileDetailPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const profile = useSelector(state => state.profiles[id]);

    useEffect(() => {
        dispatch(getProfile(id));
    }, [dispatch, id]);

    let profileMenu = null;
    if (user && profile?.id === user.id) {
        profileMenu = (
            <div>
                <EditProfileModal />
            </div>
        );
    }

    if (!profile) return null;

    return (
        <main>
            <div className='profile-top'>
                <div>Profile Image</div>
                <div>
                    <h1>{profile?.name}</h1>
                    <p>{profile?.created_at}</p>
                    {profileMenu}
                </div>
            </div>
            <div className='profile-bottom'>
                <div className='profile-left'>
                    <div>
                        <h2>Bio</h2>
                        <p>Profile About</p>
                    </div>
                    <div>
                        <h2>Special Interests</h2>
                        <p>User's Special Interests</p>
                    </div>
                </div>
                <div className='profile-right'>
                    <h2>Favorite Stim Aids</h2>
                    <div>Stim Aids List</div>
                </div>
            </div>
        </main>
    );
};

export default ProfileDetailPage;
