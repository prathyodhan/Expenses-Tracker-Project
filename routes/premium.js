const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/premium');
const authenticate = require('../middleware/auth'); // JWT middleware

router.post('/upgrade', authenticate, premiumController.upgradeToPremium);
router.get('/download', authenticate, premiumController.downloadExpenses);
router.get('/showleaderboard', authenticate, premiumController.showLeaderboard);

module.exports = router;
