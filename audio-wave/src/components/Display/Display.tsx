import React, { Component } from 'react';
import logo from './logo.svg';
import './Display.css';

type Props = {
  audioSrc: string,
  imageSrc: string
}

class Display extends Component<Props> {
  render() {
    return (
      <div className="display">
        <img src={this.props.imageSrc} />
        <audio
          className="display__audio"
          controls={(this.props.audioSrc) ? true : false}
          src={this.props.audioSrc}
          autoPlay={true} />
      </div>
    );
  }
}

export default Display;
