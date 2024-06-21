export type KvStoreImage = {
  default: string;
};

export async function getKvStoreImage(
  id: string | number,
  assetType: "images" | "icons"
): Promise<KvStoreImage> {
  try {
    return await fetch(
      `/splunkd/__raw/servicesNS/nobody/splunk-dashboard-studio/storage/collections/data/splunk-dashboard-${assetType}/${encodeURIComponent(
        id
      )}`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  } catch (e) {
    throw new Error("Image could not be retrieved.");
  }
}
