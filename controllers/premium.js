const Expense = require('../models/expense');
const User = require('../models/user');
const { format } = require('date-fns');


exports.downloadExpenses = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user || !user.isPremiumUser) {
      return res.status(403).json({ message: 'Access denied. Only premium users can download reports.' });
    }

    const expenses = await Expense.findAll({ where: { UserId: req.user.id } });
    if (!expenses.length) {
      return res.status(404).json({ message: 'No expenses found to download.' });
    }

    let csv = "Amount,Description,Category,Date\n";
    expenses.forEach(exp => {
      csv += `${exp.amount},"${exp.description}",${exp.category},${format(new Date(exp.createdAt), 'yyyy-MM-dd')}\n`;
    });

    res.setHeader('Content-Disposition', `attachment; filename="Expenses_${req.user.id}.csv"`);
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);

  } catch (err) {
    res.status(500).json({ message: 'Failed to generate CSV', error: err.message });
  }
};


exports.upgradeToPremium = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isPremiumUser = true;
    await user.save();

    res.json({ message: '🎉 You are now a Premium User!', isPremiumUser: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upgrade to premium', error: err.message });
  }
};


exports.showLeaderboard = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user || !user.isPremiumUser) {
      return res.status(401).json({ message: 'Access denied. Only premium users can view leaderboard.' });
    }

    const users = await User.findAll({
      attributes: ['name', 'total_expense'],
      order: [['total_expense', 'DESC']]
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error: err.message });
  }
};
