import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@splunk/react-ui/Button';
import { StyledContainer, StyledGreeting } from './DocumentationStyles';
import Heading from '@splunk/react-ui/Heading';
import P from '@splunk/react-ui/Paragraph';
import List from '@splunk/react-ui/List';
import Link from '@splunk/react-ui/Link';

class Documentation extends Component {


    render() {


        return (
            <>
                <Heading>Getting started</Heading>
                <P>To get started using this app, visit the <Link to={"start"}>Start</Link> page. From that page you will be able to build a URL to a dashboard with a custom input such as a timelapse or timerange. </P>

                <P>That URL will be sharable to anyone in your Splunk environment who has permissions to both the app, and the corresponding dashboard. </P>

                <Heading>What does this app do?</Heading>
                <P>We provide you with multiple different types of visualizations inputs. </P>
                <List type="decimal">
                    <List.Item>Timerange</List.Item>
                    <List.Item>Timelapse</List.Item>
                </List>
                <P>Each of the inputs have their own react page which will load the input, followed by the dashboard you select. Each input is documented below.  </P>

                <Heading>Input Documentation</Heading>
                <P>Though we've provided the <Link to={"start"}>Start</Link> page for users to build a URL. We understand users may have a need to customize their URL or generate them in other ways. As a result, we are providing detailed documentation of each input below.  </P>

                <Heading level={3}>Timerange</Heading>
                <Link target="_blank" to={"rangeslider?demo=true&rangeStart=2021-09-01%2000%3A00%3A00&rangeEnd=2021-09-19%2000%3A00%3A00&timeinterval=days"}>View a Demo Here</Link>
                <P>This input provides two selectors so that users can view a dashboard and adjust the Maximum and Minimum time for all visualizations in the dashboard. </P>
                <List type="decimal">
                    <List.Item>demo (string, currently accepts boolean values)</List.Item>
                    <List.Item>dashboardid (string)</List.Item>
                    <List.Item>rangeStart (string, format needs to be YYYY-MM-DD HH:MM:SS)</List.Item>
                    <List.Item>rangeEnd (string, format needs to be YYYY-MM-DD HH:MM:SS)</List.Item>
                </List>
                <Heading level={3}>Timelapse</Heading>
                <Link to={"timelapse?demo=true&rangeStart=2021-09-01%2000%3A00%3A00&rangeEnd=2021-09-19%2000%3A00%3A00&timeinterval=days"}>View a Demo Here</Link>
                <P>This input provides the ability to "scrub" through your data. You can playback data in forward, reverse, or even pause your data playback.</P>
                <List target="_blank" type="decimal">
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
