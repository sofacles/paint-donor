const mongooseConnection = require("../src/mongooseConnection");
const modelFactory = require( "./PaintCan");
const { PaintCan} = modelFactory(mongooseConnection);
const  PersonWithEmailFactory = require("./PersonWithEmail");
const { PersonWithEmailModel } = PersonWithEmailFactory(mongooseConnection);

module.exports = {
    PaintCan,
    PersonWithEmailModel  
}