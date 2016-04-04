import React from 'react';

import { Link, IndexLink } from 'react-router';

export default class MenuItem extends React.Component {

  render() {
    const Tag = this.props.to === '/' ? IndexLink : Link;

    return (
      <Tag className="menuItem" to={this.props.to} activeClassName="active">
        {this.props.children}
      </Tag>
    );
  }
}

MenuItem.propTypes = {
  to: React.PropTypes.string,
  children: React.PropTypes.node,
};
