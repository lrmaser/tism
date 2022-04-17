import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';

import { signUp } from '../../store/session';
import { login } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    const confirm_password = confirmPassword;
    const data = await dispatch(signUp(name, email, password, confirm_password));

    if (data) {
      setErrors(data)
    }
  };

  const demoUserLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login('demo1@aa.io', 'password'));

    if (data) {
      setErrors(data);
    }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  let errorBox;
  if (errors.length > 0) {
    errorBox = (
      <div className='signup-errors'>
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
    <form className='signup-form' onSubmit={onSignUp}>
      {errorBox}
      <div className='signup-form-header'>Sign Up</div>
      <div className='signup-form-name'>
        <label>Name</label>
        <input
          type='text'
          name='name'
          onChange={updateName}
          value={name}
          required
        ></input>
      </div>
      <div className='signup-form-email'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          required
        ></input>
      </div>
      <div className='signup-form-password'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required
        ></input>
      </div>
      <div className='signup-form-confirm'>
        <label>Confirm Password</label>
        <input
          type='password'
          name='confirm_password'
          onChange={updateConfirmPassword}
          value={confirmPassword}
          required={true}
        ></input>
      </div>
      <div className='signup-form-button'>
        <button type='submit'>Sign Up</button>
        <button type='button' onClick={demoUserLogin}>Demo User</button>
      </div>
    </form>
  );
};

export default SignUpForm;
