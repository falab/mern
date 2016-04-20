'use strict';

const express = require('express');
const router = new express.Router();
const posts = require('../../data/posts');

// Posts index
router.get([ '/', '/posts' ], (req, res) => {
  let count;

  if (req.query.count || req.query.count !== '0') {
    count = parseInt(req.query.count, 10);
  }

  return res.json(count ? posts.slice(0, count) : posts);
});

// Post show
router.get('/post/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    return res.json({
      error: 'id_not_integer',
    });
  }

  const post = posts.find((p) => (
    p.id === parseInt(req.params.id, 10)
  ));

  if (!post) {
    return res.json({
      error: 'post_not_found',
    });
  }

  return res.json(post);
});

// Post create
router.post([ '/', '/posts' ], (req, res) => {
  const reqBody = req.body;
  const post = posts.addPost({
    author: 'Alex Howard',
    title: reqBody.title,
    content: reqBody.content,
  });

  return res.json(post);
});

module.exports = router;
