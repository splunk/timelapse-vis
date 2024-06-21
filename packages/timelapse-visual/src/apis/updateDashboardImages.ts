import { DashboardDefinition, VizOptions } from "../data/dashboardDefinition";
import { getKvStoreImage, KvStoreImage } from "./getKvStoreImage";

export const updateDashboardImages = (
  definition: DashboardDefinition
): DashboardDefinition => {
  const visualisations = Object.values(definition.visualizations);
  const mappedViz = visualisations.map((viz) => matchVizualisationType(viz.type, viz.options));  
  console.log(mappedViz);
  return definition;
};

const matchVizualisationType = async (
  type: string,
  options: VizOptions
): Promise<KvStoreImage> => {
  switch (type) {
    case "viz.singlevalueicon":
      return getKvStoreImage(options.icon, "icons");
    case "splunk.singlevalueicon":
      return getKvStoreImage(options.icon, "icons");
    case "viz.img":
      return getKvStoreImage(options.src, "images");
    case "splunk.image":
      return getKvStoreImage(options.src, "images");
    case "splunk.choropleth.svg":
      return getKvStoreImage(options.svg, "images");
    case "viz.choropleth.svg":
      return getKvStoreImage(options.svg, "images");
    default:
      return getKvStoreImage(options.icon, "icons");
  }
};
