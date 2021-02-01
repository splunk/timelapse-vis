import React, { useEffect } from 'react';
import styled from 'styled-components';
import TimelapseControls from './controls';
import Dashboard from '../dashboard';
import DEFAULT_PRESET from '../preset';
import TimelapseDataSource from './timelapseds';
import jsCharting from '@splunk/charting-bundle';

function hackDisableProgressiveRender() {
    const c = jsCharting.createChart(document.createElement('div'), {});
    c.constructor.prototype.shouldProgressiveDraw = () => false;
    c.destroy();
}

window.jsCharting = jsCharting;

const DashboardWrapper = styled.div`
    padding-top: 125px;
    & [data-viz-type='viz.geojson.world'] [data-test='fix-size-item'] {
        background-color: #1a1c20;
    }
    & [data-viz-type='viz.geojson.world'] [data-value='0'] {
        fill: rgb(67, 69, 75) !important;
    }
`;

const TIMELAPSE_PRESET = {
    ...DEFAULT_PRESET,
    dataSources: {
        'ds.cdn': TimelapseDataSource,
    },
};

export default function TimelapseDashboard({ dashDef }) {
    useEffect(() => {
        hackDisableProgressiveRender();
    }, []);

    return (
        <>
            <TimelapseControls definition={dashDef} />
            <DashboardWrapper>
                <Dashboard definition={dashDef} preset={TIMELAPSE_PRESET} height="calc(100vh - 125px)" />
            </DashboardWrapper>
        </>
    );
}
