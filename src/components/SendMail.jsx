import React from "react";

const SendMailForm = (props) => {
    console.info(props);
  return (
    <div>
      <h1>Send Mail</h1>
      {props.location.state.paintUnit.rgb}
    </div>
  );
};

export default SendMailForm