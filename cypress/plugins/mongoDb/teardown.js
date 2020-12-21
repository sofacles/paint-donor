const { MongoClient } = require('mongodb');
const config = require('../../../server/config');

const uri = config.mongoUri;

const client = new MongoClient(uri);

const Teardown = async () => {
  try {
    await client.connect();
    const database = client.db('TestPaintChip');
    const collection = database.collection('paintcans');
    const query = { name: 'Leopard' };
    const result = await collection.deleteMany(query);
    console.log('Deleted ' + result.deletedCount + ' documents');
    return new Promise((resolve) => setTimeout(() => resolve(42), 10));
  } finally {
    await client.close();
  }
};

module.exports = Teardown;
