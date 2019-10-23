const mongoose = require("mongoose");

class ScrapPaintModel {

  handleNonInitialConnectionError(error) {
    console.log("Error with connection to MongoDB.. not initial connection:");
    console.info(error);
  }

  constructor(url) {
    this.uri = url;
    mongoose.set('bufferCommands', false);
  }

  SayHi() {
    return "Hi";
  }

  async doConnection() {
    mongoose.connection.on('error', this.handleNonInitialConnectionError);

    try {
      await mongoose.connect(this.uri, { useNewUrlParser: true });
      return PaintCan;
    } catch (error) {
      console.log("Error while trying to make the original connection to MongoDB:");
      console.info(error);
    }
    return Error("No able to connect");
  }
}


const PaintCanSchema = new mongoose.Schema({
    rgb: { type: String, required: false },
    imageName: {type: String, required: false },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    email: { type: String, required: true },
});

const PaintCan = mongoose.model("PaintCan", PaintCanSchema);
module.exports = { PaintCan , ScrapPaintModel};