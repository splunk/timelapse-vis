import React, { useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import ColumnChart from '@splunk/react-visualizations/Column';
import Play from '@splunk/react-icons/Play';
import Pause from '@splunk/react-icons/Pause';
import Spinner from '@splunk/react-ui/WaitSpinner';
import Slider from './slider';
import { globalTime, useTimeList, useCurrentTime, usePlaybackStatus, usePlaybackSpeed } from './timecontext';
import { useState } from 'react';
import DashboardCore, { themes as dashboardCoreThemes } from '@splunk/dashboard-core';
import EnterprisePreset, { themes as presetThemes } from '@splunk/dashboard-presets/EnterprisePreset';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import GeoRegistry from '@splunk/dashboard-context/GeoRegistry';
import GeoJsonProvider from '@splunk/dashboard-context/GeoJsonProvider';

const geoRegistry = GeoRegistry.create();
geoRegistry.addDefaultProvider(new GeoJsonProvider());

var search = window.location.search
const params = new URLSearchParams(search);
const rangeStart = params.get('rangeStart');
const rangeEnd = params.get('rangeEnd');
const timeinterval = params.get('timeinterval');

function getHoursBetween(start, end) {
    var startDate = new Date(start)
    var endDate = new Date(end)
    for (var arr = [], dt = startDate; dt <= endDate; dt.setHours(dt.getHours() + 1)) {
        arr.push(new Date(dt));
    }
    return arr;
};

function getDaysBetween(start, end) {
    var startDate = new Date(start)
    var endDate = new Date(end)
    for (var arr = [], dt = startDate; dt <= endDate; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }
    return arr;
};

if (timeinterval == "days") {
    var timesArray = getDaysBetween(rangeStart, rangeEnd)
}

if (timeinterval == "hours") {
    var timesArray = getHoursBetween(rangeStart, rangeEnd)
}

const Wrapper = styled.div`
    position: fixed;
    tops: 0;
    left: 0;
    right: 0;
    height: 125px;
    background: #ffffff;
    border-bottom: 5px solid rgb(8, 9, 10);
    color: #444444;
    z-index: 999;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const LoadingCt = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`;

const PlaybackControls = styled.div`
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const CurrentValueCt = styled.div`
    width: 190px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
`;

const Timeline = styled.div`
    flex: 1;
    position: relative;
`;

const SliderCt = styled.div`
    box-sizing: border-box;
    padding: 0 10px 0 10px;
    background: rgba(255, 255, 255, 0.001);
    position: absolute;
    top: 0;
    width: 100%;
    height: 120px;
    z-index: 999;
`;
let i = 0;

function minutes_with_leading_zeros(dt) {
    return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
}

function CurrentTimeValue({ definition, sendDataToParent }) {
    const val = useCurrentTime();
    var startDate = new Date(rangeStart)
    var start_range = startDate.getTime() / 1000;
    var end_range = val.getTime() / 1000;

    var definition_new = JSON.parse(JSON.stringify(definition))
    for (var v in definition.dataSources) {
        //Currently just modify the range of the search with a new range based on the rangeslider selected start and end
        definition_new.dataSources[v].options.query = definition_new.dataSources[v].options.query + "| eval time=_time | where time<=" + end_range.toString() + " AND time>=" + start_range.toString() + " | fields - time"
    }
    

    //console.log("This Thing" + ":" + globalTime.currentTime)
    if (!val) {
        return null;
    }
    return (
        <div onChange={sendDataToParent(definition_new)}>
            {val.getMonth() + 1}/{val.getDate()}/{val.getYear() % 100} {val.getHours()}:{minutes_with_leading_zeros(val)}
        </div>
    );
}

const Btn = styled.a`
    display: block;
    color: #444444;
    text-decoration: none;
    padding: 10px;
    cursor: pointer;
`;

function PlayPauseButton() {
    const isPlaybackRunning = usePlaybackStatus();

    const startPlayback = useCallback(() => {
        globalTime.startPlayback();
    }, []);

    const stopPlayback = useCallback(() => {
        globalTime.stopPlayback();
    }, []);

    return <Btn>{isPlaybackRunning ? <Pause onClick={stopPlayback} size={2} /> : <Play onClick={startPlayback} size={2} />}</Btn>;
}

function PlaybackSpeed() {
    const curSpeed = usePlaybackSpeed();
    const handleChange = useCallback(e => {
        globalTime.speed = +e.target.value;
    }, []);

    return (
        <select value={curSpeed} onChange={handleChange}>
            <option value={0.5}>.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
            <option value={5}>5x</option>
            <option value={10}>10x</option>
        </select>
    );
}



export default function TimelapseControls() {

    var search = window.location.search
    const params = new URLSearchParams(search);
    const dashboardid = params.get('dashboardid');

    const [values, setValues] = useState([]);
    const [definition, setDefinition] = useState({});

    fetch(`/splunkd/services/data/ui/views/${dashboardid}?output_mode=json`, { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
        var xml = new DOMParser().parseFromString(data.entry[0].content['eai:data'], 'application/xml');
        const def = JSON.parse(xml.getElementsByTagName('definition')[0].textContent);
        setDefinition(def)
        return def
    }
    )
    .catch(e => {
        console.error('Error during definition retrieval/parsing', e);
    });


    useEffect(() => {

        console.log("Hello" + globalTime.currentTime)
        let active = true;
        (async () => {
            const data = timesArray
            if (active) {
                const times = data

                const newValues = times
                    .sort()
                    .map((_, i) => i)
                    .map(v => parseFloat(100.00))
                    .reduce(
                        (res, v, i, all) => {
                            return i >= all.length - 1 ? res : res.concat(Math.min(0.6, 0.05 + Math.max(0, Math.log2(all[i + 1] / v))));
                        },
                        [0.05]
                    );

                globalTime.setTimes(times);
                setValues(newValues);
                //globalTime.startPlayback();
            }
        })().catch(e => {
            console.error(e);
        });

        console.log(sendDataToParent)

        return () => {
            active = false;
        };
    }, [definition, setValues]);


    const sendDataToParent = (index) => { // the callback. Use a better name
        console.log(index);
        //setDrive(index);
        //setDefinition(index)
    };

    const times = useTimeList();

    if (!times.length || !values.length) {
        return (
            <Wrapper>
                <LoadingCt>
                    <Spinner size="medium" />
                </LoadingCt>
            </Wrapper>
        );
    }
    return (

        <ColumnLayout gutter={1}>
            <ColumnLayout.Row>
                <PlaybackControls>
                    <PlayPauseButton />
                    {/* <PlaybackSpeed /> */}
                </PlaybackControls>
                <CurrentValueCt>
                    <CurrentTimeValue definition={definition} sendDataToParent={sendDataToParent} />
                </CurrentValueCt>
                <Timeline>
                    <ColumnChart
                        backgroundColor={'transparent'}
                        xFieldName={'_time'}
                        yFieldName={'rate'}
                        legendPlacement="none"
                        xAxisMajorLabelVisibility="show"
                        xAxisMajorTickSize={0}
                        xAxisMajorTickVisibility="hide"
                        yAxisMajorLabelVisibility="hide"
                        yAxisVisibility="hide"
                        yAxisScale="linear"
                        yAxisMajorTickVisibility="hide"
                        xAxisTitleVisibility="collapsed"
                        yAxisTitleVisibility="collapsed"
                        foregroundColor="#333333"
                        seriesColors={'#444444'}
                        height={120}
                        columnSpacing={0}
                        seriesSpacing={0}
                        x={times}
                        y={values}
                    />
                    <SliderCt>
                        <Slider times={times} />
                    </SliderCt>
                </Timeline>
            </ColumnLayout.Row>
            <ColumnLayout.Row>
                <DashboardContextProvider geoRegistry={geoRegistry}>
                    <DashboardCore
                        width="100%"
                        height="calc(100vh - 78px)"
                        preset={EnterprisePreset}
                        definition={definition}
                    />
                </DashboardContextProvider>

            </ColumnLayout.Row>
        </ColumnLayout>
    );
}
