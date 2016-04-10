import React from 'react';

class Menu extends React.Component {
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

Menu.propTypes = {
  children: React.PropTypes.node,
};

export default Menu;
