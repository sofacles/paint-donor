import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const RedirectIfNoToken = ({ componentToProtect: Component, ...rest }) => {
  const tokenExpiry = localStorage.getItem('adminTokenExpires');

  const currentMsec = new Date().valueOf();
  if (tokenExpiry && Number.parseInt(tokenExpiry) > currentMsec) {
    return (
      <Route
        {...rest}
        render={(props) => {
          return <Component {...props} />;
        }}
      />
    );
  }
  return (
    <Redirect
      to={{
        pathname: '/admin/login',
      }}
    />
  );
};

export default RedirectIfNoToken;
