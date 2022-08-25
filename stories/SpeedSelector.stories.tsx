import { Meta, Story } from '@storybook/react';
import React from 'react';
import { SliderWithButtons } from "../packages/timelapse-visual/src/components/TimelapseControls/SliderWithButtons";
import { SplunkThemeProvider } from "@splunk/themes";
import { SpeedSelector } from "../packages/timelapse-visual/src/components/TimelapseControls/SpeedSelector";
import { SelectChangeHandler } from "@splunk/react-ui/Select";

const meta: Meta = {
    title: 'Speed Selectors',
    component: SpeedSelector,
};
export default meta;

export const SpeedSelectorDefault: Story = () => {
    const [ speedValue, setSpeedValue] = React.useState(4);

    const handleSpeedPicker: SelectChangeHandler = (_e, value) => {
        if (typeof value === "number") {
            setSpeedValue(value);
        }
        if (typeof value === "string") {
            setSpeedValue(value);
        }
    };

    return (
        <div
            style={
                {
                    textAlign: "center",
                    margin: "auto",
                    width: "100%",
                    backgroundColor: "#171D21",
                }
            }
        >
            <SplunkThemeProvider
                family="enterprise"
                colorScheme="dark"
                density="compact"
            >
                <SpeedSelector value={speedValue} handleSpeedPicker={handleSpeedPicker} />
            </SplunkThemeProvider>
        </div >
    );
};
