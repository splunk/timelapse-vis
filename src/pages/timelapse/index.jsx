import React,  {lazy, Suspense, useEffect, useState } from 'react';
import layout from '@splunk/react-page';
import { ThemeProvider } from 'styled-components';
import { themes as reactUIThemes } from '@splunk/react-ui/themes';
import DashboardCore, { themes as dashboardCoreThemes } from '@splunk/dashboard-core';
import EnterprisePreset, { themes as presetThemes } from '@splunk/dashboard-presets/EnterprisePreset';
import definition from './definition.json';
//Additions for timeslider
import TimelapseControls from '../../components/timelapse/controls.js';
import App from '../../components/rangeslider/App.js';

const themeKey = 'enterpriseDark';
const theme = {
    ...presetThemes[themeKey],
    ...dashboardCoreThemes[themeKey],
    ...reactUIThemes[themeKey],
};
// use DashboardCore to render a simple dashboard

layout(
    <>
<div id="neatrange">
	<App />
</div>

<div style={{height: 125}}>
	<TimelapseControls definition={definition} />
</div>

<div>
<ThemeProvider theme={theme}>
        <DashboardCore
            width="100%"
            height="calc(100vh - 78px)"
            definition={definition}
            preset={EnterprisePreset}
        />
    </ThemeProvider>
</div>

</>,
    {
        pageTitle: 'Timelapse',
        hideFooter: true,
        layout: 'fixed',
    }
);

