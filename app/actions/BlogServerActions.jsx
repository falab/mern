import BlogConstants from '../constants/BlogConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';

export function receiveCreateResponse(response) {
  AppDispatcher.serverAction({
    type: BlogConstants.POST_CREATE_RESPONSE,
    response,
  });
}

export function receivePosts(response) {
  AppDispatcher.serverAction({
    type: BlogConstants.POSTS_FETCH_RESPONSE,
    response,
  });
}
