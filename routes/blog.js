'use strict';

const express = require('express');
const logger = require('morgan');

const router = new express.Router();
const BlogPost = require('../models/BlogPost');
const blogPostFields = {
  author: 1,
  title: 1,
  content: 1,
  createdAt: 1,
  updatedAt: 1,
};

// Posts index
router.get('/', (req, res) => {
  let count;

  if (req.query.count || req.query.count !== '0') {
    count = parseInt(req.query.count, 10);
  }

  const query = BlogPost.find({});

  if (count) query.limit(count);

  query
    .select(blogPostFields)
    .sort({ _id: -1 })
    .exec((err, posts) => {
      if (err) {
        res.status(500).json({ error: 'db_error' });
        logger.error(err);
        return;
      }

      res.json({ posts });
    });
});

// Post create
router.post('/', (req, res) => {
  let { title, content } = req.body;

  title = title.trim();
  content = content.trim();

  BlogPost.create({
    author: 'Alex Howard',
    title: title || undefined,
    content,
  }, (err, post) => {
    if (err) {
      res.status(500).json({ error: 'db_error' });
      logger.error(err);
      return;
    }

    res.json({ post });
  });
});

// Post show
router.get('/:id', (req, res) => {
  const id = req.params.id;

  if (typeof id !== 'string') {
    res.status(500).json({ error: 'id_not_string' });
    return;
  }

  BlogPost.findById(id, (err, post) => {
    if (err) {
      res.status(500).json({ error: 'db_error' });
      logger.error(err);
      return;
    }

    if (!post) {
      res.status(500).json({ error: 'post_not_found' });
      return;
    }

    res.json({ success: true, post });
  });
});

// Post delete
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  if (typeof id !== 'string') {
    res.status(500).json({ error: 'id_not_string' });
    return;
  }

  BlogPost.findById(id).remove((err) => {
    if (err) {
      res.status(500).json({ error: 'db_error' });
      logger.error(err);
      return;
    }

    res.json({ id });
  });
});

module.exports = router;
