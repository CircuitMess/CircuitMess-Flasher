import React from "react";

export default function PlatformSelector(props) {
  return (
    <React.Fragment>
      <div className="text">Select mode</div>
      <div className="choice">
        {[0, 1, 2].map(i => (
          <div className="flex" onClick={() => props.selectPlatform(i)}>
            <div
              className={`button img ${props.selected === i ? "active" : ""}`}
            >
              <img
                src={require(`../assets/flasher_icons-0${i + 1}.png`)}
                alt=""
                style={{ width: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
