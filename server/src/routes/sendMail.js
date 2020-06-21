const { PaintCan } = require("../../models");
const { decrypt } = require("../../src/cryptoService");
const { Logger } = require("../logger");
const { emailDonorToSignalInterest } = require("../gmailService")

const sendMail = async (req, res) => {
    Logger.info("Top of sendMail");
   
    const paintObj = req.body.paint;

    const paintRecipient = req.body.fromEmail;
    const thisPaint = await PaintCan.findOne({_id: paintObj._id});
    if(thisPaint == null) {
        Logger.error("sendMail endpoint hit with a null paint");
        Logger.error(JSON.stringify(req));
        res.send("no such paint");
        return;
    }
   
    Logger.info(`Posted email: ${thisPaint.email}`);
    const donorEmail = decrypt(thisPaint.email);
    Logger.info(`decrypted email: ${donorEmail}`);
    Logger.info(JSON.stringify(paintObj));
    emailDonorToSignalInterest(donorEmail, paintObj.brand, paintObj.name)
    try {
        Logger.info("hey Somebody is actually trying to send a mail about a paint!");
        let paintChip = new PaintCan(paintObj);
        res.send({fakeEmailSent: true});
    } catch (error) {
        Logger.info(error);
        res.send({status: "error"})
    }
};

module.exports = {
    sendMail
};