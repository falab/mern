import BlogConstants from '../constants/BlogConstants';
import dispatcher from '../dispatchers/AppDispatcher';

export function createPost({ title, content }) {
  const createdAt = new Date();

  dispatcher.dispatch({
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
