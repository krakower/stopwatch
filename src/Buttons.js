import React from "react";
import Display from './Display.js';
import Alarm from './Alarm.js';
import TypedInput from './TypedInput.js'

export default class Buttons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timerIsTiming: false,
      stopwatchIsTiming: false,
      timerTime: 300,
      stopwatchTime: 0,
      alarmOn: false,
    };
  }

  startStop(timerMode) {
      //timer functionality
    if(timerMode) {
      if(this.state.timerTime === 0) {
        this.setState ({
          alarmOn: false,
        })
        return;
      } else if(!this.state.timerIsTiming) {
        this.timerInterval = setInterval(() => this.tick('timerTime'), 100);
      } else {
        clearInterval(this.timerInterval);
      }
      this.setState ({
        timerIsTiming: !this.state.timerIsTiming,
      });
      //stopwatch functionality
    } else {
      if(!this.state.stopwatchIsTiming) {
        this.stopwatchInterval = setInterval(() => this.tick('stopwatchTime'), 100);
      } else {
        clearInterval(this.stopwatchInterval);
      }
      this.setState ({
        stopwatchIsTiming: !this.state.stopwatchIsTiming,
      });
    }
  }


  tick(xTime) {
    if(xTime === 'timerTime') {
      if(this.state.timerTime > 0) {
        this.setState({
          timerTime: this.state.timerTime - 1,
        });
      } else {
        this.alarm();
      }

    } else if(xTime === 'stopwatchTime') {
      this.setState({
        stopwatchTime: this.state.stopwatchTime + 1,
      });
    }
  }

  alarm() {
    clearInterval(this.timerInterval);
    this.setState({
      alarmOn: true,
    })
  }

  reset(timerMode) {
    if(timerMode) {
      clearInterval(this.timerInterval);
      this.setState({
        timerIsTiming: false,
        timerTime: 300,
        alarmOn: false,
      })
    } else {
      clearInterval(this.stopwatchInterval);
      this.setState({
        stopwatchIsTiming: false,
        stopwatchTime: 0,
      })
    }
  }


  typeFunction = typedValue => {
        this.setState({timerTime: typedValue});
  }


  render() {
    const timerMode = this.props.timerMode;
    const alarmOn = this.state.alarmOn;
    let leftButtonText;
    let currentTime;

    if(timerMode && (this.state.timerTime === 0)) {
      currentTime = this.state.timerTime;
      leftButtonText = 'ok'
    } else if(timerMode) {
      currentTime = this.state.timerTime;
      this.state.timerIsTiming
      ? leftButtonText = 'stop'
      : leftButtonText = 'start';
    } else {
      currentTime = this.state.stopwatchTime;
      this.state.stopwatchIsTiming
      ? leftButtonText = 'stop'
      : leftButtonText = 'start';
    }

    return (
      <div className="container">
        <Display currentTime = {currentTime} timerMode = {timerMode}/>
        <div className="container">
          <button onClick={() => this.startStop(timerMode)}>
            {leftButtonText}
          </button>
          <button onClick={() => this.reset(timerMode)}>
              Reset
          </button>
        </div>
        <Alarm alarmOn = {alarmOn}/>
        <TypedInput
          timerMode={(timerMode)}
          typingCallback={this.typeFunction}
        />
      </div>
    )
  }
}


//<StopWatch
//  stopwatchIsDisplayed = {!this.props.timerMode}
//  isTiming = {this.state.stopwatchIsTiming}
//  isReset = {this.state.stopwatchReset}
///>
//<Timer
//  timerIsDisplayed = {this.props.timerMode}
//  isTiming = {this.state.timerIsTiming}
//  isReset = {this.state.timerReset}
///>
