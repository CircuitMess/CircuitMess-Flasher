import React from 'react';

export default function PlatformSelector(props) {
  return (
    <React.Fragment>
      <div className="text">Select mode</div>
      <div className="choice">
        {
          [0, 1, 2].map(i => (
            <div className="flex" onClick={() => props.selectPlatform(i)} style={props.selected === i ? {backgroundColor: "red"} : null}>
              <div className="button img">
                <img src={require(`../assets/flasher_icons-0${i+1}.png`)} alt="" style={{width: '100%'}}/>
              </div>
            </div>
          ))
        }
      </div>
    </React.Fragment>
  );
}