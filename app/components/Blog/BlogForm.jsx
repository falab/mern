import React from 'react';
import { Editor } from '../Editor';
import * as BlogActions from '../../actions/BlogActions';

/**
 * Class representing the blog post form
 *
 * @extends React.Component
 * @prop {string} title
 * @prop {string} content
 **/
export default class BlogForm extends React.Component {
  static propTypes = {
    blogId: React.PropTypes.number,
    title: React.PropTypes.string,
    content: React.PropTypes.string,
  }

  static defaultProps = {
    title: '',
    content: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      content: props.content,
    };
  }

  submitAction = (e) => {
    e.preventDefault();
    const { title, content } = this.state;
    BlogActions.createPost({ title, content });
    this.setState({ title: '', content: '' });
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  render() {
    const titleStyle = { width: '100%' };

    return (
      <div className="blog-form">
        <form onSubmit={this.submitAction}>
          <input
            type="text"
            placeholder="Title"
            style={titleStyle}
            value={this.state.title}
            onChange={this.updateTitle}
          />
          <br />
          <br />
          <Editor />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
