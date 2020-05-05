import React from "react";

export default class Display extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputMinutes: 0, inputSeconds: 30};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }


  keyDown(event) {
    if((event.keyCode >= 48 && event.keyCode <= 57)     //regular number keys
    || (event.keyCode >= 96 && event.keyCode <= 105)) { //numpad number keys
      const newInputTime = this.state.inputMinutes
                         + this.state.inputSeconds
                         + String.fromCharCode(event.keyCode);
      this.setState({
        //inputMinutes: newInputTime.slice(-4,-2),
        inputMinutes: newInputTime.slice(-3,-2),
        inputSeconds: newInputTime.slice(-2),
      })
    } else if(event.keyCode === 46) {                   //delete key

    } else if(event.keyCode === 13) {                   //enter key

    }
  }


  handleChange(event) {
    this.props.typingCallback((parseInt(this.state.inputMinutes)*60 + (parseInt(this.state.inputSeconds))) * 10);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitCallback();
  }


  render() {
    const currentTime = this.props.currentTime;
    const timerMode = this.props.timerMode;

    let minutes = Math.floor(currentTime/600);
    let seconds = Math.ceil((currentTime % 600)/10);
    const deciseconds = Math.floor(currentTime % 10);

    if(seconds < 10) {
      seconds = '0'.concat(seconds);
    } else if(seconds >= 60) {
      seconds = seconds - 60;
      minutes = minutes + 1;
    }

    if(this.props.isTimerReset
    && !this.props.timerIsUpdated){
      this.props.resetCallback(this.state.inputMinutes, this.state.inputSeconds, true);
    }

    //if(timerMode && !this.props.timerIsTiming) {
    if(timerMode && this.props.isTimerReset) {
      return (
        <div onClick = {/*TODO*/0}>
          <form onSubmit={this.handleSubmit} autocomplete="off">
            <input
              className="container clockFace"
              type="text"
              id="textbox"
              name=""
              value={this.state.inputMinutes + "m " + this.state.inputSeconds + "s"}
              onChange={this.handleChange}
              onKeyDown={this.keyDown}/>
          </form>
        </div>
      )
    } else if(timerMode) {
      return (
        <div className="container">
          <div className="clockFace" onClick = {() => this.props.editingCallback()}>
            {minutes}<span className="smallTime">m</span> {seconds}<span className="smallTime">s</span>
          </div>
        </div>
      )
    } else {
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
