import React from "react";

const Footer = props => {
  const { buttons } = props;
  const [openConsole, upload, close] = buttons;

  return (
    <div className="footer">
      <div className="button-container">
        <div className="button" onClick={openConsole}>
          <div className="content"> Console </div>
          <div className="notification flashing" />
        </div>
      </div>
      <div className="button-container">
        <div className="button" onClick={upload}>
          <div className="content"> Upload </div>
        </div>
      </div>
      <div className="button-container">
        <div className="button" onClick={close}>
          <div className="content"> Close </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
