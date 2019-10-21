

const getPaints = require( "../src/routes/paintChip");
const express = require("express");
const {MongoClient} = require('mongodb');

const stubbedPaintChips = [
  {
    "_id":"8d7bc6dae3535e1db89c7e54",
    "rgb":"555",
    "brand":"TestBrand",
    "name":"Test process.env",
    "quantity":"hopefully I'm not in the read db",
    "email":"abc@yahoo.com"
  },
  { 
      "_id":"5de54",
      "rgb":"4bbb44",
      "brand":"Miller",
      "name":"avocado",
      "quantity":"1 gal",
      "email":"beyonce@gmail.com",
  }
];

const initRoute = () => {
  const app = express();
  app.use(getPaints);
  return app;
}

describe('GET /', () => {
  let connection;
  let db;

  beforeAll(async () => {
    console.log(`process.env.MONGO_URL is ${process.env.MONGO_URL} ************`);
    connection = await MongoClient.connect(
      `${process.env.MONGO_URL}`, 
      {
        useNewUrlParser: true,
      });

    db = await connection.db("jest");
    // OK, so you don't want to add your test data like this:
    // const paintChip = new PaintCan(stubbedPaintChips[0]);
    // let savedPaintChip = await paintChip.save();
    // because the PaintCan model has its own connection and it's not using the in-memory DB
  });


  test('It should 200 and return some paint chips', async () => {
  
    const paintcans = db.collection('paintcans');
    await paintcans.insertOne(stubbedPaintChips[0]);

    const insertedPaintCan = await paintcans.findOne({_id: stubbedPaintChips[0]._id});
    expect(insertedPaintCan).toEqual(stubbedPaintChips[0]);
  });
});