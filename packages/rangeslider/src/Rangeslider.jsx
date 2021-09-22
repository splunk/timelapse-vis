import { DashboardContextProvider } from '@splunk/dashboard-context';
import GeoJsonProvider from '@splunk/dashboard-context/GeoJsonProvider';
import GeoRegistry from '@splunk/dashboard-context/GeoRegistry';
import DashboardCore from '@splunk/dashboard-core';
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';
import { format } from "date-fns";
import React from "react";
import TimeRange from "react-timeline-range-slider";
import demodash from './demodash';


//Get the current dashboard ID
const dashboard_id = window.location.pathname.split("/").pop()

//Initialize Variables as empty
var selectedInterval = []
var disabledIntervals = []
var timelineInterval = []

const geoRegistry = GeoRegistry.create();
geoRegistry.addDefaultProvider(new GeoJsonProvider());


//Get the Time Ranges from the URL Params
var search = window.location.search
const params = new URLSearchParams(search);
const rangeStart = Math.round((Date.parse(params.get('rangeStart')).valueOf()) / 1000);
const rangeEnd = Math.round((Date.parse(params.get('rangeEnd')).valueOf()) / 1000);
var definition = ""

timelineInterval = [rangeStart * 1000, rangeEnd * 1000]
selectedInterval = timelineInterval
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
  const body = await fetch(`/splunkd/__raw/servicesNS/nobody/splunk-dashboard-studio/storage/collections/data/splunk-dashboard-${assetType}/${encodeURIComponent(
    id
  )}`, { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      const body = data;
      return body
    })

  return body
}


async function downloadImage(src, assetType) {
  if (!src) {
    return src;
  }
  if (src in seenImages) {
    return seenImages[src];
  }
  if (src.startsWith("data:image")) {
    return src;
  }

  if (src.startsWith("<svg ")) {
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

    var imgData = { dataURI: "null" }
    try {
      imgData = await getImage(assetType, id).then(blob => {
        return blob
      })
    }
    catch (e) {
      console.log(e)
      console.log("Cannot find image")
    }

    if (imgData.dataURI == "null") {
      imgData.dataURI == src
    }
    else {
      const [mimeType, data] = parseDataUri(imgData.dataURI);
    }
    return imgData.dataURI
  }
  throw new Error(`Unexpected image type: ${type}`);
}


//SplunkTimeRangeSlider Class
class SplunkTimeRangeSliderInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      selectedInterval,
      def: this.props.dash.props.definition,
      hasNotBeenFetched: true,
      startTime: rangeStart,
      endTime: rangeEnd,
      def: {}
    }
    this.fetchDefinition()
  }

  fetchDefinition = async () => {
    var search = window.location.search
    const params = new URLSearchParams(search);
    const demo = params.get('demo');
    var dashboardid = params.get('dashboardid');
    if (demo == "true") {
      dashboardid = "thisisonlyademo"
    }

    const def = await fetch(`/splunkd/services/data/ui/views/${dashboardid}?output_mode=json`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        var xml = new DOMParser().parseFromString(data.entry[0].content['eai:data'], 'application/xml');
        const def = JSON.parse(xml.getElementsByTagName('definition')[0].textContent);
        return def
      }
      )

      .catch(e => {

        //If there is an error, and demo==true, apply the demo dashboard.
        if (demo == "true") {
          this.setState({ def: demodash });
          definition = demodash
          this.setState({ hasNotBeenFetched: false })
        }
        console.error('Error during definition retrieval/parsing', e);
      });

    //Let's process the dashboard before we put it in place
    //First let's get images
    if (demo !== "true") {
      {
        for (const viz of Object.values(def.visualizations || {})) {
          var src = ""
          try {
            if (viz.type === 'viz.singlevalueicon') {
              viz.options.icon = await downloadImage(viz.options.icon, 'icons')
            }
            if (viz.type === 'splunk.singlevalueicon') {
              viz.options.icon = await downloadImage(viz.options.icon, 'icons')
            }
            if (viz.type === 'viz.img') {
              viz.options.src = await downloadImage(viz.options.src, 'images')
            }
            if (viz.type === 'splunk.choropleth.svg') {
              viz.options.svg = await downloadImage(viz.options.svg, 'images')
            }
            if (viz.type === 'viz.choropleth.svg') {
              viz.options.svg = await downloadImage(viz.options.svg, 'images')
            }
          } catch (e) {

            console.log("Failed to load image with src: " + src)
            console.log(e)
          }
        }


        if (def.layout.options.backgroundImage) {
          try {
            def.layout.options.backgroundImage.src = await downloadImage(
              def.layout.options.backgroundImage.src,
              'images'
            );
          }
          catch (e) {
            console.log(e)
          }
        }


        this.setState({ def });
        definition = def
        this.setState({ hasNotBeenFetched: false })
      }
    }
  }

  errorHandler = ({ error }) => this.setState({ error });

  //Function for handling range slider changes
  onChangeCallback = async (selectedInterval) => {
    //Update the selectedInterval variable with the new start and end times
    selectedInterval.map((d, i) => {
      if (i == 0) {
        this.start_range = d.getTime() / 1000;
      }
      if (i == 1) {
        this.end_range = d.getTime() / 1000;
      }
    })

    //For each dataSource in the dashboard, append a where clause to limit the start/end time
    var definition_new = JSON.parse(JSON.stringify(definition))
    for (var v in definition.dataSources) {
      //Currently just modify the range of the search with a new range based on the rangeslider selected start and end
      definition_new.dataSources[v].options.query = definition_new.dataSources[v].options.query + "| eval time=_time | where time<=" + this.end_range.toString() + " AND time>=" + this.start_range.toString() + " | fields - time"
    }
    //Set the state variable of selectedInterval with the new values
    this.setState({ selectedInterval })
    this.setState({
      def: definition_new
    })
    //definition = definition_new
    this.state.hasNotBeenFetched = false
  };

  render() {
    const dash = <DashboardContextProvider geoRegistry={geoRegistry}>
      <DashboardCore
        width="100%"
        height="calc(100vh - 78px)"
        definition={this.state.def}
        preset={EnterprisePreset}
        initialMode="view"
      />
    </DashboardContextProvider>
    return (
      <ColumnLayout>
        <ColumnLayout.Row>

          {this.state.selectedInterval.map((d, i) => {
            if (i == 0) {
              return <span id={i} key={i}><p> Selected Interval: {format(d, "MM/dd/yyyy HH:mm")}  through&nbsp;</p> </span>
            }
            if (i == 1) {
              return <span id={i} key={i}><p>{format(d, "MM/dd/yyyy HH:mm")}</p></span>
            }
          })}
        </ColumnLayout.Row>
        <ColumnLayout.Row>
          <TimeRange
            error={this.state.error}
            ticksNumber={36}
            selectedInterval={selectedInterval}
            timelineInterval={timelineInterval}
            onUpdateCallback={this.errorHandler}
            onChangeCallback={this.onChangeCallback}
            disabledIntervals={disabledIntervals}
          />
        </ColumnLayout.Row>
        <ColumnLayout.Row>
          {this.state.hasNotBeenFetched ? <WaitSpinner size="large" /> : dash}
        </ColumnLayout.Row>
      </ColumnLayout>
    );
  }
}

export default SplunkTimeRangeSliderInput;

