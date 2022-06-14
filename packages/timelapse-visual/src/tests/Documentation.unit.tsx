import React from "react";
import { assert } from 'chai';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapterReact16 from 'enzyme-adapter-react-16';
import { Documentation } from '../Documentation/Documentation';
import Heading from "@splunk/react-ui/Heading";

// This sets up the enzyme adapter
const adapter = new EnzymeAdapterReact16();
Enzyme.configure({ adapter });

describe('Documentation', () => {
    it('renders the documentation page name', () => {
        const wrapper = mount(<Documentation />);
        const headings = wrapper.find(Heading);
        expect(headings).toHaveLength(9);
        assert.include(wrapper.text(), 'To get started using this app');
        wrapper.unmount();
    });
});
