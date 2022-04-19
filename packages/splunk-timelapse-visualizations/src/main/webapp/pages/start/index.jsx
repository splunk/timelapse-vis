import DashboardSelector from '@splunk/dashboardselector';
import layout from '@splunk/react-page';
import { SplunkThemeProvider } from '@splunk/themes';
import React from 'react';
import { StyledContainer, StyledGreeting } from './StartStyles';
import Heading from '@splunk/react-ui/Heading';

layout(
    <SplunkThemeProvider family="enterprise" colorScheme="dark" density="compact">
        <StyledContainer>
            <div style={{ width: '100%' }}>
                <DashboardSelector />
            </div>
        </StyledContainer>
    </SplunkThemeProvider>
);
