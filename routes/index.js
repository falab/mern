'use strict';

const express = require('express');
const router = new express.Router();

/* Main app route */
router.get(['/', '/*'], (req, res) => {
  res.render('index', { title: 'Thezanke.com' });
});

module.exports = router;
