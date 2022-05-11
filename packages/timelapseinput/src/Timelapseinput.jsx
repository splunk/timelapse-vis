import React, { useEffect, useCallback } from 'react';
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';
import DashboardCore from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import GeoRegistry from '@splunk/dashboard-context/GeoRegistry';
import GeoJsonProvider from '@splunk/dashboard-context/GeoJsonProvider';

import Button from '@splunk/react-ui/Button';
import Select from '@splunk/react-ui/Select';
import Switch from '@splunk/react-ui/Switch';
import Link from '@splunk/react-ui/Link';
import Slider from '@splunk/react-ui/Slider';
import P from '@splunk/react-ui/Paragraph';
import Heading from '@splunk/react-ui/Heading';
import Message from '@splunk/react-ui/Message';
import Accordion from '@splunk/react-ui/Accordion';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';
import SidePanel from '@splunk/react-ui/SidePanel';
import TimelapseDataSource from './timelapseds';

import TriangleRight from '@splunk/react-icons/TriangleRight';
import TriangleLeft from '@splunk/react-icons/TriangleLeft';
import Pause from '@splunk/react-icons/Pause';
import Bell from '@splunk/react-icons/Bell';

import { SplunkThemeProvider } from '@splunk/themes';

import SearchJob from '@splunk/search-job';
import { globalTime } from './timecontext';

var search = window.location.search;
const params = new URLSearchParams(search);

var rangeStart = Math.round(Date.now().valueOf() / 1000);
var rangeEnd = Math.round(Date.now().valueOf() / 1000);

var error_invalid_interval = false;
var error_no_timetype_select = false;

function setRelative(startdelta) {
    rangeStart = Math.round((Date.now() - startdelta).valueOf() / 1000);
    rangeEnd = Math.round(Date.now().valueOf() / 1000);
}

var tz = params.get('tz');

if (params.get('timerangetype') === 'explicit') {
    rangeStart = Math.round(Date.parse(params.get('rangeStart')).valueOf() / 1000);
    globalTime.setStart(rangeStart);
    rangeEnd = Math.round(Date.parse(params.get('rangeEnd')).valueOf() / 1000);
    globalTime.setEnd(rangeEnd);
} else if (params.get('timerangetype') === 'relative') {
    var rel = params.get('relativetime');

    if (rel == '30min') {
        setRelative(1000 * 60 * 30);
    }
    if (rel == '1h') {
        setRelative(1000 * 60 * 60);
    }
    if (rel == '6h') {
        setRelative(1000 * 60 * 60 * 6);
    }
    if (rel == '12h') {
        setRelative(1000 * 60 * 60 * 12);
    }
    if (rel == '1d') {
        setRelative(1000 * 60 * 60 * 24);
    }
    if (rel == '7d') {
        setRelative(1000 * 60 * 60 * 24 * 7);
    }
    if (rel == '14d') {
        setRelative(1000 * 60 * 60 * 24 * 14);
    }
    if (rel == '30d') {
        setRelative(1000 * 60 * 60 * 24 * 30);
    }
    if (rel == '180d') {
        setRelative(1000 * 60 * 60 * 24 * 180);
    }
    if (rel == '365d') {
        setRelative(1000 * 60 * 60 * 24 * 365);
    }
} else {
    setRelative(1000 * 60 * 60 * 24);

    error_no_timetype_select = true;
}

const timeinterval = params.get('timeinterval');

let step = 1000 * 60 * 60 * 24;

if (timeinterval == '1sec') {
    step = 1000;
    globalTime.setSpan(step);
} else if (timeinterval == '1min') {
    step = 1000 * 60;
    globalTime.setSpan(step);
} else if (timeinterval == '15min') {
    step = 1000 * 15 * 60;
    globalTime.setSpan(step);
} else if (timeinterval == '30min') {
    step = 1000 * 30 * 60;
    globalTime.setSpan(step);
} else if (timeinterval == 'days') {
    step = 1000 * 60 * 60 * 24;
    globalTime.setSpan(step);
} else if (timeinterval == 'hours') {
    step = 1000 * 60 * 60;
    globalTime.setSpan(step);
} else if (timeinterval == 'years') {
    step = 1000 * 60 * 60 * 24 * 365;
    globalTime.setSpan(step);
} else {
    error_invalid_interval = true;
}

