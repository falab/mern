import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import BlogConstants from 'BlogConstants';

const CHANGE_EVENT = 'change';

const _store = {
  blogPosts: [],
};

class BlogStore extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getBlogPosts() {
    return _store;
  }
}

const blogStore = new BlogStore();

AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
    case BlogConstants.BLOG_CREATE:
      _store.blogPosts.push(action.postData);
      blogStore.emit(CHANGE_EVENT);
      break;
    case BlogConstants.BLOG_DESTROY:
      _store.blogPosts = _store.blogPosts.filter(
        item => item.id !== action.blogPostId
      );
      blogStore.emit(CHANGE_EVENT);
      break;
    // case BlogConstants.BLOG_UPDATE:
    //   blogStore.emit(CHANGE_EVENT);
    //   break;
    default:
      return true;
  }

  return true;
});

export default blogStore;
