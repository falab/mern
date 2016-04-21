'use strict';

const posts = [];

// Represents the id of the next post created
posts._nextId = 1;

posts.addPost = function (post) {
  // Get the current post id
  const postId = this._nextId;

  // Increment the next id
  this._nextId += 1;

  // Create the post object
  const newPost = {
    id: postId,
    author: post.author,
    title: post.title,
    content: post.content,
    createdAt: new Date(),
  };

  // Add the post object to the beginning of the post array
  this.unshift(newPost);

  // Return the new post object
  return newPost;
};

posts.findById = function findById(postId) {
  // Find and return a post by id
  return this.find(p => p.id === parseInt(postId, 10));
};

posts.deleteById = function deleteById(postId) {
  // Get the index of the post
  const index = this.findIndex(p => p.id === parseInt(postId, 10));

  // Returns false if the post doesn't exist
  if (index === -1) return false;

  // Removes the post from the posts array
  this.splice(index, 1);

  // Returns true after deletion
  return true;
};

// Generate a few initial posts
for (let i = 0; i < 3; i += 1) {
  posts.addPost({
    author: 'Alex Howard',
    title: 'Automatic test post #' + (i + 1),
    content: 'Lorem ipsum dolor sit  amet, consectetur adipisicing elit. Labore voluptatibus temporibus voluptas in assumenda et maxime repellat delectus officiis, consequuntur aspernatur veritatis voluptates fuga est nulla officia rerum velit minima esse ea tempore. Suscipit nostrum tempora autem! Eaque aliquid nisi, et maiores molestiae! Itaque commodi, optio distinctio id quibusdam laborum culpa corrupti, dolore dicta nulla totam eligendi perferendis. Sed asperiores a voluptatem doloribus pariatur perferendis, vero deleniti qui aliquam, iusto explicabo ducimus molestias id, repellat velit facilis. Dolore dolorum, laborum. Distinctio, ducimus, alias. Veniam nihil laboriosam, reprehenderit temporibus, beatae numquam porro, quam iure vitae, ipsa animi voluptatibus rem laudantium recusandae.',
  });
}

module.exports = posts;
