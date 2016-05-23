import React from 'react';

import { PortfolioList } from './portfolio';

/**
 * Class representing the portfolio page used in routing
 * @extends React.Component
 */
export default class PortfolioPage extends React.Component {
  render() {
    return (
      <div className="page-container">
        <div className="container">
          <PortfolioList />
        </div>
      </div>
    );
  }
}
