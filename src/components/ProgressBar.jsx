import React from "react";

const ProgressBar = props => {
  const { progress } = props;

  return (
    <>
      <style>{`
      .aContainer {
        width: 100%;
        height: 20px;
        border-radius: 4px;
        background-color: #00000040
      }
      .aProgress {
        background-color: #adafad;
        height: 20px;
        border-radius: 4px;
        transition-duration: 0.1s;
      }
    `}</style>

      <div className="text">Progress</div>
      <div className="choice">
        <div className="aContainer">
          <div className="aProgress" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
