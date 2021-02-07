const mongoose = require('mongoose');
const config = require('./config');

const dbURI = config.mongoUri;
const { PaintCan } = require('./models/PaintCan');

const Teardown = async () => {
  return new Promise((resolve) => {
    mongoose.connect(dbURI);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function () {
      console.log('ok, the mongoose connection is open');
      PaintCan.deleteMany({}, function (err, theCan) {
        if (err) return console.error(err);
        console.info(theCan);
        resolve(theCan);
      });
    });
  });
};

module.exports = Teardown;
