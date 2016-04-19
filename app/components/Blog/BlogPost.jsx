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
    const props = this.props;

    return (
      <div className="blogPost">
        <div className="title">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="details">
          Posted by <span className="author">{props.author}</span> on <span className="date">Feb. 28, 1989</span>
        </div>
      </div>
    );
  }
}
