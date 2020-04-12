import React, { Component } from 'react';
// import { Col } from "../Grid";

class SongSelector extends Component {
  render() {
    let songArray = this.props.songs;
    let options = songArray.map((song, index) =>
      <button key={index} value={index}>
        {song.title}
      </button>
    );
    return (
      <div>
        <h3> My Soul </h3>
        <h5> Nice little description of what this app does once we get it doing what we actually want it to. Namaste, Bombers</h5>
        <p>Choose your meditation soundtrack:</p>
        <div value={this.props.songs.indexOf(this.props.selectedSong)} onClick={this.handleSongChange.bind(this)}>
          {options}
        </div>
      </div>
    );
  }

  handleSongChange(ev) {
    this.props.onSongSelected(this.props.songs[ev.target.value]);
  }
}

export default SongSelector;