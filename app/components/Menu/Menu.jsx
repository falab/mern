import React from 'react';

export default function Menu(props) {
  return (
    <div className="menu">
      <ul>
        {props.children}
      </ul>
    </div>
  );
}

Menu.propTypes = {
  children: React.PropTypes.node,
};
