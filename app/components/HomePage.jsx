import React from 'react';

import SocialIconList from './SocialIconList';

/**
 * Class representing the home page used in routing
 * @extends React.Component
 */
export default class HomePage extends React.Component {
  render() {
    return (
      <div className="page-container">
        <div className="container">
          <SocialIconList />
        </div>
      </div>
    );
  }
}
