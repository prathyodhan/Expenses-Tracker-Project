const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../models/db');


exports.addExpense = async (req, res) => {
  const { amount, description, category } = req.body;
  const t = await sequelize.transaction();

  try {
    const expense = await Expense.create({
      amount,
      description,
      category,
      UserId: req.user.id
    }, { transaction: t });

    
    const user = await User.findByPk(req.user.id, { transaction: t });
    user.total_expense = Number(user.total_expense) + Number(amount);
    await user.save({ transaction: t });

    await t.commit();
    res.json(expense);
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: 'Error adding expense' });
  }
};


exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { UserId: req.user.id }
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses' });
  }
};


exports.deleteExpense = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const id = req.params.id;
    const expense = await Expense.findOne({
      where: { id, UserId: req.user.id },
      transaction: t
    });

    if (!expense) {
      await t.rollback();
      return res.status(404).json({ message: 'Expense not found' });
    }

    await Expense.destroy({
      where: { id, UserId: req.user.id },
      transaction: t
    });

    
    const user = await User.findByPk(req.user.id, { transaction: t });
    user.total_expense = Number(user.total_expense) - Number(expense.amount);
    await user.save({ transaction: t });

    await t.commit();
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: 'Error deleting expense' });
  }
};
