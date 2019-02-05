import React from 'react';
import { shallow } from 'enzyme';
import Display, { Props } from './Display';

let props: Props;
let spy: jest.SpyInstance;

describe('on load', () => {
  beforeEach(() => {
    props = {
      audioSrc: '',
      imageSrc: '',
      duration: '',
    }
  });
  
  it('renders Display without crashing', () => { 
    const wrapper = shallow(<Display {...props} />);
    expect(wrapper.exists('.display')).toEqual(true);
  });
})

describe('after returning json', () => {
  beforeEach(() => {
    props = {
      audioSrc: '../../testData/audio-920260183.mp3',
      imageSrc: '../../testData/audio-920260183.png',
      duration: '.5s',
    }
    
    spy = jest.spyOn(Display.prototype, 'playAudio');
  });

  afterEach(() => {
    spy.mockClear();
  });
  
  it('renders image and audio tags', () => { 
    const wrapper = shallow(<Display {...props} />);
    expect(wrapper.find('img').prop('src')).toEqual(props.imageSrc);
    expect(wrapper.find('audio').prop('src')).toEqual(props.audioSrc);
    expect(wrapper.find('.display__time-marker').prop('data-duration')).toEqual(props.duration);
  });

  it('plays the audio once on load', () => {
    shallow(<Display {...props} />);
    expect(Display.prototype.playAudio).toHaveBeenCalledTimes(1);
  });

  it('plays the audio once on load and again after clicking the play button', () => {
    const wrapper = shallow(<Display {...props} />);
    wrapper.find('.display__play-button').simulate('click');
    expect(Display.prototype.playAudio).toHaveBeenCalledTimes(2);
  });
})