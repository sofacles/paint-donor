const { PaintCan } = require('../../models');
const { decrypt } = require('../../src/cryptoService');
const { Logger } = require('../logger');
const { emailDonorToSignalInterest } = require('../gmailService');

const sendMail = async (req, res) => {
  const paintObj = req.body.paint;

  const thisPaint = await PaintCan.findOne({ _id: paintObj._id });
  if (thisPaint == null) {
    Logger.error('sendMail endpoint hit with a null paint');
    Logger.error(JSON.stringify(req));
    res.send('no such paint');
    return;
  }

  const donorEmail = decrypt(thisPaint.email);

  emailDonorToSignalInterest(donorEmail, paintObj.brand, paintObj.name);
  try {
    Logger.info(
      `Somebody is actually trying to send a mail about ${paintObj.brand}, ${paintObj.name}`
    );
    res.send({ emailSent: true });
  } catch (error) {
    Logger.error(error);
    res.send({ status: 'error' });
  }
};

module.exports = {
  sendMail,
};
