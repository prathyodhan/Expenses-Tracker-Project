
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const logger = require('./logger'); 

const sequelize = require('./models/db');


const User = require('./models/user');
const Expense = require('./models/expense');
const ForgotPasswordRequest = require('./models/forgotPasswordRequest');

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const leaderboardRoutes = require('./routes/leaderboard');
const passwordRoutes = require('./routes/password');
const premiumRoutes = require('./routes/premium');

const app = express();


const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));


app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));


User.hasMany(Expense, { as: 'Expenses' });
Expense.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);


app.use('/api', authRoutes);
app.use('/api', expenseRoutes);
app.use('/premium', leaderboardRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', passwordRoutes);


app.use((err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.url}`);
  res.status(500).json({ error: 'Internal Server Error' });
});


sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(` Server running on http://localhost:${PORT}`)
  );
});
