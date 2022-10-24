require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  if (!req.headers['authorization']) return res.status(401).json({ error_message: 'UnAuthorized' });
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
      return res.status(401).json({ error_message: message });
    }
    req.user = payload;
    next();
  });
}

module.exports = auth;
