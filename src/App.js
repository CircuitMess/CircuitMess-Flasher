import React from "react";
import Console from "./components/Console";
import PlatformSelector from "./components/PlatformSelector";
import SerialPortSelector from "./components/SerialPortSelector";
import BaudRateSelector from "./components/BaudRateSelector";
import Footer from "./components/Footer";

import "./App.css";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isConsoleOpen: false,
      ports: [],
      selected: {
        baudrate: 3,
        platform: 2,
        port: 0
      }
    };

    this.upload = this.upload.bind(this);
    this.openConsole = this.openConsole.bind(this);
    this.closeConsole = this.closeConsole.bind(this);
    this.selectPlatform = this.selectPlatform.bind(this);
    this.selectBaud = this.selectBaud.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on("ports", (e, data) => {
      const ports = data.map(port => {
        return {
          manufacturer: port.manufacturer,
          serialNumber: port.serialNumber,
          pnpId: port.pnpId,
          comName: port.comName
        };
      });
      if (ports.length < 2) {
        const { selected } = this.state;
        selected.port = ports.length === 1 ? 0 : -1;
        this.setState({ ports, selected });
      }
    });

    setInterval(this.getPorts, 500);
  }

  getPorts() {
    ipcRenderer.send("ports", "null");
  }

  upload() {
    let { selected } = this.state;
    if (selected.port === -1) {
      console.error("NO PORT SELECTED");
      return;
    }

    this.setState({ isConsoleOpen: true });

    const port = this.state.ports[selected.port];
    const data = { ...selected, port: port };

    console.log(data);
    ipcRenderer.send("upload", data);
  }

  openConsole() {
    this.setState({ isConsoleOpen: true });
  }

  closeConsole() {
    this.setState({ isConsoleOpen: false });
  }

  selectPlatform(i) {
    const { selected } = this.state;
    selected.platform = i;
    this.setState({ selected });
  }

  selectBaud(i) {
    const { selected } = this.state;
    selected.baudrate = i;
    this.setState({ selected });
  }

  close() {
    const remote = electron.remote;
    const currWindow = remote.getCurrentWindow();
    currWindow.close();
  }

  render() {
    const { selected, isConsoleOpen, ports } = this.state;
    const buttons = [this.openConsole, this.upload, this.close];

    return (
      <div className="container">
        <SerialPortSelector ports={ports} selected={selected.port} />

        <Console isConsoleOpen={isConsoleOpen} close={this.closeConsole} />
        <BaudRateSelector
          selected={selected.baudrate}
          selectBaud={this.selectBaud}
        />
        <PlatformSelector
          selected={selected.platform}
          selectPlatform={this.selectPlatform}
        />

        <Footer buttons={buttons} />
      </div>
    );
  }
}

export default App;
