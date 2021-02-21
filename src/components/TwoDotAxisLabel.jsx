import '../App.css';
import React from 'react';

const TwoDotAxisLabel = (props) => {
  let verticalContainerStyle = {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    marginTop: '24px',
    width: '19px',
  };

  let horizontalContainerStyle = {
    display: 'flex',
    height: '20px',
    width: '128px',
    justifyContent: 'space-between',
  };

  let dotStyle = {
    alignSelf: 'center',
    backgroundColor: props.color,
    borderRadius: '50%',
  };

  let bigDotStyle = {
    ...dotStyle,
    height: '15px',
    width: '15px',
  };

  let smallDotStyle = {
    ...dotStyle,
    height: '5px',
    width: '5px',
  };

  return (
    <div
      style={
        props.orientation === 'horizontal'
          ? horizontalContainerStyle
          : verticalContainerStyle
      }
    >
      <div style={smallDotStyle} />
      <div style={bigDotStyle} />
    </div>
  );
};

export { TwoDotAxisLabel };
