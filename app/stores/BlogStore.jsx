import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import BlogConstants from 'BlogConstants';

const CHANGE_EVENT = 'change';

class BlogStore extends EventEmitter {
  // The actual array blogs are stored in
  _store = [];

  onChange(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  offChange(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getPosts(count = 0, page = 1) {
    let posts = this._store;
    let _page = page;

    const maxPage = Math.ceil(posts.length / count);

    if (count) {
      if (_page > maxPage) _page = maxPage;

      const start = (_page - 1) * count;
      const end = start + count;

      posts = posts.slice(start, end);
    }

    return posts;
  }

  createPost({ postData }) {
    this._store.push(postData);
    this.emit(CHANGE_EVENT);
  }

  destroyPost({ postId }) {
    this._store = this._store.filter(item => item.id !== postId);
    this.emit(CHANGE_EVENT);
  }

  // Dispatcher action handler
  // Fat-arrow to bind to this automatically
  dispatchHandler = (payload) => {
    const { actionType } = payload;

    switch (actionType) {
      // Handle create action
      case BlogConstants.BLOG_CREATE:
        this.createPost(payload);
        break;

      // Handle destroy action
      case BlogConstants.BLOG_DESTROY:
        this.destroyPost(payload);
        break;

      default:
        // do nothing
    }
  }
}

// Instantiate the store before exporting
const blogStore = new BlogStore;

// Register dispatch handler
AppDispatcher.register(blogStore.dispatchHandler);

export default blogStore;
