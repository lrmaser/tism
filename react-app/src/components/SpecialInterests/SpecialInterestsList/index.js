import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";

import { getSpecialInterests, deleteSpecialInterest } from '../../../store/special_interest';
// import edit modal?
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
                        <li>
                            {specialInterest.name}
                            {user?.id === specialInterest.user_id && (
                                <button>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            )}
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
