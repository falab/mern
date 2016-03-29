import React from 'react';

export default class MenuItem extends React.Component {
  render() {
    return (
      <div className="menuItem">
        {this.props.children}
      </div>
    );
  }
}

MenuItem.propTypes = {
  children: React.PropTypes.string,
};
