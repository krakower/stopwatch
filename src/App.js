import React from 'react';
import Buttons from './Buttons.js';


class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerMode: false,
    };
  }

  timerMode() {
    this.setState({
      timerMode: true,
    });
  }

  stopwatchMode() {
    this.setState({
      timerMode: false,
    });
  }

  render() {
    const timerMode = this.state.timerMode;
    let leftClassName;
    let rightClassName;
    if(timerMode) {
      leftClassName = "selector left highlighted"
      rightClassName = "selector right"
    } else {
      leftClassName = "selector left"
      rightClassName = "selector right highlighted"
    }
    return (
      <div className="frame">
        <div className="container">
          <button className={leftClassName} onClick={() => this.timerMode()}>
            Timer
          </button>
          <button className={rightClassName} onClick={() => this.stopwatchMode()}>
            Stopwatch
          </button>
        </div>
        <Buttons timerMode = {this.state.timerMode}/>
      </div>
    )
  }
}


export default Selector;
