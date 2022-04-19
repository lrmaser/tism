import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { favoriteAStimAid, unfavoriteAStimAid } from '../../../store/favorite_stim_aid';
import './FavoriteButton.css';

const FavoriteButton = ({ stimAid }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const faveStimAidsObj = useSelector(state => state.faveStimAids);
    const faveStimAids = Object.values(faveStimAidsObj);

    const [ heart, setHeart ] = useState(false);

    let faves;
    let userFave;
    if (faveStimAids) {
        faves = faveStimAids.filter(fave => fave.stim_aid_id === stimAid.id);
        userFave = faves.find(fave => fave.user_id === user?.id);
    }

    useEffect(() => {
        if (userFave) {
            setHeart(true);
        } else {
            setHeart(false);
        }
    }, [userFave]);

    const handleFavorite = async () => {
        if (!heart) {
            const payload = {
                user_id: user.id,
                stim_aid_id: stimAid.id
            };

            const favoriteStimAid = await dispatch(favoriteAStimAid(payload));

            if (favoriteStimAid.ok) setHeart(true);
        } else {
            await dispatch(unfavoriteAStimAid(userFave.id));
            setHeart(false);
        }

    };

    let favoriteHeart;
    if (heart) {
        favoriteHeart = (
            <i className="fas fa-heart"></i>
        );
    } else {
        favoriteHeart = (
            <i className="far fa-heart"></i>
        );
    }

    return (
        <button type='button' className='stim-favorite' onClick={handleFavorite}>
            {favoriteHeart}
        </button>
    );
};

export default FavoriteButton;
