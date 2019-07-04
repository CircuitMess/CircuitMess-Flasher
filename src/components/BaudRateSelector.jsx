import React from "react";

const BaudRateSelector = props => {
  const baudrates = [9600, 57600, 74880, 115200, 230400, 460800, 921600];

  return (
    <React.Fragment>
      <div className="text"> Select baud rate (recommanded 921600) </div>
      <div className="choice wide">
        {baudrates.map((item, i) => (
          <div key={item} className="flex" onClick={() => props.selectBaud(i)}>
            <div className={`button ${i === props.selected ? "active" : ""}`}>
              <div className="content"> {item} </div>
            </div>
          </div>
        ))}
      </div>
      <br />
    </React.Fragment>
  );
};

export default BaudRateSelector;
