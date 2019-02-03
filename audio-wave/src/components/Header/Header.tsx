import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header shadow-drop-2-top">
        <a href="/waveform" className="header__link">
          <img src="sound-waves.svg" className="header__sound-waves" />
          <h1 className="header__title">Generate Audio Waveforms</h1>
        </a>
      </div>
    );
  }
}

export default Header;
