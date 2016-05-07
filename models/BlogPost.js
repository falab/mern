const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  author: String,
  title: {
    type: String,
    default: 'Untitled Post',
  },
  content: String,
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
