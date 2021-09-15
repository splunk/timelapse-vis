import React, { lazy, Suspense, useEffect, useState } from 'react';
import layout from '@splunk/react-page';
import DashboardCore, { themes as dashboardCoreThemes } from '@splunk/dashboard-core';
import EnterprisePreset, { themes as presetThemes } from '@splunk/dashboard-presets/EnterprisePreset';
import definition from './definition.json';
//Additions for timeslider
import SplunkTimeRangeSlider from '../../components/rangeslider/App.js';
import styles from './rangeslider.css'

/*const themeKey = 'enterpriseDark';
const theme = {
    ...presetThemes[themeKey],
    ...dashboardCoreThemes[themeKey],
    ...reactUIThemes[themeKey],
};*/
// use DashboardCore to render a simple dashboard


var dash = <DashboardCore
    width="100%"
    height="calc(100vh - 78px)"
    definition={definition}
    preset={EnterprisePreset}
/>


layout(
    <>
        <div id="neatrange">
            <SplunkTimeRangeSlider dash={dash} />
        </div>
    </>,
    {
        pageTitle: 'Rangeslider',
        hideFooter: true,
        layout: 'fixed',
    }
);

