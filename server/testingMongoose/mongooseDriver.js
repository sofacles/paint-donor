//Since Seed() is failing with:

// TypeError: Cannot read property 'insertOne' of null
// at NativeCollection.<computed> [as insertOne] (/Users/esteban/Websites/paint-donor/server/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:166:24)
// at model.Model.$__handleSave (/Users/esteban/Websites/paint-donor/server/node_modules/mongoose/lib/model.js:262:33)
// at model.Model.$__save (/Users/esteban/Websites/paint-donor/server/node_modules/mongoose/lib/model.js:320:8)
// at /Users/esteban/Websites/paint-donor/server/node_modules/kareem/index.js:278:20
// at _next (/Users/esteban/Websites/paint-donor/server/node_modules/kareem/index.js:102:16)
// at /Users/esteban/Websites/paint-donor/server/node_modules/kareem/index.js:507:38
// at processTicksAndRejections (internal/process/task_queues.js:75:11)

// So  I'm going to see if I can just use these mongoose models to populate the db from a regular node script.

const mongoose = require('mongoose');
const config = require('../config.js');
const dbURI = config.mongoUri;
const { PaintCan } = require('../models');

const docs = [
  {
    brand: 'Behr',
    name: 'WithoutConfirmedEmail',
    quantity: 'less than two gallons',
    sheen: 'eggshell',
    email:
      'da99b7afb9f9ae8c11b659feb07d615a:0d6a668653d846f35d76f74fb11288286049d9267e743bdce52a08103c8c810a',
    zipCode: '98122-4929',
    rgb: '4B7',
    secret: '9a933639-c7a5-4a3f-8f32-2a51041866b8',
    imageName: '',
  },
  {
    brand: 'Glidden',
    name: 'WithConfirmedEmail',
    quantity: 'less than five gallons',
    sheen: 'gloss',
    email:
      '1ac36bc34a98d7a19d8dc9d456372114:b055445b9252cc704c12e9938663cf1fcc34aa5d7b77fb85212a30fe45b5196c',
    emailConfirmed: true,
    zipCode: '98122',
    rgb: 'C57',
    secret: '5d81d0b4-88a3-41dc-bc8e-8e88c3f7b8fa',
    imageName: '',
  },
];

const mongooseDriver = async () => {
  return new Promise((resolve) => {
    mongoose.connect(dbURI);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log('ok, the mongoose connection is open');
      PaintCan.deleteMany({ name: docs[0].name }, function (err, theCan) {
        if (err) return console.error(err);
        console.log('inside the deleteAll() callback *****');
        console.info(theCan);
        resolve(theCan);
      });
    });
  });
};

const insertAPaint = async () => {
  return new Promise((resolve) => {
    mongoose.connect(dbURI);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log('ok, the mongoose connection is open');
      let paintCan = new PaintCan(docs[0]);
      paintCan.save(function (err, theCan) {
        if (err) return console.error(err);
        console.log('inside the save() callback *****');
        console.info(theCan);
        resolve(theCan);
      });
    });
  });
};

mongooseDriver().catch((err) => {
  console.log('inside the catch after running mongooseDriver fxion');
  console.info(err);
});
