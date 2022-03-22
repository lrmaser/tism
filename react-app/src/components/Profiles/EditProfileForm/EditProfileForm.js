import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

import { editProfile } from '../../../store/profile';
import './EditProfileForm.css';

const EditProfileForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const profile = useSelector(state => state.profiles[id]);

    const [ errors, setErrors ] = useState([]);
    const [ name, setName ] = useState(profile?.name);
    const [ profileImage, setProfileImage ] = useState(profile?.profile_image || '');
    const [ about, setAbout ] = useState(profile?.about || '');

    const updateName = (e) => setName(e.target.value);
    const updateProfileImage = (e) => setProfileImage(e.target.value);
    const updateAbout = (e) => setAbout(e.target.value);

    useEffect(() => {
        const validationErrors = [];

        if (name?.length > 40) {
            validationErrors.push('Name must not be more than 40 characters.');
        }

        if (profileImage && !(/.(jpg|jpeg|gif|png|tiff|bmp)$/.test(profileImage))) {
            validationErrors.push('The image URL must end in one of the following extensions: .jpg, .jpeg, .gif, .png, .tiff, .bmp.');
        }

        setErrors(validationErrors);
    }, [name, profileImage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...profile,
            name,
            profile_image: profileImage,
            about
        };

        const editedProfile = await dispatch(editProfile(payload));

        if (editedProfile) {
            onClose(false);
        }
    };

    let errorBox;
    if (errors.length > 0) {
        errorBox = (
            <div className='edit-profile-errors'>
                <p>The following error(s) occurred:</p>
                <ul>
                    {errors.map((error, ind) => (
                        <li key={ind}>{error}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <form className='edit-profile-form' onSubmit={handleSubmit}>
            {errorBox}
            <div className='edit-profile-name'>
                <label>Name <i className='required-text'>Required</i></label>
                <input
                    type='text'
                    name='name'
                    value={name}
                    onChange={updateName}
                    placeholder='Your Name'
                    required
                />
            </div>
            <div className='edit-profile-image'>
                <label>Profile Image</label>
                <input
                    type='text'
                    name='profile_image'
                    value={profileImage}
                    onChange={updateProfileImage}
                    placeholder='Profile Image URL'
                />
            </div>
            <div className='edit-profile-about'>
                <label>About</label>
                <textarea
                    name='about'
                    value={about}
                    onChange={updateAbout}
                    placeholder='Tell us about yourself'
                    rows={5}
                />
            </div>
            <div className='edit-profile-buttons'>
                <button type='submit' className='edit-profile-submit' disabled={errors.length > 0 || !name}>
                    Update Profile
                </button>
                <button type='button' className='edit-profile-cancel' onClick={onClose}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditProfileForm;
