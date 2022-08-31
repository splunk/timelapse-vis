import { DashboardDefinition } from "../data/dashboardDefinition";
import { createURL } from "@splunk/splunk-utils/url";
import { defaultFetchInit, handleResponse } from "@splunk/splunk-utils/fetch";

export async function getDashboardDefinition(
  dashboardId: string
): Promise<DashboardDefinition> {
  try {
    const url: string = createURL(
      `/splunkd/servicesNS/-/-/data/ui/views/${dashboardId}?output_mode=json`
    );
    return await fetch(url, defaultFetchInit)
      .then((res) => handleResponse(200))
      .then((data) => {
        const xml = new DOMParser().parseFromString(
          data.entry[0].content["eai:data"],
          "application/xml"
        );
        const xmlElement = xml.getElementsByTagName("definition");
        return JSON.parse(xmlElement[0]?.textContent || "{}");
      });
  } catch (e) {
    throw new Error(
      "Error during definition retrieval/parsing of XML Definition."
    );
  }
}
