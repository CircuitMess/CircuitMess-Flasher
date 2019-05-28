import React from 'react';

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="button-container">
        <div className="button" onClick={props.buttons[0]}>
          <div className="content"> Console </div>
          <div className="notification flashing"></div>
        </div>
      </div>
      <div className="button-container">
        <div className="button" onClick={props.buttons[1]}>
          <div className="content"> Upload </div>
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