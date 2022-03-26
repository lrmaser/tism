import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import SignUpFormModal from './auth/SignUpFormModal';
import LoginFormModal from './auth/LoginFormModal';
import SubmitNewButton from './SubmitNewButton';
import ProfileButton from './ProfileButton';
import './NavBar.css';

const NavBar = ({ profile }) => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-right'>
        <li>
          <SubmitNewButton />
        </li>
        <li>
          <ProfileButton profile={profile} />
        </li>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='nav-right'>
        <li>
          <LoginFormModal />
        </li>
        <li className='nav-right-signup'>
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
            <NavLink to='/stim_aids' exact={true} activeClassName='active'>
              Stim Aids
            </NavLink>
          </li>
          <li>
            <NavLink to='/profiles/4' exact={true} activeClassName='active'>
              About
            </NavLink>
          </li>
        </div>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
