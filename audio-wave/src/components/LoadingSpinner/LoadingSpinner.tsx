import React, { Component } from 'react';
import './LoadingSpinner.css';

class LoadingSpinner extends Component {
  render() {
    return (
      <img src="loading-spinner.svg" className="loading-spinner" />
    );
  }
}

export default LoadingSpinner;
