import Heading from '@splunk/react-ui/Heading';
import Link from '@splunk/react-ui/Link';
import List from '@splunk/react-ui/List';
import P from '@splunk/react-ui/Paragraph';
import React, { Component } from 'react';
import { SplunkThemeProvider } from '@splunk/themes';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import { useSplunkTheme } from '@splunk/themes';
import LightBulb from '@splunk/react-icons/LightBulb';

class Documentation extends Component {
    render() {
        const colStyle = {
            border: `1px solid #FFFFFF`,
            padding: 10,
            minHeight: 80,
        };
        return (
            <>
                <div
                    style={{
                        textAlign: 'center',
                        margin: 'auto',
                        align: 'center',
                        width: '100%',
                        backgroundColor: '#171D21',
                    }}
                >
                    <SplunkThemeProvider family="enterprise" colorScheme="dark" density="compact">
                        <Heading>Getting started</Heading>
                        <P>
                            To get started using this app, visit the <Link to={'start'}>Start</Link>{' '}
                            page. From that page you will be able to build a URL to a dashboard with
                            a custom input such as a timelapse or rangeslider.{' '}
                        </P>

                        <P>
                            That URL will be sharable to anyone in your Splunk environment who has
                            permissions to both the app, and the corresponding dashboard.{' '}
                        </P>

                        <Heading>What does this app do?</Heading>
                        <P>
                            We provide you with multiple different types of visualizations inputs.{' '}
                        </P>
                        <List type="decimal">
                            <List.Item>Rangeslider</List.Item>
                            <List.Item>Timelapse</List.Item>
                        </List>
                        <P>
                            Each of the inputs have their own react page which will load the input,
                            followed by the dashboard you select. Each input is documented below.{' '}
                        </P>

                        <Heading>Input Documentation</Heading>
                        <P>
                            Though we've provided the <Link to={'start'}>Start</Link> page for users
                            to build a URL. We understand users may have a need to customize their
                            URL or generate them in other ways. As a result, we are providing
                            detailed documentation of each input below.{' '}
                        </P>

                        <ColumnLayout gutter={8}>
                            <ColumnLayout.Row>
                                <ColumnLayout.Column span={6} style={colStyle}>
                                    <Heading level={3}>Timelapse</Heading>
                                    <hr></hr>

                                    <P>
                                        This input provides the ability to "scrub" through your
                                        data. You can playback data in forward, reverse, or even
                                        pause your data playback.{' '}
                                        <Link
                                            target="_blank"
                                            to={
                                                'timelapse?theme=dark&dashboardid=timelapse_demo&rangeStart=2021-12-19%2000%3A00%3A00&rangeEnd=2022-03-28%2000%3A00%3A00&timeinterval=days'
                                            }
                                        >
                                            View a Demo Here
                                        </Link>
                                    </P>
                                    <Heading level={4}>Link Parameters</Heading>

                                    <List type="decimal">
                                        <List.Item>dashboardid (string)</List.Item>
                                        <List.Item>
                                            rangeStart (string, format needs to be YYYY-MM-DD
                                            HH:MM:SS)
                                        </List.Item>
                                        <List.Item>
                                            rangeEnd (string, format needs to be YYYY-MM-DD
                                            HH:MM:SS)
                                        </List.Item>
                                        <List.Item>
                                            timeinterval (string, currently accepts "days", "hours",
                                            and "years")
                                        </List.Item>
                                        <List.Item>
                                            theme (string, currently accepts "light" and "dark")
                                        </List.Item>
                                    </List>
                                </ColumnLayout.Column>
                                <ColumnLayout.Column span={6} style={colStyle}>
                                    <Heading level={3}>Rangeslider</Heading>
                                    <hr></hr>

                                    <P>
                                        This input provides two selectors so that users can view a
                                        dashboard and adjust the Maximum and Minimum time for all
                                        visualizations in the dashboard.{' '}
                                        <Link
                                            target="_blank"
                                            to={
                                                'rangeslider?theme=dark&dashboardid=timelapse_demo&rangeStart=2021-12-19%2000%3A00%3A00&rangeEnd=2022-03-28%2000%3A00%3A00'
                                            }
                                        >
                                            View a Demo Here
                                        </Link>
                                    </P>
                                    <List type="decimal">
                                        <List.Item>dashboardid (string)</List.Item>
                                        <List.Item>
                                            rangeStart (string, format needs to be YYYY-MM-DD
                                            HH:MM:SS)
                                        </List.Item>
                                        <List.Item>
                                            rangeEnd (string, format needs to be YYYY-MM-DD
                                            HH:MM:SS)
                                        </List.Item>
                                        <List.Item>
                                            theme (string, currently accepts "light" and "dark")
                                        </List.Item>
                                    </List>
                                </ColumnLayout.Column>
                            </ColumnLayout.Row>
                        </ColumnLayout>

                        <Heading level={4}>
                            <LightBulb style={{ color: 'yellow' }} size={2} />
                            &nbsp; &nbsp; &nbsp; Tips for Creating a Timelapse or Rangeslider
                            Dashboard
                        </Heading>
                        <P>
                            In order to create a timelapse or rangeslider compatible dashboard, your
                            dashboard should meet all of the following criteria:
                        </P>

                        <List type="decimal">
                            <List.Item>
                                <strong>
                                    Dashboard permissions should be set appropriately for the users
                                    of your timelapse or rangeslider dashboard.
                                </strong>
                                &nbsp;For example, if you have a private it will not work for all
                                users.
                            </List.Item>
                            <List.Item>
                                <strong>All searches should have a valid _time field.</strong>
                            </List.Item>
                            <List.Item>
                                <strong>All searches should have _time in ascending order.</strong>
                                <br />
                                This can typically be completed by adding the following SPL to the
                                end of your search:
                                <br />
                                <i>| sort 0 + _time</i>
                            </List.Item>
                            <List.Item>
                                <strong>
                                    All searches should return all iterations of the data that will
                                    show-up in the timelapse or rangeslider.
                                </strong>
                                <br />
                                For example a single value for a regular dashboard might be based on
                                the following data:
                                <br />
                                <table>
                                    <tbody>
                                        <tr style={{ backgroundColor: '#36454e' }}>
                                            <td>count</td>
                                        </tr>
                                        <tr>
                                            <td>15</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                For a single value in a timelapse or rangeslider, you'll want the
                                data to be structured more like this:
                                <br />
                                <table>
                                    <tbody>
                                        <tr style={{ backgroundColor: '#36454e' }}>
                                            <td>count</td>
                                            <td>_time</td>
                                        </tr>

                                        <tr>
                                            <td>15</td>
                                            <td>2020-12-12T00:00:00</td>
                                        </tr>
                                        <tr>
                                            <td>17</td>
                                            <td>2021-12-12T00:00:00</td>
                                        </tr>
                                        <tr>
                                            <td>22</td>
                                            <td>2022-12-12T00:00:00</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                            </List.Item>
                            <List.Item>
                                <strong>
                                    For searches with multiple-dimensions, every _time should have
                                    values for all other dimmensions.
                                </strong>
                                <br />
                                For example a compatible single value might be based on the
                                following data:
                                <br />
                                <table>
                                    <tbody>
                                        <tr style={{ backgroundColor: '#36454e' }}>
                                            <td>count</td>
                                            <td>_time</td>
                                        </tr>

                                        <tr>
                                            <td>15</td>
                                            <td>2020-12-12T00:00:00</td>
                                        </tr>
                                        <tr>
                                            <td>17</td>
                                            <td>2021-12-12T00:00:00</td>
                                        </tr>
                                        <tr>
                                            <td>22</td>
                                            <td>2022-12-12T00:00:00</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                <br />
                                For something more complicated, like an SVG, you'll want to have all
                                iterations sorted in ascending order by _time:
                                <br />
                                <table>
                                    <tbody>
                                        <tr style={{ backgroundColor: '#36454e' }}>
                                            <td>count</td>
                                            <td>_time</td>
                                            <td>State</td>
                                        </tr>

                                        <tr>
                                            <td>15</td>
                                            <td>2020-12-12T00:00:00</td>
                                            <td>CT</td>
                                        </tr>
                                        <tr>
                                            <td>15</td>
                                            <td>2020-12-12T00:00:00</td>
                                            <td>RI</td>
                                        </tr>
                                        <tr>
                                            <td>17</td>
                                            <td>2021-12-12T00:00:00</td>
                                            <td>CT</td>
                                        </tr>
                                        <tr>
                                            <td>17</td>
                                            <td>2021-12-12T00:00:00</td>
                                            <td>RI</td>
                                        </tr>
                                        <tr>
                                            <td>22</td>
                                            <td>2022-12-12T00:00:00</td>
                                            <td>CT</td>
                                        </tr>

                                        <tr>
                                            <td>22</td>
                                            <td>2022-12-12T00:00:00</td>
                                            <td>RI</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                            </List.Item>
                            <List.Item>
                                <strong>
                                    Do not use chain searches as they are currently not supported.
                                </strong>
                                Because timelapse visualizations are susceptible to creating a lot
                                of searches very fast, we preload the data from searches in your
                                dashboard, and allow you to scrub through that cached data. As a
                                result, we currently do not support chain searches.
                            </List.Item>
                        </List>
                    </SplunkThemeProvider>
                </div>
            </>
        );
    }
}

export default Documentation;
