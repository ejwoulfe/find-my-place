import "./map.scss";
import { geoCentroid } from "d3-geo";
import { ComposableMap, Geographies, Geography, Marker, Annotation } from "react-simple-maps";

import allStates from "./map-data/states.json";
import { useNavigate } from "react-router-dom";
import { formatForSearch } from "../../../../helpers/formatForSearch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type geoObject = {
  name: string;
};
type offSetsObject = {
  VT: Array<number>;
  NH: Array<number>;
  MA: Array<number>;
  RI: Array<number>;
  CT: Array<number>;
  NJ: Array<number>;
  DE: Array<number>;
  MD: Array<number>;
  DC: Array<number>;
};

const offsets: offSetsObject = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

export function Map() {
  const navigate = useNavigate();

  const handleClick = (geo: geoObject) => {
    const state = formatForSearch(geo.name);
    navigate(`/state/${state}`);
  };
  return (
    <div className="map__container">
      <h3 className="map__title">CLICK ON A STATE TO PREVIEW A LIST OF CITIES</h3>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  style={{
                    default: {
                      fill: "#c1e3e3",
                      outline: "none",
                    },
                    hover: { fill: "#dbdbdb", cursor: "pointer", outline: "none" },
                    pressed: { fill: "#FFFFFF", outline: "none" },
                  }}
                  onClick={() => {
                    handleClick(geo.properties);
                  }}
                />
              ))}
              {geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const cur = allStates.find((s) => s.val === geo.id);
                return (
                  <g key={geo.rsmKey + "-name"}>
                    {cur &&
                      centroid[0] > -160 &&
                      centroid[0] < -67 &&
                      (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                        <Marker coordinates={centroid}>
                          <text
                            y="2"
                            fontSize={14}
                            textAnchor="middle"
                            id={cur.id + "__text"}
                            onClick={() => {
                              handleClick(geo.properties);
                            }}>
                            {cur.id}
                          </text>
                        </Marker>
                      ) : (
                        <Annotation
                          subject={centroid}
                          dx={offsets[cur.id as keyof offSetsObject][0]}
                          dy={offsets[cur.id as keyof offSetsObject][1]}>
                          <text
                            x={4}
                            fontSize={14}
                            alignmentBaseline="middle"
                            className="annotation__text"
                            onClick={() => {
                              handleClick(geo.properties);
                            }}>
                            {cur.id}
                          </text>
                        </Annotation>
                      ))}
                  </g>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </div>
  );
}
