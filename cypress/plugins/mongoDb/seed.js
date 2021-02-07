const mongoose = require('mongoose');
const { PaintCan } = require('./models/PaintCan');
const config = require('./config');
const dbURI = config.mongoUri;
const oneWithEmailConfirmedOneWithout = require('../../fixtures/paint/oneWithEmailConfirmedOneWithout');
const thePaints = oneWithEmailConfirmedOneWithout();

const Seed = async () => {
  return new Promise((resolve) => {
    mongoose.connect(dbURI);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log('mongoose connection is open');
      PaintCan.insertMany(thePaints, function (err, theCans) {
        if (err) return console.error(err);
        console.info(`**** Inserting ${theCans.length} cans`);
        resolve(theCans);
      });
    });
  });
};

module.exports = Seed;
