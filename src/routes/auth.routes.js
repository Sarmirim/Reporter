const express = require('express');

const { renderSignUp, signUp, renderSignIn, signIn, logout } = require('../controllers/auth.controller')


const router = express.Router();

router.get('/signup', renderSignUp);
router.post('/signup', signUp);

router.get('/signin', renderSignIn);
router.post('/signin', signIn);

router.get('/logout', logout);

module.exports = router;