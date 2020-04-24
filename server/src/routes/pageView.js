const { Logger } = require("../logger");

const homePage = async (req, res) => {
  const logMsg = `HomePage requested ${new Date()} from ${request.connection.remoteAddress}` 
   + ` Fwd4: ${request.headers['x-forwarded-for']}`;
   Logger.info(logMsg);
   res.sendFile('1x1.png');
};

module.exports = {
  homePage 
}