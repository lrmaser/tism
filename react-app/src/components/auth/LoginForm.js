import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../store/session';
import './auth.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUserLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login('demo1@aa.io', 'password'));

    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  let errorBox;
  if (errors.length > 0) {
    errorBox = (
      <div className='login-errors'>
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
    <form className='login-form' onSubmit={onLogin}>
      {errorBox}
      <div className='login-form-header'>Login</div>
      <div className='login-form-email'>
        <label htmlFor='email'>Email </label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          required
        />
      </div>
      <div className='login-form-password'>
        <label htmlFor='password'>Password </label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          required
        />
      </div>
      <div className='login-form-buttons'>
        <button type='submit'>Login</button>
        <button type='button' onClick={demoUserLogin}>Demo User</button>
      </div>
    </form>
  );
};

export default LoginForm;
