import React, { useState, useEffect } from "react";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const Console = props => {
  const [text, setText] = useState("root@circuitmess:~$ \n");
  useEffect(() => {
    ipcRenderer.on("console:data", (e, item) => {
      setText(text => text + item);
    });
    ipcRenderer.on("console:err", (e, item) => {
      setText(text => text + "ERROR: " + item);
    });
    ipcRenderer.on("console:done", (e, item) => {
      setText(text => text + "root@circuitmess:~$ \n");
    });
  }, []);

  const { close, isConsoleOpen } = props;

  if (!isConsoleOpen) {
    return null;
  }

  return (
    <div className="console-container">
      <div className="bubble transparent">
        <div className="text">Console</div>
        <div className="close" onClick={close}>
          <i className="material-icons"> close </i>
        </div>
      </div>
      <div className="console">
        <p style={{ whiteSpace: "pre-line", color: "#00ff00" }}>{text}</p>
      </div>
    </div>
  );
};

export default Console;

// export default class Console extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       text: "root@circuitmess:~$ \n"
//     };
//   }

//   componentDidMount() {
//     ipcRenderer.on("console:data", (e, item) => {
//       const { text } = this.state;
//       this.setState({ text: text + item });
//     });
//     ipcRenderer.on("console:err", (e, item) => {
//       const { text } = this.state;
//       this.setState({ text: text + "ERROR: " + item });
//     });
//     ipcRenderer.on("console:done", (e, item) => {
//       const { text } = this.state;
//       this.setState({ text: text + "root@circuitmess:~$ \n" });
//     });
//   }

//   render() {
//     if (!this.props.isConsoleOpen) {
//       return null;
//     }

//     const { text } = this.state;

//     return (
//       <div className="console-container">
//         <div className="bubble transparent">
//           <div className="text">Console</div>
//           <div className="close" onClick={this.props.close}>
//             <i className="material-icons"> close </i>
//           </div>
//         </div>
//         <div className="console">
//           <p style={{ whiteSpace: "pre-line", color: "#00ff00" }}>{text}</p>
//         </div>
//       </div>
//     );
//   }
// }
