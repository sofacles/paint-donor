const { MongoClient } = require('mongodb');
const config = require('../../../server/config');

const uri = config.mongoUri;

const Seed = async () => {
  return new Promise((resolve) => {
    MongoClient.connect(uri, (err, client) => {
      if (err) {
        console.log(`MONGO CONNECTION ERROR: ${err}`);
        throw err;
      } else {
        const database = client.db('TestPaintChip');
        const collection = database.collection('paintcans');

        const docs = [
          {
            _id: '4df8f82568aca435b9abed7e',
            brand: 'Sherwin-Williams',
            emailConfirmed: true,
            name: 'WithConfirmedEmail',
            quantity: 'less than a gallon',
            email: 'c28382111eaefbed156fc87d266341ec06a098beb87f16',
            rgb: '#788',
            imageName: '',
            secret: 'yuikn877wusjqvguq',
          },
          {
            _id: '5df8f82568aca435b9abed7f',
            brand: 'SuperLopez',
            name: 'WithoutConfirmedEmail',
            quantity: 'less than a gallon',
            email: 'someHashedValue',
            rgb: '#788',
            imageName: '',
            secret: 'malva877ardjqvguq',
          },
        ];
        const result = collection.insertMany(docs);
        resolve(result);
      }
    });
  });
};

module.exports = Seed;
