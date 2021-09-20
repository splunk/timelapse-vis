import React from "react"
import { format } from "date-fns";
import TimeRange from "react-timeline-range-slider";
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';
import DashboardCore from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import GeoRegistry from '@splunk/dashboard-context/GeoRegistry';
import GeoJsonProvider from '@splunk/dashboard-context/GeoJsonProvider';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';


/*
const Wrapper = styled.div`
    position: fixed;
    tops: 0;
    left: 0;
    right: 0;
    height: 125px;
    background: #ffffff;
    border-bottom: 5px solid rgb(8, 9, 10);
    color: #444444;
    z-index: 999;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const LoadingCt = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`;

const PlaybackControls = styled.div`
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const CurrentValueCt = styled.div`
    width: 190px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
`;

const Timeline = styled.div`
    flex: 1;
    position: relative;
`;

const SliderCt = styled.div`
    box-sizing: border-box;
    padding: 0 10px 0 10px;
    background: rgba(255, 255, 255, 0.001);
    position: absolute;
    top: 0;
    width: 100%;
    height: 120px;
    z-index: 999;
`;
*/
var search = window.location.search
const params = new URLSearchParams(search);
const rangeStart = Math.round((Date.parse(params.get('rangeStart')).valueOf()) / 1000);
const rangeEnd = Math.round((Date.parse(params.get('rangeEnd')).valueOf()) / 1000);
const dashboardid = params.get('dashboardid');

const timeinterval = params.get('timeinterval');
var definition = ""


const geoRegistry = GeoRegistry.create();
geoRegistry.addDefaultProvider(new GeoJsonProvider());


class TimelapseControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            frequency: 24,
            step: 1000 * 60 * 60 * 24,
            startTime: rangeStart,
            endTime: rangeEnd,
            time: rangeStart * 1000,
            def: this.props.dash.props.definition
        }
        this.fetchDefinition();

        this.onStopCallback = this.onStopCallback.bind(this)
        this.onPlayCallback = this.onPlayCallback.bind(this)

        console.log(this.state.time)
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
                definition_new.dataSources[v].options.query = definition_new.dataSources[v].options.query + "| eval time=_time | where time<=" + (this.state.time.valueOf() /1000).toString()  + " AND time>=" + this.state.startTime.toString() + " | fields - time"
            }
            this.setState({
                def: definition_new
            })
            //this.state.time = (this.state.time + this.state.step)
        }, 1000 / this.state.frequency)

        //this.state.time = this.state.time + this.state.step
    }

    onStopCallback(event) {
        console.log(this.state.isPlaying)

        this.setState({
            isPlaying: false
        })
        clearInterval(this.timer)
    }

    render() {
        return (
            <ColumnLayout>
                <ColumnLayout.Row>

                    <div className="App">
                        <button onClick={this.onPlayCallback}>Play</button>
                        <button onClick={this.onStopCallback}>Stop</button>
                        <h1>{new Date(this.state.time).toLocaleString()}</h1>
                    </div>

                </ColumnLayout.Row>

                <ColumnLayout.Row>
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
                </ColumnLayout.Row>
            </ColumnLayout>
        )
    }
}

export default TimelapseControls
