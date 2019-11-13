module.exports = function(mongoose) {
  const PaintCanSchema = new mongoose.Schema({
    rgb: { type: String, required: false },
    imageName: { type: String, required: false },
    brand: {
      type: String,
      required: true,
      validate: function(e) {
        let result2 = (this.rgb !== undefined && this.rgb.length > 3)  || 
                (this.imageName !== undefined && this.imageName.length > 3);
        return result2;
      }
    },
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    email: { type: String, required: true },
    emailConfirmed: { type: Boolean, required: false },
    sheen: { type: String, requied: false }
  });

  const PaintCan = mongoose.model("PaintCan", PaintCanSchema);

  return { PaintCanSchema, PaintCan };
};
