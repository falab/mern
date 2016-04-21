'use strict';

const express = require('express');
const router = new express.Router();
const posts = require('../../data/posts');

// Posts index
router.get('/', (req, res) => {
  let count;

  if (req.query.count || req.query.count !== '0') {
    count = parseInt(req.query.count, 10);
  }

  const _posts = count ? posts.slice(0, count) : posts;

  return res.json({ success: true, posts: _posts });
});

// Post create
router.post('/', (req, res) => {
  const reqBody = req.body;
  const post = posts.addPost({
    author: 'Alex Howard',
    title: reqBody.title,
    content: reqBody.content,
  });

  return res.json({ success: true, post });
});

// Post show
router.get('/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    return res.json({
      success: false,
      error: 'id_not_integer',
    });
  }

  const post = posts.find(p => p.id === parseInt(req.params.id, 10));

  if (!post) {
    return res.json({
      success: false,
      error: 'post_not_found',
    });
  }

  return res.json({ success: true, post });
});

router.delete('/:id', (req, res) => {

  if (isNaN(req.params.id)) {
    return res.json({
      success: false,
      error: 'id_not_integer',
    });
  }

  const id = parseInt(req.params.id, 10);

  if (posts.deleteById(id) === false) {
    return res.json({
      success: false,
      error: 'post_not_found',
    });
  }

  return res.json({ success: true, id });
});

module.exports = router;
