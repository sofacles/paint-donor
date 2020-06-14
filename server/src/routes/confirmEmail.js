const { Logger } = require("../logger");
const path = require("path");
const { PaintCan, PersonWithEmailModel } = require("../../models");

const confirm_email = async (req, res) => {
  
  if (!req.query["mn"]) {
    Logger.error(
      `Somebody is trying to confirm_email without an mn on the qs`
    );
    return res.send("{msg:'wait, what?'}");
  }

  const ourNewUser = await PersonWithEmailModel.findOne({secret: req.query["mn"]});
  if(ourNewUser === null) {
    return res.send({confirmationResult: "we can't find your information, sorry"})
  }

  const theirPaint = await PaintCan.findOne({email: ourNewUser.email});
  if(theirPaint === null) {
    return res.send({confirmationResult: "we can't find your paint, sorry"})
  }

  theirPaint.emailConfirmed = true;
  theirPaint.save();
  return res.send({confirmationResult: "emailConfirmed"});
};

module.exports = confirm_email;
