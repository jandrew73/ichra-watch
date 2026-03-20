"use client";

import { useState, memo, useCallback, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import {
  getStatusColor,
  getStatusLabel,
  type StateLegislation,
  type LegislationStatus,
} from "@/data/legislation";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// FIPS code to state abbreviation mapping
const fipsToState: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
  "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
  "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
  "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
  "56": "WY",
};

// Centroid coordinates [longitude, latitude] for all US states
const stateCentroids: Record<string, [number, number]> = {
  AL: [-86.83, 32.79], AK: [-153.37, 63.35], AZ: [-111.09, 34.05],
  AR: [-92.37, 34.97], CA: [-119.68, 36.12], CO: [-105.31, 39.06],
  CT: [-72.76, 41.60], DE: [-75.51, 39.16], FL: [-81.52, 27.66],
  GA: [-83.44, 32.68], HI: [-155.66, 19.90], ID: [-114.74, 44.24],
  IL: [-89.20, 40.35], IN: [-86.13, 39.85], IA: [-93.21, 42.01],
  KS: [-98.48, 38.53], KY: [-84.67, 37.67], LA: [-91.87, 31.17],
  ME: [-69.38, 45.37], MD: [-76.64, 39.05], MA: [-71.53, 42.23],
  MI: [-84.54, 44.35], MN: [-94.64, 46.39], MS: [-89.68, 32.74],
  MO: [-92.29, 38.46], MT: [-109.63, 46.80], NE: [-99.90, 41.49],
  NV: [-116.42, 38.31], NH: [-71.57, 43.19], NJ: [-74.41, 40.06],
  NM: [-105.87, 34.52], NY: [-74.95, 43.30], NC: [-79.01, 35.76],
  ND: [-100.47, 47.55], OH: [-82.76, 40.39], OK: [-97.09, 35.57],
  OR: [-120.55, 43.80], PA: [-77.21, 41.20], RI: [-71.48, 41.58],
  SC: [-80.95, 33.86], SD: [-99.44, 43.95], TN: [-86.58, 35.84],
  TX: [-99.90, 31.47], UT: [-111.09, 39.32], VT: [-72.58, 44.05],
  VA: [-79.35, 37.77], WA: [-120.74, 47.75], WV: [-80.62, 38.35],
  WI: [-89.62, 44.26], WY: [-107.29, 43.08],
};

function StateTooltip({ data }: { data: StateLegislation }) {
  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: getStatusColor(data.status) }}
        />
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {getStatusLabel(data.status)}
        </span>
      </div>
      <h3 className="font-bold text-gray-900 text-lg">{data.state}</h3>
      <p className="text-sm text-blue-700 font-semibold mb-1">
        {data.billNumber}
        {data.billName ? ` — ${data.billName}` : ""}
      </p>
      <p className="text-sm text-gray-600 mb-2">{data.summary}</p>
      {data.taxCredit && (
        <p className="text-xs text-gray-500">
          <span className="font-semibold">Tax Credit:</span> {data.taxCredit}
        </p>
      )}
      {data.eligibility && (
        <p className="text-xs text-gray-500">
          <span className="font-semibold">Eligibility:</span>{" "}
          {data.eligibility}
        </p>
      )}
      <p className="text-xs text-gray-400 mt-2 italic">{data.lastAction}</p>
      <p className="text-[10px] text-gray-400 mt-1">
        Updated{" "}
        {new Date(data.lastActionDate + "T00:00:00").toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric", year: "numeric" }
        )}
      </p>
    </div>
  );
}

function USMap({ stateBills }: { stateBills: StateLegislation[] }) {
  const [tooltipContent, setTooltipContent] = useState<StateLegislation | null>(
    null
  );
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const stateDataMap = useMemo(() => {
    const map = new Map<string, StateLegislation>();
    stateBills.forEach((s) => map.set(s.stateCode, s));
    return map;
  }, [stateBills]);

  const handleMouseEnter = useCallback(
    (stateCode: string, event: React.MouseEvent) => {
      const data = stateDataMap.get(stateCode);
      if (data) {
        setTooltipContent(data);
        setTooltipPos({ x: event.clientX, y: event.clientY });
      }
    },
    [stateDataMap]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (tooltipContent) {
        setTooltipPos({ x: event.clientX, y: event.clientY });
      }
    },
    [tooltipContent]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltipContent(null);
  }, []);

  return (
    <div className="relative">
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {(
          [
            ["enacted", "Enacted"],
            ["passed_one_chamber", "Passed One Chamber"],
            ["introduced", "Introduced / In Committee"],
            ["no_activity", "No Activity"],
          ] as [LegislationStatus, string][]
        ).map(([status, label]) => (
          <div key={status} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getStatusColor(status) }}
            />
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        ))}
      </div>

      {/* Map */}
      <div
        className="w-full max-w-4xl mx-auto"
        onMouseMove={handleMouseMove}
      >
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1000 }}
          width={800}
          height={500}
          style={{ width: "100%", height: "auto" }}
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateCode = fipsToState[geo.id];
                  const stateData = stateCode
                    ? stateDataMap.get(stateCode)
                    : undefined;
                  const fillColor = stateData
                    ? getStatusColor(stateData.status)
                    : "#e5e7eb";

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke="#fff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none", opacity: 0.85 },
                        hover: { outline: "none", opacity: 1, cursor: "pointer" },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={(e) =>
                        stateCode && handleMouseEnter(stateCode, e as unknown as React.MouseEvent)
                      }
                      onMouseLeave={handleMouseLeave}
                    />
                  );
                })
              }
            </Geographies>
            {/* State abbreviation labels for active states */}
            {stateBills.map((s) => {
              const coords = stateCentroids[s.stateCode];
              if (!coords) return null;
              return (
                <Marker key={s.stateCode} coordinates={coords}>
                  <text
                    textAnchor="middle"
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      fill: "#1e293b",
                      pointerEvents: "none",
                      textShadow:
                        "0 0 3px rgba(255,255,255,0.9), 0 0 3px rgba(255,255,255,0.9)",
                    }}
                    dy={4}
                  >
                    {s.stateCode}
                  </text>
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Tooltip */}
      {tooltipContent && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltipPos.x + 15,
            top: tooltipPos.y - 10,
          }}
        >
          <StateTooltip data={tooltipContent} />
        </div>
      )}
    </div>
  );
}

export default memo(USMap);
