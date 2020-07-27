import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const RedirectIfNoToken = ({ children, ...rest }) => {
  const tokenExpiry = localStorage.getItem('adminTokenExpires');
  const currentMsec = new Date().valueOf();
  const probablyAuthorized =
    tokenExpiry !== null && Number.parseInt(tokenExpiry) > currentMsec;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        probablyAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/admin/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default RedirectIfNoToken;
