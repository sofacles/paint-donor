/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
interface ClosedProps {
  message: string
}
const Closed = (props: ClosedProps) => {
  return (
    <>
      <h1 data-testid="closed-heading">
        {props.message ||
          '1lesscan why is closed for maintenance, sorry about that'}
      </h1>
      <img alt="closed sign" src="1lessCanClosedForCleaning.png" />
    </>
  );
};

export default Closed;
