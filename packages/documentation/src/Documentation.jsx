import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@splunk/react-ui/Button';
import { StyledContainer, StyledGreeting } from './DocumentationStyles';
import Heading from '@splunk/react-ui/Heading';
import P from '@splunk/react-ui/Paragraph';
import List from '@splunk/react-ui/List';

class Documentation extends Component {


    render() {
    

        return (
            <>
            <Heading level={1}>Documentation</Heading>
            <Heading>What does this app do?</Heading>
            <P>We provide you with multiple different types of visualizations inputs. </P>
            <List type="decimal">
<List.Item>Timerange</List.Item>
<List.Item>Timelapse</List.Item>
</List>
<P>Each of the inputs have their own react page. These pages allow for specific parameters that control various features on the page which are documented below. </P>
<Heading>What parameters are supported?</Heading>
<Heading level={3}>Timerange</Heading>
<List type="decimal">
<List.Item>demo (string, currently accepts boolean values)</List.Item>
<List.Item>dashboardid (string)</List.Item>
<List.Item>rangeStart (string, format needs to be YYYY-MM-DD HH:MM:SS)</List.Item>
<List.Item>rangeEnd (string, format needs to be YYYY-MM-DD HH:MM:SS)</List.Item>
</List>
<Heading level={3}>Timelapse</Heading>
<List type="decimal">
<List.Item>demo (string, currently accepts boolean values)</List.Item>
<List.Item>dashboardid (string)</List.Item>
<List.Item>rangeStart (string, format needs to be YYYY-MM-DD HH:MM:SS)</List.Item>
<List.Item>rangeEnd (string, format needs to be YYYY-MM-DD HH:MM:SS)</List.Item>
<List.Item>timeinterval (string, currently accepts "days" and "hours")</List.Item>
</List>



            </>
        );
    }
}

export default Documentation;
