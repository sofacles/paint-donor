import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const SendMailForm = (props) => {
  const [mailSent, setMailSent] = useState(false);
  let paint = {};
  if(props && props.location && props.location.state && props.location.state.paintUnit) {
    paint = props.location.state.paintUnit;
  }

  return (
    mailSent ? <Redirect to="/thanksForMail" /> :
    <div>
      <h1>Send mail to this person?</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        Axios.post("/api/mail", 
        { 
          fromEmail: "webmaster@theGerm.us",
          paint: paint
        }).then((res) => {
          debugger;
          if (res.data.fakeEmailSent === true) {
            setMailSent(true);
          }
        });
      }}>
        <input type="submit" value="send email"></input>
      </form>
    </div>
  );
};

export default SendMailForm