import React from 'react';

const DumbComponent = () => {
  return (
    <div data-testid="dumb" className="test">
      don't show if no token
    </div>
  );
};

export default DumbComponent;
