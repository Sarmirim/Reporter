const express = require('express');

const { renderIndex } = require('../controllers/index.conroller');


const router = express.Router();

router.get('/', renderIndex);

module.exports = router;