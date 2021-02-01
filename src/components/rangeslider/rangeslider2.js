import React, { useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import ColumnChart from '@splunk/react-visualizations/Column';
import Play from '@splunk/react-icons/Play';
import Pause from '@splunk/react-icons/Pause';
import Spinner from '@splunk/react-ui/WaitSpinner';
import { useState } from 'react';

import packageJson from '../../../package.json';
import TimeRangeSlider from 'react-time-range-slider'



function changeStartHandler(time){
        console.log("Start Handler Called", time);
    }
    
function    timeChangeHandler(time){
    }
    
function    changeCompleteHandler(time){
        console.log("Complete Handler Called", time);
    }

var state = {
            value: {
                "start": "00:00",
                "end": "23:59"
            }
        }

export default function SplunkRangeSlider() {
   
 

    return (
 <div>
            <TimeRangeSlider
                disabled={false}
                format={24}
                maxValue={"23:59"}
                minValue={"00:00"}
                name={"time_range"}
                onChangeStart={changeStartHandler}
                onChangeComplete={changeCompleteHandler}
                onChange={timeChangeHandler}
                step={15}
                value={state.value}/>
        </div>   
);
}

