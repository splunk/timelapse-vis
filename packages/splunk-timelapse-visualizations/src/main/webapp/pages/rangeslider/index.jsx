import React from 'react';
import layout from '@splunk/react-page';
import DashboardCore from '@splunk/dashboard-core';
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';
import "./style.css";
import SplunkTimeRangeSliderInput from '@splunk/timelapse-visual';

const dash = <DashboardCore
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

