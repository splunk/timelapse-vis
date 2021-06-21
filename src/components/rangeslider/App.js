import React from "react";
import { format } from "date-fns";
import TimeRange from "react-timeline-range-slider";
import packageJson from '../../../package.json';
import { ThemeProvider } from 'styled-components';
import EnterprisePreset, { themes as presetThemes } from '@splunk/dashboard-presets/EnterprisePreset';
import DashboardCore, { themes as dashboardCoreThemes } from '@splunk/dashboard-core';
import { themes as reactUIThemes } from '@splunk/react-ui/themes';


const dashboard_id = window.location.pathname.split("/").pop()
const themeKey = 'enterpriseDark';

const theme = {
    ...presetThemes[themeKey],
    ...dashboardCoreThemes[themeKey],
    ...reactUIThemes[themeKey],
};

var selectedInterval = []
var disabledIntervals = []
var timelineInterval = []
var def = {}

for (let timelapse_index = 0; timelapse_index < packageJson.timesliders.length; timelapse_index++)
{
    if (packageJson.timesliders[timelapse_index].dashboard_id === dashboard_id){
    	selectedInterval = packageJson.timesliders[timelapse_index].selectedInterval

        selectedInterval.forEach(function(part, index, theArray) {
            theArray[index] = new Date(theArray[index]);
        });
        
	disabledIntervals = []
        var today = new Date();

        var thirtyDaysAgo = today - 1000 * 60 * 60 * 24 * 30;
        console.log(today)
	console.log(thirtyDaysAgo)
        timelineInterval=[thirtyDaysAgo, today]
        selectedInterval = timelineInterval	
  }
}

class SplunkTimeRangeSlider extends React.Component {
  state = {
    error: false,
    selectedInterval,
    def: this.props.dash.props.definition
  };
  
  dash = <DashboardCore
            width="100%"
            height="calc(100vh - 78px)"
            definition={this.state.def}
            preset={EnterprisePreset} />

  start_range = 0 
  end_range =  Math.round(Date.now() / 1000)
  errorHandler = ({ error }) => this.setState({ error });
  onChangeCallback = (selectedInterval) => {

 selectedInterval.map((d, i) => {
          if (i == 0){
          this.start_range = d.getTime() / 1000;
          }
          if (i==1){
            
	  this.end_range = d.getTime() / 1000;
}
        })
   
console.log(this.start_range)
console.log(this.end_range)

this.setState({ selectedInterval })
for(var v in this.state.def.dataSources)
{
this.state.def.dataSources[v].options.query = "| makeresults count=100 | eval t=86400 | streamstats sum(t) as t | eval _time=_time-t | eval time=_time | where time<=" + this.end_range.toString() + " AND time>=" + this.start_range.toString()+" | fields - time"
}

this.setState({
        def: this.state.def
}
)
//this.dash.updateDefinition(this.state.def)
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

{this.dash}

</ThemeProvider>
</div>
</div>
    );
  }
}

export default SplunkTimeRangeSlider;

