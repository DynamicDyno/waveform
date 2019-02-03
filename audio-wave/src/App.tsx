import React, { Component } from 'react';
import { Display, Header, InputForm } from './components/';
import './css/normalize.css';
import './App.css';
import './css/fonts/bebas-neue.css';

type ApiJson = {
  audio: string,
  wave: string,
}

class App extends Component {
  state = {
    audioSrc: '',
    imageSrc: '',
  }

  receiveAudioImage = (json: ApiJson) => {
    console.log(json);
    this.setState({
      audioSrc: json.audio,
      imageSrc: json.wave,
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <InputForm receiveAudioImage={this.receiveAudioImage} />
        <Display audioSrc={this.state.audioSrc} imageSrc={this.state.imageSrc} />
      </div>
    );
  }
}

export default App;
