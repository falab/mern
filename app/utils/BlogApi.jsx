import request from 'superagent';
import * as BlogServerActions from '../actions/BlogServerActions';

export function createPost({ title, content }) {
  request
    .post('/api/blog')
    .type('json')
    .send({ title, content })
    .end((err, res) => {
      if (err) throw err;

      BlogServerActions.createPostResponse(res);
    });
}

export function deletePost(postId) {
  request
    .del(`/api/blog/${postId}`)
    .type('json')
    .end((err, res) => {
      if (err) throw err;

      BlogServerActions.deletePostResponse(res);
    });
}

export function fetchPosts(count) {
  const req = request.get('/api/blog').type('json');

  if (count > 0) req.query({ count });

  req.end((err, res) => {
    if (err) throw err;

    BlogServerActions.fetchPostsResponse(res);
  });
}
