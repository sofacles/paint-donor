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
  let result;
  try {
    ourNewPaint.emailConfirmed = true;
    const result = await ourNewPaint.save();
    //maybe something about setting id as an objectID?
    return res.send({ confirmationResult: 'emailConfirmed' });
  } catch (err) {
    //"No document found for query "{ _id: 5df8f82568aca435b9abed7f }" on model "PaintCan""
    result.error = err;
  }
};

module.exports = confirm_email;
