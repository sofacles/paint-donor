import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import UseForm from "./UseForm";
import Axios from "axios";

const querystring = require('querystring');

const SendMailForm = props => {
  

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

  const onValidationSuccess = () => {
    debugger;
    let qs = querystring.encode(fields);
    Axios.post("/api/mail", {
      fromEmail: fields,
      paint: paint
    }).then(res => {
      if (res.data.fakeEmailSent === true) {
        setMailSent(true);
      }
    });
  };

  const {
    fields,
    setFields,
    setField,
    blurField,
    errors,
    handleSubmit
  } = UseForm(onValidationSuccess);
  return mailSent ? (
    <Redirect to="/thanksForMail" />
  ) : (
    <div>
      <h1>Would you like send mail to this person?</h1>
      <p>
        Please enter your email address below. We will set up a temporary email
        account for you that the paint donor can use to contact you and you can
        cancel it with a link that we will send to your inbox. All
        communications with blah@randomemail will go through this relay.
      </p>

      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="email">email:</label>
        <input
          name="email"
          id="email"
          onChange={e => {
            setField(e);
          }}
          onBlur={e => {
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
          onChange={e => {
            setField(e);
          }}
          onBlur={e => {
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
    </div>
  );
};

export default SendMailForm;
