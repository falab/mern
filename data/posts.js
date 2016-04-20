'use strict';

const posts = [];
posts._nextId = 1;
posts.addPost = function (post) {
  let postId = this._nextId;
  this._nextId += 1;

  const newPost = {
    id: postId,
    author: post.author,
    title: post.title,
    content: post.content,
    createdAt: new Date(),
  };

  this.unshift(newPost);

  return newPost;
};

for (let i = 0; i < 10; i += 1) {
  posts.addPost({
    author: 'Alex Howard',
    title: 'Test post #' + (i + 1),
    content: 'Lorem ipsum dolor sit  amet, consectetur adipisicing elit. Labore voluptatibus temporibus voluptas in assumenda et maxime repellat delectus officiis, consequuntur aspernatur veritatis voluptates fuga est nulla officia rerum velit minima esse ea tempore. Suscipit nostrum tempora autem! Eaque aliquid nisi, et maiores molestiae! Itaque commodi, optio distinctio id quibusdam laborum culpa corrupti, dolore dicta nulla totam eligendi perferendis. Sed asperiores a voluptatem doloribus pariatur perferendis, vero deleniti qui aliquam, iusto explicabo ducimus molestias id, repellat velit facilis. Dolore dolorum, laborum. Distinctio, ducimus, alias. Veniam nihil laboriosam, reprehenderit temporibus, beatae numquam porro, quam iure vitae, ipsa animi voluptatibus rem laudantium recusandae.',
  });
}

module.exports = posts;
