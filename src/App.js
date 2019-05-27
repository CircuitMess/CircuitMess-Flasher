import React from 'react';
import './App.css';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipcRenderer  = electron.ipcRenderer;

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: ['foobar'],
      terminal: 'THIS IS THE TERMINAL\n\n'
    }
  }

  componentDidMount() {
    ipcRenderer.on('FooToYou', (e, item) => {
      const {data} = this.state;
      console.log('Recived', item);
      this.setState({data: [...data, item]});
    });

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

  send() {
    const tmp_obj = {
      a: 'asd',
      b: 'asdasd'
    }
    ipcRenderer.send('foo', tmp_obj);
    console.log('send');
  }

  render() {
    return (
      <div className="App">
        Hello from electron
        <br/>
        <button onClick={this.send}>Foobar</button>
        <br/><br/><br/><br/>

        <div style={{color: 'green', backgroundColor: 'black', padding: '20px'}}>
          <a style={{whiteSpace: 'pre-line'}}>
            { this.state.terminal }
          </a>
        </div>

        <ul>
          {
            this.state.data.map((item, i) => <li key={`${item}+${i}`}>{item}</li>)
          }
        </ul>
      </div>
    )
  }
}

export default App;
