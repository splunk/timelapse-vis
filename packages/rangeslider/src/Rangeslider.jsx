import React from "react";
import { format } from "date-fns";
import TimeRange from "react-timeline-range-slider";
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';
import DashboardCore from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import GeoRegistry from '@splunk/dashboard-context/GeoRegistry';
import GeoJsonProvider from '@splunk/dashboard-context/GeoJsonProvider';


//Get the current dashboard ID
const dashboard_id = window.location.pathname.split("/").pop()

//Initialize Variables as empty
var selectedInterval = []
var disabledIntervals = []
var timelineInterval = []
var def = {}

const geoRegistry = GeoRegistry.create();
geoRegistry.addDefaultProvider(new GeoJsonProvider());



var search = window.location.search
const params = new URLSearchParams(search);
const rangeStart = params.get('rangeStart');
const rangeEnd = params.get('rangeEnd');

console.log(params)
console.log(rangeStart)
console.log(rangeEnd)

timelineInterval = [Date.parse(rangeStart), Date.parse(rangeEnd)]
selectedInterval = timelineInterval

//SplunkTimeRangeSlider Class
class SplunkTimeRangeSliderInput extends React.Component {

  constructor(props) {
    super(props);
    this.fetchDefinition();
  }

  fetchDefinition() {
    var search = window.location.search
    const params = new URLSearchParams(search);
    const dashboardid = params.get('dashboardid');

    fetch(`/splunkd/services/data/ui/views/${dashboardid}?output_mode=json`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        var xml = new DOMParser().parseFromString(data.entry[0].content['eai:data'], 'application/xml');
        const def = JSON.parse(xml.getElementsByTagName('definition')[0].textContent);
        this.setState({ def });

      }
      )
      .catch(e => {
        console.error('Error during definition retrieval/parsing', e);
      });
  }

  //Initialize State
  state = {
    error: false,
    selectedInterval,
    def: this.props.dash.props.definition
  };

  //Create DashboardCore using the passed definition
  //dash = <DashboardCore
  //          width="100%"
  //          height="calc(100vh - 78px)"
  //          definition={this.state.def}
  //          onDefinitionChange={console.log("Changed!")}
  //          preset={EnterprisePreset} />

  //Create start_range as 0
  start_range = 0

  //Create End Range as Today's Date
  end_range = Math.round(Date.now() / 1000)

  errorHandler = ({ error }) => this.setState({ error });

  //Function for handling range slider changes
  onChangeCallback = async (selectedInterval) => {


    //Update the selectedInterval variable with the new start and end times
    selectedInterval.map((d, i) => {
      if (i == 0) {
        this.start_range = d.getTime() / 1000;
      }
      if (i == 1) {
        this.end_range = d.getTime() / 1000;
      }
    })


    //Set the state variable of selectedInterval with the new values
    this.setState({ selectedInterval })

    //For each dataSource in the dashboard, append a where clause to limit the start/end time
    var definition_new = JSON.parse(JSON.stringify(this.state.def))
    var definition_old = this.state.def
    for (var v in definition_new.dataSources) {

      //Need to update this later, currently just replacing the entire search with a new range based on the rangeslider selected start and end
      //definition_new.dataSources[v].options.query = definition_new.dataSources[v].options.query + "| where time<=" + this.end_range.toString() + " AND time>=" + this.start_range.toString()+" | fields - time"
      definition_new.dataSources[v].options.query = definition_new.dataSources[v].options.query.substring(0, definition_new.dataSources[v].options.query.indexOf('| noop')) + "| noop" + "| eval time=_time | where time<=" + this.end_range.toString() + " AND time>=" + this.start_range.toString() + " | fields - time"

    }

    //Set the state with the new definition
    //this.setState({def: definition_new}, function() {
    //console.log("Updated")
    //});

    await this.setState((definition_old, props) => ({
      def: definition_new
    }));

    //this.DashboardCoreApi.updateDefinition(this.state.def)
    //console.log(this.dash);
  };

  render() {

    const styles = {
      backgroundColor: 'white'
    };

    const { selectedInterval, def, error } = this.state;
    return (
      <div className="container" style={styles}>
        <div className="info">
          <span><strong>Selected Interval:</strong> </span>
          {selectedInterval.map((d, i) => {
            if (i == 0) {
              return <span id={i} key={i}>{format(d, "MM/dd/yyyy HH:mm")} through </span>
            }
            if (i == 1) {
              return <span id={i} key={i}>{format(d, "MM/dd/yyyy HH:mm")}</span>
            }
          })}
        </div>

        <TimeRange
          error={error}
          ticksNumber={36}
          selectedInterval={timelineInterval}
          timelineInterval={timelineInterval}
          onUpdateCallback={this.errorHandler}
          onChangeCallback={this.onChangeCallback}
          disabledIntervals={disabledIntervals}
        />

        <div>
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


        </div>
      </div>
    );
  }
}

export default SplunkTimeRangeSliderInput;

