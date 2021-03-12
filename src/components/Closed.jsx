import React from 'react';
const Closed = (props) => {
  return (
    <>
      <h1 data-testid="closed-heading">
        {props.message ||
          '1lesscan is closed for maintenance, sorry about that'}
      </h1>
      <img alt="closed sign" src="1lessCanClosedForCleaning.png" />
    </>
  );
};

export default Closed;
