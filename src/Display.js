import React from "react";

export default class Display extends React.Component {
  render() {
    const currentTime = this.props.currentTime;
    const timerMode = this.props.timerMode;

    const minutes = Math.floor(currentTime / 600);
    let seconds = Math.floor((currentTime % 600)/10);
    const deciseconds = Math.floor(currentTime % 10);

    if(seconds < 10) {
      seconds = '0'.concat(seconds);
    }

    if(timerMode) {
      return (
        <div className="container">
          <div className="clockFace">
            {minutes}:{seconds}<span className="smallTime">.{deciseconds}</span>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="container">
          <div className="clockFace">
            {minutes}:{seconds}<span className="smallTime">.{deciseconds}</span>
          </div>
        </div>
      )
    }
  }

}
