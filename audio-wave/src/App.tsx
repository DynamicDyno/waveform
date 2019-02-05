import React, { Component } from 'react';
import { Display, Header, InputForm, LoadingSpinner } from './components/';
import './css/normalize.css';
import './App.css';
import './css/fonts/bebas-neue.css';

export type Props = { }

type ApiJson = {
  audio: string,
  wave: string,
  duration: string,
  isLoading: boolean,
}

class App extends Component {
  constructor(props: Props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    audioSrc: '',
    imageSrc: '',
    duration: '0s',
    isLoading: false,
  }

  receiveAudioImage = (json: ApiJson) => {
    console.log(json);
    this.setState({
      audioSrc: json.audio,
      imageSrc: json.wave,
      duration: json.duration,
      isLoading: false,
    });
  }

  onSubmit() {
    this.setState({ isLoading: true });
  }

  renderAudio = () => {
    if(this.state.isLoading) {
      return <LoadingSpinner />
    } else {
      return (
        <Display
          audioSrc={this.state.audioSrc}
          imageSrc={this.state.imageSrc}
          duration={this.state.duration} />
      );
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <InputForm 
          onSubmit={this.onSubmit}
          receiveAudioImage={this.receiveAudioImage} />

        {this.renderAudio()}
      </div>
    );
  }
}

export default App;
