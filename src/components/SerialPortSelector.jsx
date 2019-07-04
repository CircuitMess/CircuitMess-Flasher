import React from "react";

const SerialPortSelector = props => {
  const { selected, ports } = props;

  return (
    <React.Fragment>
      <div className="text"> Serial port </div>
      <select
        placeholder="Serial port"
        name="address"
        className="input"
        selected={selected}
      >
        {ports.length !== 0 ? (
          ports.map((item, key) => (
            <option key={`${item}-${key}`} value={key}>
              {item.manufacturer} {item.comName}
            </option>
          ))
        ) : (
          <option disabled>No devices found</option>
        )}
      </select>
      <br />
    </React.Fragment>
  );
};

export default SerialPortSelector;
