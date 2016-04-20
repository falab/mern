import BlogConstants from '../constants/BlogConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';

export function receiveCreateResponse(response) {
  AppDispatcher.serverAction({
    type: BlogConstants.CREATE_RESPONSE,
    response,
  });
}

export function receivePosts(response) {
  AppDispatcher.serverAction({
    type: BlogConstants.RECEIVE_POSTS,
    response,
  });
}
