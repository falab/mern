import React from 'react';

export default class MenuItem extends React.Component {
  render() {
    return (
      <li className="menuItem">
        {this.props.children}
      </li>
    );
  }
}

MenuItem.propTypes = {
  children: React.PropTypes.string,
};
