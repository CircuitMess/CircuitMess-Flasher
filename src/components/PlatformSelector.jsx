import React from 'react';

export default function PlatformSelector(props) {
  return (
    <React.Fragment>
      <div className="text">Select mode</div>
      <div className="choice">
        <div className="flex" onClick={() => props.selectPlatform(0)} style={props.selected === 0 ? {backgroundColor: "red"} : null}>
          <div className="button img">
            <img src={require("../assets/flasher_icons-01.png")} alt="" style={{width: '100%'}}/>
          </div>
        </div>
        <div className="flex" onClick={() => props.selectPlatform(1)} style={props.selected === 1 ? {backgroundColor: "red"} : null}>
          <div className="button img">
            <img src={require("../assets/flasher_icons-02.png")} alt="" style={{width: '100%'}}/>
          </div>
        </div>
        <div className="flex" onClick={() => props.selectPlatform(2)} style={props.selected === 2 ? {backgroundColor: "red"} : null}>
          <div className="button img">
            <img src={require("../assets/flasher_icons-03.png")} alt="" style={{width: '100%'}}/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}