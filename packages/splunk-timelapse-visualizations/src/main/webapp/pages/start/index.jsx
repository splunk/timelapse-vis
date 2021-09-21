import DashboardSelector from '@splunk/dashboardselector';
import layout from '@splunk/react-page';
import { defaultTheme, getThemeOptions } from '@splunk/splunk-utils/themes';
import { SplunkThemeProvider } from '@splunk/themes';
import React from 'react';
import "../../../../../../../node_modules/react-datetime/css/react-datetime.css";
import { StyledContainer, StyledGreeting } from './StartStyles';

const themeProviderSettings = getThemeOptions(defaultTheme() || 'enterpriseDark');

layout(
    <SplunkThemeProvider {...themeProviderSettings}>
        <StyledContainer>
            <StyledGreeting>Welcome to the Rangeslider and Timelapse Visualizations. </StyledGreeting>
            <DashboardSelector />
        </StyledContainer>
    </SplunkThemeProvider>
);
