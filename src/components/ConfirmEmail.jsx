import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const ConfirmEmail = (props) => {
  const loc = props.location;
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [statusMessage, setStatusMessage] = useState("confirming...");
  axios
    .post(`/api/confirm_email${loc.search}`)
    .then((res) => {
      if (res.data.confirmationResult === "emailConfirmed") {
        setEmailConfirmed(true);
      } else {
        setStatusMessage(res.data.confirmationResult);
      }
    })
    .catch((err) => {
      debugger;
    });

  return emailConfirmed ? <Redirect to="/" /> : <div>{statusMessage}</div>;
};

export { ConfirmEmail };
