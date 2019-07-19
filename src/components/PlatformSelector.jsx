import React from "react";

const PlatformSelector = props => {
  const { selectPlatform, selected, uploading } = props;

  return (
    <React.Fragment>
      <div className="text">Select mode</div>
      <div className={`choice ${uploading ? "disabled" : ""}`}>
        {[0, 1, 2].map(i => (
          <div
            className="flex"
            onClick={() => !uploading && selectPlatform(i)}
            key={"platform" + i}
          >
            <div className={`button img ${selected === i ? "active" : ""}`}>
              <img
                src={require(`../assets/flasher_icons-0${i + 1}.png`)}
                alt=""
                style={{ width: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
      <br />
    </React.Fragment>
  );
};

export default PlatformSelector;
