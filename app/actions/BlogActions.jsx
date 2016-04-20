import BlogConstants from '../constants/BlogConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';
import * as BlogApi from '../utils/BlogApi';

export function createPost({ title, content }) {
  const createdAt = new Date();

  AppDispatcher.viewAction({
    type: BlogConstants.POST_CREATE,
    post: {
      id: createdAt,
      author: 'Alex',
      title,
      content,
      createdAt,
    },
  });
}

export function getPosts() {
  AppDispatcher.viewAction({
    type: BlogConstants.GET_POSTS,
  });

  BlogApi.getPosts();
}
