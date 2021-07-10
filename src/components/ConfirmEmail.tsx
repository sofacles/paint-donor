import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Closed from './Closed';

interface ConfirmEmailProps {
  location: string,
  search: string,
  readOnlyMode: boolean,
}
const ConfirmEmail: React.FC<ConfirmEmailProps> = (props: ConfirmEmailProps) => {
  const loc = props.location;
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [statusMessage, setStatusMessage] = useState('confirming...');
  useEffect(() => {
    if (!props.readOnlyMode) {
      axios
        .post(`/api/confirm_email${loc.search}`)
        .then((res) => {
          if (res.data.confirmationResult === 'emailConfirmed') {
            setEmailConfirmed(true);
          } else {
            setStatusMessage(res.data.confirmationResult);
          }
        })
        .catch((err) => {
          console.error(err);
          debugger;
        });
    }

  }, [loc.search, props.readOnlyMode]);

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
