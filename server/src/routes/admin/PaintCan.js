const { PaintCan } = require('../../../models');
const deletePaint = async (req, res) => {
  let deleteResult = await PaintCan.deleteOne({ _id: req.query.id });
  res.send({
    status: 200,
    data: {
      result:
        deleteResult.deletedCount === 1 ? 'delete succeeded' : 'deleteFailed',
    },
  });
};

module.exports = { deletePaint };
