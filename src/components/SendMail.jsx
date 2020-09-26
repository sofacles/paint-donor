import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import UseForm from './UseForm';
import ValidationRules from './SendMailValidationRules';
import Axios from 'axios';

const querystring = require('querystring');

const SendMailForm = (props) => {
  const [mailSent, setMailSent] = useState(false);
  let paint = {};
  if (
    props &&
    props.location &&
    props.location.state &&
    props.location.state.paintUnit
  ) {
    paint = props.location.state.paintUnit;
  }

  const needHash = paint.rgb && paint.rgb[0] !== '#';
  const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const rgbStyle = {
    height: '100px',
    backgroundColor: `${needHash ? '#' : ''}${
      paint.rgb && paint.rgb.length > 0 ? paint.rgb : '#fff'
    }`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
  };

  const imgStyle = {
    height: '90%',
    margin: '5px',
  };

  const image =
    paint.imageName && paint.imageName.length > 3 ? (
      <img
        alt="paint color"
        style={imgStyle}
        src={`uploads/resized/${paint.imageName}`}
      />
    ) : (
      ''
    );

  const onValidationSuccess = (fields) => {
    let qs = querystring.encode(fields);
    Axios.post(`/api/mail/?${qs}`, {
      fromEmail: fields,
      paint: paint,
    }).then((res) => {
      if (res.data.fakeEmailSent === true) {
        setMailSent(true);
      }
    });
  };

  const { setField, blurField, errors, handleSubmit } = UseForm(
    onValidationSuccess,
    ValidationRules
  );
  return mailSent ? (
    <Redirect to="/thanksForMail" />
  ) : (
    <div className="paint-detail">
      <header style={headerStyle}>
        <div>
          <div>
            <label htmlFor="brand">Brand:</label>
            <span id="brand">{paint.brand}</span>
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <span id="name">{paint.name}</span>
          </div>
          <div>
            <label htmlFor="sheen">Sheen:</label>
            <span id="sheen">{paint.sheen}</span>
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <span id="quantity">{paint.quantity}</span>
          </div>

          <div style={rgbStyle}>{image}</div>
        </div>
      </header>

      <h2>Would you like to send a message to the donor of this paint?</h2>
      <p>
        Please enter your email address below. We will set up a temporary email
        account for you that the paint donor can use to contact you and you can
        cancel it with a link that we will send to your inbox. All
        communications with {paint.email} will go through this relay.
      </p>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="email">email:</label>
        <input
          name="email"
          id="email"
          onChange={(e) => {
            setField(e);
          }}
          onBlur={(e) => {
            blurField(e);
          }}
        />
        {errors.email && (
          <p className="error">
            <span>{errors.email}</span>
          </p>
        )}
        <label htmlFor="confirmEmail">confirm email:</label>
        <input
          name="confirmEmail"
          id="confirmEmail"
          onChange={(e) => {
            setField(e);
          }}
          onBlur={(e) => {
            blurField(e, true);
          }}
        />
        {errors.confirmEmail && (
          <p className="error">
            <span data-testid="confirm-email-error">{errors.confirmEmail}</span>
          </p>
        )}
        <p>
          <input type="submit" value="send email"></input>
        </p>
      </form>
      <Link to="/browsePaint">Back to Paints</Link>
    </div>
  );
};

export default SendMailForm;
