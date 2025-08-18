const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash, isPremiumUser: false }); // default false
    res.json({ message: 'Successfully created new user' });
  } catch (err) {
    res.status(500).json({ message: 'User already exists or DB error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, 'secretkey');
      
      res.json({
        token,
        isPremiumUser: user.isPremiumUser === true || user.isPremiumUser === 1,
        message: 'Login successful'
      });
    } else {
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error during login' });
  }
};
