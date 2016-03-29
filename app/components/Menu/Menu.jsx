import React from 'react';

export default class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <ul>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

Menu.propTypes = {
  children: React.PropTypes.node,
};
