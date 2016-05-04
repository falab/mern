import React from 'react';

import './menuStyle';

/**
 * Class representing a menu
 * @extends React.Component
 * @prop {node} children - child elements of the component
 */
export default class Menu extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div className="menu">
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
