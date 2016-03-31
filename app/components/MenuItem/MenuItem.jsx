import React from 'react';

export default function MenuItem(props) {
  return (
    <li className="menuItem">
      {props.children}
    </li>
  );
}

MenuItem.propTypes = {
  children: React.PropTypes.node,
};
