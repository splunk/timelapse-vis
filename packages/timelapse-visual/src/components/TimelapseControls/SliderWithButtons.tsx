/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Button from "@splunk/react-ui/Button";
import Pause from "@splunk/react-icons/Pause";
import TriangleLeft from "@splunk/react-icons/TriangleLeft";
import TriangleRight from "@splunk/react-icons/TriangleRight";
import Slider, { SliderChangeHandler } from "@splunk/react-ui/Slider";

export interface SliderWithButtonsProps {
    inline?: boolean;
    value: number;
    displayValue: string;
    onChange: SliderChangeHandler;
    minValue: number;
    maxValue: number;
    step: number;
    defaultValue?: number;
    minLabel: React.ReactNode;
    maxLabel: React.ReactNode;
}

export type PlayerState = "reverse" | "stop" | "play" | "default";

export function SliderWithButtons({ value, displayValue, onChange, minValue, maxValue, step, minLabel, maxLabel }: SliderWithButtonsProps) {
    const [configOpen, setConfigOpen] = useState(false);
    const [playerState, setPlayerState] = useState<PlayerState>("default");

    const openLeftPanel = () => {
        setConfigOpen(true);
    }

    const onReverse = () => {
        setPlayerState("reverse");
    }

    const onStop = () => {
        setPlayerState("stop");
    }

    const onPlay = () => {
        setPlayerState("play");
    }

    return (<>
        <div>{playerState}</div>
        <Slider
            min={minValue}
            max={maxValue}
            step={step}
            onChange={onChange}
            value={value}
            minLabel={minLabel}
            maxLabel={maxLabel}
            displayValue={displayValue}
        />
        <Button
            key="configure"
            onClick={openLeftPanel}
            label="Configure"
        />
        <Button
            key="reverse"
            label={<TriangleLeft />}
            onClick={onReverse}
            appearance="primary"
        />
        <Button
            key="pause"
            label={<Pause />}
            onClick={onStop}
            appearance="primary"
        />
        <Button
            key="play"
            label={<TriangleRight />}
            onClick={onPlay}
            appearance="primary"
        />
    </>);
}