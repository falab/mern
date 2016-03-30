import React from 'react';

// COMPONENTS
import Menu from '../../Menu/Menu';
import MenuItem from '../../MenuItem/MenuItem';

import { Link } from 'react-router';

export default function App(props) {
  return (
    <div>
      <Menu>
        <MenuItem>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="portfolio">Portfolio</Link>
        </MenuItem>
        <MenuItem>
          <Link to="blog">Blog</Link>
        </MenuItem>
      </Menu>
      <div>{props.children}</div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
