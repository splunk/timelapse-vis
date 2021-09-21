import React from "react"
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';
import DashboardCore from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import GeoRegistry from '@splunk/dashboard-context/GeoRegistry';
import GeoJsonProvider from '@splunk/dashboard-context/GeoJsonProvider';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import Button from '@splunk/react-ui/Button';
import Select from '@splunk/react-ui/Select';
import Slider from '@splunk/react-ui/Slider';
import { SplunkThemeProvider } from '@splunk/themes';
import Heading from '@splunk/react-ui/Heading';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';
import demodash from './demodash'

var search = window.location.search
const params = new URLSearchParams(search);
const rangeStart = Math.round((Date.parse(params.get('rangeStart')).valueOf()) / 1000);
const rangeEnd = Math.round((Date.parse(params.get('rangeEnd')).valueOf()) / 1000);
var dashboardid = params.get('dashboardid');
const timeinterval = params.get('timeinterval');
const demo = params.get('demo');


let step = 1000 * 60 * 60 * 24
if (timeinterval == "days") {
    step = 1000 * 60 * 60 * 24
}
if (timeinterval == "hours") {
    step = 1000 * 60 * 60
}

var definition = ""

const geoRegistry = GeoRegistry.create();
geoRegistry.addDefaultProvider(new GeoJsonProvider());


class TimelapseControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            isReversing: false,
            frequency: 24,
            step: step,
            startTime: rangeStart,
            endTime: rangeEnd,
            time: rangeStart * 1000,
            def: this.props.dash.props.definition,
            playbackMultiplier: '4',
            displayValue: TimelapseControls.convertValueToLabel(1),
            value: 1,
            hasNotBeenFetched: true,
        }
        this.fetchDefinition();
        this.onStopCallback = this.onStopCallback.bind(this)
        this.onPlayCallback = this.onPlayCallback.bind(this)
        this.onReverseCallback = this.onReverseCallback.bind(this)
        this.handleSpeedPicker = this.handleSpeedPicker.bind(this)
        this.handleSliderChange = this.handleSliderChange.bind(this)
        this.updateDataSources = this.updateDataSources.bind(this)

    }

    fetchDefinition() {
        if (demo == "true") {
            dashboardid = "thisisonlyademo"
          }
        fetch(`/splunkd/services/data/ui/views/${dashboardid}?output_mode=json`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                var xml = new DOMParser().parseFromString(data.entry[0].content['eai:data'], 'application/xml');
                const def = JSON.parse(xml.getElementsByTagName('definition')[0].textContent);
                this.setState({ def });
                definition = def
                this.setState({ hasNotBeenFetched: false })
            }
            )
            .catch(e => {

                        //If there is an error, and demo==true, apply the demo dashboard.
        if (demo == "true") {
            this.setState({ def: demodash });
            definition = demodash
            this.setState({ hasNotBeenFetched: false })
          }


                console.error('Error during definition retrieval/parsing', e);
            });
    }

    updateDataSources() {
        var definition_new = JSON.parse(JSON.stringify(definition))
        for (var v in definition.dataSources) {
            //console.log(definition_new.dataSources[v].options.query + "| eval time=_time | where time<=" + (this.state.time.valueOf() /1000).toString() + " AND time>=" + this.state.startTime.toString() + " | fields - time")
            //Currently just modify the range of the search with a new range based on the rangeslider selected start and end
            definition_new.dataSources[v].options.query = definition_new.dataSources[v].options.query + "| eval time=_time | where time<=" + (this.state.time.valueOf() / 1000).toString() + " AND time>=" + this.state.startTime.toString() + " | fields - time"
        }
        this.setState({
            def: definition_new
        })
    }
    onPlayCallback(event) {
        this.state.isPlaying = true

        if (this.state.isReversing) {
            clearInterval(this.timer)

            this.setState({
                isReversing: false
            })
        }

        /** set interval to run frequncy times every second */
        this.timer = setInterval(() => {
            /** increment the time by the step value */
            if ((this.state.time.valueOf() + this.state.step) >= this.state.endTime * 1000) {
                this.setState({
                    time: this.state.startTime * 1000
                })
            }
            else {
                this.setState({
                    time: (this.state.time.valueOf()) + this.state.step
                })
            }
            this.updateDataSources()
            //this.state.time = (this.state.time + this.state.step)
        }, 10000 / this.state.playbackMultiplier)
        //this.state.time = this.state.time + this.state.step
    }

    onReverseCallback(event) {
        if (this.state.isPlaying) {
            clearInterval(this.timer)
            this.setState({
                isPlaying: false
            })
        }

        this.state.isReversing = true

        /** set interval to run frequncy times every second */
        this.timer = setInterval(() => {
            /** increment the time by the step value */
            if ((this.state.time.valueOf() - this.state.step) <= this.state.startTime * 1000) {
                this.setState({
                    time: this.state.endTime * 1000
                })
            }
            else {
                this.setState({
                    time: (this.state.time.valueOf()) - this.state.step
                })
            }
            this.updateDataSources()

            //this.state.time = (this.state.time + this.state.step)
        }, 10000 / this.state.playbackMultiplier)
        //this.state.time = this.state.time + this.state.step
    }

    onStopCallback(event) {
        this.setState({
            isPlaying: false
        })
        this.setState({
            isReversing: false
        })
        clearInterval(this.timer)
    }

    handleSpeedPicker(event, { value }) {
        this.setState({
            playbackMultiplier: value
        });
    };

    static convertValueToLabel(value) {
        return new Date(value).toLocaleString()

    }

    handleSliderChange(event, { value }) {
        this.setState({
            displayValue: TimelapseControls.convertValueToLabel(value),
            value,
        });
        this.setState({
            time: value
        }, () => {
            this.updateDataSources()
        })
    };

    render() {
        const colStyle = { border: `0px solid black`, padding: 10, paddingRight: 20, whiteSpace: 'nowrap', textAlign: 'center' };
        const textStyle = { textAlign: 'center' }
        const dash = <DashboardContextProvider geoRegistry={geoRegistry}>
            <DashboardCore
                width="100%"
                height="calc(100vh - 78px)"
                definition={this.state.def}
                preset={EnterprisePreset}
                initialMode="view"
            /></DashboardContextProvider>
        return (
            <ColumnLayout gutter={2} divider="vertical">
                <ColumnLayout.Row alignItems="center">
                    <ColumnLayout.Column span={2} style={colStyle}>
                        <SplunkThemeProvider family="enterprise" colorScheme="light" density="compact">
                            <Heading style={textStyle} level={2}>{new Date(this.state.time).toLocaleString()}</Heading>
                            <Button label="Play" onClick={this.onPlayCallback} appearance="primary" />
                            <Button label="Pause" onClick={this.onStopCallback} appearance="primary" />
                            <Button label="Reverse" onClick={this.onReverseCallback} appearance="primary" />
                            <Select value={this.state.playbackMultiplier} prefixLabel="Timelapse Speed" onChange={this.handleSpeedPicker} >
                                <Select.Option value="1" label="1x" />
                                <Select.Option value="2" label="2x" />
                                <Select.Option value="3" label="3x" />
                                <Select.Option value="4" label="4x" />
                                <Select.Option value="10" label="10x" />
                                <Select.Option value="20" label="20x" />
                                <Select.Option value="200" label="200x" />
                            </Select>
                        </SplunkThemeProvider>
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={6} style={colStyle} >
                        <SplunkThemeProvider family="enterprise" colorScheme="light" density="compact">
                            <Slider min={this.state.startTime * 1000} value={this.state.time} displayValue={this.state.displayValue} onChange={this.handleSliderChange} max={this.state.endTime * 1000} step={step} defaultValue={this.state.startTime * 1000} minLabel={new Date(this.state.startTime * 1000).toLocaleString()} maxLabel={new Date(this.state.endTime * 1000).toLocaleString()} />
                        </SplunkThemeProvider>
                    </ColumnLayout.Column>
                </ColumnLayout.Row>
                <ColumnLayout.Row>
                    <ColumnLayout.Column span={8}>
                        {this.state.hasNotBeenFetched ? <WaitSpinner size="large" /> : dash}
                    </ColumnLayout.Column>
                </ColumnLayout.Row>
            </ColumnLayout>
        )
    }
}

export default TimelapseControls
