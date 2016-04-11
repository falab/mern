import React from 'react';

class BlogPost extends React.Component {
  static propTypes = {
    title: React.PropTypes.object,
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

export default BlogPost;
