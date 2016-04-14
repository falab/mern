import React from 'react';
import { BlogList } from './Blog';

class BlogPage extends React.Component {
  render() {
    return (
      <div className="page-container">
        <div className="container">
          <BlogList />
        </div>
      </div>
    );
  }
}

export default BlogPage;
