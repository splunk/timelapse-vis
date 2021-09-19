import React, { lazy, Suspense, useEffect, useState } from 'react';
import layout from '@splunk/react-page';
import DashboardCore, { themes as dashboardCoreThemes } from '@splunk/dashboard-core';
import EnterprisePreset, { themes as presetThemes } from '@splunk/dashboard-presets/EnterprisePreset';
import "./style.css";
import SplunkTimeRangeSliderInput from '@splunk/rangesliderinput';

var dash = <DashboardCore
    width="100%"
    height="calc(100vh - 78px)"
    preset={EnterprisePreset}
/>

layout(
    <>
        <div id="neatrange">
            <SplunkTimeRangeSliderInput  dash={dash}  />
        </div>
    </>,
    {
        pageTitle: 'Rangeslider',
        hideFooter: true,
        layout: 'fixed',
    }
);

