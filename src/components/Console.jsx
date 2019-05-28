import React from 'react';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

export default class Console extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'root@circuitmess:~$ \n'
    }
  }

  componentDidMount() {
    ipcRenderer.on('terminal:data', (e, item) => {
      const { text } = this.state;
      this.setState({text: text + item});
    });
    ipcRenderer.on('terminal:err', (e, item) => {
      const { text } = this.state;
      this.setState({text: text + 'ERROR: ' + item});
    });
    ipcRenderer.on('terminal:done', (e, item) => {
      const { text } = this.state;
      this.setState({text: text + 'root@circuitmess:~$ \n'});
    });
  }

  render() {
    if(!this.props.isConsoleOpen){
      return null;
    }

    const { text } = this.state;

    return (
      <div className="console-container">
        <div className="bubble transparent">
          <div className="text">Console</div> 
          <div className="close" onClick={this.props.close}>
            <i className="material-icons"> close </i>
          </div>
        </div>
        <div className="console">
          <p style={{whiteSpace: 'pre-line', color: '#00ff00'}}>
            { text }
          </p>
        </div>
      </div>
    )
  }
}