var seenImages = {};

const geoRegistry = GeoRegistry.create();
geoRegistry.addDefaultProvider(new GeoJsonProvider());

function parseDataUri(dataUri) {
    if (!dataUri.startsWith('data:')) {
        throw new Error('Invalid data URI');
    }
    const semiIdx = dataUri.indexOf(';');
    if (semiIdx < 0) {
        throw new Error('Invalid data URI');
    }
    const mime = dataUri.slice(5, semiIdx);
    if (!dataUri.slice(semiIdx + 1, 7) === 'base64,') {
        throw new Error('Unsupported data URI encoding');
    }
    const data = Buffer.from(dataUri.slice(semiIdx + 8), 'base64');
    return [mime, data];
}

async function getImage(assetType, id) {
    const body = await fetch(
        `/splunkd/__raw/servicesNS/nobody/splunk-dashboard-studio/storage/collections/data/splunk-dashboard-${assetType}/${encodeURIComponent(
            id
        )}`,
        { credentials: 'include' }
    )
        .then((res) => res.json())
        .then((data) => {
            const body = data;
            return body;
        });

    return body;
}

async function downloadImage(src, assetType) {
    if (!src) {
        return src;
    }
    if (src in seenImages) {
        return seenImages[src];
    }
    if (src.startsWith('data:image')) {
        return src;
    }

    if (src.startsWith('<svg ')) {
        return src;
    }
    const [type, id] = src.split('://');
    if (type === 'https' || type === 'http') {
        const res = fetch(src);
        const data = res.buffer();
        const mimeType = res.headers.get('Content-Type');
        return src;
    }

    if (type === 'splunk-enterprise-kvstore') {
        var imgData = { dataURI: 'null' };
        try {
            imgData = await getImage(assetType, id).then((blob) => {
                return blob;
            });
        } catch (e) {
            console.log(e);
            console.log('Cannot find image');
        }

        if (imgData.dataURI == 'null') {
            imgData.dataURI == src;
        } else {
            const [mimeType, data] = parseDataUri(imgData.dataURI);
        }
        return imgData.dataURI;
    }
    throw new Error(`Unexpected image type: ${type}`);
}

