import React from 'react'  
import { endOfToday, format, set } from 'date-fns' 
import TimeRange from 'react-timeline-range-slider'  

const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
    set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour()
const selectedEnd = getTodayAtSpecificHour(14)

const startTime = getTodayAtSpecificHour(7)
const endTime = endOfToday()

const disabledIntervals = [
  { start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17) },
  { start: getTodayAtSpecificHour(7), end: getTodayAtSpecificHour(12) },
  { start: getTodayAtSpecificHour(20), end: getTodayAtSpecificHour(24) }
]

class SplunkRangeSlider extends React.Component {  
  state = {  
    error: false,  
    selectedInterval: [selectedStart, selectedEnd],  
  }

  errorHandler = ({ error }) => this.setState({ error })  

  onChangeCallback = selectedInterval => this.setState({ selectedInterval })  

  render() {  
    const { selectedInterval, error } = this.state  
      return (  
        <TimeRange
          error={error}  
          ticksNumber={36}  
          selectedInterval={selectedInterval}  
          timelineInterval={[startTime, endTime]}  
          onUpdateCallback={this.errorHandler}  
          onChangeCallback={this.onChangeCallback}
          disabledIntervals={disabledIntervals}  
        />
      )  
  }  
}  

export default SplunkRangeSlider
