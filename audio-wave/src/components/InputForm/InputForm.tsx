import React, { Component } from 'react';
import logo from './logo.svg';
import '../../css/codrops.css';
import './InputForm.css';

type Props = {
  receiveAudioImage: Function,
}

class InputForm extends Component<Props> {
  state = {
    textValue: '',
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.getAudioAndImage();
  }

  onChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({textValue: event.currentTarget.value});
  }

  getAudioAndImage = () => {
    fetch(`http://68.183.30.161:8080/waveform/text/${this.state.textValue}`)
      .then(response => {
        if(!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(json => this.props.receiveAudioImage(json))
  }
  
  render() {
    return (
      <form className="input-form" onSubmit={this.handleSubmit}>
        <span className={(this.state.textValue.trim() === '') ? 'input input--kozakura' : 'input input--kozakura input--filled'}>
        <input
            type="text"
            id="input-text"
            className="input__field input__field--kozakura"
            value={this.state.textValue}
            onChange={this.onChange}
            autoComplete="off" />
					<label className="input__label input__label--kozakura" htmlFor="input-7">
						<span className="input__label-content input__label-content--kozakura" data-content="Text">Text</span>
					</label>
					<svg className="graphic graphic--kozakura" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
						<path d="M1200,9c0,0-305.005,0-401.001,0C733,9,675.327,4.969,598,4.969C514.994,4.969,449.336,9,400.333,9C299.666,9,0,9,0,9v43c0,0,299.666,0,400.333,0c49.002,0,114.66,3.484,197.667,3.484c77.327,0,135-3.484,200.999-3.484C894.995,52,1200,52,1200,52V9z"/>
					</svg>
          
          <input
            type="submit"
            value="Generate"
            className="input-form__submit" />
				</span>
      </form>
    );
  }
}

export default InputForm;
