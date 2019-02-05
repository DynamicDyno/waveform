import React from 'react';
import { mount, shallow } from 'enzyme';
// import { expect } from 'chai';
import InputForm, { Props } from './InputForm';

let props: Props;
let onChangeSpy: jest.SpyInstance;
let handleSubmitSpy: jest.SpyInstance;
let getAudioAndImageSpy: jest.SpyInstance;

beforeEach(() => {
  const onSubmitMock = jest.fn();
  const receiveAudioImageMock = jest.fn();

  props = {
    onSubmit: onSubmitMock,
    receiveAudioImage: receiveAudioImageMock,
  }

  onChangeSpy = jest.spyOn(InputForm.prototype, 'onChange');
  handleSubmitSpy = jest.spyOn(InputForm.prototype, 'handleSubmit');
  getAudioAndImageSpy = jest.spyOn(InputForm.prototype, 'getAudioAndImage');
});

afterEach(() => {
  onChangeSpy.mockClear();
  handleSubmitSpy.mockClear();
  getAudioAndImageSpy.mockClear();
});

it('renders InputForm without crashing', () => {
  const wrapper = shallow(<InputForm {...props} />);
  expect(wrapper.exists('.input-form')).toEqual(true);
});

it('changes a value and calls onChange', () => {
  const wrapper = shallow(<InputForm {...props} />);
  wrapper.find('#input-text').simulate('change', {currentTarget: {value: 'Testing'}});
  expect(InputForm.prototype.onChange).toHaveBeenCalledTimes(1);
});

it('submits form when blank but does not call getAudioAndImage', () => {
  const wrapper = shallow(<InputForm {...props} />);
  wrapper.find('.input-form').simulate('submit', {preventDefault: jest.fn()});
  expect(InputForm.prototype.handleSubmit).toHaveBeenCalledTimes(1);
  expect(InputForm.prototype.getAudioAndImage).toHaveBeenCalledTimes(0);
});

it('submits form with data and calls getAudioAndImage', () => {
  const wrapper = shallow(<InputForm {...props} />);
  wrapper.find('#input-text').simulate('change', {currentTarget: {value: 'Testing'}});
  wrapper.find('.input-form').simulate('submit', {preventDefault: jest.fn()});
  expect(InputForm.prototype.handleSubmit).toHaveBeenCalledTimes(1);
  expect(InputForm.prototype.getAudioAndImage).toHaveBeenCalledTimes(1);
});