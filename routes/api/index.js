'use strict';

const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Api is working!' });
});

router.use('/blog', require('./blog'));

module.exports = router;
