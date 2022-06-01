import React from "react";
import layout from "@splunk/react-page";
import DashboardCore from "@splunk/dashboard-core";
import EnterprisePreset from "@splunk/dashboard-presets/EnterprisePreset";
import TimelapseControls from "@splunk/timelapse-visual";

const dash = (
  <DashboardCore
    width="100%"
    height="calc(100vh - 78px)"
    preset={EnterprisePreset}
  />
);

layout(
  <>
    <div style={{ height: 125, backgroundColor: "blue" }}>
      <TimelapseControls dash={dash} />
    </div>
  </>,
  {
    pageTitle: "Timelapse",
    hideFooter: true,
    layout: "fixed",
  }
);
