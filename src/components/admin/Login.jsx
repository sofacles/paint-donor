import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import UseForm from '../UseForm';
import formRules from './AdminFormRules';
const msecInHour = 60 * 60 * 1000;

const AdminLogin = (props) => {
  let history = useHistory();
  const [loginErrors, setLoginErrors] = useState(false);
  const sendLoginInfo = async (fields) => {
    const response = await fetch('api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    }).catch((e) => {
      errors.loginFailed = true;
    });

    if (response.ok) {
      localStorage.setItem(
        'adminTokenExpires',
        new Date().valueOf() + msecInHour
      );
      history.goBack();
    } else {
      setLoginErrors(true);
    }
  };
  const { setField, blurField, errors, handleSubmit } = UseForm(
    sendLoginInfo,
    formRules
  );

  return (
    <form onSubmit={(e) => handleSubmit(e)} data-testid="redirect">
      <div>
        <label>user name</label>
        <input name="userName" onChange={setField} onBlur={blurField} />
      </div>
      <div>
        <label>password</label>
        <input name="password" onChange={setField} onBlur={blurField} />
      </div>
      <div>
        <input type="submit" onSubmit={handleSubmit} value="log in" />
      </div>
      <div>
        {errors.userName || errors.password
          ? 'Username and password are required'
          : ''}
        {loginErrors ? 'Login failed, try again' : ''}
      </div>
    </form>
  );
};

export default AdminLogin;
