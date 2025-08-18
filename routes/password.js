const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/password');

// Request reset link
router.post('/forgotpassword', passwordController.forgotPassword);

// Serve reset form
router.get('/resetpassword/:uuid', passwordController.getResetForm);

// Handle new password submission
router.post('/resetpassword/:uuid', passwordController.updatePassword);

module.exports = router;
