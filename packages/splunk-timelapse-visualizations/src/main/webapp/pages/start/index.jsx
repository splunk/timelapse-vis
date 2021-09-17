import React from 'react';

import layout from '@splunk/react-page';
import { SplunkThemeProvider } from '@splunk/themes';

import { defaultTheme, getThemeOptions } from '@splunk/splunk-utils/themes';

import { StyledContainer, StyledGreeting } from './StartStyles';
import ListDashboards from '@splunk/listdashboards';

const themeProviderSettings = getThemeOptions(defaultTheme() || 'enterprise');

layout(
    <SplunkThemeProvider {...themeProviderSettings}>
        <StyledContainer>
            <StyledGreeting>Welcone to the Rangeslider and Timelapse Visualizations. </StyledGreeting>
            <div>Below you'll find a list of all Dashboard Studio Dashboards. Next To Do: Add ability to load this dashboard JSON dynamically with a timepicker </div>
            <ListDashboards />
        </StyledContainer>
    </SplunkThemeProvider>
);
