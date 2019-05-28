import React from 'react';

import Console from './components/Console';
import ModeSelector from './components/ModeSelector';
import SerialPortSelector from './components/SerialPortSelector';
import BaudRateSelector from './components/BaudRateSelector';
import Footer from './components/Footer'

import './App.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: ['foobar'],
      terminal: 'THIS IS THE TERMINAL\n\n',
      open: false,
      selected: {
        baudrate: 3,
        platform: 2,
        port: 1
      }
    }

    for(let i = 0; i < 4; i++){
      setTimeout(this.send({id: i}), 1000 * i);
    }

    this.selectBaud = this.selectBaud.bind(this);
    this.openConsole = this.openConsole.bind(this);
    this.closeConsole = this.closeConsole.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('FooToYou', (e, item) => {
      const {data} = this.state;
      console.log('Recived', item);
      this.setState({data: [...data, item]});
    });

    this.getPorts();

    ipcRenderer.on('data', (e, item) => {
      const { terminal } = this.state;
      this.setState({terminal: terminal + item});
    });
    ipcRenderer.on('err', (e, item) => {
      const { terminal } = this.state;
      this.setState({terminal: terminal + 'ERROR: ' + item});
    });
    ipcRenderer.on('done', (e, item) => {
      const { terminal } = this.state;
      this.setState({terminal: terminal + 'DONE\n\n'});
    });
  }

  getPorts() {
    ipcRenderer.send('ports', null);
    ipcRenderer.on('ports', (e, item) => {
      console.log(item);
    });
  }

  send(data) {
    ipcRenderer.send('foo', data);
    console.log('send');
  }

  selectBaud(i) {
    const { selected } = this.state;
    selected.baudrate = i
    console.log(selected);
    this.setState({selected});
  }

  openConsole() {
    this.setState({open: true});
  }

  closeConsole() {
    this.setState({open: false});
  }

  render() {
    const ports = [
      'asd',
      'asdasdsad',
      'asdadasd'
    ]

    const { selected, open } = this.state;
    const buttons = [this.openConsole, this.close, this.upload];

    return (
      <div className="container">
        <SerialPortSelector ports={ports} selected={selected.port}/>
        <Console text={this.state.terminal} open={open} close={this.closeConsole}/>
        <BaudRateSelector selected={selected.baudrate} selectBaud={this.selectBaud}/>
        <ModeSelector selected={selected.mode}/>
        <Footer buttons={buttons}/>
      </div>
    )
  }
}

export default App;
