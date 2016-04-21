import request from 'axios';
import * as BlogServerActions from '../actions/BlogServerActions';

export function createPost({ title, content }) {
  const opts = {
    responseType: 'json',
    data: { title, content },
  };

  request
    .post('/api/blog', opts)
    .then((res) => {
      BlogServerActions.createPostResponse(res);
    });
}

export function deletePost(postId) {
  const opts = { responseType: 'json' };

  request
    .delete(`/api/blog/${postId}`, opts)
    .then((res) => {
      BlogServerActions.deletePostResponse(res);
    });
}

export function fetchPosts(count) {
  const opts = { responseType: 'json' };

  if (count > 0) opts.data = { count };

  request
    .get('/api/blog', opts)
    .then((res) => {
      BlogServerActions.fetchPostsResponse(res);
    });
}
