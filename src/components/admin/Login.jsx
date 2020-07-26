import React from 'react';
import UseForm from '../UseForm';
import formRules from './AdminFormRules';
const msecInHour = 60 * 60 * 1000;

const AdminLogin = (props) => {
  const sendLoginInfo = async (fields) => {
    const response = await fetch('api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    });
    if (response.status === 200) {
      localStorage.setItem(
        'adminTokenExpires',
        new Date().valueOf() + msecInHour
      );
    }
  };
  const { setField, blurField, errors, handleSubmit } = UseForm(
    sendLoginInfo,
    formRules
  );

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
      </div>
    </form>
  );
};

export default AdminLogin;
