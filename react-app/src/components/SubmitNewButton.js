import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

import './SubmitNewButton.css';

const SubmitNewButton = () => {
    const [ showMenu, setShowMenu ] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    return (
        <>
            <div className='submit-dropdown' onMouseEnter={openMenu}>
                Submit
            </div>
            {showMenu && (
                <div className='submit-dropdown-menu' onMouseLeave={() => setShowMenu(false)}>
                    <ul>
                        <li className='submit-post-li'>
                            <NavLink to='/posts/new' exact={true} activeClassName='active'>
                                New Post
                            </NavLink>
                        </li>
                        <li className='submit-stim-li'>
                            <NavLink to='/stim_aids/new' exact={true} activeClassName='active'>
                                New Stim Aid
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default SubmitNewButton;
