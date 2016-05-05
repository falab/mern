'use strict';

const express = require('express');
const router = new express.Router();

router.use('/blog', require('./blog'));
router.use('/socialIcons', require('./socialIcons'));

module.exports = router;
