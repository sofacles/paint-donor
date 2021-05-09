import React from 'react';

const ConfirmEmailResult: React.FC = () => {
  return (
    <div>
      <h1 data-testid="thanks4Post">Thanks so much for posting a paint! </h1>
      We&apos;ll start showing your paint on the site right away. If somebody is interested, we&apos;ll let you know via a relayed
      email.{' '}
      <p>
        It&apos;s great that you took the trouble to do this. If we find a recipient for your paint, you&apos;ll have saved some
        resources, saved somebody else some money and freed up some space in your house!{' '}
      </p>
      <p>May you be rid of that paint soon.</p>
      <a href="/giveAwayPaint">Donate some more paint</a> or <a href="/">See paints</a>
    </div>
  );
};

export { ConfirmEmailResult };
