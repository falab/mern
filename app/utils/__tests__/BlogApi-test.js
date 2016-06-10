jest.unmock('../BlogApi');

import * as BlogApi from '../BlogApi';

describe('fetchPosts', () => {
  it('returns all posts', () => (
    BlogApi.fetchPosts().then((res) => expect(res.body.length).toBe(5))
  ));

  it('returns specifed number of posts if supplied', () => (
    BlogApi.fetchPosts(3).then((res) => expect(res.body.length).toBe(3))
  ));
});

describe('createPost', () => {
  it('saves and return new post', () => {
    const p1 = BlogApi.fetchPosts();
    const p2 = p1.then(() => (
      BlogApi.createPost({
        title: 'NEW TEST POST',
        content: 'This is a new test post',
      })
    ));
    const p3 = p2.then(() => BlogApi.fetchPosts());

    return Promise.all([p1, p2, p3]).then(
      ([res1, res2, res3]) => {
        expect(res3.body.length).toBe(res1.body.length + 1);
        expect(res2.body.post.title).toBe('NEW TEST POST');
      }
    );
  });
});

describe('deletePost', () => {
  it('removes a post and returns the id', () => {
    const p1 = BlogApi.fetchPosts();
    const p2 = p1.then(() => (
      BlogApi.deletePost(2)
    ));
    const p3 = p2.then(() => BlogApi.fetchPosts());

    return Promise.all([p1, p2, p3]).then(
      ([res1, res2, res3]) => {
        expect(res3.body.length).toBe(res1.body.length - 1);
        expect(res2.body.id).toBe('2');
      }
    );
  });
});
