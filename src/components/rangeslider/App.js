import React from "react";
import { format } from "date-fns";
import TimeRange from "react-timeline-range-slider";

import {
  selectedInterval,
  disabledIntervals,
  timelineInterval
} from "./datesSource.js";


class App extends React.Component {
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
          {selectedInterval.map((d, i) => (
            <span key={i}>{format(d, "dd MMM, HH:mm")}</span>
          ))}
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

export default App;

