import React from "react";
import Sound from 'react-sound';

export default class Alarm extends React.Component {

  render() {
    const alarmOn = this.props.alarmOn;
    if(alarmOn) {
      return (
        <div class="container">
          <Sound
            url="https://www.myinstants.com/media/sounds/lee-leedle.mp3"
            playStatus={Sound.status.PLAYING}
            playFromPosition={450 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            loop={true}
          />
          <img class="patrick" src="https://i.ytimg.com/vi/axOPKmLcriY/hqdefault.jpg" alt="Leedle leedle lee"></img>
        </div>

      )
    } else {
      return(null)
    }
  }
}
