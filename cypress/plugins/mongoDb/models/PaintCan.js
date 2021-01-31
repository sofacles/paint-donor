const mongoose = require('mongoose');

const PaintCanSchema = new mongoose.Schema({
  rgb: {
    type: String,
    required: false,
    validate: {
      validator: function (r) {
        let rgbResult =
          (this.imageName !== undefined && this.imageName.length > 3) ||
          (r !== undefined && r.length >= 3);
        return rgbResult;
      },
    },
  },
  imageName: {
    type: String,
    required: false,
    validate: {
      validator: function (r) {
        let imgNameResult =
          (this.rgb !== undefined && this.rgb.length >= 3) ||
          (r !== undefined && r.length > 3);
        return imgNameResult;
      },
    },
  },
  brand: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  email: { type: String, required: true },
  emailConfirmed: { type: Boolean, required: false },
  secret: { type: String },
  sheen: { type: String, requied: false },
});

const PaintCan = mongoose.model('PaintCan', PaintCanSchema);

module.exports = { PaintCanSchema, PaintCan };
