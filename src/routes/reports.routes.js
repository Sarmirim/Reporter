const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');
const { renderAddReport, addReport, renderReports, deleteReport, editReport, renderEditReport} = require('../controllers/reports.controller')


// Authorization
router.use(isLoggedIn);

// Routes
router.get('/add', renderAddReport);
router.post('/add', addReport);
router.get('/', isLoggedIn, renderReports);
router.get('/delete/:id', deleteReport);
router.get('/edit/:id', renderEditReport);
router.post('/edit/:id', editReport);

module.exports = router;