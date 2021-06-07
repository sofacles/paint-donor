import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Axios from 'axios';

const SendPing = () => {
  debugger;

  const [responseReceived, setResponseReceived] = useState(false);

  return responseReceived ? (
    <Redirect to="/ThanksForMail" />
  ) : (
    <>
      <div
        data-testid="clicker"
        onClick={() => {
          Axios.post(`/api/ping/?newThing=1`, {
            favoriteFruit: 'plum',
            age: 34,
          }).then((res) => {
            debugger;
            if (res.data.pingReceived === true) {
              setResponseReceived(true);
            }
          });
        }}
      >
        click me to post to ping
      </div>
    </>
  );
};

export default SendPing;
