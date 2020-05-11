const { PaintCan } = require("../../models");
const { decrypt } = require("../../src/cryptoService");
const { Logger } = require("../logger");
const runSample = require("./gmailTest")

const sendMail = async (req, res) => {
    Logger.info("Top of sendMail");
    await runSample();
    const paintObj = req.body.paint;

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