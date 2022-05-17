import { DashboardContextProvider } from '@splunk/dashboard-context';
import GeoJsonProvider from '@splunk/dashboard-context/GeoJsonProvider';
import GeoRegistry from '@splunk/dashboard-context/GeoRegistry';
import DashboardCore from '@splunk/dashboard-core';
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';

import Button from '@splunk/react-ui/Button';
import Switch from '@splunk/react-ui/Switch';
import P from '@splunk/react-ui/Paragraph';
import Heading from '@splunk/react-ui/Heading';
import Message from '@splunk/react-ui/Message';
import Accordion from '@splunk/react-ui/Accordion';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';
import SidePanel from '@splunk/react-ui/SidePanel';
import Link from '@splunk/react-ui/Link';

import Bell from '@splunk/react-icons/Bell';

import { format } from 'date-fns';
import React from 'react';
import TimeRange from '@marenaud/react-timeline-range-slider';
import { SplunkThemeProvider } from '@splunk/themes';
import SearchJob from '@splunk/search-job';

//Initialize Variables as empty
var selectedInterval = [];
var disabledIntervals = [];
var timelineInterval = [];

const geoRegistry = GeoRegistry.create();
geoRegistry.addDefaultProvider(new GeoJsonProvider());

//Get the Time Ranges from the URL Params
var search = window.location.search;
const params = new URLSearchParams(search);

var rangeStart = Math.round(Date.now().valueOf() / 1000);
var rangeEnd = Math.round(Date.now().valueOf() / 1000);

var error_no_timetype_select = false;

function setRelative(startdelta) {
    rangeStart = Math.round((Date.now() - startdelta).valueOf() / 1000);
    rangeEnd = Math.round(Date.now().valueOf() / 1000);
}

