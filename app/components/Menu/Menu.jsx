import React from 'react';

class Menu extends React.Component {
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

export default Menu;
