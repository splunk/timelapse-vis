import React, { useState, useEffect }  from 'react';

import layout from '@splunk/react-page';
import { SplunkThemeProvider } from '@splunk/themes';

import { defaultTheme, getThemeOptions } from '@splunk/splunk-utils/themes';
import "../../../../../../../node_modules/react-datetime/css/react-datetime.css";

import { StyledContainer, StyledGreeting } from './StartStyles';
import DashboardSelector from '@splunk/dashboardselector';

const themeProviderSettings = getThemeOptions(defaultTheme() || 'enterpriseDark');



layout(



    <SplunkThemeProvider {...themeProviderSettings}>
        <StyledContainer>
            <StyledGreeting>Welcome to the Rangeslider and Timelapse Visualizations. </StyledGreeting>
            <DashboardSelector />
        </StyledContainer>
    </SplunkThemeProvider>
);
