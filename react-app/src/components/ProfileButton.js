import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import LogoutButton from "./auth/LogoutButton";
import './ProfileButton.css';

const ProfileButton = ({ profile }) => {
    const user = useSelector(state => state.session.user);

    const [ showMenu, setShowMenu ] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            <div className='user-profile-dropdown' onClick={openMenu}>
                {profile?.profile_image
                    ? <img src={profile?.profile_image} alt="User's Profile"></img>
                    : <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="Default User Profile"></img>
                }
            </div>
            {showMenu && (
                <div className='profile-dropdown-menu'>
                    <ul>
                        <li className='user-profile-li'>
                            <NavLink to={`/profiles/${user?.id}`} exact={true} activeClassName='active'>
                                Profile
                            </NavLink>
                        </li>
                        <li className='logout-li'>
                            <LogoutButton />
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default ProfileButton;
