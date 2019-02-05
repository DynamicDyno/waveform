import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from './LoadingSpinner';

it('renders LoadingSpinner without crashing', () => { 
  const wrapper = shallow(<LoadingSpinner />);
  expect(wrapper.exists('.loading-spinner')).toEqual(true);
});