/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { getDashboardDefinition } from "../actions/getDashboardDefinition";
import Heading from "@splunk/react-ui/Heading";
import Select, { SelectChangeHandler } from "@splunk/react-ui/Select";
import { intervalToStep } from "./timeUtils";
import { globalTime } from "./timecontext";

export type TimelapseControlsNew = RelativeTimelapseControls | ExplicitTimelapseControls;

interface RelativeTimelapseControls {
    timeRangeType: "relative";
}

interface ExplicitTimelapseControls {
    timeRangeType: "explicit";
    rangeStart: string;
    rangeEnd: string;
}

const { search } = window.location;
const params = new URLSearchParams(search);

type TimelapseError = {
    isError: boolean;
    errorMessage?: string;
}

const renderPlaybackSpeed = (value: number, handleSpeedPicker: SelectChangeHandler) => {
    return (<>
        <Heading level={3}>Playback Speed:</Heading>
        <Select
            value={value}
            prefixLabel="Timelapse Speed"
            onChange={handleSpeedPicker}
        >
            <Select.Option value={1} label="1x" />
            <Select.Option value={2} label="2x" />
            <Select.Option value={3} label="3x" />
            <Select.Option value={4} label="4x" />
            <Select.Option value={10} label="10x" />
            <Select.Option value={20} label="20x" />
            <Select.Option value={100} label="100x" />
            <Select.Option value={200} label="200x" />
        </Select>
    </>
    );
}

export function TimelapseControlsNew(props: TimelapseControlsNew) {
    const [error, setError] = useState<TimelapseError>({ isError: false, errorMessage: "" });
    const [isPlaying, stopPlaying] = useState(false);
    const [isReversing, stopReversing] = useState(false);
    const [step, setStep] = useState(0);
    const [dashboardDefinition, setDashboardDefinition] = useState({});
    const [rangeStart, setRangeStart] = useState(0);
    const [rangeEnd, setRangeEnd] = useState(0);
    const [playbackMultiplier, setPlaybackMultiplier] = useState(4);

    const handleSpeedPicker: SelectChangeHandler = (_e, value) => {
        if (typeof value === "number") {
            setPlaybackMultiplier(value);
        }
    };


    useEffect(() => {
        const dashboardId = params.get('dashboardid');
        if (dashboardId === null) {
            setError({ isError: true, errorMessage: "Dashboard Id not provided" })
        }
        else {
            const getDefinition = async () => {
                const definition = await getDashboardDefinition(dashboardId);
                setDashboardDefinition(definition);
            }
            getDefinition();
        }
    }, []);

    useEffect(() => {
        if (params.get("rangeStart") === null || !params.get("rangeEnd")) {
            setError({ isError: true, errorMessage: "Empty values for rangeStart or rangeEnd" });
        }
        else {
            let rangeStartValue = Date.now().valueOf();
            let rangeEndValue = Date.now().valueOf();
            if (props.timeRangeType === "explicit") {
                rangeStartValue = Date.parse(params.get("rangeStart") || Date.now().toString());
                rangeEndValue = Date.parse(params.get("rangeEnd") || Date.now().toString());
            }
            setRangeStart(rangeStartValue / 1000);
            setRangeEnd(rangeEndValue / 1000);
            // TODO: check if needed
            globalTime.setStart(rangeStart);
            globalTime.setEnd(rangeEnd);

            // Not sure if we need these
            const min = rangeStart * 1000;
            const max = rangeEnd * 1000;
            const length = (max - min) / step + 1;
            const arr = Array.from({ length }, (_, i) => min + i * step);
            globalTime.setTimes(arr);
        }
    }, []);
    useEffect(() => {
        const timeInterval = params.get("timeinterval");
        if (timeInterval === null) {
            setError({ isError: true, errorMessage: "Time interval value is missing" })
        }
        else {
            setStep(intervalToStep(timeInterval));
            // TODO: Check if needed
            globalTime.setSpan(step);
        }

    }, [])
    return (<div>{error ? <div>Error when parsing the URL params</div> : <div>
        {renderPlaybackSpeed(playbackMultiplier, handleSpeedPicker)}
    </div>}</div>);
}