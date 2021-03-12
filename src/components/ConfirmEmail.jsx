import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Closed from './Closed';

const ConfirmEmail = (props) => {
  const loc = props.location;
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [statusMessage, setStatusMessage] = useState('confirming...');
  useEffect(() => {
    axios
      .post(`/api/confirm_email${loc.search}`)
      .then((res) => {
        console.log('inside the then of my axios post.. ******');
        if (res.data.confirmationResult === 'emailConfirmed') {
          setEmailConfirmed(true);
        } else {
          setStatusMessage(res.data.confirmationResult);
        }
      })
      .catch((err) => {
        debugger;
      });
  }, [loc.search]);

  if (props.readOnlyMode) {
    return <Closed />;
  }

  return emailConfirmed ? (
    <Redirect to="/confirmEmailResult" />
  ) : (
    <div>{statusMessage}</div>
  );
};

export { ConfirmEmail };
