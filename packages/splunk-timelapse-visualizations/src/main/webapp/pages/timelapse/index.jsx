import React,  {lazy, Suspense, useEffect, useState } from 'react';
import layout from '@splunk/react-page';
import DashboardCore, { themes as dashboardCoreThemes } from '@splunk/dashboard-core';
import EnterprisePreset, { themes as presetThemes } from '@splunk/dashboard-presets/EnterprisePreset';
//import definition from './definition.json';
//Additions for timeslider

import TimelapseControls from '@splunk/timelapseinput';

//import SplunkTimeRangeSlider from '../../components/rangeslider/App.js';

const themeKey = 'enterpriseDark';
/*const theme = {
    ...presetThemes[themeKey],
    ...dashboardCoreThemes[themeKey],
    ...reactUIThemes[themeKey],
};*/
// use DashboardCore to render a simple dashboard
    var startTime = new Date("1/1/2020")
    var endTime = Date("4/30/2020")
    var step = 1000 * 60 * 60
    var frequency = 24


layout(
    <>

<div style={{height: 125}}>
	<TimelapseControls startTime={startTime.valueOf()} endTime={endTime} step={step} frequency={frequency}/>
</div>

</>,
    {
        pageTitle: 'Timelapse',
        hideFooter: true,
        layout: 'fixed',
    }
);

