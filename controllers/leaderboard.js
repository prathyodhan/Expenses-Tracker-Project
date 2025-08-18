const { Sequelize } = require('sequelize');
const User = require('../models/user');
const Expense = require('../models/expense');

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.findAll({
      attributes: [
        'id',
        'name',
        [Sequelize.fn('SUM', Sequelize.col('Expenses.amount')), 'total_expense']
      ],
      include: [{ model: Expense, attributes: [], as: 'Expenses' }],
      group: ['User.id'],
      order: [[Sequelize.literal('total_expense'), 'DESC']]
    });

    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving leaderboard', error: err.message });
  }
};
