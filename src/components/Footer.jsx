import React from "react";

const Footer = props => {
  const { buttons, uploading } = props;
  const [openConsole, upload, close] = buttons;

  return (
    <div className="footer">
      <div className="button-container">
        <div className="button" onClick={openConsole}>
          <div className="content"> Console </div>
          {uploading && <div className="notification flashing" />}
        </div>
      </div>
      <div className="button-container">
        <div className="button" onClick={close}>
          <div className="content"> Close </div>
        </div>
      </div>
      <div className="rightButton">
        <div className="button" onClick={upload}>
          <div
            className="content"
            style={{ alignItems: "center", display: "flex" }}
          >
            Upload
            <i className="material-icons" style={{ marginLeft: 10 }}>
              play_circle_filled
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
