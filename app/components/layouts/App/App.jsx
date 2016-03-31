import React from 'react';

// COMPONENTS
import Menu from '../../Menu/Menu';
import MenuItem from '../../MenuItem/MenuItem';

import { Link } from 'react-router';

export default function App(props) {
  return (
    <div>
      <Menu>
        <Link to="/">
          <MenuItem>Home</MenuItem>
        </Link>
        <Link to="portfolio">
          <MenuItem>Portfolio</MenuItem>
        </Link>
        <Link to="blog">
          <MenuItem>Blog</MenuItem>
        </Link>
      </Menu>
      <div>{props.children}</div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};