class TimelapseControls extends React.Component {
    constructor(props) {
        super(props);

        var darktheme = false;
        if (params.get('theme') == 'dark') {
            darktheme = true;
        }
        this.state = {
            isPlaying: false,
            isReversing: false,
            frequency: 24,
            step: step,
            startTime: rangeStart,
            endTime: rangeEnd,
            time: rangeStart * 1000,
            def: this.props.dash.props.definition,
            playbackMultiplier: '4',
            displayValue: 'Press Play to Start Timelapse',
            value: 1,
            hasNotBeenFetched: true,
            dataSources: {},
            width: 0,
            height: 0,
            dark: darktheme,
            leftOpen: false,
            error_ds_no__time: [],
            error_no_dash: false,
            error_invalid_interval: error_invalid_interval,
            error_no_timetype_select: error_no_timetype_select,
            warn_inputs_exist: [],
            openPanelId: 2,
            openInputsPanelId: 2,
            numberOfSearches: 0,
            numberOfSearchesComplete: 0,
            dashboardID: params.get('dashboardid'),
        };
        this.fetchDefinition();

        var min = this.state.startTime * 1000;
        var max = this.state.endTime * 1000;

        const length = (max - min) / step + 1;
        const arr = Array.from({ length }, (_, i) => min + i * step);
        globalTime.setTimes(arr);

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.onStopCallback = this.onStopCallback.bind(this);
        this.onPlayCallback = this.onPlayCallback.bind(this);
        this.onReverseCallback = this.onReverseCallback.bind(this);
        this.handleSpeedPicker = this.handleSpeedPicker.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.updateDataSources = this.updateDataSources.bind(this);
        this.handleDarkModeClick = this.handleDarkModeClick.bind(this);
        this.openLeftPanel = this.openLeftPanel.bind(this);
        this.handleRequestOpen = this.handleRequestOpen.bind(this);
        this.handlePanelChange = this.handlePanelChange.bind(this);
        this.handleInputsPanelChange = this.handleInputsPanelChange.bind(this);

        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    fetchDefinition = async () => {
        var search = window.location.search;
        const params = new URLSearchParams(search);
        var dashboardid = params.get('dashboardid');

        const def = await fetch(
            `/splunkd/servicesNS/-/-/data/ui/views/${dashboardid}?output_mode=json`,
            {
                credentials: 'include',
            }
        )
            .then((res) => res.json())
            .then((data) => {
                var xml = new DOMParser().parseFromString(
                    data.entry[0].content['eai:data'],
                    'application/xml'
                );
                var def = JSON.parse(xml.getElementsByTagName('definition')[0].textContent);

                return def;
            })

            .catch((e) => {
                //If there is an error, and demo==true, apply the demo dashboard.

                this.setState({ error_no_dash: true });
                console.error('Error during definition retrieval/parsing', e);
            });
        //Let's process the dashboard before we put it in place
        //First let's get images

        for (const viz of Object.values(def.visualizations || {})) {
            var src = '';
            try {
                if (viz.type === 'viz.singlevalueicon') {
                    viz.options.icon = await downloadImage(viz.options.icon, 'icons');
                }
                if (viz.type === 'splunk.singlevalueicon') {
                    viz.options.icon = await downloadImage(viz.options.icon, 'icons');
                }
                if (viz.type === 'viz.img') {
                    viz.options.src = await downloadImage(viz.options.src, 'images');
                }
                if (viz.type === 'splunk.choropleth.svg') {
                    viz.options.svg = await downloadImage(viz.options.svg, 'images');
                }
                if (viz.type === 'viz.choropleth.svg') {
                    viz.options.svg = await downloadImage(viz.options.svg, 'images');
                }
            } catch (e) {
                console.log('Failed to load image with src: ' + src);
                console.log(e);
            }
        }

        if (def.layout.options.backgroundImage) {
            try {
                def.layout.options.backgroundImage.src = await downloadImage(
                    def.layout.options.backgroundImage.src,
                    'images'
                );
            } catch (e) {
                console.log(e);
            }
        }

        this.setState({ def });
        var definition = this.state.def;
        var results = '';

        for (var input in definition.inputs) {
            this.setState({ warn_inputs_exist: [...this.state.warn_inputs_exist, input] });
        }

        //Start to Loop through Searches
        for (var datasource in definition.dataSources) {
            //Handle a ds.search
            if (definition.dataSources[datasource].type == 'ds.search') {
                this.setState({
                    numberOfSearches: this.state.numberOfSearches + 1,
                });
            }
        }

        //Start to Loop through Searches
        for (var datasource in definition.dataSources) {
            this.setState({ currentds: datasource });

            //Handle a ds.search
            if (definition.dataSources[this.state.currentds].type == 'ds.search') {
                this.setState({
                    numberOfSearchesComplete: this.state.numberOfSearchesComplete + 1,
                });
                definition.dataSources[this.state.currentds].type = 'ds.timelapse';

                var earliest = '';
                var latest = '';
                var query = '';

                var results = '';
                query = definition.dataSources[this.state.currentds].options.query;

                //If there are query parameters in the dataSource
                if (definition.dataSources[this.state.currentds].options.queryParameters) {
                    if (
                        definition.dataSources[this.state.currentds].options.queryParameters
                            .earliest
                    ) {
                        earliest =
                            definition.dataSources[this.state.currentds].options.queryParameters
                                .earliest;
                    }
                    if (
                        definition.dataSources[this.state.currentds].options.queryParameters.latest
                    ) {
                        latest =
                            definition.dataSources[this.state.currentds].options.queryParameters
                                .latest;
                    }
                }
                //If there are NO query parameters in the dataSource
                else {
                    //Check the defaults of the definition
                    //else just return -24h as the default
                    earliest = '-24h@h';
                    latest = 'now';
                }

                results = await SearchJob.create({
                    search: query,
                    earliest_time: earliest,
                    latest_time: latest,
                    options: { test: 'foo' },
                })
                    .getResults({ output_mode: 'json_cols', count: 0 })
                    .first()
                    .toPromise();

                var defUpdate = this.state.def;

                defUpdate.dataSources[this.state.currentds].options = {
                    ...this.state.def.dataSources[this.state.currentds].options,
                    data: {
                        fields: results.fields,
                        columns: results.columns,
                    },
                };

                if (results.fields.indexOf('_time') < 0) {
                    console.log('Missing _time field');
                    this.setState({
                        error_ds_no__time: [...this.state.error_ds_no__time, this.state.currentds],
                    });
                }
                this.setState({ def: defUpdate });
            }
        }

        this.setState({ defOrig: this.state.def });
        this.setState({ hasNotBeenFetched: false });
    };

    //This is used to resaturate the datasource
    updateDataSources() {
        var definition_new = JSON.parse(JSON.stringify(this.state.defOrig));
        this.setState({
            def: definition_new,
        });
    }
    onPlayCallback(event) {
        clearInterval(this.timer);
        this.state.isReversing = false;
        this.state.isPlaying = false;

        this.state.isPlaying = true;

        /** set interval to run frequncy times every second */
        this.timer = setInterval(() => {
            /** increment the time by the step value */
            if (this.state.time.valueOf() + this.state.step >= this.state.endTime * 1000) {
                this.setState({
                    time: this.state.startTime * 1000,
                });
                globalTime.setTime(this.state.startTime * 1000);

                this.updateLabel(this.state.startTime * 1000);
            } else {
                this.setState({
                    time: this.state.time.valueOf() + this.state.step,
                });
                globalTime.setTime(this.state.time.valueOf() + this.state.step);

                this.updateLabel(this.state.time.valueOf() + this.state.step);
            }
            this.updateDataSources();
            //this.state.time = (this.state.time + this.state.step)
        }, 10000 / this.state.playbackMultiplier);
        //this.state.time = this.state.time + this.state.step
    }

    onReverseCallback(event) {
        clearInterval(this.timer);
        this.state.isReversing = false;
        this.state.isPlaying = false;

        this.state.isReversing = true;

        /** set interval to run frequncy times every second */
        this.timer = setInterval(() => {
            /** increment the time by the step value */
            if (this.state.time.valueOf() - this.state.step <= this.state.startTime * 1000) {
                this.setState({
                    time: this.state.endTime * 1000,
                });
                globalTime.setTime(this.state.endTime * 1000);

                this.updateLabel(this.state.endTime * 1000);
            } else {
                this.setState({
                    time: this.state.time.valueOf() - this.state.step,
                });
                globalTime.setTime(this.state.time.valueOf() - this.state.step);

                this.updateLabel(this.state.time.valueOf() - this.state.step);
            }
            this.updateDataSources();

            //this.state.time = (this.state.time + this.state.step)
        }, 10000 / this.state.playbackMultiplier);
        //this.state.time = this.state.time + this.state.step
    }

    onStopCallback(event) {
        this.setState({
            isPlaying: false,
        });
        this.setState({
            isReversing: false,
        });
        clearInterval(this.timer);
    }

    handleSpeedPicker(event, { value }) {
        this.setState({
            playbackMultiplier: value,
        });
    }

    static convertValueToLabel(value) {
        if (value != 1) {
            if (timeinterval == 'years') {
                let d = new Date(value);
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                return ye;
            } else {
                let d = new Date(value).toLocaleString('en-US', { timeZone: tz });
                return d;
            }
        } else {
            console.log('Failed to Convert');
            return ' ';
        }
    }

    handleSliderChange(event, { value }) {
        this.updateLabel(value);
        this.setState({ time: value }, () => this.updateDataSources());
        globalTime.setTime(value);
    }

    updateLabel(value) {
        this.setState({
            displayValue: TimelapseControls.convertValueToLabel(value),
            value,
        });
    }
    handleDarkModeClick(event) {
        this.setState({ dark: !this.state.dark });
    }

    handleRequestOpen(dockPosition) {
        if (dockPosition === 'bottomOpen') {
            setBottomOpen(true);
        } else if (dockPosition === 'leftOpen') {
            this.setState({ leftOpen: true });
        } else if (dockPosition === 'rightOpen') {
            setRightOpen(true);
        } else if (dockPosition === 'topOpen') {
            setTopOpen(true);
        }
    }
    openLeftPanel() {
        this.handleRequestOpen('leftOpen');
    }

    handleRequestClose() {
        this.setState({ leftOpen: false });
    }

    handlePanelChange(e, { panelId: panelValue }) {
        this.setState({ openPanelId: panelValue });
    }

    handleInputsPanelChange(e, { panelId: panelValue }) {
        this.setState({ openInputsPanelId: panelValue });
    }

    render() {
        const colStyle = {
            border: `0px solid black`,
            padding: 10,
            paddingRight: 20,
            whiteSpace: 'nowrap',
            textAlign: 'center',
        };
        const textStyle = { textAlign: 'center' };

        const TIMELAPSE_PRESET = {
            ...EnterprisePreset,
            dataSources: {
                'ds.timelapse': TimelapseDataSource,
            },
        };

        const dash = (
            <DashboardContextProvider geoRegistry={geoRegistry}>
                <DashboardCore
                    width={this.state.width}
                    height="calc(100vh - 78px)"
                    definition={this.state.def}
                    preset={TIMELAPSE_PRESET}
                    initialMode="view"
                />
            </DashboardContextProvider>
        );
        return (
            <div
                style={
                    this.state.dark
                        ? {
                              textAlign: 'center',
                              margin: 'auto',
                              align: 'center',
                              width: '100%',
                              backgroundColor: '#171D21',
                          }
                        : {
                              textAlign: 'center',
                              margin: 'auto',
                              align: 'center',
                              width: '100%',
                              backgroundColor: '#FFFFFF',
                          }
                }
            >
                <SplunkThemeProvider
                    family="enterprise"
                    colorScheme={this.state.dark ? 'dark' : 'light'}
                    density="compact"
                >
                    <table
                        style={{
                            textAlign: 'center',
                            margin: 'auto',
                            align: 'center',
                            width: this.state.width,
                        }}
                    >
                        <tbody>
                            <tr style={{ paddingBottom: '10px' }}>
                                <td
                                    style={{
                                        ...colStyle,
                                        width: '25%',
                                        padding: '30px',
                                        paddingTop: '0px',
                                        paddingBottom: '10px',
                                    }}
                                >
                                    {this.state.hasNotBeenFetched == true ? (
                                        <></>
                                    ) : (
                                        <Heading style={textStyle} level={2}>
                                            {this.state.displayValue}
                                        </Heading>
                                    )}

                                    <SidePanel
                                        open={this.state.leftOpen}
                                        dockPosition="left"
                                        onRequestClose={this.handleRequestClose}
                                        innerStyle={{ width: 300 }}
                                    >
                                        <div style={{ padding: '10px' }}>
                                            <Heading level={2}>Configuration:</Heading>
                                            <Heading level={3}>Theme:</Heading>
                                            <Switch
                                                value="darkMode"
                                                onClick={this.handleDarkModeClick}
                                                selected={this.state.dark}
                                                appearance={'toggle'}
                                            >
                                                Dark Mode
                                            </Switch>{' '}
                                            <Heading level={3}>Playback Speed:</Heading>
                                            <Select
                                                value={this.state.playbackMultiplier}
                                                prefixLabel="Timelapse Speed"
                                                onChange={this.handleSpeedPicker}
                                            >
                                                <Select.Option value="1" label="1x" />
                                                <Select.Option value="2" label="2x" />
                                                <Select.Option value="3" label="3x" />
                                                <Select.Option value="4" label="4x" />
                                                <Select.Option value="10" label="10x" />
                                                <Select.Option value="20" label="20x" />
                                                <Select.Option value="100" label="100x" />
                                                <Select.Option value="200" label="200x" />
                                            </Select>
                                            <Heading level={3}>Dashboard Information</Heading>
                                            {this.state.error_ds_no__time.length > 0 ? (
                                                <>
                                                    <Accordion
                                                        openPanelId={this.state.openPanelId}
                                                        onChange={this.handlePanelChange}
                                                    >
                                                        <Accordion.Panel
                                                            panelId={1}
                                                            title={
                                                                <Message type="error">
                                                                    {String(
                                                                        this.state.error_ds_no__time
                                                                            .length
                                                                    ) +
                                                                        ' Searches missing a _time field'}
                                                                </Message>
                                                            }
                                                        >
                                                            {this.state.error_ds_no__time.map(
                                                                (k, v) => {
                                                                    return (
                                                                        <P>
                                                                            {
                                                                                this.state
                                                                                    .error_ds_no__time[
                                                                                    v
                                                                                ]
                                                                            }
                                                                        </P>
                                                                    );
                                                                }
                                                            )}
                                                        </Accordion.Panel>
                                                    </Accordion>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            {this.state.warn_inputs_exist.length > 0 ? (
                                                <>
                                                    <Accordion
                                                        openPanelId={this.state.openInputsPanelId}
                                                        onChange={this.handleInputsPanelChange}
                                                    >
                                                        <Accordion.Panel
                                                            panelId={1}
                                                            title={
                                                                <Message type="warning">
                                                                    {String(
                                                                        this.state.warn_inputs_exist
                                                                            .length
                                                                    ) +
                                                                        ' Inputs Exist Which May Not Work with Timelapse'}
                                                                </Message>
                                                            }
                                                        >
                                                            {this.state.warn_inputs_exist.map(
                                                                (k, v) => {
                                                                    return (
                                                                        <P>
                                                                            {
                                                                                this.state
                                                                                    .warn_inputs_exist[
                                                                                    v
                                                                                ]
                                                                            }
                                                                        </P>
                                                                    );
                                                                }
                                                            )}
                                                        </Accordion.Panel>
                                                    </Accordion>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            {this.state.error_invalid_interval ? (
                                                <>
                                                    <Message type="error">
                                                        Unsupported Time Interval Specified:{' '}
                                                        {timeinterval}
                                                    </Message>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            {this.state.error_no_timetype_select ? (
                                                <>
                                                    <Message type="error">
                                                        Missing time type selector. Please go back
                                                        to the{' '}
                                                        <Link to="/app/splunk-timelapse-visualizations/start">
                                                            start
                                                        </Link>{' '}
                                                        and select a time type.
                                                    </Message>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </SidePanel>
                                    {(this.state.error_ds_no__time.length > 0 ||
                                        this.state.error_no_dash ||
                                        this.state.error_no_timetype_select ||
                                        this.state.error_invalid_interval ||
                                        this.state.warn_inputs_exist.length > 0) &&
                                    this.state.hasNotBeenFetched == false ? (
                                        <Button
                                            key="notifications"
                                            onClick={this.openLeftPanel}
                                            label={
                                                <>
                                                    <Bell size={1.5} /> &nbsp;&nbsp;
                                                    {String(
                                                        this.state.error_ds_no__time.length +
                                                            this.state.error_no_dash +
                                                            this.state.warn_inputs_exist.length +
                                                            this.state.error_no_timetype_select +
                                                            this.state.error_invalid_interval
                                                    )}
                                                </>
                                            }
                                            appearance="pill"
                                        />
                                    ) : (
                                        <></>
                                    )}

                                    {this.state.hasNotBeenFetched == true ? (
                                        <></>
                                    ) : (
                                        <>
                                            <Button
                                                key="configure"
                                                onClick={this.openLeftPanel}
                                                label="Configure"
                                            />
                                            <Button
                                                label={<TriangleLeft />}
                                                onClick={this.onReverseCallback}
                                                appearance="primary"
                                            />
                                            <Button
                                                label={<Pause />}
                                                onClick={this.onStopCallback}
                                                appearance="primary"
                                            />
                                            <Button
                                                label={<TriangleRight />}
                                                onClick={this.onPlayCallback}
                                                appearance="primary"
                                            />
                                        </>
                                    )}
                                </td>
                                <td
                                    style={{
                                        ...colStyle,
                                        width: '75%',
                                        paddingRight: '50px',
                                        paddingTop: '0px',
                                        paddingBottom: '0px',
                                    }}
                                >
                                    {this.state.hasNotBeenFetched == true ? (
                                        <></>
                                    ) : (
                                        <Slider
                                            min={this.state.startTime * 1000}
                                            value={this.state.time}
                                            displayValue={this.state.displayValue}
                                            onChange={this.handleSliderChange}
                                            max={this.state.endTime * 1000}
                                            step={step}
                                            defaultValue={this.state.startTime * 1000}
                                            minLabel={new Date(
                                                this.state.startTime * 1000
                                            ).toLocaleString('en-US', { timeZone: tz })}
                                            maxLabel={new Date(
                                                this.state.endTime * 1000
                                            ).toLocaleString('en-US', { timeZone: tz })}
                                        />
                                    )}
                                </td>
                            </tr>

                            {this.state.hasNotBeenFetched && this.state.error_no_dash != true ? (
                                <>
                                    <tr>
                                        <td
                                            colSpan="2"
                                            style={{
                                                ...colStyle,
                                                width: '100%',
                                                paddingTop: '0px',
                                                paddingBottom: '0px',
                                                height: '100px',
                                                textAlign: 'center',
                                                verticalAlign: 'text-bottom',
                                            }}
                                        >
                                            {' '}
                                            <Heading
                                                level={1}
                                                style={{
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    margin: 'auto',
                                                }}
                                            >
                                                Creating Timelapse Datasource{' '}
                                                {this.state.numberOfSearchesComplete}/
                                                {this.state.numberOfSearches}
                                            </Heading>
                                            <br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan="2"
                                            style={{
                                                ...colStyle,
                                                width: '100%',
                                                paddingTop: '0px',
                                                paddingBottom: '0px',
                                                height: '200px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    transform: 'scale(5)',
                                                }}
                                            >
                                                <WaitSpinner style={{}} size="large" />
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ) : (
                                <></>
                            )}

                            {this.state.hasNotBeenFetched == true ? (
                                <></>
                            ) : (
                                <tr>
                                    <td
                                        colSpan="2"
                                        style={{
                                            ...colStyle,
                                            width: '100%',
                                            paddingTop: '0px',
                                            paddingBottom: '0px',
                                        }}
                                    >
                                        <>{dash}</>
                                    </td>
                                </tr>
                            )}

                            {this.state.error_no_dash == true ? (
                                <tr>
                                    <td
                                        colSpan="2"
                                        style={{
                                            ...colStyle,
                                            width: '100%',
                                            paddingTop: '0px',
                                            paddingBottom: '0px',
                                        }}
                                    >
                                        <div>
                                            <Message appearance="fill" type="error">
                                                Cannot load dashboard with ID:{' '}
                                                {this.state.dashboardID}.
                                            </Message>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </SplunkThemeProvider>
            </div>
        );
    }
}

export default TimelapseControls;
