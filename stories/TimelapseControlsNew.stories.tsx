import { Meta, Story } from '@storybook/react';
import React from 'react';
import { TimelapseControlsNew } from "../packages/timelapse-visual/src/components/TimelapseControls/TimelapseControlsNew";

const meta: Meta = {
    title: 'Timelapse Controls',
    component: TimelapseControlsNew,
};
export default meta;

export const TimelapseControlsError: Story = () => {
    return (<TimelapseControlsNew timeRangeType="relative" />
    );
};
