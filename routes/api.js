const express = require('express');
const router = new express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'Api is working!' });
});

module.exports = router;
