const scrapPaintUnit = require("../../../models/ScrapPaintUnit");

const sendMail = (req, res) => {
    console.log("Hey we are in the Mail route");
    const paintObj = req.body.paint;
    console.info(paintObj);
    const fromEmail = req.body.fromEmail;
    try {
        let paintChip = new scrapPaintUnit.PaintCan(paintObj);
        res.send({fakeEmailSent: true});
    } catch (error) {
        console.info(error);
        res.send({status: "error"})
    }
};

module.exports = {
    sendMail
};