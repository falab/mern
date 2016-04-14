import React from 'react';
import { BlogList } from './Blog';

/**
 * Class representing the blog page used in routing
 *
 * @extends React.Component
 */
export default class BlogPage extends React.Component {
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
