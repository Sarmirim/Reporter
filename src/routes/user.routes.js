const express = require('express');

const { isLoggedIn } = require('../lib/auth');
const { renderUserProfile } = require('../controllers/user.controller');


const router = express.Router();

router.get('/profile', isLoggedIn, renderUserProfile);

module.exports = router;