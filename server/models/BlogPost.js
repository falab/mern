import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  author: String,
  title: {
    type: String,
    default: 'Untitled Post',
  },
  content: String,
}, { timestamps: true });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
