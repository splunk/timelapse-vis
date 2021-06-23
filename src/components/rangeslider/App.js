import React from "react";
import { format } from "date-fns";
import TimeRange from "react-timeline-range-slider";
import packageJson from '../../../package.json';
import { ThemeProvider } from 'styled-components';
import EnterprisePreset, { themes as presetThemes } from '@splunk/dashboard-presets/EnterprisePreset';
import DashboardCore, { themes as dashboardCoreThemes } from '@splunk/dashboard-core';
import DashboardCoreApi from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import GeoRegistry from '@splunk/dashboard-context/GeoRegistry';
import GeoJsonProvider from '@splunk/dashboard-context/GeoJsonProvider';
import { themes as reactUIThemes } from '@splunk/react-ui/themes';


//Get the current dashboard ID
const dashboard_id = window.location.pathname.split("/").pop()

//Set the themeKey to enterpriseDark
const themeKey = 'enterpriseDark';
const theme = {
    ...presetThemes[themeKey],
    ...dashboardCoreThemes[themeKey],
    ...reactUIThemes[themeKey],
};

//Initialize Variables as empty
var selectedInterval = []
var disabledIntervals = []
var timelineInterval = []
var def = {}


const geoRegistry = GeoRegistry.create();
geoRegistry.addDefaultProvider(new GeoJsonProvider());


//Look through packageJson to find if there is a matching dashboard_id that needs a rangeslider
for (let timelapse_index = 0; timelapse_index < packageJson.timesliders.length; timelapse_index++)
{
    if (packageJson.timesliders[timelapse_index].dashboard_id === dashboard_id){
	//Setup the selectedInterval and timelineInterval as the last 30 days
        var today = new Date();
        var thirtyDaysAgo = today - 1000 * 60 * 60 * 24 * 30;
        timelineInterval=[thirtyDaysAgo, today]
        selectedInterval = timelineInterval	
  }
}


//SplunkTimeRangeSlider Class
class SplunkTimeRangeSlider extends React.Component {
  
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
  end_range =  Math.round(Date.now() / 1000)
  
  errorHandler = ({ error }) => this.setState({ error });
  
  //Function for handling range slider changes
  onChangeCallback = async (selectedInterval) => {


  //Update the selectedInterval variable with the new start and end times
  selectedInterval.map((d, i) => {
          if (i == 0){
          this.start_range = d.getTime() / 1000;
          }
          if (i==1){
	  this.end_range = d.getTime() / 1000;
         }
   })
   

  //Set the state variable of selectedInterval with the new values
  this.setState({ selectedInterval })

  //For each dataSource in the dashboard, append a where clause to limit the start/end time
  var definition_new = JSON.parse(JSON.stringify(this.state.def))
  var definition_old = this.state.def
  for(var v in definition_new.dataSources)
  {

  //Need to update this later, currently just replacing the entire search with a new range based on the rangeslider selected start and end
  //definition_new.dataSources[v].options.query = definition_new.dataSources[v].options.query + "| where time<=" + this.end_range.toString() + " AND time>=" + this.start_range.toString()+" | fields - time"
   definition_new.dataSources[v].options.query = definition_new.dataSources[v].options.query.substring(0, definition_new.dataSources[v].options.query.indexOf('| noop')) + "| noop" + "| eval time=_time | where time<=" + this.end_range.toString() + " AND time>=" + this.start_range.toString()+" | fields - time"

  }

  //Set the state with the new definition
  //this.setState({def: definition_new}, function() {
  //console.log("Updated")
  //});

  await this.setState((definition_old, props) => ({
  def: definition_new
  }));

  //this.DashboardCoreApi.updateDefinition(this.state.def)
  console.log(this.dash);
  };

  render() {
    const { selectedInterval, def, error } = this.state;
    return (
      <div className="container">
        <div className="info">
          <span>Selected Interval: </span>
          {selectedInterval.map((d, i) => {
	  if (i == 0){
		return <span id={i} key={i}>{format(d, "MM/dd/yyyy HH:mm")} through </span>
	  }
          if (i==1){
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
          <ThemeProvider theme={theme}>
          <DashboardContextProvider geoRegistry={geoRegistry}>
            <DashboardCore
            width="100%"
            height="calc(100vh - 78px)"
            definition={this.state.def}
            onDefinitionChange={console.log("Changed!")}
            preset={EnterprisePreset} />

          </DashboardContextProvider>

          </ThemeProvider>
        </div>
      </div>
    );
  }
}

export default SplunkTimeRangeSlider;

