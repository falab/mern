import React from 'react';
import { Editor, EditorState } from '../Editor';
import * as BlogActions from '../../actions/BlogActions';
import { draftToHTML, debounce } from '../../utils';

import '../../libs/prism/prism.js';
import '../../libs/prism/prism.css';

/**
 * Class representing the blog post form
 * @extends React.Component
 * @prop {string} title
 * @prop {string} content
 */
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
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorChanged = (editorState) => {
    this.setState({ editorState });
    this.updateContent(editorState);
  }

  submitAction = (e) => {
    e.preventDefault();

    const { title, content } = this.state;

    BlogActions.createPost({ title, content });

    this.setState({
      title: '',
      content: '',
      editorState: EditorState.createEmpty(),
    });
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  updateContent = debounce((editorState) => {
    this.setState({ content: draftToHTML(editorState.getCurrentContent()) });
  });

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
          <Editor
            onChange={this.onEditorChanged}
            editorState={this.state.editorState}
          />
          <br />
          <input className="btn" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
