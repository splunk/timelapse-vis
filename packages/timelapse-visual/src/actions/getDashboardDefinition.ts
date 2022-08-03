export async function getDashboardDefinition(dashboardId: string) {
  try {
    const definition = await fetch(
      `/splunkd/servicesNS/-/-/data/ui/views/${dashboardId}?output_mode=json`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const xml = new DOMParser().parseFromString(
          data.entry[0].content["eai:data"],
          "application/xml"
        );
        const xmlElement = xml.getElementsByTagName("definition");
        const def = JSON.parse(xmlElement[0]?.textContent || "{}");
        return def;
      });
    return definition;
  } catch (e) {
    throw new Error(
      "Error during definition retrieval/parsing of XML Definition."
    );
  }
}
