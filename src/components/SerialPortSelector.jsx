import React from 'react';

export default function SerialPortSelector(props) {
  const ports = props.ports.map((item, key) => (
    <option key={`${item}-${key}`} value={key}>{item}</option>
  ))

  return (
    <React.Fragment>
      <div className="text"> Serial port</div>
      <select id="browsers" selected={props.selected}>
        { ports }
      </select>
      <br/>
    </React.Fragment>
  )
}