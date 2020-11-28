const { Logger } = require('../logger');
const path = require('path');
const { PaintCan } = require('../../models');

const confirm_email = async (req, res) => {
  if (!req.query['mn']) {
    Logger.error(`Somebody is trying to confirm_email without an mn on the qs`);
    return res.send("{msg:'wait, what?'}");
  }

  const ourNewPaint = await PaintCan.findOne({
    secret: req.query['mn'],
  });
  if (ourNewPaint === null) {
    return res.send({
      confirmationResult: "we can't find your information, sorry",
    });
  }

  ourNewPaint.emailConfirmed = true;
  ourNewPaint.save();
  return res.send({ confirmationResult: 'emailConfirmed' });
};

module.exports = confirm_email;
