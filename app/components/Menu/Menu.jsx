import React from 'react';

export default function Menu(props) {
  return (
    <div className="menu">
      <div className="container">
        <ul>
          {props.children}
        </ul>
      </div>
    </div>
  );
}

Menu.propTypes = {
  children: React.PropTypes.node,
};
