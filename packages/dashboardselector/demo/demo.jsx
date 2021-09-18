import React from 'react';
import { render } from 'react-dom';

import { SplunkThemeProvider } from '@splunk/themes';
import { defaultTheme, getThemeOptions } from '@splunk/splunk-utils/themes';

import Dashboardselector from '../src/Dashboardselector';

const themeProviderSettings = getThemeOptions(defaultTheme() || 'enterprise');

const containerEl = document.getElementById('main-component-container');
render(
    <SplunkThemeProvider {...themeProviderSettings}>
        <Dashboardselector name="World" />
    </SplunkThemeProvider>,
    containerEl
);
