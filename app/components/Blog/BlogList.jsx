import React from 'react';
import request from 'superagent';
import BlogPost from './BlogPost';

class BlogList extends React.Component {
  static propTypes = { count: React.PropTypes.number }
  static defaultProps = { count: 0 }
  state = { posts: [] }

  componentDidMount() {
    const props = this.props;
    this.getBlogPosts(props.count);
  }

  componentWillReceiveProps(props) {
    this.getBlogPosts(props.count);
  }

  getBlogPosts = (count) => {
    const req = request
      .get('/api/blog')
      .type('json');

    if (count > 0) {
      req.query({ count });
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
