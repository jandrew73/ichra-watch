"use client";

import { useState, memo, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import {
  stateLegislation,
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

const stateDataMap = new Map<string, StateLegislation>();
stateLegislation.forEach((s) => stateDataMap.set(s.stateCode, s));

// Centroid coordinates [longitude, latitude] for states with active legislation
const stateCentroids: Record<string, [number, number]> = {
  IN: [-86.13, 39.85],
  OH: [-82.76, 40.39],
  GA: [-83.44, 32.68],
  MS: [-89.68, 32.74],
  TX: [-99.90, 31.47],
  AZ: [-111.09, 34.05],
  WI: [-89.62, 44.26],
  NH: [-71.57, 43.19],
  FL: [-81.52, 27.66],
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

function USMap() {
  const [tooltipContent, setTooltipContent] = useState<StateLegislation | null>(
    null
  );
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = useCallback(
    (stateCode: string, event: React.MouseEvent) => {
      const data = stateDataMap.get(stateCode);
      if (data) {
        setTooltipContent(data);
        setTooltipPos({ x: event.clientX, y: event.clientY });
      }
    },
    []
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
            {stateLegislation.map((s) => {
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
