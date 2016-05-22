import path from 'path';

const posts = [
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

let nextId = 7;

class Axios {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
    this.responseType = 'json';
    this.lastURL = undefined;
  }

  get(_url) {
    const url = path.join(this.baseURL, _url);

    this.lastURL = url;

    let urlTest = null;
    let rx;

    rx = new RegExp(`${this.baseURL}(/[0-9]+)?`);
    urlTest = url.match(rx);

    if (urlTest !== null) {
      return new Promise((resolve) => {
        process.nextTick(() => {
          resolve()
        });
      });
    }

    throw new Error(`URL ${url} needs to be mocked for axios.`);
  }
}

export default {
  create: ({ baseURL }) => new Axios(baseURL),
};
