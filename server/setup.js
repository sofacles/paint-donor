// setup.js
module.exports = async () => {
    // Set reference to mongod in order to close the server during teardown.
    console.log("********** inside my setup file*********")
    global.__MONGOD__ = mongod;
    global.__MONGO_URI__ = "mongodb://127.0.0.1:27017/PaintChipTests";
};