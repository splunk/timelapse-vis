import React, { useState, useEffect }  from 'react';

import layout from '@splunk/react-page';
import { SplunkThemeProvider } from '@splunk/themes';

import { defaultTheme, getThemeOptions } from '@splunk/splunk-utils/themes';

import { StyledContainer, StyledGreeting } from './StartStyles';
import DashboardSelector from '@splunk/dashboardselector';
import Documentation from '@splunk/documentation'


const themeProviderSettings = getThemeOptions(defaultTheme() || 'enterpriseDark');

layout(
    <SplunkThemeProvider {...themeProviderSettings}>
        <StyledContainer>
            <StyledGreeting>Documentation</StyledGreeting>
            <Documentation />
        </StyledContainer>
    </SplunkThemeProvider>
);
