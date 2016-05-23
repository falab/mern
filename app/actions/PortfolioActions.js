import PortfolioConstants from '../constants/PortfolioConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';
// import { BlogApi } from '../utils';
// import * as BlogServerActions from './BlogServerActions';

export function getItems() {
  AppDispatcher.viewAction({ type: PortfolioConstants.ITEMS_FETCH });

  // Start API call
  // BlogApi
  //   .fetchPosts()
  //   .then(BlogServerActions.fetchPostsResponse);
}

// export function createPost({ title, content }) {
//   AppDispatcher.viewAction({ type: BlogConstants.POST_CREATE });
//
//   // Start API call
//   BlogApi
//     .createPost({ title, content })
//     .then(BlogServerActions.createPostResponse);
// }
//
// export function deletePost(postId) {
//   AppDispatcher.viewAction({ type: BlogConstants.POST_DELETE });
//
//   // Start API call
//   BlogApi
//     .deletePost(postId)
//     .then(BlogServerActions.deletePostResponse);
// }
