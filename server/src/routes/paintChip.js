const PaintChip = require( "../../../models/PaintChip");

const addPaintCan = async (req, res) => {
  var paintObj = req.query;
  if(req.file && req.body.imageName) {
    paintObj.imageName = req.file.filename;
  }

  let result = "unset";
  try {
    let paintChip = new PaintChip(paintObj);
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
  PaintChip.find({}, (err, paints) => {
    if(err) {
      res.send(err);
    }
    res.send(paints);
  });
}

module.exports = {
  getPaints, 
  addPaintCan
}