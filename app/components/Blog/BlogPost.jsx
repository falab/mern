import React from 'react';
import * as BlogActions from '../../actions/BlogActions';

/**
 * Class representing a blog post
 * @extends React.Component
 * @prop {Object} postData - a post object
 */
export default class BlogPost extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    content: React.PropTypes.string,
    author: React.PropTypes.string,
  }

  deletePost = (e) => {
    e.preventDefault();
    BlogActions.deletePost(this.props.id);
  }

  sanitizedContent = () => ({ __html: this.props.content })

  render() {
    const props = this.props;

    return (
      <div className="blogPost">
        <div className="title">{props.title}</div>
        <div
          className="content"
          dangerouslySetInnerHTML={this.sanitizedContent()}
        />
        <div className="details">
          Posted by <span className="author">{props.author}</span> on <span className="date">{new Date(props.createdAt).toLocaleString('en-US')}</span>
        </div>
        <button onClick={this.deletePost}>Delete</button>
      </div>
    );
  }
}
