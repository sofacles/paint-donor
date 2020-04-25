const { Logger } = require("../logger");
const path = require('path');

const homePage = async (req, res) => {
  const logMsg = `HomePage requested ${new Date()} from ${req.connection.remoteAddress}` 
   + ` Fwd4: ${req.headers['x-forwarded-for']}`;
   Logger.info(logMsg);
   res.setHeader('Content-Type','image/png');
   res.sendFile(path.join(__dirname, '../../images/1x1.png'));
};

module.exports = {
  homePage 
}