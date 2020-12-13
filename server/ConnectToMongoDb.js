var MongoClient = require('mongodb').MongoClient;
const config = require('./config');

const dbOptions = config.options;
const uri = `mongodb://${dbOptions.user}:${dbOptions.pass}@127.0.0.1:27017/TestPaintChip?useNewUrlParser=true&authsource=admin`;
console.log('***********');
console.log(uri);

const client = new MongoClient(uri);
async function run() {
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
run().catch(console.dir);
