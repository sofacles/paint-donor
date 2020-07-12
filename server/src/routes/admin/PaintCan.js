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

const adminLogin = async (req, res) => {
  const { userName, password } = req.body;
  const doResponse = (val) => {
    res.send({
      status: 200,
      data: {
        result: `success-${userName}`,
      },
    });
  };
  await new Promise((resolve) => {
    setTimeout(doResponse, 1000);
  });
};

const myAsyncFxn = async (v) => {
  await setTimeout(() => {
    Promise.resolve('Hey, everything is OK!');
  }, 1000);
};

module.exports = { adminLogin, deletePaint };
