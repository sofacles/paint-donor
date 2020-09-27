import React from 'react';
import { Link } from 'react-router-dom';
import OppositeColor from '../OppositeColor';

// Used when there is no image, just an RGB value for the paint
//TODO: unit test that makes sure either RGB or image file is in the POST
export const PaintTile = ({ paintUnit }) => {
  const bgColor = paintUnit.rgb;
  const rgbStyle = {
    height: '100%',
    width: '100%',
    backgroundColor: `#${bgColor}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: `#${OppositeColor(bgColor)}`,
  };
  return (
    <Link
      to={{
        pathname: '/SendMail',
        state: { paintUnit },
      }}
      style={linkStyle}
    >
      <div className="paint-cell">
        <div style={rgbStyle}>
          <div>{paintUnit.name}</div>
          <div>#{paintUnit.rgb}</div>
        </div>
      </div>
    </Link>
  );
};
