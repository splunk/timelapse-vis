
import React from "react";
import Heading from "@splunk/react-ui/Heading";
import Select, { SelectChangeHandler } from "@splunk/react-ui/Select";

export const SpeedSelector: React.FC<{ value: number, handleSpeedPicker: SelectChangeHandler }> = (props) => {
    const { value, handleSpeedPicker } = props;
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
