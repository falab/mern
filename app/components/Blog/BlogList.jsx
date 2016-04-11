import React from 'react';
import request from 'superagent';
import BlogPost from './BlogPost';

class BlogList extends React.Component {
  static propTypes = {
    count: React.PropTypes.number,
  }

  state = {
    posts: [],
  }

  componentDidMount() {
    const req = request
      .get('/api/blog')
      .type('json');

    if (this.props.count) {
      req.query({ count: this.props.count });
    }

    req.end((err, res) => {
      if (err) throw err;
      this.setState({ posts: res.body });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="blog-list">
        {posts.map((post) =>
          <BlogPost
            key={post.id}
            postData={post}
          />
        )}
      </div>
    );
  }
}

export default BlogList;
