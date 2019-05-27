import React from 'react';

export default function Console(props) {
  return (
    <div class="console-container">
      <div class="bubble transparent">
        <div class="text">Console</div> 
        <div class="close">
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