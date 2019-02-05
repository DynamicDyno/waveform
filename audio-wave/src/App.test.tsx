import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';
import { LoadingSpinner } from './components';

it('renders App without crashing', () => { 
  const wrapper = shallow(<App />);
  expect(wrapper.exists('.app')).toEqual(true);
});

it('renders the loading icon when loading', () => {
  const wrapper = mount(<App />);
  expect(wrapper.exists('.loading-spinner')).toEqual(false);
  wrapper.setState({ isLoading: true });
  expect(wrapper.exists('.loading-spinner')).toEqual(true);
});

it('renders audio when not loading', () => {
  const wrapper = mount(<App />);
  wrapper.setState({ isLoading: true });
  expect(wrapper.exists('.display__audio')).toEqual(false);
  
  wrapper.setState({ isLoading: false });
  expect(wrapper.exists('.display__audio')).toEqual(true);
});