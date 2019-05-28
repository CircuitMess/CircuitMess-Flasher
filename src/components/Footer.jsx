import React from 'react';

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="button-container">
        <div className="button">
          <div className="content" onClick={props.buttons[0]}> Console </div>
          <div className="notification flashing"></div>
        </div>
      </div>
      <div className="button-container">
        <div className="button">
          <div className="content"> Ok </div>
        </div>
      </div>
      <div className="button-container">
        <div className="button">
          <div className="content"> Close </div>
        </div>
      </div>
    </div>
  )
}