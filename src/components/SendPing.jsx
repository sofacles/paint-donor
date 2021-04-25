import React, { useState } from 'react';

import Axios from 'axios';

const SendPing = (props) => {
  debugger;

  return (
    <>
      <div
        onClick={(e) => {
          Axios.post(`/api/something/?newThing=1`, {
            favoriteFruit: 'plum',
            age: 34,
          }).then((res) => {
            debugger;
            if (res.data.emailSent === true) {
              setMailSent(true);
            }
          });
        }}
      >
        click me to post
      </div>
    </>
  );
};

export default SendPing;
