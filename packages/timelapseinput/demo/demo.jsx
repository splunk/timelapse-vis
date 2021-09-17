import React from 'react';
import { render } from 'react-dom';

import { SplunkThemeProvider } from '@splunk/themes';
import { defaultTheme, getThemeOptions } from '@splunk/splunk-utils/themes';

import Timelapseinput from '../src/Timelapseinput';

const themeProviderSettings = getThemeOptions(defaultTheme() || 'enterprise');

const containerEl = document.getElementById('main-component-container');
render(
    <SplunkThemeProvider {...themeProviderSettings}>
        <Timelapseinput name="World" />
    </SplunkThemeProvider>,
    containerEl
);
