import React from 'react';

// COMPONENTS
import Menu from '../../Menu/Menu';
import MenuItem from '../../MenuItem/MenuItem';

export default function App(props) {
  return (
    <div className="fullHeight">
      <Menu>
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="portfolio">Portfolio</MenuItem>
        <MenuItem to="blog">Blog</MenuItem>
      </Menu>
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};
