import React from 'react';

import { Link, IndexLink } from 'react-router';

/**
 * Class representing a menu item
 * @extends React.Component
 * @prop {string} to - the url the link will go to
 * @prop {node} children - child elements of the component
 */
export default class MenuItem extends React.Component {
  static propTypes = {
    to: React.PropTypes.string,
    children: React.PropTypes.node,
  };

  render() {
    const LinkTag = (this.props.to === '/') ? IndexLink : Link;

    return (
      <LinkTag className="menuItem" to={this.props.to} activeClassName="active">
        {this.props.children}
      </LinkTag>
    );
  }
}
