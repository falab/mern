import axios from 'axios';

const request = axios.create({ baseURL: '/api/blog' });

export function fetchPosts(count) {
  const data = {};

  if (count > 0) data.count = count;

  return request.get('/', data);
}

export function createPost({ title, content }) {
  return request.post('/', { title, content });
}

export function deletePost(id) {
  return request.delete(`/${id}`);
}
