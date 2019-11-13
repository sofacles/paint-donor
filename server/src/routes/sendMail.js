const PaintChip = require( "../../../models/PaintChip");

const sendMail = (req, res) => {
    const paintObj = req.body.paint;
    const fromEmail = req.body.fromEmail;
    try {
        let paintChip = new PaintChip(paintObj);
        res.send({fakeEmailSent: true});
    } catch (error) {
        console.info(error);
        res.send({status: "error"})
    }
};

module.exports = {
    sendMail
};