var tz = params.get('tz');
if (params.get('timerangetype') === 'explicit') {
    rangeStart = Math.round(Date.parse(params.get('rangeStart')).valueOf() / 1000);
    rangeEnd = Math.round(Date.parse(params.get('rangeEnd')).valueOf() / 1000);
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
var error_invalid_interval = false;
let step = 1000 * 60 * 60 * 24;

if (timeinterval == '1sec') {
    step = 1000;
} else if (timeinterval == '1min') {
    step = 1000 * 60;
} else if (timeinterval == '15min') {
    step = 1000 * 15 * 60;
} else if (timeinterval == '30min') {
    step = 1000 * 30 * 60;
} else if (timeinterval == 'days') {
    step = 1000 * 60 * 60 * 24;
} else if (timeinterval == 'hours') {
    step = 1000 * 60 * 60;
} else if (timeinterval == 'years') {
    step = 1000 * 60 * 60 * 24 * 365;
} else {
    error_invalid_interval = true;
}

timelineInterval = [rangeStart * 1000, rangeEnd * 1000];
selectedInterval = timelineInterval;
const seenImages = {};

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

//SplunkTimeRangeSlider Class
class SplunkTimeRangeSliderInput extends React.Component {
    constructor(props) {
        super(props);

        var darktheme = false;
        if (params.get('theme') == 'dark') {
            darktheme = true;
        }

        this.state = {
            error: false,
            selectedInterval,
            def: this.props.dash.props.definition,
            hasNotBeenFetched: true,
            startTime: rangeStart,
            endTime: rangeEnd,
            def: {},
            time: rangeStart * 1000,
            def: this.props.dash.props.definition,
            playbackMultiplier: '4',
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

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

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
                definition.dataSources[this.state.currentds].type = 'ds.test';

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
                })
                    .getResults({ output_mode: 'json_cols', count: 0 })
                    .first()
                    .toPromise();

                var defUpdate = this.state.def;

                defUpdate.dataSources[this.state.currentds].options = {
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

    updateDataSources() {
        hackDisableProgressiveRender();

        var definition_new = JSON.parse(JSON.stringify(this.state.defOrig));
        var selectedTime = new Date(this.state.time);

        for (var v in definition_new.dataSources) {
            if (definition_new.dataSources[v].options.data.fields.indexOf('_time') >= 0) {
                //Iterate through the time column, whereever it exists
                for (var time in definition_new.dataSources[v].options.data.columns[
                    definition_new.dataSources[v].options.data.fields.indexOf('_time')
                ]) {
                    var currTime = new Date(
                        definition_new.dataSources[v].options.data.columns[
                            definition_new.dataSources[v].options.data.fields.indexOf('_time')
                        ][time]
                    );

                    //If the currentTime is less than selected
                    if (currTime > selectedTime) {
                        for (var n in definition_new.dataSources[v].options.data.columns) {
                            if (n != 'extend') {
                                try {
                                    definition_new.dataSources[v].options.data.columns[n] =
                                        definition_new.dataSources[v].options.data.columns[n].slice(
                                            0,
                                            time
                                        );
                                } catch (error) {
                                    //console.log('ERROR');
                                    // expected output: ReferenceError: nonExistentFunction is not defined
                                    // Note - error messages will vary depending on browser
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }

        this.setState({
            def: definition_new,
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

    errorHandler = ({ error }) => this.setState({ error });

    //Function for handling range slider changes
    onChangeCallback = async (selectedInterval) => {
        //Update the selectedInterval variable with the new start and end times
        selectedInterval.map((d, i) => {
            if (i == 0) {
                this.start_range = d;
            }
            if (i == 1) {
                this.end_range = d;
            }
        });

        //For each dataSource in the dashboard, append a where clause to limit the start/end time
        var definition_new = JSON.parse(JSON.stringify(this.state.defOrig));

        for (var v in definition_new.dataSources) {
            var indexes = [];
            if (definition_new.dataSources[v].options.data.fields.indexOf('_time') >= 0) {
                //Iterate through the time column, whereever it exists
                for (var time in definition_new.dataSources[v].options.data.columns[
                    definition_new.dataSources[v].options.data.fields.indexOf('_time')
                ]) {
                    var currTime = new Date(
                        definition_new.dataSources[v].options.data.columns[
                            definition_new.dataSources[v].options.data.fields.indexOf('_time')
                        ][time]
                    );

                    //If the currentTime is less than selected

                    if (currTime > this.start_range && currTime < this.end_range) {
                        for (var n in definition_new.dataSources[v].options.data.columns) {
                            if (n != 'extend') {
                                indexes.push(time);
                            }
                        }
                    }
                }

                for (var n in definition_new.dataSources[v].options.data.columns) {
                    try {
                        definition_new.dataSources[v].options.data.columns[n] =
                            definition_new.dataSources[v].options.data.columns[n].slice(
                                indexes[0],
                                indexes[indexes.length - 1]
                            );
                    } catch (error) {
                        //console.log('ERROR');
                        // expected output: ReferenceError: nonExistentFunction is not defined
                        // Note - error messages will vary depending on browser
                    }
                }
            }
        }

        //Set the state variable of selectedInterval with the new values
        this.setState({ selectedInterval });
        this.setState({
            def: definition_new,
        });
        //definition = definition_new
        this.state.hasNotBeenFetched = false;
    };

    render() {
        const colStyle = {
            border: `0px solid black`,
            padding: 10,
            paddingRight: 20,
            whiteSpace: 'nowrap',
            textAlign: 'center',
        };
        const textStyle = { textAlign: 'center' };
        const dash = (
            <DashboardContextProvider geoRegistry={geoRegistry}>
                <DashboardCore
                    width="100%"
                    height="calc(100vh - 78px)"
                    definition={this.state.def}
                    preset={EnterprisePreset}
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
                                        <>
                                            <Heading style={textStyle} level={2}>
                                                {' '}
                                                Selected Interval:{' '}
                                            </Heading>

                                            <P style={textStyle}>
                                                {new Date(
                                                    this.state.selectedInterval[0]
                                                ).toLocaleString('en-US', { timeZone: tz })}{' '}
                                                through{' '}
                                                {new Date(
                                                    this.state.selectedInterval[1]
                                                ).toLocaleString('en-US', { timeZone: tz })}{' '}
                                            </P>
                                        </>
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
                                        this.state.error_invalid_interval ||
                                        this.state.error_no_timetype_select ||
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
                                                            this.state.error_invalid_interval +
                                                            this.state.error_no_timetype_select +
                                                            this.state.warn_inputs_exist.length
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
                                        <Button
                                            key="configure"
                                            onClick={this.openLeftPanel}
                                            label="Configure"
                                        />
                                    )}
                                </td>
                                <td
                                    style={{
                                        ...colStyle,
                                        width: '100%',
                                        paddingRight: '0px',
                                        paddingTop: '0px',
                                        paddingBottom: '0px',
                                    }}
                                >
                                    {this.state.hasNotBeenFetched == true ? (
                                        <></>
                                    ) : (
                                        <TimeRange
                                            error={this.state.error}
                                            step={step}
                                            selectedInterval={selectedInterval}
                                            timelineInterval={timelineInterval}
                                            onUpdateCallback={this.errorHandler}
                                            onChangeCallback={this.onChangeCallback}
                                            disabledIntervals={disabledIntervals}
                                            formatTick={(ms) => format(new Date(ms), ' ')}
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
                                                Creating Rangeslider Datasource{' '}
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

export default SplunkTimeRangeSliderInput;
