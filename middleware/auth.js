const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = await User.findByPk(decoded.userId);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
