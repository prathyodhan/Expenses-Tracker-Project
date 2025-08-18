const { v4: uuidv4 } = require('uuid');
const ForgotPasswordRequest = require('../models/forgotPasswordRequest');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const superagent = require('superagent');


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const id = uuidv4();
    await ForgotPasswordRequest.create({ id, UserId: user.id, isactive: true });

    const resetLink = `http://localhost:3000/password/resetpassword/${id}`;

    
    await superagent
      .post('https://api.sendinblue.com/v3/smtp/email')
      .set('api-key', process.env.SENDINBLUE_API_KEY)
      .set('Content-Type', 'application/json')
      .send({
        sender: { email: process.env.SENDER_EMAIL, name: 'Expense Tracker App' },
        to: [{ email }],
        subject: 'Password Reset Request',
        htmlContent: `<p>Hello ${user.name || ''},</p>
                      <p>Click the link below to reset your password:</p>
                      <a href="${resetLink}">${resetLink}</a>
                      <p>This link will expire after one use.</p>`
      });

    res.status(200).json({ message: 'Reset link sent to email' });
  } catch (err) {
    console.error('Forgot Password Error:', err.response?.body || err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getResetForm = async (req, res) => {
  const { uuid } = req.params;

  try {
    const resetRequest = await ForgotPasswordRequest.findOne({
      where: { id: uuid, isactive: true },
    });

    if (!resetRequest) {
      return res.status(400).send('Reset link is invalid or has expired.');
    }

    res.send(`
      <h2>Reset Password</h2>
      <form method="POST" action="/password/resetpassword/${uuid}">
        <input type="password" name="newpassword" placeholder="Enter new password" required />
        <button type="submit">Reset Password</button>
      </form>
    `);
  } catch (err) {
    console.error('Get Reset Form Error:', err);
    res.status(500).send('Internal server error');
  }
};


exports.updatePassword = async (req, res) => {
  const { uuid } = req.params;
  const { newpassword } = req.body;

  try {
    if (!newpassword || newpassword.length < 6) {
      return res.status(400).send('Password must be at least 6 characters long.');
    }

    const resetRequest = await ForgotPasswordRequest.findOne({
      where: { id: uuid, isactive: true },
    });

    if (!resetRequest) {
      return res.status(400).send('Reset link is invalid or has expired.');
    }

    const user = await User.findByPk(resetRequest.UserId);
    if (!user) return res.status(404).send('User not found');

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await user.update({ password: hashedPassword });

    await resetRequest.update({ isactive: false });

    res.send('Password has been successfully updated. You can now log in.');
  } catch (err) {
    console.error('Update Password Error:', err);
    res.status(500).send('Internal server error');
  }
};
