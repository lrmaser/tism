import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

import { editProfile } from '../../../store/profile';
import './EditProfileForm.css';

const EditProfileForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const profile = useSelector(state => state.profiles[id]);
    console.log('+++++++++++++++++++++++', profile);

    const [ errors, setErrors ] = useState([]);
    const [ name, setName ] = useState(profile?.name);
    const [ profileImage, setProfileImage ] = useState(profile?.profile_image || '');
    const [ about, setAbout ] = useState(profile?.about || '');
    // const [ specialInterests, setSpecialInterests ] = useState(profile?.special_interests);

    const updateName = (e) => setName(e.target.value);
    const updateProfileImage = (e) => setProfileImage(e.target.value);
    const updateAbout = (e) => setAbout(e.target.value);
    // const updateSpecialInterests = (e) => setSpecialInterests(prevState => (
    //     [...prevState, e.target.value]
    // ));

    useEffect(() => {
        const validationErrors = [];

        if (name?.length > 40) {
            validationErrors.push('Name must not be more than 40 characters.');
        }

        setErrors(validationErrors);
    }, [name]);

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

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, ind) => <li key={ind}>{error}</li>)}
            </ul>
            <input
                type='text'
                name='name'
                value={name}
                onChange={updateName}
                placeholder='Your Name'
                required
            />
            <input
                type='text'
                name='profile_image'
                value={profileImage}
                onChange={updateProfileImage}
                placeholder='Profile Image URL'
            />
            <textarea
                name='about'
                value={about}
                onChange={updateAbout}
                placeholder='Tell us about yourself'
            />
            <input
                type='text'
                name='special_interest'
                // value={specialInterests}
                // onChange={updateSpecialInterests}
                placeholder='Write your special interest'
            />
            <button type='submit' disabled={errors.length > 0 || !name}>
                Update Profile
            </button>
            <button type='button' onClick={onClose}>
                Cancel
            </button>
        </form>
    );
};

export default EditProfileForm;
