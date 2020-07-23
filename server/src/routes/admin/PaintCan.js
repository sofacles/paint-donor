const jwt = require('jsonwebtoken');
const { PaintCan } = require('../../../models');
const config = require('../../../config');
const { logRequest } = require('../../logger');

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
  logRequest(
    'admin/Login',
    req.connection.remoteAddress,
    req.headers['x-forwarded-for'],
    req.body,
    req.query
  );
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(401).json({
      error: 'Incorrect username or password',
    });
  }

  const {
    admin: { user: expectedUserName, password: expectedPassword, secret },
  } = config;

  if (userName !== expectedUserName || password !== expectedPassword) {
    return res.status(401).json({
      error: 'Incorrect username or password',
    });
  }
  const token = jwt.sign({ macGuffin: 'BlackLight' }, secret, {
    expiresIn: '1h',
  });
  res.cookie('token', token).sendStatus(200);
};

module.exports = { adminLogin, deletePaint };
