import React from "react"
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';
import DashboardCore from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import GeoRegistry from '@splunk/dashboard-context/GeoRegistry';
import GeoJsonProvider from '@splunk/dashboard-context/GeoJsonProvider';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import Button from '@splunk/react-ui/Button';

var search = window.location.search
const params = new URLSearchParams(search);
const rangeStart = Math.round((Date.parse(params.get('rangeStart')).valueOf()) / 1000);
const rangeEnd = Math.round((Date.parse(params.get('rangeEnd')).valueOf()) / 1000);
const dashboardid = params.get('dashboardid');
const timeinterval = params.get('timeinterval');

let step = 1000 * 60 * 60 * 24
if(timeinterval == "days"){
 step = 1000 * 60 * 60 * 24
}
if(timeinterval =="hours"){
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
            def: this.props.dash.props.definition
        }
        this.fetchDefinition();
        this.onStopCallback = this.onStopCallback.bind(this)
        this.onPlayCallback = this.onPlayCallback.bind(this)
        this.onReverseCallback = this.onReverseCallback.bind(this)
    }

    fetchDefinition() {
        fetch(`/splunkd/services/data/ui/views/${dashboardid}?output_mode=json`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                var xml = new DOMParser().parseFromString(data.entry[0].content['eai:data'], 'application/xml');
                const def = JSON.parse(xml.getElementsByTagName('definition')[0].textContent);
                this.setState({ def });
                definition = def
            }
            )
            .catch(e => {
                console.error('Error during definition retrieval/parsing', e);
            });
    }


    onPlayCallback(event) {
        let interval
        this.state.isPlaying = true

        if(this.state.isReversing)
        {
        this.setState({
            isReversing: false
        })
        }

        /** set interval to run frequncy times every second */
        this.timer = setInterval(() => {
            /** increment the time by the step value */
            this.setState({
                time: (this.state.time.valueOf()) + this.state.step
            })
            var definition_new = JSON.parse(JSON.stringify(definition))

            for (var v in definition.dataSources) {
                //console.log(definition_new.dataSources[v].options.query + "| eval time=_time | where time<=" + (this.state.time.valueOf() /1000).toString() + " AND time>=" + this.state.startTime.toString() + " | fields - time")
                //Currently just modify the range of the search with a new range based on the rangeslider selected start and end
                definition_new.dataSources[v].options.query = definition_new.dataSources[v].options.query + "| eval time=_time | where time<=" + (this.state.time.valueOf() / 1000).toString() + " AND time>=" + this.state.startTime.toString() + " | fields - time"
            }
            this.setState({
                def: definition_new
            })
            //this.state.time = (this.state.time + this.state.step)
        }, 5000)
        //this.state.time = this.state.time + this.state.step
    }

    onReverseCallback(event) {
        let interval

        if(this.state.isPlaying)
        {
        this.setState({
            isPlaying: false
        })
        }

        this.state.isReversing = true

        /** set interval to run frequncy times every second */
        this.timer = setInterval(() => {
            /** increment the time by the step value */
            this.setState({
                time: (this.state.time.valueOf()) - this.state.step
            })
            var definition_new = JSON.parse(JSON.stringify(definition))

            for (var v in definition.dataSources) {
                //console.log(definition_new.dataSources[v].options.query + "| eval time=_time | where time<=" + (this.state.time.valueOf() /1000).toString() + " AND time>=" + this.state.startTime.toString() + " | fields - time")
                //Currently just modify the range of the search with a new range based on the rangeslider selected start and end
                definition_new.dataSources[v].options.query = definition_new.dataSources[v].options.query + "| eval time=_time | where time<=" + (this.state.time.valueOf() / 1000).toString() + " AND time>=" + this.state.startTime.toString() + " | fields - time"
            }
            this.setState({
                def: definition_new
            })
            //this.state.time = (this.state.time + this.state.step)
        }, 5000)
        //this.state.time = this.state.time + this.state.step
    }

    onStopCallback(event) {
        this.setState({
            isPlaying: false
        })
        clearInterval(this.timer)
    }

    render() {
        return (
            <ColumnLayout>
               
                <ColumnLayout.Row>
                    <ColumnLayout.Column span={2}>
                        <h1>{new Date(this.state.time).toLocaleString()}</h1>
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={6}>
                    </ColumnLayout.Column>
                </ColumnLayout.Row>

                <ColumnLayout.Row>
                    <ColumnLayout.Column span={2}>
                    <Button label="Reverse" onClick={this.onReverseCallback} appearance="primary" />
                        <Button label="Start" onClick={this.onPlayCallback} appearance="primary" />
                        <Button label="Stop" onClick={this.onStopCallback} appearance="primary" />
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={6}>
                    </ColumnLayout.Column>
                </ColumnLayout.Row>
                <ColumnLayout.Row>
                    <ColumnLayout.Column span={8}>
                        <DashboardContextProvider geoRegistry={geoRegistry}>
                            <DashboardCore
                                width="100%"
                                height="calc(100vh - 78px)"
                                definition={this.state.def}
                                onDefinitionChange={console.log("Changed!")}
                                preset={EnterprisePreset}
                                initialMode="view"
                            />
                        </DashboardContextProvider>
                    </ColumnLayout.Column>
                </ColumnLayout.Row>
            </ColumnLayout>
        )
    }
}

export default TimelapseControls
