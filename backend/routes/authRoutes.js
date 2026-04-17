const express = require('express');
const router = express.Router();
const { signup, signin, createGuest } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/guest', createGuest);

module.exports = router;
