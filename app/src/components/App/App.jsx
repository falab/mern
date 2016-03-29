import React from 'react';

// COMPONENTS
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem/MenuItem';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Menu>
          <MenuItem>Home</MenuItem>
          <MenuItem>Portfolio</MenuItem>
          <MenuItem>Blog</MenuItem>
        </Menu>
      </div>
    );
  }
}
