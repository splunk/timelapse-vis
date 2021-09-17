import React from 'react';

import layout from '@splunk/react-page';
import { SplunkThemeProvider } from '@splunk/themes';

import { defaultTheme, getThemeOptions } from '@splunk/splunk-utils/themes';

import { StyledContainer, StyledGreeting } from './StartStyles';

const themeProviderSettings = getThemeOptions(defaultTheme() || 'enterprise');

layout(
    <SplunkThemeProvider {...themeProviderSettings}>
        <StyledContainer>
            <StyledGreeting>Welcone to the Rangeslider and Timelapse Visualizations. </StyledGreeting>
            <div>To Do: Add dashboard selector here. </div>
        </StyledContainer>
    </SplunkThemeProvider>
);
