import React from 'react';

export default function SerialPortSelector(props) {
  let ports;
  if(props.ports.length === 0) {
    ports = <option>NO PORTS</option>;
  } else {
    ports = props.ports.map((item, key) => (
      <option key={`${item}-${key}`} value={key}>{item.manufacturer} {item.comName}</option>
    ));
  }

  return (
    <React.Fragment>
      <div className="text"> Serial port </div>
      <select id="browsers" selected={props.selected}>
        { ports }
      </select>
      <br/>
    </React.Fragment>
  )
}