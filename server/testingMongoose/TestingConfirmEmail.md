# Trying to test my confirmEmail flow.

I tried jest for a while, but I was seeing errors about mongoose not being connected, so I think I was trying to be smarter
about making my express app, or at least my tests, wait for the mongoose connection to finish before starting and I have a note that I was doing:

```
await mongoose.connect(dbURI, dbOptions);
return mongoose;
```

in MongooseConnection.js, but I'm not sure what happened to that. So, I started writing it in cypress.  
In branch `release1.2`, my goal was to remove all documents from the database and seed it with two paints, one with emailConfirmed: true and one without, POST a request to confirmEmail with a valid secret for the unconfirmed email, and then verify that I see TWO paints on getPaints.

I am using cypress plugins to empty and fill my DB with raw mongodb calls, not with mongoose.
In my confirmEmail route, I search for the paint I want to update using the "secret" field, and I can see in the debugger that the paint is being found. But when I set its emailConfirmed flag and save the model, I get:

`UnhandledPromiseRejectionWarning: DocumentNotFoundError: No document found for query "{ _id: 5df8f82568aca435b9abed7f }" on model "PaintCan"`

After that I started a branch called `cantUpdateSeededDB` where I started trying to seed my db with mongoose models in the "cantUpdateSeededDB" branch, where my seed function produces:

```
TypeError: Cannot read property 'insertOne' of null
at node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:166:24)
at model.Model.$__handleSave (/Users/esteban/Websites/paint-donor/server/node_modules/mongoose/lib/model.js:262:33)
at model.Model.$__save (/Users/esteban/Websites/paint-donor/server/node_modules/mongoose/lib/model.js:320:8)
```

To take cypress out of the picture, I moved the seed code into server/mongooseDriver.js. Same error.

When I search for "mongoose TypeError: Cannot read property 'insertOne' of null" it looks like it might have something to do with the connection being closed?

[The issue was in my DB connection. I did not have it setup to wait properly](https://stackoverflow.com/questions/60305454/mongoose-typeerror-cannot-read-property-insertone-of-null)

So, I'll follow https://mongoosejs.com/docs/
and use mongoose connection to get a connection, and wait till I'm in the db.once('open) callback.

```
return new Promise((resolve) => {
    debugger;
    console.log('Hey ******');
    console.info(dbURI);
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
```

I made a copy of my models folder and put it in cypress/plugins. I'm confused by the fact that in some places in paintDonor code I new up the PaintChip model by passing it the instance of mongoose returned by my mongooseConnection module, and sometime by passing it a JSON object. In the copy of the module that declares my model, PaintChip, I am no longer exporting a default function. I require mongoose locally and am exporting the Schema and the Model. Not sure if I need to export the schema.

So, out in teardown, I want an instance of the PaintCan model that I can call `deleteMany` on. I guess I new one up? Well, no, actually I just use the static method on
the model I'm exposing: `PaintCan.deleteMany({ name: docs[0].name }, function (err, theCan) {})`.

In seed, you new up an instance of the modal with JSON and use its save() method.

I should think about using this new, saner way of connecting to mongoDB in the main app.
