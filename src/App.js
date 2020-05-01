import React from 'react';
import {component, fragment} from 'react';

let i=0;



class StopWatch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isTiming: false,
      currentTime: 0,
      leftButtonText: 'Start',
    };
  }


  startStop() {

    if (this.state.isTiming) {
      clearInterval(this.interval)
      this.setState({
        leftButtonText: 'Start',
      });

    } else {
      this.setState({
        leftButtonText: 'Stop',
      });
      this.interval = setInterval(() => this.tick(), 100);
    }

    this.setState({
      isTiming: !this.state.isTiming,
    });
  }


  reset() {
    clearInterval(this.interval)
    this.setState({
      isTiming: false,
      currentTime: 0,
      leftButtonText: 'Start'
    });
  }


  tick() {
    this.setState({
      currentTime: this.state.currentTime + 1,
    });
  }



  render() {
    const isActive = this.props.isTiming;
    const currentTime = this.props.currentTime;
    let interval = 0;

    return (
      <div className="stopwatchBody">
        <Clock currentTime={this.state.currentTime}/>
        <div className="container">
          <button onClick={() => this.startStop()}>
            {this.state.leftButtonText}
          </button>
          <button onClick={() => this.reset()}>
              Reset
          </button>
        </div>
      </div>
    )
  }
}




class Clock extends React.Component {

  render() {
    const currentTime = this.props.currentTime;
    const minutes = Math.floor(currentTime / 600);
    let seconds = Math.floor((currentTime % 600)/10);
    const deciseconds = Math.floor(currentTime % 10);

    if(seconds < 10) {
      seconds = '0'.concat(seconds);
    }

    return (
      <div className="container">
        <div className="clockFace">
          {minutes}:{seconds}<span className="smallTime">.{deciseconds}</span>
        </div>
      </div>
    )
  }
}


export default StopWatch;
