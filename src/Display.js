import React from "react";

export default class Display extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputMinutes: "00",
      inputSeconds: "30",
      timerIsEdited: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }


  keyDown(event) {
    if((event.keyCode >= 48 && event.keyCode <= 57)     //regular number keys
    || (event.keyCode >= 96 && event.keyCode <= 105)) { //numpad number keys
      let newInputTime;
      if(this.state.timerIsEdited == false) {
        newInputTime  = "000" + String.fromCharCode(event.keyCode);
        this.setState({timerIsEdited: true});
      } else {
        newInputTime = this.state.inputMinutes
                           + this.state.inputSeconds
                           + String.fromCharCode(event.keyCode);
      }
      this.setState({
        inputMinutes: newInputTime.slice(-4,-2),
        inputSeconds: newInputTime.slice(-2),
      })
    } else if(event.keyCode == 8) {     //delete key
        let deleteTime = "" + this.state.inputMinutes+this.state.inputSeconds;
        deleteTime = deleteTime.slice(0,-1);
        deleteTime = '0' + deleteTime;
        if(deleteTime.length >= 2) {
          this.setState({
            inputMinutes: deleteTime.slice(0,-2),
            inputSeconds: deleteTime.slice(-2),
          });
        } else if(deleteTime.length == 1) {
          this.setState({
            inputMinutes: 0,
            inputSeconds: deleteTime.slice(-1),
          });
        } else {
          this.setState({
            inputMinutes: 0,
            inputSeconds: 0,
          });
        }
    } else if(event.keyCode == 13 && this.state.inputMinutes+this.state.inputSeconds != 0) {
      this.props.submitCallback(true);
    }
  }


  handleChange(event) {
    this.props.typingCallback((parseInt(this.state.inputMinutes)*60 + (parseInt(this.state.inputSeconds))) * 100);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  setEdited() {
    this.setState({timerIsEdited: false});
  }

  render() {
    const currentTime = this.props.currentTime;
    const timerMode = this.props.timerMode;

    let minutes = Math.floor(currentTime/6000);
    let seconds = Math.floor((currentTime % 6000)/100);
    let timerSeconds = Math.ceil((currentTime % 6000)/100);
    let timerMinutes = minutes;
    let centiseconds = Math.floor(currentTime % 100);

    if(seconds < 10) {
      seconds = '0'.concat(seconds);
    } else if(seconds >= 60) {
      seconds = seconds - 60;
      minutes = minutes + 1;
    }

    if(timerSeconds >= 60) {
      timerMinutes = timerMinutes + 1;
      timerSeconds = timerSeconds - 60;
    }

    if(centiseconds < 10) {
      centiseconds = '0'.concat(centiseconds);
    }
    if(minutes < 10) {
      minutes = '0'.concat(minutes);
    }


    if(!this.props.timerIsUpdated) {
      if(this.props.isTimerReset) {
        this.props.resetCallback(this.state.inputMinutes, this.state.inputSeconds);
      }
    }



    //if(timerMode && !this.props.timerIsTiming) {
    if(timerMode && this.props.editingMode) {

      let className;
      let editTime;
      if(this.state.timerIsEdited) {
        className = "container clockFace";
        minutes = this.state.inputMinutes;
        seconds = this.state.inputSeconds;
      } else {
        className = "container clockFace grayedOut";
      }
      return (
        <div onClick = {/*TODO*/0}>
          <form onSubmit={this.handleSubmit} autocomplete="off">
            <input
              className={className}
              type="tel"
              id="textbox"
              name=""
              value={minutes + "m "+ seconds + "s"}
              onChange={this.handleChange}
              onKeyDown={this.keyDown}
              autoFocus/>
          </form>
        </div>
      )
    } else if(timerMode) {
      this.state.timerIsEdited == true ? this.setEdited() : void(0);
      return (
        <div className="container">
          <div className="clockFace" onClick = {() => this.props.editingCallback()}>
            {timerMinutes}<span className="smallTime">m</span> {timerSeconds}<span className="smallTime">s</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container stopwatch">
          <div className="clockFace">
            &nbsp;{minutes}:{seconds}<span className="smallTime">.{centiseconds}</span>
          </div>
        </div>
      )
    }
  }

}
