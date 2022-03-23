import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { getSpecialInterests, deleteSpecialInterest } from '../../../store/special_interest';
import EditSpecialInterestModal from '../EditSpecialInterestForm';
import './SpecialInterestsList.css';

const SpecialInterestsList = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const specialInterestsObj = useSelector(state => state.specialInterests);
    const specialInterests = Object.values(specialInterestsObj);

    useEffect(() => {
        dispatch(getSpecialInterests());
    }, [dispatch]);

    const handleDelete = async (e, specialInterestId) => {
        e.preventDefault();

        if (window.confirm("Are you sure you'd like to remove this special interest?")) {
            await dispatch(deleteSpecialInterest(specialInterestId));
        }
    };

    return (
        <>
            {specialInterests?.map(specialInterest => {
                if (specialInterest.user_id === +id) {
                    return (
                        <li >
                            <div className='special-interests-list-item'>
                                {specialInterest.name}
                                {user?.id === specialInterest.user_id && (
                                    <div className='special-interests-buttons'>
                                        <EditSpecialInterestModal specialInterestId={specialInterest.id} />
                                        <button onClick={(e) => handleDelete(e, specialInterest.id)} className='special-interest-delete'>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                } else {
                    return null;
                }
            })}
        </>
    );
};

export default SpecialInterestsList;
