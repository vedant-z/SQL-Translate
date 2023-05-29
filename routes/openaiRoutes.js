const express = require('express');
const { generateSQLQuery } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generatesqlquery', generateSQLQuery);

module.exports = router;
