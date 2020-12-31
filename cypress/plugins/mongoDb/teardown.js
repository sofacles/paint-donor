const { MongoClient } = require('mongodb');
const config = require('../../../server/config');

const uri = config.mongoUri;

const Teardown = async () => {
  return new Promise((resolve) => {
    MongoClient.connect(uri, (err, client) => {
      if (err) {
        console.log(`MONGO CONNECTION ERROR: ${err}`);
        throw err;
      } else {
        const database = client.db('TestPaintChip');
        const collection = database.collection('paintcans');

        console.log('about to delete');
        const result = collection.deleteMany({});
        console.log('Deleted ' + result.deletedCount + ' documents');
        resolve(result);
      }
    });
  });
};

module.exports = Teardown;
