import Store from './Store';
import request from 'superagent';

import AppDispatcher from '../dispatchers/AppDispatcher';
import BlogConstants from '../constants/BlogConstants';

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
    this._fetchPosts();
  }

  /**
   * Request post from api and return request object
   *
   * @private
   * @param {number} count
   * @return {Object} req - the request object
   */
  _fetchPosts(count) {
    const req = request
      .get('/api/blog')
      .type('json');

    if (count > 0) {
      req.query({ count });
    }

    req.end((err, res) => {
      if (err) throw err;
      this.store.posts = res.body;
      this.emitChange();
    });
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
   * Inserts a new post at the front of the posts store and emits a change
   * event.
   *
   * @param {Object} param - destructured object
   * @param {Object} param.post - an object representing a blog post
   */
  createPost({ post }) {
    this.store.posts.unshift(post);
    this.emitChange();
  }

  /**
   * Removes a post from the posts store by id and emits a change event.
   *
   * @param {Object} param - destructured object
   * @param {Object} param.id - The id of a post
   */
  destroyPost({ id }) {
    this.store.posts = this.store.posts.filter(item => item.id !== id);
    this.emitChange();
  }

  /**
   * Implements a switch to route different event types to different methods.
   * Will be passed to the AppDispatcher.
   *
   * @param {Object} payload - the payload object from the dispatcher
   */
  dispatchHandler = (payload) => {
    const { type } = payload;

    switch (type) {
      // Handle create action
      case BlogConstants.BLOG_CREATE:
        this.createPost(payload);
        break;

      // Handle destroy action
      case BlogConstants.BLOG_DESTROY:
        this.destroyPost(payload);
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
