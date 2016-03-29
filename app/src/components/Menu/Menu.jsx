import React from 'react';

export default class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        {this.props.children}
      </div>
    );
  }
}

Menu.propTypes = {
  children: React.PropTypes.node,
};
