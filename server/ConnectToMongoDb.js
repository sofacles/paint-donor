var MongoClient = require('mongodb').MongoClient;
const config = require('./config');

const dbOptions = config.options;
const uri = `mongodb://${dbOptions.user}:${dbOptions.pass}@127.0.0.1:27017/TestPaintChip?useNewUrlParser=true&authsource=admin`;
console.log('***********');
console.log(uri);

const client = new MongoClient(uri);
async function findLeopard() {
  try {
    await client.connect();
    const database = client.db('TestPaintChip');
    const collection = database.collection('paintcans');

    const query = { name: 'Leopard' };

    const paint = await collection.findOne(query);
    // since this method returns the matched document, not a cursor, print it directly
    console.log(paint);
  } finally {
    await client.close();
  }
}

async function deleteTestPaints() {
  try {
    await client.connect();
    const database = client.db('TestPaintChip');
    const collection = database.collection('paintcans');
    // Query for all movies with the title "Santa Claus"
    const query = { name: 'Leopard' };
    const result = await collection.deleteMany(query);
    console.log('Deleted ' + result.deletedCount + ' documents');
  } finally {
    await client.close();
  }
}

async function createTestPaints() {
  try {
    await client.connect();
    const database = client.db('TestPaintChip');
    const collection = database.collection('paintcans');

    const doc = {
      _id: '5df8f82568aca435b9abed7f',
      brand: 'Sherwin-Williams',
      name: 'Leopard',
      quantity: 'less than a gallon',
      email:
        'c28382111eaefbed156f20302a27b97d:f7b195913fe20d1eb106a098beb87f16',
      rgb: '#788',
      imageName: '',
    };
    const result = await collection.insertOne(doc);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
    );
  } finally {
    await client.close();
  }
}
findLeopard().catch(console.dir);
