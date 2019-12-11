const fs = require("fs");
const path = require("path");
const { PaintCan } = require("../../../models");
const sharp = require("sharp");
const {encrypt} = require("../../src/cryptoService");

const addPaintCan = async (req, res) => {
  const postedPaint = req.query;
  let paintObj = Object.assign({}, req.query);
  paintObj.email = encrypt(postedPaint.email);

  //I want to force validation of rgb or imageName to occur on this posted object, so setting them to empty strings
  paintObj.rgb = paintObj.rgb ? paintObj.rgb : "";
  paintObj.imageName = "";
  if(req.file && req.body.imageName) {

    const { filename: image } = req.file;
    let newPath = path.resolve(req.file.destination,'resized', image).replace(".jpg", ".png");

    //Obviously, I should figure out how to offload this work to another service, but let me deploy just once...
    await sharp(req.file.path)
    .resize(256)
    .png()
    .toFile(newPath);
    
    //delete the large file
    fs.unlinkSync(req.file.path);
    
    paintObj.imageName = req.file.filename.replace(".jpg", ".png");;
  }

  let result = "unset";
  try {
    let paintChip = new PaintCan(paintObj);
    result = await paintChip.save();
  } catch (error) {
    console.info(error);
  }
 
  if(result.errors){
    console.info(result.errors);
    res.send(result.errors);
  } else {
    res.send(result);
  }
};


const getPaints = async (req, res) => {
  console.log("**** top of getPaints route");
  console.info(PaintCan);
  PaintCan.find({}, (err, paints) => {
    if(err) {
      res.send(err);
    }
    const paintsWithoutEmails = paints.map(p => ({
      rgb: p.rgb,
        brand: p.brand,
        name: p.brand,
        quantity: p.quantity,
        sheen: p.sheen,
        imageName: p.imageName,
        _id: p._id
    }));
    res.send(paintsWithoutEmails);
  });
}

module.exports = {
  getPaints, 
  addPaintCan
}