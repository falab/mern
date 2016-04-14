import React from 'react';
import BlogPost from './BlogPost';
import blogStore from '../../stores/BlogStore';

class BlogList extends React.Component {
  static propTypes = { count: React.PropTypes.number }
  static defaultProps = { count: 0 }

  state = {
    posts: [],
  }

  componentWillMount() {
    this._getBlogs();
    blogStore.onChange(this._getBlogs);
  }

  componentWillUnmount() {
    blogStore.offChange(this._getBlogs);
  }

  _getBlogs = () => {
    this.setState({
      posts: blogStore.getPosts(this.props.count),
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
