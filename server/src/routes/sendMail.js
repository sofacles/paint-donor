const { PaintCan } = require("../../../models");
const {decrypt} = require("../../src/cryptoService");

const sendMail = async (req, res) => {
    const paintObj = req.body.paint;

    const thisPaint = await PaintCan.findOne({_id: paintObj._id});
    if(thisPaint == null) {
        res.send("no such paint");
        return;
    }
    const donorEmail = decrypt(thisPaint.email);
    try {
        let paintChip = new PaintCan(paintObj);
        res.send({fakeEmailSent: true});
    } catch (error) {
        console.info(error);
        res.send({status: "error"})
    }
};

module.exports = {
    sendMail
};