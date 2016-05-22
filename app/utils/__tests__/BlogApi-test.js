jest.unmock('../BlogApi');

import * as BlogApi from '../BlogApi';

describe('fetchPosts', () => {
  it('returns all posts', () => (
    BlogApi
      .fetchPosts()
      .then(res => expect(res.body.length).toBe(5))
  ));

  it('return specifed number of posts if supplied', () => (
    BlogApi
      .fetchPosts(3)
      .then(res => expect(res.body.length).toBe(3))
  ));
});

describe('createPost', () => {
  it('returns the new post in body', () => (
    BlogApi
      .createPost({
        title: 'NEW TEST POST',
        content: 'This is a new test post',
      })
      .then(res => {
        const { post } = res.body;
        expect(post.title).toBe('NEW TEST POST');
      })
  ));

  it('increases total post count', () => {
    const p1 = BlogApi.fetchPosts();
    const p2 = p1
      .then(() => (
        BlogApi.createPost({
          title: 'NEW TEST POST',
          content: 'This is a new test post',
        })
      ))
      .then(() => BlogApi.fetchPosts());

    return Promise.all([p1, p2]).then(
      ([res1, res2]) => expect(res2.body.length).toBe(res1.body.length + 1)
    );
  });
});

describe('deletePost', () => {
  it('makes a DELETE http request to "/api/blog/:id"');
});
