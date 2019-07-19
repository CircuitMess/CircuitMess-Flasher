import React from "react";

const BaudRateSelector = props => {
  const baudrates = [115200, 230400, 460800, 921600];
  const { selectBaud, uploading, selected } = props;

  return (
    <React.Fragment>
      <div className="text"> Select baud rate (recommended 921600) </div>
      <div className={`choice wide ${uploading ? "disabled" : ""}`}>
        {baudrates.map((item, i) => (
          <div
            key={item}
            className="flex"
            onClick={() => !uploading && selectBaud(i)}
          >
            <div className={`button ${i === selected ? "active" : ""}`}>
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
