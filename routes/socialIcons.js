'use strict';

const express = require('express');
const router = new express.Router();

// Faux posts array
const socialIcons = [
  {
    id: 1,
    service: 'Facebook',
    iconPath: '/images/facebook_128.png',
    linkUrl: 'http://www.facebook.com/thezanke',
  },
  {
    id: 2,
    service: 'Twitter',
    iconPath: '/images/twitter_128.png',
    linkUrl: 'http://www.twitter.com/thezanke',
  },
  {
    id: 3,
    service: 'LinkedIn',
    iconPath: '/images/linkedin_128.png',
    linkUrl: 'https://www.linkedin.com/in/alex-howard-9597a957',
  },
];

// Posts index
router.get('/', (req, res) => {
  res.json(socialIcons);
});

module.exports = router;
