const config = require("../config")
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  levels: winston.config.npm.levels,
  format: winston.format.json(),
//   defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: `${config.logFolder}/error.log`, level: "error" }),
    new winston.transports.File({ filename: `${config.logFolder}/combined.log` })
  ]
});


module.exports = {
  Logger : logger
};
