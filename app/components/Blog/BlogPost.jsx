import React from 'react';

/**
 * Class representing a blog post
 *
 * @extends React.Component
 * @prop {Object} postData - a post object
 */
export default class BlogPost extends React.Component {
  static propTypes = {
    postData: React.PropTypes.object,
  }

  render() {
    const post = this.props.postData;

    return (
      <div className="blogPost">
        <div className="title">{post.title}</div>
        <div className="content">{post.content}</div>
        <div className="author">{post.author}</div>
      </div>
    );
  }
}
