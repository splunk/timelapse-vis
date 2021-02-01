import React from "react";
import { format } from "date-fns";
import TimeRange from "react-timeline-range-slider";
import packageJson from '../../../package.json';


const dashboard_id = window.location.pathname.split("/").pop()

var selectedInterval = []
var disabledIntervals = []
var timelineInterval = []

for (let timelapse_index = 0; timelapse_index < packageJson.timesliders.length; timelapse_index++)
{
    if (packageJson.timesliders[timelapse_index].dashboard_id === dashboard_id){
    	selectedInterval = packageJson.timesliders[timelapse_index].selectedInterval

        selectedInterval.forEach(function(part, index, theArray) {
            theArray[index] = new Date(theArray[index]);
        });
        disabledIntervals = packageJson.timesliders[timelapse_index].disabledIntervals
        
        timelineInterval= packageJson.timesliders[timelapse_index].timelineInterval
        timelineInterval.forEach(function(part, index, theArray) {
            theArray[index] = new Date(theArray[index]);
        }); 
  }
}

class SplunkTimeRangeSlider extends React.Component {
  state = {
    error: false,
    selectedInterval
  };

  errorHandler = ({ error }) => this.setState({ error });

  onChangeCallback = (selectedInterval) => this.setState({ selectedInterval });

  render() {
    const { selectedInterval, error } = this.state;
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
      </div>
    );
  }
}

export default SplunkTimeRangeSlider;

