import React, { Component } from 'react';
import { StyledContainer, StyledGreeting } from './DashboardselectorStyles';
import ListDashboards from '@splunk/listdashboards';
import Select from '@splunk/react-ui/Select';
import P from '@splunk/react-ui/Paragraph';

import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import Link from '@splunk/react-ui/Link';
import { SplunkThemeProvider } from '@splunk/themes';

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
        };
        this.handleChangePickerType = this.handleChangePickerType.bind(this);
        this.handleDashboardIdChange = this.handleDashboardIdChange.bind(this);
        this.handleThemeSelect = this.handleThemeSelect.bind(this);

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
            paddingLeft: 10,
        };

        const calColStyle = {
            border: `0px solid`,
            padding: 5,
            minHeight: 10,
            width: '100%',
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
                <ColumnLayout.Column style={colStyle}>Select Time Interval:</ColumnLayout.Column>
            );
        } else {
        }

        return (
            <SplunkThemeProvider family="enterprise" colorScheme="dark" density="compact">
                <StyledContainer>
                    <P>Use the following form to build your custom dashboard URL:</P>
                    <ColumnLayout gutter={1}>
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
                            <ColumnLayout.Column style={colStyle} span={4}>
                                <P>Use the following link to view your custom dashboard:</P>
                                <Link to={url} openInNewContext>
                                    {url}
                                </Link>
                            </ColumnLayout.Column>
                        </ColumnLayout.Row>
                    </ColumnLayout>
                </StyledContainer>
            </SplunkThemeProvider>
        );
    }
}

export default DashboardSelector;
