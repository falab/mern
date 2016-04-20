import React from 'react';
import BlogPost from './BlogPost';
import blogStore from '../../stores/BlogStore';
import './blog.scss';

/**
 * Class representing a list of blog posts
 *
 * @extends React.Component
 * @prop {number} count - how many blog posts to list
 */
export default class BlogList extends React.Component {
  static propTypes = { count: React.PropTypes.number }
  static defaultProps = { count: 0 }

  // Sets the initial state of the component
  constructor(props) {
    super();

    this.state = {
      posts: blogStore.getPosts(props.count),
    };
  }

  // Binds this._getPosts to the blog store's change event
  componentWillMount() {
    blogStore.onChange(this._getPosts);
  }

  // Unbinds this._getPosts from the blog store's change event
  componentWillUnmount() {
    blogStore.offChange(this._getPosts);
  }

  // Gets some posts from the blog store and update posts in state
  _getPosts = () => {
    const posts = blogStore.getPosts(this.props.count);
    this.setState({ posts });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="blogList">
        {posts.map((post) =>
          <BlogPost key={post.id} {...post} />
        )}
      </div>
    );
  }
}
