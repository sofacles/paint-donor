const fs = require("fs");
const path = require("path");
const { PaintCan } = require("../../../models");
const sharp = require("sharp");
const { encrypt } = require("../../src/cryptoService");
const { Logger } = require("../logger");

const addPaintCan = async (req, res) => {
  Logger.info("At top of addPaintCan");
  Logger.info(`process.env.NODE_ENV is: ${process.env.NODE_ENV}`)
  const postedPaint = req.query;
  let paintObj = Object.assign({}, req.query);
  paintObj.email = encrypt(postedPaint.email);
  //I want to force validation of rgb or imageName to occur on this posted object, so setting them to empty strings
  paintObj.rgb = paintObj.rgb ? paintObj.rgb : "";
  paintObj.imageName = "";
  if(req.file && req.body.imageName) {
    const { filename: image } = req.file;
    let newPath = path.resolve(req.file.destination,'resized', image).replace(".jpg", ".png");
    Logger.info(`resized photo upload path: ${newPath}`);
    //I should figure out how to offload this work to another service
    try {
      await sharp(req.file.path)
    .resize(256)
    .png()
    .toFile(newPath);
    } catch (error) {
      Logger.error("Exception caught resizing", JSON.stringify(error));
    }

    //delete the large file
    fs.unlinkSync(req.file.path);
    
    paintObj.imageName = req.file.filename.replace(".jpg", ".png");;
  }

  let result = "unset";
  try {
    Logger.info(JSON.stringify(paintObj));
    let paintChip = new PaintCan(paintObj);
    result = await paintChip.save();
  } catch (error) {
    Logger.info(JSON.stringify(error));
  }
 
  if(result.errors){
    Logger.info("Saved without throwing, but there are errors:", JSON.stringify(result.errors));
  } else {
    res.send(result);
  }
};


const getPaints = async (req, res) => {
  PaintCan.find({}, (err, paints) => {
    if(err) {
      res.send(err);
    }
    const paintsWithoutEmails = paints.map(p => ({
      rgb: p.rgb,
        brand: p.brand,
        name: p.name,
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