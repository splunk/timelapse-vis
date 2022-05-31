import React, { useState, useEffect } from 'react';

import layout from '@splunk/react-page';
import { SplunkThemeProvider } from '@splunk/themes';
import Heading from '@splunk/react-ui/Heading';
import Documentation from '@splunk/documentation';
import { StyledContainer } from './StartStyles';

layout(
    <div
        style={{
            textAlign: 'center',
            margin: 'auto',
            align: 'center',
            width: '100%',
            backgroundColor: '#171D21',
        }}
    >
        <SplunkThemeProvider family="enterprise" colorScheme="dark" density="compact">
            <StyledContainer>
                <Heading level={1}>Documentation</Heading>
                <Documentation />
            </StyledContainer>
        </SplunkThemeProvider>
    </div>
);
