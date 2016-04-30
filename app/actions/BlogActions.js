import BlogConstants from '../constants/BlogConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';
import * as BlogApi from '../utils/BlogApi';

export function createPost({ title, content }) {
  AppDispatcher.viewAction({ type: BlogConstants.POST_CREATE });

  // Start API call
  BlogApi.createPost({ title, content });
}

export function deletePost(postId) {
  AppDispatcher.viewAction({ type: BlogConstants.POST_DELETE });

  // Start API call
  BlogApi.deletePost(postId);
}

export function getPosts() {
  AppDispatcher.viewAction({ type: BlogConstants.POSTS_FETCH });

  // Start API call
  BlogApi.fetchPosts();
}
