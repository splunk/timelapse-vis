import React, { lazy, Suspense, useEffect, useState } from 'react';
import layout from '@splunk/react-page';
import DashboardCore, { themes as dashboardCoreThemes } from '@splunk/dashboard-core';
import EnterprisePreset, { themes as presetThemes } from '@splunk/dashboard-presets/EnterprisePreset';
import TimelapseControls from '@splunk/timelapseinput';

const themeKey = 'enterpriseDark';

var dash = <DashboardCore
    width="100%"
    height="calc(100vh - 78px)"
    preset={EnterprisePreset}
/>

layout(
    <>

        <div style={{ height: 125 }}>
            <TimelapseControls dash={dash} />
        </div>

    </>,
    {
        pageTitle: 'Timelapse',
        hideFooter: true,
        layout: 'fixed',
    }
);

