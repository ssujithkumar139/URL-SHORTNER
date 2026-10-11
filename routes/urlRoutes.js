const express = require('express');
const router = express.Router();

const { createUrl } = require('../controllers/urlController');

router.post('/url', createUrl);

module.exports = router;