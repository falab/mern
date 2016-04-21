import BlogConstants from '../constants/BlogConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';

export function createPostResponse(res) {
  AppDispatcher.serverAction({
    type: BlogConstants.POST_CREATE_RESPONSE,
    response: res.body,
  });
}

export function deletePostResponse(res) {
  AppDispatcher.serverAction({
    type: BlogConstants.POST_DELETE_RESPONSE,
    response: res.body,
  });
}

export function fetchPostsResponse(res) {
  AppDispatcher.serverAction({
    type: BlogConstants.POSTS_FETCH_RESPONSE,
    response: res.body,
  });
}
