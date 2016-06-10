import React from 'react';

/**
 * Class representing the "not found" error page used in routing
 * @extends React.Component
 */
export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="page-container">
        <div className="container">
          404 Page Not Found
        </div>
      </div>
    );
  }
}
