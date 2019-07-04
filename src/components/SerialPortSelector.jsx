import React from 'react';

export default function SerialPortSelector(props) {
  let ports;
  if(props.ports.length === 0) {
    ports = <option disabled>NO PORTS</option>;
  } else {
    ports = props.ports.map((item, key) => (
      <option key={`${item}-${key}`} value={key}>{item.manufacturer} {item.comName}</option>
    ));
  }

  return (
    <React.Fragment>
      <div className="text"> Serial port </div>
      <select id="browsers" style={{'width': '100%'}} selected={props.selected}>
        { ports }
      </select>
      <br/>
    </React.Fragment>
  )
}