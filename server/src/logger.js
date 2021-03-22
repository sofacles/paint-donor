const pd_config = require('../config');
const { createLogger, config, format, transports } = require('winston');

require('winston-mongodb');

const logger = createLogger({
  level: 'info',
  levels: config.npm.levels,
  format: format.json(),
  transports: [
    new transports.File({
      filename: `${pd_config.logFolder}/error.log`,
      level: 'error',
    }),
    new transports.MongoDB({
      collection: 'log',
      db: `mongodb://${pd_config.options.user}:${pd_config.options.pass}@localhost:27017/PaintChip`,
      name: 'error-mongo',
      handleExceptions: true,
      level: 'info',
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
