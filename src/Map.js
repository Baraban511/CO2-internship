import { ResponsiveChoropleth } from "@nivo/geo";
import dataTotal from "./data.json";
import feature from "./world_countries.json";

const maxYear = Math.max(...dataTotal.map((item) => item.Year));
const filteredData = dataTotal.filter(
  (item) =>
    item.Year === Math.max(maxYear) && item.Total && item.Country !== "Global"
);
const dMax = Math.max(...filteredData.map((item) => item.Total));
const dMin = Math.min(...filteredData.map((item) => item.Total));
export const MyResponsiveChoropleth = () => {
  const data = filteredData.map((item) => ({
    id: item.ISO,
    value: item.Total,
  }));
  return (
    <div className="h-screen w-screen">
      <ResponsiveChoropleth
        data={data}
        features={feature.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[dMin, dMax]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionType="naturalEarth1"
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        defs={[]}
        fill={[]}
        legends={[          
          {
            anchor: "bottom-left",
            direction: "column",
            justify: true,
            translateX: 20,
            translateY: -100,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemTextColor: "#444444",
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000000",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
