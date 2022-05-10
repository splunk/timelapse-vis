import React, { Component, useRef, useState } from 'react';
import { StyledContainer, StyledGreeting } from './DashboardselectorStyles';
import ListDashboards from '@splunk/listdashboards';
import Select from '@splunk/react-ui/Select';
import Heading from '@splunk/react-ui/Heading';
import P from '@splunk/react-ui/Paragraph';

import InfoCircle from '@splunk/react-icons/InfoCircle';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import Button from '@splunk/react-ui/Button';
import List from '@splunk/react-ui/List';

import Link from '@splunk/react-ui/Link';
import { SplunkThemeProvider } from '@splunk/themes';
import Modal from '@splunk/react-ui/Modal';

class DashboardSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickertype: 'rangeslider',
            dashboardid: '',
            rangeStart: '',
            rangeEnd: '',
            timeinterval: '',
            theme: '',
            infoModalOpen: false,
            rangeStartOpen: false,
            rangeEndOpen: false,
            timetype: '',
            relativetime: '',
            rangeRelativeOpen: false,
            realname: '',
            tz: '',
            rangeInfoOpen: false,
        };

        const qs = (obj) =>
            Object.entries(obj)
                .map(([name, value]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
                .join('&');
        var response = fetch(
            `/splunkd/services/authentication/current-context?${qs({
                output_mode: 'json',
                count: 0,
                offset: 0,
            })}`,
            { credentials: 'include' }
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data.entry[0]['content']);
                this.setState({ tz: data.entry[0]['content']['tz'] });
                this.setState({ realname: data.entry[0]['content']['realname'] });
            })
            .catch((e) => {
                console.error('Error during user info retrieval/parsing', e);
            });

        this.handleChangePickerType = this.handleChangePickerType.bind(this);
        this.handleTimeType = this.handleTimeType.bind(this);
        this.handleRelativeTime = this.handleRelativeTime.bind(this);
        this.handleDashboardIdChange = this.handleDashboardIdChange.bind(this);
        this.handleThemeSelect = this.handleThemeSelect.bind(this);
        this.handleIntervalInfoOpen = this.handleIntervalInfoOpen.bind(this);
        this.handleIntervalInfoClose = this.handleIntervalInfoClose.bind(this);

        this.handleRangeStartOpen = this.handleRangeStartOpen.bind(this);
        this.handleRangeStartClose = this.handleRangeStartClose.bind(this);

        this.handleRangeInfoOpen = this.handleRangeInfoOpen.bind(this);
        this.handleRangeInfoClose = this.handleRangeInfoClose.bind(this);

        this.handleRangeEndOpen = this.handleRangeEndOpen.bind(this);
        this.handleRangeEndClose = this.handleRangeEndClose.bind(this);

        this.handleRelativeRangeOpen = this.handleRelativeRangeOpen.bind(this);
        this.handleRelativeRangeClose = this.handleRelativeRangeClose.bind(this);

        this.startChange = this.startChange.bind(this);
        this.endChange = this.endChange.bind(this);
        this.handleTimeInterval = this.handleTimeInterval.bind(this);
    }

    handleDashboardIdChange(event, { value }) {
        this.setState({
            dashboardid: value,
        });
    }

    handleThemeSelect(event, { value }) {
        this.setState({
            theme: value,
        });
    }

    handleChangePickerType(event, { value }) {
        this.setState({
            pickertype: value,
        });
    }

    handleTimeInterval(event, { value }) {
        this.setState({
            timeinterval: value,
        });
    }

    startChange(event) {
        this.setState({
            rangeStart: event.target.value + ' 00:00:00 ' + this.state.tz,
        });
    }

    endChange(event) {
        this.setState({
            rangeEnd: event.target.value + ' 00:00:00 ' + this.state.tz,
        });
    }

    handleIntervalInfoOpen() {
        this.setState({ infoModalOpen: true });
    }
    handleIntervalInfoClose() {
        this.setState({ infoModalOpen: false });
    }

    handleRangeStartOpen() {
        this.setState({ rangeStartOpen: true });
    }
    handleRangeStartClose() {
        this.setState({ rangeStartOpen: false });
    }

    handleRangeInfoOpen() {
        this.setState({ rangeInfoOpen: true });
    }
    handleRangeInfoClose() {
        this.setState({ rangeInfoOpen: false });
    }

    handleRangeEndOpen() {
        this.setState({ rangeEndOpen: true });
    }
    handleRangeEndClose() {
        this.setState({ rangeEndOpen: false });
    }

    handleRelativeRangeClose() {
        this.setState({ rangeRelativeOpen: false });
    }
    handleRelativeRangeOpen() {
        this.setState({ rangeRelativeOpen: true });
    }

    handleTimeType(event, { value }) {
        this.setState({
            timetype: value,
        });

        if (value == 'explicit') {
            this.setState({ relativetime: '' });
        }

        if (value == 'relative') {
            this.setState({ rangeStart: '' });
            this.setState({ rangeEnd: '' });
        }
    }

    handleRelativeTime(event, { value }) {
        this.setState({
            relativetime: value,
        });
    }

    render() {
        var url =
            window.location.href.replace(/[^\/]+$/, '') +
            this.state.pickertype +
            '?dashboardid=' +
            encodeURIComponent(this.state.dashboardid) +
            '&rangeStart=' +
            encodeURIComponent(this.state.rangeStart) +
            '&rangeEnd=' +
            encodeURIComponent(this.state.rangeEnd) +
            '&timeinterval=' +
            encodeURIComponent(this.state.timeinterval) +
            '&theme=' +
            encodeURIComponent(this.state.theme) +
            '&timerangetype=' +
            encodeURIComponent(this.state.timetype) +
            '&relativetime=' +
            encodeURIComponent(this.state.relativetime) +
            '&tz=' +
            encodeURIComponent(this.state.tz);

        const colStyle = {
            border: `0px solid`,
            padding: 5,
            minHeight: 10,
            width: '100%',
            paddingLeft: 20,
            textAlign: 'center',
        };

        const calColStyle = {
            border: `0px solid`,
            padding: 5,
            minHeight: 10,
            width: '100%',
            textAlign: 'center',

            paddingReft: 50,
        };

        let intervalPicker;
        let intervalColumn;

        intervalPicker = (
            <ColumnLayout.Column style={colStyle} span={1}>
                <Select onChange={this.handleTimeInterval}>
                    <Select.Option value="1sec" label="1 Second" />
                    <Select.Option value="1min" label="1 Minute" />
                    <Select.Option value="15min" label="15 Minutes" />
                    <Select.Option value="30min" label="30 Minutes" />
                    <Select.Option value="hours" label="Hours" />
                    <Select.Option value="days" label="Days" />
                    <Select.Option value="years" label="Years" />
                </Select>
            </ColumnLayout.Column>
        );

        intervalColumn = (
            <ColumnLayout.Column style={colStyle}>
                <Button
                    appearance={'pill'}
                    onClick={this.handleIntervalInfoOpen}
                    label={<InfoCircle size={1.5} />}
                />
                <Modal
                    onRequestClose={this.handleIntervalInfoClose}
                    open={this.state.infoModalOpen}
                >
                    <Modal.Body>
                        The time interval specifies how much the time changes each time the slider
                        moves by one step mark.{' '}
                        <ul>
                            <li>Years = 31536000 seconds</li>
                            <li>Days = 864000 seconds</li>
                            <li>Hours = 36000 seconds</li>
                            <li>30 Minutes = 1800 Seconds</li>
                            <li>15 Minutes = 900</li>
                            <li>1 Minute = 60 Seconds</li>
                            <li>1 Second = 1 Second</li>
                        </ul>
                        <P>See #3 on the image below</P>
                        {this.state.pickertype == 'rangeslider' ? (
                            <img
                                style={{ width: '100%' }}
                                src="/static/app/splunk-timelapse-visualizations/rangeslider.png"
                            ></img>
                        ) : (
                            <img
                                style={{ width: '100%' }}
                                src="/static/app/splunk-timelapse-visualizations/timelapse.png"
                            ></img>
                        )}
                    </Modal.Body>
                </Modal>
                Select Time Interval:
            </ColumnLayout.Column>
        );

        return (
            <SplunkThemeProvider family="enterprise" colorScheme="dark" density="compact">
                <div style={{ width: '100%' }}>
                    <StyledContainer style={{ width: '100%' }}>
                        <ColumnLayout gutter={1} style={{ width: '100%' }}>
                            <ColumnLayout.Row>
                                <ColumnLayout.Column style={colStyle} span={5}>
                                    <Heading level={1}>
                                        Welcome {this.state.realname},
                                        <br />
                                    </Heading>
                                    <Heading level={2}>
                                        This app will allow you to generate dashboards with custom
                                        time inputs. If you have any questions, please visit the{' '}
                                        <Link
                                            to={
                                                window.location.href.replace(/[^\/]+$/, '') +
                                                'documentation'
                                            }
                                        >
                                            documentation
                                        </Link>
                                        . There you will find performance tips, as well as features
                                        that are, and are not, supported.
                                    </Heading>
                                </ColumnLayout.Column>
                            </ColumnLayout.Row>
                            <ColumnLayout.Row>
                                <ColumnLayout.Column style={colStyle} span={5}>
                                    <Heading level={2}>
                                        If you understand how to use this app, than you can get
                                        started by using the following form to build your custom
                                        dashboard URL:
                                    </Heading>
                                </ColumnLayout.Column>
                            </ColumnLayout.Row>
                            <ColumnLayout.Row>
                                <ColumnLayout.Column style={colStyle}>
                                    Select Dashboard:
                                </ColumnLayout.Column>
                                <ColumnLayout.Column style={colStyle}>
                                    Select Dashboard Theme:
                                </ColumnLayout.Column>
                                <ColumnLayout.Column style={colStyle}>
                                    Select Type of Input:
                                </ColumnLayout.Column>
                                <ColumnLayout.Column style={colStyle}>
                                    <Button
                                        appearance={'pill'}
                                        onClick={this.handleRangeInfoOpen}
                                        label={<InfoCircle size={1.5} />}
                                    />{' '}
                                    <Modal
                                        onRequestClose={this.handleRangeInfoClose}
                                        open={this.state.rangeInfoOpen}
                                    >
                                        <Modal.Body>
                                            <Heading level={2}>
                                                The range of time for the timelapse.
                                            </Heading>
                                            <List>
                                                <List.Item>Explicit</List.Item>
                                                <List>
                                                    <List.Item>
                                                        Specifies exactly what the start and end
                                                        time will be for the timelapse. Using this
                                                        means that every time the dashboard is
                                                        loaded, the timelapse will use the exact
                                                        same start and end time.{' '}
                                                    </List.Item>
                                                </List>

                                                <List.Item>Relative</List.Item>
                                                <List>
                                                    <List.Item>
                                                        {' '}
                                                        Specifies a relative start and end time for
                                                        the timelapse. Using this will mean that
                                                        every time the dashboard is loaded, the
                                                        timelapse will use a time that is relative
                                                        to the current time.{' '}
                                                    </List.Item>
                                                </List>
                                            </List>
                                        </Modal.Body>
                                    </Modal>
                                    Select Time Range Type:
                                </ColumnLayout.Column>
                                {this.state.timetype === 'explicit' ? (
                                    <ColumnLayout.Column style={colStyle} span={1}>
                                        <>
                                            <Button
                                                appearance={'pill'}
                                                onClick={this.handleRangeStartOpen}
                                                label={<InfoCircle size={1.5} />}
                                            />
                                            <Modal
                                                onRequestClose={this.handleRangeStartClose}
                                                open={this.state.rangeStartOpen}
                                            >
                                                <Modal.Body>
                                                    <Heading level={2}>
                                                        The earliest time in the{' '}
                                                        {this.state.pickertype}.{' '}
                                                    </Heading>
                                                    <P>See #1 on the image below</P>
                                                    {this.state.pickertype == 'rangeslider' ? (
                                                        <img
                                                            style={{ width: '100%' }}
                                                            src="/static/app/splunk-timelapse-visualizations/rangeslider.png"
                                                        ></img>
                                                    ) : (
                                                        <img
                                                            style={{ width: '100%' }}
                                                            src="/static/app/splunk-timelapse-visualizations/timelapse.png"
                                                        ></img>
                                                    )}
                                                </Modal.Body>
                                            </Modal>
                                            Select Range Start:
                                        </>
                                    </ColumnLayout.Column>
                                ) : (
                                    <></>
                                )}

                                {this.state.timetype === '' ? (
                                    <ColumnLayout.Column
                                        style={{
                                            ...colStyle,
                                        }}
                                        span={1}
                                    ></ColumnLayout.Column>
                                ) : (
                                    <></>
                                )}

                                {this.state.timetype === 'relative' ? (
                                    <ColumnLayout.Column
                                        style={{
                                            ...colStyle,
                                        }}
                                        span={1}
                                    >
                                        <div style={{ width: '200px' }}>
                                            <Button
                                                appearance={'pill'}
                                                onClick={this.handleRelativeRangeOpen}
                                                label={<InfoCircle size={1.5} />}
                                            />
                                            <Modal
                                                onRequestClose={this.handleRelativeRangeClose}
                                                open={this.state.rangeRelativeOpen}
                                            >
                                                <Modal.Body>
                                                    <Heading level={2}>
                                                        The earliest and the latest time in the{' '}
                                                        {this.state.pickertype}.{' '}
                                                    </Heading>
                                                    <P>See #1 and #2 on the image below</P>
                                                    {this.state.pickertype == 'rangeslider' ? (
                                                        <img
                                                            style={{ width: '100%' }}
                                                            src="/static/app/splunk-timelapse-visualizations/rangeslider.png"
                                                        ></img>
                                                    ) : (
                                                        <img
                                                            style={{ width: '100%' }}
                                                            src="/static/app/splunk-timelapse-visualizations/timelapse.png"
                                                        ></img>
                                                    )}
                                                </Modal.Body>
                                            </Modal>
                                            Select Relative Time:
                                        </div>
                                    </ColumnLayout.Column>
                                ) : (
                                    <></>
                                )}

                                {this.state.timetype === 'explicit' ? (
                                    <ColumnLayout.Column style={colStyle}>
                                        <Button
                                            appearance={'pill'}
                                            onClick={this.handleRangeEndOpen}
                                            label={<InfoCircle size={1.5} />}
                                        />{' '}
                                        <Modal
                                            onRequestClose={this.handleRangeEndClose}
                                            open={this.state.rangeEndOpen}
                                        >
                                            <Modal.Body>
                                                <Heading level={2}>
                                                    The latest time in the {this.state.pickertype}.
                                                </Heading>
                                                <P>See #2 on the image below</P>
                                                {this.state.pickertype == 'rangeslider' ? (
                                                    <img
                                                        style={{ width: '100%' }}
                                                        src="/static/app/splunk-timelapse-visualizations/rangeslider.png"
                                                    ></img>
                                                ) : (
                                                    <img
                                                        style={{ width: '100%' }}
                                                        src="/static/app/splunk-timelapse-visualizations/timelapse.png"
                                                    ></img>
                                                )}
                                            </Modal.Body>
                                        </Modal>
                                        Select Range End:
                                    </ColumnLayout.Column>
                                ) : (
                                    <></>
                                )}
                                {intervalColumn}
                            </ColumnLayout.Row>
                            <ColumnLayout.Row>
                                <ColumnLayout.Column style={colStyle} span={1}>
                                    <ListDashboards changehandler={this.handleDashboardIdChange} />
                                </ColumnLayout.Column>
                                <ColumnLayout.Column style={colStyle} span={1}>
                                    <Select defaultValue="dark" onChange={this.handleThemeSelect}>
                                        <Select.Option value="dark" label="Dark Theme" />
                                        <Select.Option value="light" label="Light Theme" />
                                    </Select>
                                </ColumnLayout.Column>
                                <ColumnLayout.Column style={colStyle} span={1}>
                                    <Select
                                        defaultValue="timelapse"
                                        onChange={this.handleChangePickerType}
                                    >
                                        <Select.Option value="rangeslider" label="Range Slider" />
                                        <Select.Option value="timelapse" label="Timelapse" />
                                    </Select>
                                </ColumnLayout.Column>
                                <ColumnLayout.Column style={colStyle} span={1}>
                                    <Select onChange={this.handleTimeType}>
                                        <Select.Option value="explicit" label="Explicit" />
                                        <Select.Option value="relative" label="Relative" />
                                    </Select>
                                </ColumnLayout.Column>
                                {this.state.timetype === 'explicit' ? (
                                    <ColumnLayout.Column style={{ ...calColStyle }} span={1}>
                                        <input
                                            type="date"
                                            id="start"
                                            name="dashboard-start"
                                            onChange={this.startChange}
                                        ></input>{' '}
                                    </ColumnLayout.Column>
                                ) : (
                                    <></>
                                )}

                                {this.state.timetype === 'relative' ? (
                                    <ColumnLayout.Column style={{ ...calColStyle }} span={1}>
                                        <Select
                                            onChange={this.handleRelativeTime}
                                            style={{ width: '200px' }}
                                        >
                                            <Select.Option value="30min" label="30 Minutes" />
                                            <Select.Option value="1h" label="1 Hour" />
                                            <Select.Option value="6h" label="6 Hours" />
                                            <Select.Option value="12h" label="12 Hours" />
                                            <Select.Option value="1d" label="1 Day" />
                                            <Select.Option value="7d" label="7 Days" />
                                            <Select.Option value="14d" label="14 Days" />
                                            <Select.Option value="30d" label="30 Days" />
                                            <Select.Option value="180d" label="180 Days" />
                                            <Select.Option value="365d" label="1 Year" />
                                        </Select>{' '}
                                    </ColumnLayout.Column>
                                ) : (
                                    <></>
                                )}

                                {this.state.timetype === 'explicit' ? (
                                    <ColumnLayout.Column style={calColStyle} span={1}>
                                        <input
                                            type="date"
                                            id="end"
                                            name="dashboard-end"
                                            onChange={this.endChange}
                                        ></input>
                                    </ColumnLayout.Column>
                                ) : (
                                    <></>
                                )}

                                {this.state.timetype === '' ? (
                                    <ColumnLayout.Column style={calColStyle} span={1}>
                                        {' '}
                                        Please select a Time Range Type...
                                    </ColumnLayout.Column>
                                ) : (
                                    <></>
                                )}

                                {intervalPicker}
                            </ColumnLayout.Row>
                            <ColumnLayout.Row>
                                <ColumnLayout.Column
                                    style={{ ...colStyle, textAlign: 'left' }}
                                    span={4}
                                >
                                    <Heading level={2}>
                                        Use the link below to view your custom dashboard:{' '}
                                    </Heading>
                                    <Heading level={4}>
                                        You can also share this URL with other users who have access
                                        to your Splunk Environment, the dashboard you've selected,
                                        and this app.
                                    </Heading>
                                    <Link to={url} openInNewContext>
                                        {url}
                                    </Link>
                                </ColumnLayout.Column>
                            </ColumnLayout.Row>
                        </ColumnLayout>
                    </StyledContainer>
                </div>
            </SplunkThemeProvider>
        );
    }
}

export default DashboardSelector;
