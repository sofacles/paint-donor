const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

const config = require('../config');
const { Logger } = require('./logger');

function sendGMailToConfirmDonorsAddress(to, slug) {
  const oauth2Client = new OAuth2(
    config.gmail.clientId,
    config.gmail.clientSecret,
    'https://developers.google.com/oauthplayground' // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: config.gmail.refreshToken,
  });
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: config.gmail.user,
      clientId: config.gmail.clientId,
      clientSecret: config.gmail.clientSecret,
      refreshToken: config.gmail.refreshToken,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: config.gmail.user,
    to: to,
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
  const oauth2Client = new OAuth2(
    config.gmail.clientId,
    config.gmail.clientSecret,
    'https://developers.google.com/oauthplayground' // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: config.gmail.refreshToken,
  });
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: config.gmail.user,
      clientId: config.gmail.clientId,
      clientSecret: config.gmail.clientSecret,
      refreshToken: config.gmail.refreshToken,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: config.gmail.user,
    to: donorEmail,
    subject: 'Hey, do you still have that paint?',
    generateTextFromHTML: true,
    html: `<div>Somebody is interested in your ${brand} ${name}</div>`,
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
module.exports = {
  emailDonorToSignalInterest,
  sendGMailToConfirmDonorsAddress,
};
