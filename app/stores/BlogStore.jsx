import Store from './Store';

import AppDispatcher from '../dispatchers/AppDispatcher';
import BlogConstants from '../constants/BlogConstants';
import * as BlogActions from '../actions/BlogActions';

/**
 * Class representing a blog store
 *
 * @extends Store
 */
class BlogStore extends Store {
  // Initializes posts array on the store and fetches initial posts
  constructor() {
    super();
    this.store.posts = [];
    BlogActions.getPosts();
  }

  /**
   * Returns posts from the posts store. If a count is supplied it will return a
   * page of results. If a page number is supplied with count it will return a
   * slice of posts that represent that page. If page is larger than the maximum
   * possible pages, will return the last page.
   *
   * @param {number} count - how many posts you want per page (max)
   * @param {number} [page=0] - represents which page of posts you want
   * @returns {Object[]} [posts=1] - an array of post objects
   */
  getPosts(count = 0, page = 1) {
    let _page = page;
    let posts = this.store.posts;

    const maxPage = Math.ceil(posts.length / count);

    if (count) {
      if (_page > maxPage) _page = maxPage;

      const start = (_page - 1) * count;
      const end = start + count;

      posts = posts.slice(start, end);
    }

    return posts;
  }

  /**
   * Inserts a new post at the front of the posts store; emits a change
   * event.
   *
   * @param {Object} param - destructured object
   * @param {Object} param.post - an object representing a blog post
   */
  handlePostCreateResponse({ response: { body: post } }) {
    this.store.posts.unshift(post);
    console.log(post);
    this.emitChange();
  }

  /**
   * Removes a post from the posts store by id; emits a change event.
   *
   * @param {Object} param - destructured object
   * @param {number} param.id - The id of a post
   */
  handleDestroyPost({ id }) {
    this.store.posts = this.store.posts.filter(item => item.id !== id);
    this.emitChange();
  }

  /**
   * Receives an array of posts from the blog api and assigns them to the posts
   * store; emits a change event.
   *
   * @param {Object[]} posts - Array of posts
   */
  handlePostsReceive({ response: { body: posts } }) {
    this.store.posts = posts;
    this.emitChange();
  }

  /**
   * Implements a switch to route different event types to different methods.
   * Will be passed to the AppDispatcher.
   *
   * @param {Object} payload - the payload object from the dispatcher
   */
  dispatchHandler = ({ action }) => {
    const { type } = action;

    switch (type) {
      case BlogConstants.POST_DESTROY:
        this.handleDestroyPost(action);
        break;

      case BlogConstants.POSTS_FETCH_RESPONSE:
        this.handlePostsReceive(action);
        break;

      case BlogConstants.POST_CREATE_RESPONSE:
        this.handlePostCreateResponse(action);
      default: // do nothing
    }
  }
}

// Instantiate the store before exporting
const blogStore = new BlogStore;

// Register dispatch handler
AppDispatcher.register(blogStore.dispatchHandler);

export default blogStore;
