const mongooseConnection = require("../server/src/mongooseConnection");
const modelFactory = require( "./PaintChip");
const { PaintCan} = modelFactory(mongooseConnection);

module.exports = {
    PaintCan
}