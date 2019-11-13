const mongoose = require("../server/src/mongooseConnection")

const PaintCanSchema = new mongoose.Schema({
    rgb: { type: String, required: false },
    imageName: {type: String, required: false },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    email: { type: String, required: true },
    emailConfirmed: { type: Boolean, required: false},
    sheen: {type: String, requied: false}
});

const PaintCan = mongoose.model("PaintCan", PaintCanSchema);

module.exports = PaintCan;
