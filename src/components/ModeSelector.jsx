import React from 'react';

export default function ModeSelector(props) {
  return (
    <React.Fragment>
      <div className="text">Select mode</div>
      <div className="choice">
        <div className="flex">
          <div className="button img">
            <img src={require("../assets/flasher_icons-01.png")} alt="" style={{width: '100%'}}/>
          </div>
        </div>
        <div className="flex">
          <div className="button img">
            <img src={require("../assets/flasher_icons-02.png")} alt="" style={{width: '100%'}}/>
          </div>
        </div>
        <div className="flex">
          <div className="button img">
            <img src={require("../assets/flasher_icons-03.png")} alt="" style={{width: '100%'}}/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}