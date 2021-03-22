const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

const config = require('../config');
const { Logger } = require('./logger');
const {
  gmail: { clientId, clientSecret, refreshToken, user },
} = config;

const oauth2Client = new OAuth2(
  clientId,
  clientSecret,
  'https://developers.google.com/oauthplayground' // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: config.gmail.refreshToken,
});

const nodeMailerSmtpConfig = {
  service: 'gmail',
  auth: {
    clientId,
    clientSecret,
    refreshToken,
    type: 'OAuth2',
    user,
  },
};

function sendGMailToConfirmDonorsAddress(to, slug) {
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    ...nodeMailerSmtpConfig,
    accessToken,
  });

  const mailOptions = {
    from: user,
    to,
    subject: 'Thanks for posting your paint',
    generateTextFromHTML: true,
    html: `<div>Please follow this link to verify your email. <a href="${config.baseUrl}confirm_email?mn=${slug}" >verify</a></div>`,
  };

  try {
    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? Logger.error(error) : Logger.info(response);
      smtpTransport.close();
    });
  } catch (err) {
    Logger.error({ topCall: 'error caught in gmailService.sendMail!', err });
  }
}

function emailDonorToSignalInterest(donorEmail, brand, name) {
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    ...nodeMailerSmtpConfig,
    accessToken,
  });

  const mailOptions = {
    from: user,
    to: donorEmail,
    subject: 'Hey, do you still have that paint?',
    generateTextFromHTML: true,
    html: `<div>Somebody is interested in your ${brand} ${name}</div>`,
  };

  try {
    smtpTransport.sendMail(mailOptions, (error, response) => {
      error
        ? Logger.error(
            `Errored out trying to smtpTransport.sendMail in emailDonorToSignalInterest!: ${JSON.stringify(
              error
            )}. response ${JSON.stringify(response)}`
          )
        : Logger.info(
            `emailDonorToSignalInterest smtpTransport.sendMail success: ${JSON.stringify(
              response
            )}${brand} ${name}}`
          );
      smtpTransport.close();
    });
  } catch (err) {
    Logger.error({ topCall: 'error caught in gmailService.sendMail!', err });
  }
}
module.exports = {
  emailDonorToSignalInterest,
  sendGMailToConfirmDonorsAddress,
};
