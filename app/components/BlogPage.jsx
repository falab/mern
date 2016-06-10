import React from 'react';
import { BlogList, BlogForm } from './Blog';

/**
 * Class representing the blog page used in routing
 * @extends React.Component
 */
export default class BlogPage extends React.Component {
  render() {
    return (
      <div className="page-container">
        <div className="container">
          <BlogForm />
          <BlogList />
        </div>
      </div>
    );
  }
}
