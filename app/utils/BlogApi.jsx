import request from 'superagent';
import * as BlogServerActions from '../actions/BlogServerActions';

export function getPosts(count) {
  const req = request.get('/api/blog').type('json');

  if (count > 0) req.query({ count });

  req.end((err, res) => {
    if (err) throw err;

    BlogServerActions.receivePosts(res);
  });
}
