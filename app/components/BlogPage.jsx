import React from 'react';
import { BlogList } from './Blog';

function BlogPage() {
  return (
    <div className="page-container">
      <div className="container">
        <BlogList count={3} />
      </div>
    </div>
  );
}

export default BlogPage;
