const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const config = require("../config");
const { Logger } = require("./logger");

function sendGMail(brand, name) {
  const oauth2Client = new OAuth2(
    config.gmail.clientId,
    config.gmail.clientSecret,
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: config.gmail.refreshToken,
  });
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.gmail.user,
      clientId: config.gmail.clientId,
      clientSecret: config.gmail.clientSecret,
      refreshToken: config.gmail.refreshToken,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: config.gmail.user,
    to: "somebody.sparkly@gmail.com",
    subject: "Somebody is interested in your paint",
    generateTextFromHTML: true,
    html: `<b>Somebody would like to adopt your ${brand}:${name} paint! </b><div>Do not touch the subject line.  That's how we track which paint is which.</div><img alt="header" src="https://1lesscan.us/apple-icon-144x144.png" />`,
  };

  try {
    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? Logger.error(error) : Logger.info(response);
      smtpTransport.close();
    });
  } catch (err) {
    Logger.error("error caught in sendGmail!");
    Logger.error(err);
  }
}

module.exports = { sendGMail };
