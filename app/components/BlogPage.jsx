import React from 'react';
import { BlogList } from './Blog';

class BlogPage extends React.Component {
  state = {
    blogPostCount: 5,
  }

  _onCountChange = (e) => {
    const target = e.target;
    const nextVal = parseInt(target.value, 10);

    if (nextVal < 1) {
      target.value = 1;
      return;
    }

    this.setState({ blogPostCount: nextVal });
  }

  render() {
    return (
      <div className="page-container">
        <div className="container">
          <input type="number"
            onChange={this._onCountChange}
            defaultValue={this.state.blogPostCount}
          />
          <BlogList count={this.state.blogPostCount} />
        </div>
      </div>
    );
  }
}

export default BlogPage;
