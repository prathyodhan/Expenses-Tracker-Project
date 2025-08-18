const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenses');
const auth = require('../middleware/auth');

router.post('/expenses', auth, expenseController.addExpense);
router.get('/expenses', auth, expenseController.getExpenses);
router.delete('/expenses/:id', auth, expenseController.deleteExpense);

module.exports = router;
