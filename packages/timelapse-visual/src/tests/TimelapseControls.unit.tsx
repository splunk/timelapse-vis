/* eslint-env jest */

import React from 'react';
import { assert } from 'chai';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapterReact16 from 'enzyme-adapter-react-16';
import TimelapseControls from '../components/TimelapseControls/TimelapseControls';

// This sets up the enzyme adapter
const adapter = new EnzymeAdapterReact16();
Enzyme.configure({ adapter });

describe('TimelapseControls', () => {
    it.skip('renders with default name', () => {
        const wrapper = mount(<TimelapseControls name="World" />);
        assert.include(wrapper.text(), 'Hello, User!');
        wrapper.unmount();
    });

    it.skip('renders with custom name', () => {
        const wrapper = mount(<TimelapseControls name="World" />);
        assert.include(wrapper.text(), 'Hello, World!');
        wrapper.unmount();
    });

    it.skip('increases the counter when button is clicked', () => {
        const wrapper = mount(<TimelapseControls name="World" />);
        assert.equal(wrapper.state('counter'), 0);
        wrapper.find('button').simulate('click');
        assert.equal(wrapper.state('counter'), 1);
        wrapper.unmount();
    });
});
