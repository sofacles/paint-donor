const { Logger } = require("../logger");
const path = require('path');

const get = async (req, res) => {
  const knownUrls = ['home', 'browse', 'colorPicker', 'donate'];
  if(!req.query['pg'] || knownUrls.indexOf(req.query['pg']) === -1) {
    Logger.error(`Somebody is requesting something with a weird qs: ${JSON.stringify(req.query)}`);
    res.send("{bar:'gooskis'}");
    return;
  } 
  console.log(`pageView for ${req.query['pg']}`);
  const logMsg = `${req.query['pg']} requested: ${new Date()} from: ${req.connection.remoteAddress}` 
   + ` Fwd4: ${req.headers['x-forwarded-for']}`;
   Logger.info(logMsg);
   res.setHeader('Content-Type','image/png');
   res.sendFile(path.join(__dirname, '../../images/1x1.png'));
};

module.exports = {
  get 
}