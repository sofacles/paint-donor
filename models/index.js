const mongooseConnection = require("../server/src/mongooseConnection");
const modelFactory = require( "./PaintCan");
const { PaintCan} = modelFactory(mongooseConnection);

module.exports = {
    PaintCan
}