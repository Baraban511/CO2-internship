import { ResponsiveChoropleth } from "@nivo/geo";
import feature from "./world_countries.json";
import { useState, useEffect } from "react";

export const MyResponsiveChoropleth = () => {
  const [data, setData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch(`https://data-site-ir8z.onrender.com/data`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
    if (selectedCountry) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    const handleEsc = (event) => {
      if (event.keyCode === 27) setSelectedCountry(null);
    };
    window.addEventListener("keydown", handleEsc);

    // Supprimer l'écouteur d'événements lors du nettoyage
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedCountry]);

  if (!data) {
    return <p>Loading...</p>;
   }

   var result = data.reduce((acc, item) => {
    // Si le pays n'est pas encore dans l'accumulateur ou si l'année est plus grande
    if (!acc[item.Country] || item.Year > acc[item.Country].Year) {
      acc[item.Country] = item;
    }
    return acc;
  }, {});
  
  // Convertir l'objet en tableau
  result = Object.values(result);
  
  console.log(result);

    const maxYear = Math.max(...data.map((item) => item.Year));
    const filteredData = data.filter(
      (item) =>
        item.Year === Math.max(maxYear) &&
        item.Total &&
        item.Country !== "Global"
    );
    const dMax = Math.max(...filteredData.map((item) => item.Total));//Pour domaine
    const dMin = Math.min(...filteredData.map((item) => item.Total));//Pour domaine
    const dMap = filteredData.map((item) => ({
      id: item.ISO,
      value: item.Total,
      Oil: item.Oil,
      Gas: item.Gas,
      Coal: item.Coal,
      Cement: item.Cement,
      Flaring: item.Flaring,
      Other: item.Other,
    }));
    return (
      <div className="h-screen w-screen">
        <ResponsiveChoropleth
          data={dMap}
          features={feature.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors="nivo"
          domain={[dMin, dMax]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionType="naturalEarth1"
          projectionScale={200}
          onClick={(feature, event) => {
            setSelectedCountry(feature);
          }}
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
        {selectedCountry && selectedCountry.data && (
          <div
            class="relative z-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div
                class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                onClick={() => setSelectedCountry(null)}
              >
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                        <button onClick={() => setSelectedCountry(null)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          class="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          {selectedCountry.properties.name}
                        </h3>
                        <div class="mt-2">
                          <p class="text-sm text-gray-500">
                            <p>
                              CO2 emissions : {selectedCountry.data.value}
                            </p>
                            {selectedCountry.data.Oil ? (
                              <p>Oil : {selectedCountry.data.Oil}</p>
                            ) : null}
                            {selectedCountry.data.Gas ? (
                              <p>Gas : {selectedCountry.data.Gas}</p>
                            ) : null}
                            {selectedCountry.data.Coal ? (
                              <p>Coal : {selectedCountry.data.Coal}</p>
                            ) : null}
                            {selectedCountry.data.Cement ? (
                              <p>Cement : {selectedCountry.data.Cement}</p>
                            ) : null}
                            {selectedCountry.data.Flaring ? (
                              <p>Flaring : {selectedCountry.data.Flaring}</p>
                            ) : null}
                            {selectedCountry.data.Other ? (
                              <p>Other : {selectedCountry.data.Other}</p>
                            ) : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};
