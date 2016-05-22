jest.unmock('../BlogApi');

import * as BlogApi from '../BlogApi';

describe('fetchPosts', () => {
  it('makes a GET http request to "/api/blog/"', () => {
    expect(BlogApi)
  });

  it('passes count if supplied');
});

describe('createPost', () => {
  it('makes a POST http request to "/api/blog/" with title and content');
});

describe('deletePost', () => {
  it('makes a DELETE http request to "/api/blog/:id"');
});
