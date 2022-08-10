import { Meta, Story } from '@storybook/react';
import React from 'react';
import { SliderWithButtons } from "../packages/timelapse-visual/src/components/TimelapseControls/SliderWithButtons";
import { SplunkThemeProvider } from "@splunk/themes";

const meta: Meta = {
    title: 'Slider with Buttons',
    component: SliderWithButtons,
};
export default meta;

export const SliderWithButtonsDefault: Story = () => {
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
                <SliderWithButtons
                    value={110}
                    displayValue="110"
                    onChange={() => { }}
                    minValue={100}
                    maxValue={500}
                    step={25}
                    minLabel={new Date(
                        20 * 1000
                    ).toLocaleString("en-US", { timeZone: "gmt" })}
                    maxLabel={new Date(
                        100 * 1000
                    ).toLocaleString("en-US", { timeZone: "gmt" })}
                />
            </SplunkThemeProvider>
        </div >
    );
};
