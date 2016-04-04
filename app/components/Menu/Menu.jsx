import React from 'react';

export default function Menu(props) {
  return (
    <div className="menu">
      <div className="container">
        {props.children}
      </div>
    </div>
  );
}

Menu.propTypes = {
  children: React.PropTypes.node,
};
