import { DashboardContextProvider } from '@splunk/dashboard-context';
import GeoJsonProvider from '@splunk/dashboard-context/GeoJsonProvider';
import GeoRegistry from '@splunk/dashboard-context/GeoRegistry';
import DashboardCore from '@splunk/dashboard-core';
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';
import { format } from "date-fns";
import React from "react";
import TimeRange from "react-timeline-range-slider";
import demodash from './demodash';

//Get the current dashboard ID
const dashboard_id = window.location.pathname.split("/").pop()

//Initialize Variables as empty
var selectedInterval = []
var disabledIntervals = []
var timelineInterval = []

const geoRegistry = GeoRegistry.create();
geoRegistry.addDefaultProvider(new GeoJsonProvider());

//Get the Time Ranges from the URL Params
var search = window.location.search
const params = new URLSearchParams(search);
const rangeStart = Math.round((Date.parse(params.get('rangeStart')).valueOf()) / 1000);
const rangeEnd = Math.round((Date.parse(params.get('rangeEnd')).valueOf()) / 1000);
var definition = ""

timelineInterval = [rangeStart * 1000, rangeEnd * 1000]
selectedInterval = timelineInterval

//SplunkTimeRangeSlider Class
class SplunkTimeRangeSliderInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      selectedInterval,
      def: this.props.dash.props.definition,
      hasNotBeenFetched: true,
      startTime: rangeStart,
      endTime: rangeEnd
    }
    this.fetchDefinition();
  }

  fetchDefinition() {
    var search = window.location.search
    const params = new URLSearchParams(search);
    const demo = params.get('demo');
    var dashboardid = params.get('dashboardid');
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

  errorHandler = ({ error }) => this.setState({ error });

  //Function for handling range slider changes
  onChangeCallback = async (selectedInterval) => {

    console.log(this.start_range)
    console.log(this.end_range)
    //Update the selectedInterval variable with the new start and end times
    selectedInterval.map((d, i) => {
      if (i == 0) {
        this.start_range = d.getTime() / 1000;
      }
      if (i == 1) {
        this.end_range = d.getTime() / 1000;
      }
    })

    //For each dataSource in the dashboard, append a where clause to limit the start/end time
    var definition_new = JSON.parse(JSON.stringify(definition))
    for (var v in definition.dataSources) {
      //Currently just modify the range of the search with a new range based on the rangeslider selected start and end
      definition_new.dataSources[v].options.query = definition_new.dataSources[v].options.query + "| eval time=_time | where time<=" + this.end_range.toString() + " AND time>=" + this.start_range.toString() + " | fields - time"
    }


    //Set the state variable of selectedInterval with the new values
    this.setState({ selectedInterval })


    this.setState({
      def: definition_new
    })
    //definition = definition_new
    this.state.hasNotBeenFetched = false
  };

  render() {
    const dash = <DashboardContextProvider geoRegistry={geoRegistry}>
      <DashboardCore
        width="100%"
        height="calc(100vh - 78px)"
        definition={this.state.def}
        preset={EnterprisePreset}
        initialMode="view"
      />
    </DashboardContextProvider>
    return (
      <ColumnLayout>
        <ColumnLayout.Row>

          {this.state.selectedInterval.map((d, i) => {
            if (i == 0) {
              return <span id={i} key={i}><p> Selected Interval: {format(d, "MM/dd/yyyy HH:mm")}  through&nbsp;</p> </span>
            }
            if (i == 1) {
              return <span id={i} key={i}><p>{format(d, "MM/dd/yyyy HH:mm")}</p></span>
            }
          })}
        </ColumnLayout.Row>
        <ColumnLayout.Row>
          <TimeRange
            error={this.state.error}
            ticksNumber={36}
            selectedInterval={selectedInterval}
            timelineInterval={timelineInterval}
            onUpdateCallback={this.errorHandler}
            onChangeCallback={this.onChangeCallback}
            disabledIntervals={disabledIntervals}
          />
        </ColumnLayout.Row>
        <ColumnLayout.Row>
          {this.state.hasNotBeenFetched ? <WaitSpinner size="large" /> : dash}
        </ColumnLayout.Row>
      </ColumnLayout>
    );
  }
}

export default SplunkTimeRangeSliderInput;

