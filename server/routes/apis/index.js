const font = require('./font');
const express = require('express');

const router = express.Router();
router.use('/font', font);

module.exports = router;
