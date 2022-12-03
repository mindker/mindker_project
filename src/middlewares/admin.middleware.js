const jwt = require('jsonwebtoken');

const magic = require('../utils/magic');

const isAdmin = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.json(magic.ResponseService(null, 401, 'Not authorized', null));

  const splits = authorization.split(' ');

  if (splits.length != 2 || splits[0] != 'Bearer')
    return res.json(magic.ResponseService(null, 400, 'Not bearer', null));

  const jwtStringify = splits[1];

  try {
    var token = jwt.verify(jwtStringify, req.app.get('secretKey'));
  } catch (error) {
    return res.json(setError(401, 'Token invalid'));
  }

  const authority = {
    id: token.id,
    name: token.name,
    role: token.role,
  };

  if (token.role === 'admin') {
    req.authority = authority;
    next();
  } else {
    next(magic.ResponseService(null, 401, 'Not authorized', null));
  }
};

module.exports = { isAdmin };
