import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

const RedirectIfNoToken = ({ children, ...rest }) => {
  let history = useHistory();
  const tokenExpiry = localStorage.getItem('adminTokenExpires');
  const currentMsec = new Date().valueOf();
  const probablyAuthorized =
    tokenExpiry !== null && Number.parseInt(tokenExpiry) > currentMsec;

  if (!probablyAuthorized) {
    history.push(rest.path);
  }

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
