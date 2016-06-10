import Store from './Store';

import AppDispatcher from '../dispatchers/AppDispatcher';
import BlogConstants from '../constants/BlogConstants';
import * as BlogActions from '../actions/BlogActions';

/**
 * Class representing a blog store
 * @extends Store
 */
class BlogStore extends Store {
  // Initializes posts array on the store and fetches initial posts
  constructor() {
    super();
    this._store.posts = [];
    BlogActions.getPosts();
  }

  /**
   * Returns posts from the posts store. If a count is supplied it will return a
   * page of results. If a page number is supplied with count it will return a
   * slice of posts that represent that page. If page is larger than the maximum
   * possible pages, will return the last page.
   * @param {number} [count=0] - how many posts you want per page (max)
   * @param {number} [page=0] - represents which page of posts you want
   * @returns {Object[]} an array of post objects
   */
  getPosts(count = 0, _page = 0) {
    let page = _page;
    let posts = this._store.posts;

    const maxPage = Math.ceil(posts.length / count);

    if (count) {
      if (page > maxPage) page = maxPage;

      const start = (page - 1) * count;
      const end = start + count;

      posts = posts.slice(start, end);
    }

    return posts;
  }

  /**
   * Inserts a new post at the front of the posts store; emits a change
   * event.
   * @param {Object} param - destructured object
   * @param {Object} param.post - an object representing a blog post
   */
  handlePostCreateResponse({ post }) {
    this._store.posts.unshift(post);
    this.emitChange();
  }

  /**
   * Removes a post from the posts store by id; emits a change event.
   * @param {Object} param - destructured object
   * @param {number} param.id - The id of a post
   */
  handlePostDeleteResponse({ id }) {
    this._store.posts = this._store.posts.filter(p => p._id !== id);
    this.emitChange();
  }

  /**
   * Receives an array of posts from the blog api and assigns them to the posts
   * store; emits a change event.
   * @param {Object}   param - destructured object
   * @param {Object[]} param.posts - Array of posts
   */
  handlePostsFetchResponse({ posts }) {
    this._store.posts = posts;
    this.emitChange();
  }

  /**
   * Implements a switch to route different event types to different methods.
   * Will be passed to the AppDispatcher.
   * @param {Object} param - destructured object
   * @param {Object} param.action - the action object from the dispatcher
   * @param {string} param.action.type - the action type
   * @param {*}      param.action.response - the response for the action
   */
  dispatchHandler = ({ action: { type, response } }) => {
    switch (type) {
      case BlogConstants.POST_CREATE_RESPONSE:
        this.handlePostCreateResponse(response);
        break;

      case BlogConstants.POST_DELETE_RESPONSE:
        this.handlePostDeleteResponse(response);
        break;

      case BlogConstants.POSTS_FETCH_RESPONSE:
        this.handlePostsFetchResponse(response);
        break;

      default: // do nothing
    }
  }
}

// Instantiate the store before exporting
const blogStore = new BlogStore;

// Register dispatch handler
AppDispatcher.register(blogStore.dispatchHandler);

export default blogStore;
