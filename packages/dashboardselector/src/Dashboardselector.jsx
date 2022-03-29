import React, { Component, useRef, useState } from 'react';
import { StyledContainer, StyledGreeting } from './DashboardselectorStyles';
import ListDashboards from '@splunk/listdashboards';
import Select from '@splunk/react-ui/Select';
import Heading from '@splunk/react-ui/Heading';
import InfoCircle from '@splunk/react-icons/InfoCircle';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import Button from '@splunk/react-ui/Button';

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
        };
        this.handleChangePickerType = this.handleChangePickerType.bind(this);
        this.handleDashboardIdChange = this.handleDashboardIdChange.bind(this);
        this.handleThemeSelect = this.handleThemeSelect.bind(this);
        this.handleIntervalInfoOpen = this.handleIntervalInfoOpen.bind(this);
        this.handleIntervalInfoClose = this.handleIntervalInfoClose.bind(this);

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
        console.log(event);

        this.setState({
            rangeStart: event.target.value + ' 00:00:00',
        });
    }

    endChange(event) {
        console.log(event.target.value);
        this.setState({
            rangeEnd: event.target.value + ' 00:00:00',
        });
    }

    handleIntervalInfoOpen() {
        this.setState({ infoModalOpen: true });
    }
    handleIntervalInfoClose() {
        this.setState({ infoModalOpen: false });
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
            encodeURIComponent(this.state.theme);

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

        if (this.state.pickertype == 'timelapse') {
            intervalPicker = (
                <ColumnLayout.Column style={colStyle} span={1}>
                    <Select onChange={this.handleTimeInterval}>
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
                            The time interval specifies how much the time changes each time the
                            slider moves by one step mark.{' '}
                            <ul>
                                <li>Years = 31557600000 seconds</li>
                                <li>Days = 86400000 seconds</li>
                                <li>Hours = 3600000 seconds</li>
                            </ul>
                        </Modal.Body>
                    </Modal>
                    Select Time Interval:
                </ColumnLayout.Column>
            );
        } else {
        }

        return (
            <SplunkThemeProvider family="enterprise" colorScheme="dark" density="compact">
                <div style={{ width: '100%' }}>
                    <StyledContainer style={{ width: '100%' }}>
                        <ColumnLayout gutter={1}>
                            <ColumnLayout.Row>
                                <ColumnLayout.Column style={colStyle} span={4}>
                                    <Heading level={2}>
                                        Use the following form to build your custom dashboard URL:
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
                                    Select Range Start:
                                </ColumnLayout.Column>
                                <ColumnLayout.Column style={colStyle}>
                                    Select Range End:
                                </ColumnLayout.Column>
                                {intervalColumn}
                            </ColumnLayout.Row>
                            <ColumnLayout.Row>
                                <ColumnLayout.Column style={colStyle} span={1}>
                                    <ListDashboards changehandler={this.handleDashboardIdChange} />
                                </ColumnLayout.Column>
                                <ColumnLayout.Column style={colStyle} span={1}>
                                    <Select onChange={this.handleThemeSelect}>
                                        <Select.Option value="dark" label="Dark Theme" />
                                        <Select.Option value="light" label="Light Theme" />
                                    </Select>
                                </ColumnLayout.Column>
                                <ColumnLayout.Column style={colStyle} span={1}>
                                    <Select onChange={this.handleChangePickerType}>
                                        <Select.Option value="rangeslider" label="Range Slider" />
                                        <Select.Option value="timelapse" label="Timelapse" />
                                    </Select>
                                </ColumnLayout.Column>
                                <ColumnLayout.Column style={calColStyle} span={1}>
                                    <input
                                        type="date"
                                        id="start"
                                        name="dashboard-start"
                                        onChange={this.startChange}
                                    ></input>
                                </ColumnLayout.Column>
                                <ColumnLayout.Column style={calColStyle} span={1}>
                                    <input
                                        type="date"
                                        id="end"
                                        name="dashboard-end"
                                        onChange={this.endChange}
                                    ></input>
                                </ColumnLayout.Column>
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
