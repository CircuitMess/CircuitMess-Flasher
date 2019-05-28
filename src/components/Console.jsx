import React from 'react';

export default function Console(props) {
  if(!props.open){
    return null;
  }

  return (
    <div class="console-container">
      <div class="bubble transparent">
        <div class="text">Console</div> 
        <div class="close" onClick={props.close}>
          <i class="material-icons"> close </i>
        </div>
      </div>
      <div class="console">
        <a style={{whiteSpace: 'pre-line'}}>
          { props.text }
        </a>
      </div>
    </div>
  )
}