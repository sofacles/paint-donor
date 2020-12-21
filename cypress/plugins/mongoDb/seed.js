const { MongoClient } = require('mongodb');
const config = require('../../../server/config');

const uri = config.mongoUri;
const client = new MongoClient(uri);

const Seed = async () => {
  let result;
  try {
    await client.connect();
    const database = client.db('TestPaintChip');
    const collection = database.collection('paintcans');

    const doc = {
      _id: '5df8f82568aca435b9abed7f',
      brand: 'Sherwin-Williams',
      name: 'Leopard',
      quantity: 'less than a gallon',
      email: 'c28382111eaefbed156fc87d266341ec06a098beb87f16',
      rgb: '#788',
      imageName: '',
      secret: 'yuikn877wusjqvguq',
    };
    result = await collection.insertOne(doc);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
    );
  } finally {
    await client.close();
  }

  return new Promise((resolve) => setTimeout(() => resolve(result), 10));
};

module.exports = Seed;
