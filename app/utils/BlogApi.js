import axios from 'axios';
import * as BlogServerActions from '../actions/BlogServerActions';

const request = axios.create({
  baseURL: '/api/blog',
  responseType: 'json',
});

export function createPost({ title, content }) {
  request
    .post('/', { title, content })
    .then((res) => {
      BlogServerActions.createPostResponse(res);
    });
}

export function deletePost(id) {
  request
    .delete(`/${id}`)
    .then((res) => {
      BlogServerActions.deletePostResponse(res);
    });
}

export function fetchPosts(count) {
  const data = {};

  if (count > 0) data.count = { count };

  request
    .get('/', data)
    .then((res) => {
      BlogServerActions.fetchPostsResponse(res);
    });
}
