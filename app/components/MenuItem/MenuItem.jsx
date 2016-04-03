import React from 'react';

import { Link } from 'react-router';

export default function MenuItem(props) {
  return (
    <li className="menuItem">
      <Link to={props.to}>
        {props.children}
      </Link>
    </li>
  );
}

MenuItem.propTypes = {
  to: React.PropTypes.string,
  children: React.PropTypes.node,
};
