import React from "react";
import Display from './Display.js';
import Alarm from './Alarm.js';
import History from './History.js';


export default class Buttons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timerIsTiming: false,
      stopwatchIsTiming: false,
      timerTime: 3000,
      stopwatchTime: 0,
      alarmOn: false,
      isTimerReset: true,
      isStopwatchReset: true,
      timerIsUpdated: true,
      timerIsEdited: false,
      editingMode: false,
      lapTime: 0,
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  startStop(timerMode) {
      //timer functionality
    if(timerMode) {
      this.setState ({
        isTimerReset: false,
        timerIsUpdated: false,
        editingMode: false,
      });
      if(this.state.timerTime === 0) {
        this.setState ({
          alarmOn: false,
        })
        return;
      } else if(!this.state.timerIsTiming) {
        this.timerInterval = setInterval(() => this.tick('timerTime'), 10);
      } else {
        clearInterval(this.timerInterval);
        this.setState({timerIsUpdated: false});
      }
      this.setState ({
        timerIsTiming: !this.state.timerIsTiming,
      });
      //stopwatch functionality
    } else {
      if(!this.state.stopwatchIsTiming) {
        this.stopwatchInterval = setInterval(() => this.tick('stopwatchTime'), 10);
      } else {
        clearInterval(this.stopwatchInterval);
        this.setState({
          lapTime: 0,
        });
      }
      this.setState ({
        stopwatchIsTiming: !this.state.stopwatchIsTiming,
        isStopwatchReset: false,
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
        alarmOn: false,
        isTimerReset: true,
        timerIsUpdated: false,
      })
    } else if(!this.state.stopwatchIsTiming){
      clearInterval(this.stopwatchInterval);
      this.setState({
        stopwatchIsTiming: false,
        stopwatchTime: 0,
        isStopwatchReset: true,
      })
    } else {
      this.lapFunction(); //record lap
    }
  }

  lapFunction = () => {
    this.setState({
      lapTime: parseInt(this.state.stopwatchTime),
    })
  }


  resetTimerValues = (inputMinutes, inputSeconds) => {
    this.setState({
      timerTime: (parseInt(inputMinutes)*60 + parseInt(inputSeconds)) * 10,
      timerIsUpdated: true,
    })
  }

  typeFunction = typedValue => {
    this.setState({
      timerTime: typedValue,
    });
  }

  handleKeyPress = event => {
   if (event.key === 'Enter') {
     this.startStop();
   }
  }

  enableTimerEditing = () => {
   clearInterval(this.timerInterval);
   this.setState({
     timerIsTiming: false,
     editingMode: true,
   });
  }

  startFunction = timerMode => {
    this.startStop(timerMode);
  }

  render() {
    const timerMode = this.props.timerMode;
    const alarmOn = this.state.alarmOn;
    let leftButtonText;
    let rightButtonText;
    let currentTime;

    if(this.state.timerTime > 599900) {
      this.setState({timerTime: 599900})
    }

    if(timerMode && (this.state.timerTime === 0)) {
      currentTime = this.state.timerTime;
      leftButtonText = 'Ok';
      rightButtonText = 'Reset';
    } else if(timerMode) {
      currentTime = this.state.timerTime;
      rightButtonText = 'Reset';
      this.state.timerIsTiming
      ? leftButtonText = 'Stop'
      : leftButtonText = 'Start';
    } else if(this.state.stopwatchIsTiming) {
      currentTime = this.state.stopwatchTime;
      leftButtonText = 'Stop';
      rightButtonText = 'Lap';
    } else {
      currentTime = this.state.stopwatchTime;
      leftButtonText = 'Start'
      rightButtonText = 'Reset';
    }

    return (
      <div className="container">
        <Display
          currentTime = {currentTime}
          timerMode = {timerMode}
          timerIsTiming = {this.state.timerIsTiming}
          isTimerReset = {this.state.isTimerReset}
          editingMode = {this.state.editingMode}
          timerIsUpdated = {this.state.timerIsUpdated}
          typingCallback={this.typeFunction}
          editingCallback={this.enableTimerEditing}
          resetCallback={this.resetTimerValues}
          submitCallback={this.startFunction}/>
        <div className="container">
          <button className="button" onClick={() => this.startStop(timerMode)}>
            {leftButtonText}
          </button>
          <button className="button" onClick={() => this.reset(timerMode)}>
              {rightButtonText}
          </button>
        </div>
        <Alarm alarmOn = {alarmOn}/>
        <History
          stopwatchIsTiming = {this.state.stopwatchIsTiming}
          currentTime = {this.state.stopwatchTime}
          lapTime = {this.state.lapTime}
          isStopwatchReset = {this.state.isStopwatchReset}/>
      </div>
    )
  }
}
