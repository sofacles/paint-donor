import React from 'react';
import { Redirect } from 'react-router-dom';

const ConfirmEmailResult = (props) => {
  return (
    <div>
      <h1>Thanks so much for posting a paint! </h1>
      We'll start showing your paint on the site right away. If somebody is
      interested, we'll let you know via a relayed email.{' '}
      <p>
        It's great that you took the trouble to do this. If we find a recipient
        for your paint, you'll have saved some resources, saved somebody else
        some money and freed up some space in your house!{' '}
      </p>
      <p>May you be rid of that paint soon.</p>
      <a href="/giveAwayPaint">Donate some more paint</a> or{' '}
      <a href="/">See paints</a>
    </div>
  );
};

export { ConfirmEmailResult };
