import React from 'react';

import Menu from './Menu';
import MenuItem from './Menu/MenuItem';

import './appStyle';

/**
 * Class representing the application layout used in the router
 * @extends React.Component
 * @prop {node} children - child elements passed in by the router
 */
export default class AppLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div>
        <Menu>
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="portfolio">Portfolio</MenuItem>
          <MenuItem to="blog">Blog</MenuItem>
        </Menu>
        {this.props.children}
      </div>
    );
  }
}
