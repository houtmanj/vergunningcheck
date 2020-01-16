import React from 'react';
import { shallow } from 'enzyme';

import Navigation from 'components/Navigation';
import HomePage from '../index';

describe('<HomePage>', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<HomePage />);
    expect(renderedComponent.find(Navigation).length).toBe(1);
  });
});
