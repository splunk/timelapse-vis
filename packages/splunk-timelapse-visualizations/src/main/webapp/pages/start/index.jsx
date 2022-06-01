import DashboardSelector from '@splunk/timelapse-visual';
import layout from '@splunk/react-page';
import { SplunkThemeProvider } from '@splunk/themes';
import React from 'react';
import { StyledContainer } from './StartStyles';

layout(
    <SplunkThemeProvider family="enterprise" colorScheme="dark" density="compact">
        <StyledContainer>
            <div style={{ width: '100%' }}>
                <DashboardSelector />
            </div>
        </StyledContainer>
    </SplunkThemeProvider>
);
