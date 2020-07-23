const jwt = require('jsonwebtoken');
const config = require('../../../config');
const {
  admin: { secret },
} = config;

const withAuth = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.macGuffin = decoded.macGuffin;
        next();
      }
    });
  }
};
module.exports = withAuth;
