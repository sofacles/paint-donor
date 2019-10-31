const scrapPaintUnit = require("../../../models/ScrapPaintUnit");
const config = require("../../../config")

const addPaintCan = async (req, res) => {
  var paintObj = req.query;
  if(req.file && req.body.imageName) {
    paintObj.imageName = req.file.filename;
  }

  let result = "unset";
  try {
    let paintChip = new scrapPaintUnit.PaintCan(paintObj);
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
  let mongoUrl = config.MongoUrl;
  let scrapPaintModel = new scrapPaintUnit.ScrapPaintModel(mongoUrl); 
  // Connect to the db
  let paintCan = await scrapPaintModel.doConnection();
  if(paintCan instanceof Error) {
    res.send("Error while getting paintcan");
  } else {
    paintCan.find({}, (err, paints) => {
      if(err) {
        res.send(err);
      }
      res.send(paints);
    });
  }
}

module.exports = {
  getPaints, 
  addPaintCan
}