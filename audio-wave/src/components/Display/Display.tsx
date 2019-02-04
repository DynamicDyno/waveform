import React, { Component } from 'react';
import { MdPlayCircleFilled } from 'react-icons/md';
import './Display.css';

type Props = {
  audioSrc: string,
  imageSrc: string,
  duration: string,
}

type State = {
  isPlaying: boolean,
  lastPlayed: string,
}

class Display extends Component<Props, State> {
  audioRef = React.createRef<HTMLAudioElement>();
  state = {
    isPlaying: false,
    lastPlayed: '',
  }

  componentDidMount() {
    console.log('did mount');
    if(this.props.audioSrc !== ''
      && this.props.audioSrc !== this.state.lastPlayed
      && this.state.isPlaying === false) {
      this.playAudio();
    }
  }

  componentDidUpdate() {
    console.log('did update');
    
  }

  getTransition = () => {
    return ({
      animationDuration: this.props.duration,
    });
  }

  getPlayButton = () => {
    if(this.props.audioSrc !== '') {
      return <div className="display__play-button" onClick={this.onPlayButtonClick}><MdPlayCircleFilled className="display__play-icon" /></div>
    }
  }

  onPlayButtonClick = () => {
    this.playAudio();
  }

  playAudio = () => {
    const audio = this.audioRef.current;
    if(audio) {
      audio.play();
      this.setState({
        isPlaying: true,
        lastPlayed: this.props.audioSrc,
      });
    }
  }

  onEndedAudio = () => {
    this.setState({ isPlaying: false });
  }

  render() {
    return (
      <section className="display">
        <div className={(this.state.isPlaying) ? "display__wave display__wave--is-playing" : "display__wave"}>
          <img className="display__image" src={this.props.imageSrc} />
          <div className="display__time-marker" style={this.getTransition()} data-duration={this.props.duration}></div>
          {this.getPlayButton()}
        </div>

        <audio
          className="display__audio"
          src={this.props.audioSrc}
          onEnded={this.onEndedAudio}
          ref={this.audioRef} />
      </section>
    );
  }
}

export default Display;
