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