import React from 'react';
import Console from './components/Console';
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
        platform: 2
      }
    }

    for(let i = 0; i < 4; i++){
      setTimeout(this.send, 1000 * i);
    }

    this.selectBaud = this.selectBaud.bind(this);
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

  selectBaud(i) {
    const { selected } = this.state;
    selected.baudrate = i
    console.log(selected);
    this.setState({selected});
  }

  render() {
    const baudrates = [
      9600,
      57600,
      74880,
      115200,
      230400,
      460800,
      921600
    ];

    return (
      <div className="App">
        <div className="container">
          <div className="text"> Serial port</div>
            <input list="browsers" className="input" name="browser" placeholder="address"/>
            <datalist id="browsers">
              <option value="Internet Explorer"/>
              <option value="Firefox"/>
              <option value="Chrome"/>
              <option value="Opera"/>
              <option value="Safari"/>
            </datalist>
            <br/>

            {
              this.state.open ? <Console text={this.state.terminal}/> : null
            }
      
            <div className="text"> Select baud rate </div>
            <div className="choice wide">
              {
                baudrates.map((item, i) => (
                  <div key={item} className="flex" onClick={() => this.selectBaud(i)}>
                    <div className={`button ${i === this.state.selected.baudrate ? 'active' : ''}`}>
                      <div className="content"> {item} </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <br/>
      
            <div className="text">Select mode</div>
            <div className="choice">
              <div className="flex">
                <div className="button img">
                  <img src={require("./assets/flasher_icons-01.png")} alt="" style={{width: '100%'}}/>
                </div>
              </div>
              <div className="flex">
                <div className="button img">
                  <img src={require("./assets/flasher_icons-02.png")} alt="" style={{width: '100%'}}/>
                </div>
              </div>
              <div className="flex">
                <div className="button img">
                  <img src={require("./assets/flasher_icons-03.png")} alt="" style={{width: '100%'}}/>
                </div>
              </div>
            </div>
            
            <div className="footer"><div className="button-container">
              <div className="button">
                <div className="content"> Console </div>
                <div className="notification flashing"></div>
              </div>
            </div>
            <div className="button-container">
              <div className="button">
                <div className="content"> Ok </div>
              </div>
            </div>
            <div className="button-container">
              <div className="button">
                <div className="content"> Close </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
