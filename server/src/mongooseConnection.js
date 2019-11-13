const mongoose = require("mongoose");
const config = require("../../config");
const dbURI = config.MongoUrl;

function handleNonInitialConnectionError(error) {
  console.log("Error with connection to MongoDB.. not initial connection:");
  console.info(error);
}

mongoose.set("bufferCommands", false);

mongoose.connection.on("error", handleNonInitialConnectionError);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to ' + dbURI);
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  }); 
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
  });

mongoose.connect(dbURI, { useNewUrlParser: true });

module.exports = mongoose;


