import path from 'path';

let posts = [
  {
    _id: '1',
    author: 'Tester McTesterton',
    title: 'Test post #1',
    content: 'The quick brown fox jumps over the lazy dog',
  },
  {
    _id: '2',
    author: 'Tester McTesterton',
    title: 'Test post #2',
    content: 'The quick brown fox jumps over the lazy dog',
  },
  {
    _id: '3',
    author: 'Tester McTesterton',
    title: 'Test post #3',
    content: 'The quick brown fox jumps over the lazy dog',
  },
  {
    _id: '4',
    author: 'Tester McTesterton',
    title: 'Test post #4',
    content: 'The quick brown fox jumps over the lazy dog',
  },
  {
    _id: '5',
    author: 'Tester McTesterton',
    title: 'Test post #5',
    content: 'The quick brown fox jumps over the lazy dog',
  },
];

let nextId = 6;

function createPost(id, title, content) {
  const post = {
    id: `${nextId}`,
    author: 'Tester McTesterton',
    title,
    content,
  };

  return post;
}

class Axios {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }

  get(_url, data = {}) {
    const url = path.join(this.baseURL, _url);
    const rx = new RegExp(`${this.baseURL}/?`);

    if (rx.test(url)) {
      const { count } = data;

      return new Promise(resolve => {
        process.nextTick(() => resolve({ body: posts.slice(0, count) }));
      });
    }

    throw new Error(`GET "${url}" needs to be mocked for axios.`);
  }

  post(_url, data) {
    const url = path.join(this.baseURL, _url);
    const rx = new RegExp(`${this.baseURL}/?`);

    if (rx.test(url)) {
      const { title, content } = data;
      const newPost = createPost(nextId, title, content);

      posts.push(newPost);
      nextId += 1;

      return new Promise(resolve => {
        process.nextTick(() => resolve({ body: { post: newPost } }));
      });
    }

    throw new Error(`POST "${url}" needs to be mocked for axios.`);
  }

  delete(_url) {
    const url = path.join(this.baseURL, _url);
    const rx = new RegExp(`${this.baseURL}/([A-Za-z0-9]+)`);
    const matches = url.match(rx);

    if (matches) {
      const id = matches[1];
      posts = posts.filter(post => post._id !== id);

      return new Promise(resolve => {
        process.nextTick(() => resolve({ body: { id } }));
      });
    }

    throw new Error(`DELETE "${url}" needs to be mocked for axios.`);
  }
}

export default {
  create: ({ baseURL }) => new Axios(baseURL),
};
