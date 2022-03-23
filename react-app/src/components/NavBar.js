import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import SignUpFormModal from './auth/SignUpFormModal';
import LoginFormModal from './auth/LoginFormModal';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';

const NavBar = ({ profile }) => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-right'>
        <li>
          <NavLink to='/posts/new' exact={true} activeClassName='active'>
            New Post
          </NavLink>
        </li>
        <li className='user-profile-dropdown'>
          {profile?.profile_image
            ? <img src={profile?.profile_image} alt="User's Profile"></img>
            : <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="Default User Profile"></img>
          }
        </li>
        <li>
          <NavLink to={`/profiles/${sessionUser.id}`} exact={true} activeClassName='active'>
            Profile
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='nav-right'>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <SignUpFormModal />
        </li>
      </div>
    );
  }

  return (
    <nav className='nav-bar'>
      <ul className='nav-ul'>
        <div className='nav-left'>
          <li>
            <NavLink to='/' exact={true} activeClassName='active-home' className='nav-home'>
              <i className="fas fa-infinity"></i> tism
            </NavLink>
          </li>
          <li>
            <NavLink to='/posts' exact={true} activeClassName='active'>
              Info Dump
            </NavLink>
          </li>
          <li>
            Stim Aids
          </li>
          <li>
            About
          </li>
        </div>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
