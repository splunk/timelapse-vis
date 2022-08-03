type DataSource = "ds.search" | "ds.chain" | "ds.savedSearch" | "ds.test";

export type DashboardDefinition = {
  dataSources: {
    [key: string]: {
      type: DataSource;
      options: Record<string, unknown>;
      refreshType: string;
      refresh: string;
    };
  };
  visualizations: {
    [key: string]: {
      type: string;
      name: string;
      options: Record<string, unknown>;
      dataSources: Record<string, unknown>;
      description: string;
    };
  };
  layout: {
    type: string;
    options: Record<string, unknown>;
    globalInputs: string[];
    structure: Record<string, unknown>[];
  };
  inputs: {
    [key: string]: {
      type: string;
      title: string;
      options: Record<string, unknown>;
    };
  };
  defaults: {
    visualizations: Record<string, unknown>;
    "ds.search": Record<string, unknown>;
  };
};

// visualizations, where your visualization stanzas and their options are placed.
// inputs, where you create your inputs stanzas.
// defaults, were you set global defaults.
// layout, where you list your inputs, change the size of your canvas, and modify your dashboards.
