"use client";

import { useRef, type CSSProperties } from "react";
import { useInViewOnce } from "../motion/useInView";

// Simplified national outline (lon, lat).
const BORDER: [number, number][] = [
  [39.195, 32.161], [38.792, 33.379], [41.006, 34.419], [41.384, 35.628], [41.29, 36.359],
  [41.837, 36.606], [42.35, 37.23], [42.779, 37.385], [43.942, 37.256], [44.293, 37.002],
  [44.773, 37.17], [45.421, 35.978], [46.076, 35.677], [46.152, 35.093], [45.648, 34.748],
  [45.417, 33.968], [46.109, 33.017], [47.335, 32.469], [47.849, 31.709], [47.685, 30.985],
  [48.005, 30.985], [48.015, 30.452], [48.568, 29.927], [47.975, 29.976], [47.303, 30.059],
  [46.569, 29.099], [44.709, 29.179], [41.89, 31.19], [40.4, 31.89],
];
const HOME: [number, number] = [44.29, 32.78];
// name, lon, lat, label offset
const CITIES: [string, number, number, number, number][] = [
  ["بغداد", 44.36, 33.31, 34, -10],
  ["الموصل", 43.13, 36.34, 0, -18],
  ["أربيل", 44.01, 36.19, 36, -10],
  ["كركوك", 44.39, 35.47, 40, 0],
  ["الأنبار", 43.3, 33.42, -34, -10],
  ["النجف", 44.33, 32.0, -40, 12],
  ["ذي قار", 46.26, 31.05, -4, -20],
  ["البصرة", 47.78, 30.51, -44, 14],
];

const S = 62;
const X = (lon: number) => Math.round((lon - 38.5) * S * 0.84 * 10) / 10 + 10;
const Y = (lat: number) => Math.round((37.6 - lat) * S * 10) / 10 + 10;
const OUTLINE = `M${BORDER.map(([a, b]) => `${X(a)} ${Y(b)}`).join("L")}Z`;
const hx = X(HOME[0]);
const hy = Y(HOME[1]);

function arc(lon: number, lat: number) {
  const x = X(lon);
  const y = Y(lat);
  const bend = Math.max(16, Math.hypot(x - hx, y - hy) * 0.22);
  const dx = y - hy;
  const dy = hx - x;
  const len = Math.hypot(dx, dy) || 1;
  return `M${hx} ${hy}Q${(hx + x) / 2 + (dx / len) * bend} ${(hy + y) / 2 + (dy / len) * bend} ${x} ${y}`;
}

export default function IraqMap() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref, "0px 0px -20% 0px");
  return (
    <div ref={ref} data-map={seen ? "run" : undefined}>
      <svg
        viewBox="0 0 550 560"
        className="mx-auto w-full max-w-xl overflow-visible"
        role="img"
        aria-label="خريطة العراق وعليها مقر الشركة في المسيب، محافظة بابل"
      >
        <defs>
          <pattern id="dots" width="11" height="11" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.7" fill="#fff" opacity=".45" />
          </pattern>
          <linearGradient id="edge" x1="0" x2="1">
            <stop offset="0" stopColor="#2DD4A4" />
            <stop offset=".5" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFC93C" />
          </linearGradient>
        </defs>
        <path d={OUTLINE} fill="url(#dots)" />
        <path
          className="arc"
          d={OUTLINE}
          fill="none"
          stroke="url(#edge)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          pathLength={1}
          style={{ "--i": 0 } as CSSProperties}
        />

        {CITIES.map(([name, lon, lat, ox, oy], i) => {
          const d = arc(lon, lat);
          return (
            <g key={name}>
              <path
                className="arc"
                d={d}
                fill="none"
                stroke="#ffc93c"
                strokeWidth="2.2"
                pathLength={1}
                style={{ "--i": 5 + i } as CSSProperties}
              />
              <circle className="motion-reduce:hidden" r="3.4" fill="#fff">
                <animateMotion path={d} dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={X(lon)} cy={Y(lat)} r="5.5" fill="#2dd4a4" />
              <text
                x={X(lon) + ox}
                y={Y(lat) + oy}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontWeight="500"
                fontSize="16"
              >
                {name}
              </text>
            </g>
          );
        })}

        <circle className="ping" cx={hx} cy={hy} r="12" fill="#ffc93c" />
        <circle cx={hx} cy={hy} r="13" fill="#fff" />
        <circle cx={hx} cy={hy} r="7.5" fill="#ff7a59" />
        <text x={hx + 58} y={hy + 16} textAnchor="middle" fill="#fff" fontSize="21" fontWeight="700">
          المسيب
        </text>
      </svg>
    </div>
  );
}
