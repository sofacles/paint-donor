import React from 'react';
import UseForm from '../UseForm';
import formRules from './AdminFormRules';

const AdminLogin = () => {
  const sendLoginInfo = async (fields) => {
    await fetch('api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    });
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
