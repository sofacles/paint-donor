const config = require('../config');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  levels: winston.config.npm.levels,
  format: winston.format.json(),
  //   defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: `${config.logFolder}/error.log`,
      level: 'error',
    }),
    new winston.transports.File({
      filename: `${config.logFolder}/combined.log`,
    }),
  ],
});

// I know, this looks creepy. But I swear I'm just curious who would be requesting this page, since I haven't listed with any of the search engines yet and I don't have any uers.
const logRequest = (
  url,
  remoteAddress = '',
  forwardedFor = '',
  body = {},
  qs = ''
) => {
  const logMsg = `Request received for ${url} from remote address:${remoteAddress}, forwardedFor:${forwardedFor}.  
    Body: ${JSON.stringify(body)} requested: ${new Date()} 
    qs: ${qs}`;
  logger.info(logMsg);
};

module.exports = {
  Logger: logger,
  logRequest,
};
