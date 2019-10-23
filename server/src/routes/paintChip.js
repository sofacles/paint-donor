const scrapPaintUnit = require("../../../models/ScrapPaintUnit");


const addPaintCan = async (req, res) => {
  var paintChip = new scrapPaintUnit.PaintCan(req.body);
  if(req.file) {
    //set the imageName in the DB document
  }
  const result = await paintChip.save();
  if(result.errors){
    console.info(result.errors);
    res.send(result.errors);
  } else {
    res.send(result);
  }
};


const getPaints = async (req, res) => {
  let scrapPaintModel = new scrapPaintUnit.ScrapPaintModel("mongodb://127.0.0.1:27017/PaintChip"); 
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