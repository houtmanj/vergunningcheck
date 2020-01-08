import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '..';
import Navigation from 'components/Navigation/';

describe('<HomePage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<HomePage />);
    expect(renderedComponent.find(Navigation).length).toBe(1);
  });
});
