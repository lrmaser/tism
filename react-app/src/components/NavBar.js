import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import SignUpFormModal from './auth/SignUpFormModal';
import LoginFormModal from './auth/LoginFormModal';
import LogoutButton from './auth/LogoutButton';


const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink to='/posts/new' exact={true} activeClassName='active'>
            New Post
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <SignUpFormModal />
        </li>
      </>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/posts' exact={true} activeClassName='active'>
            Info Dump
          </NavLink>
        </li>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
