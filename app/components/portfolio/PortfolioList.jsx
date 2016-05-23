import React from 'react';
import { PortfolioItem } from '.';
import portfolioStore from '../../stores/portfolioStore';

export default class PortfolioList extends React.Component {
  constructor() {
    super();

    this.state = {
      items: portfolioStore.getItems(),
    };
  }

  render() {
    const { items } = this.state;

    return (
      <div className="portfolioList">
        {items.map((item) =>
          <PortfolioItem key={item._id} id={item._id} {...item} />
        )}
      </div>
    );
  }
}
