"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import LogoTile from "../brand/LogoTile";

const MarkScene = dynamic(() => import("./MarkScene"), { ssr: false });

/** Flat mark first (instant, works without WebGL), then the 3D one takes over. */
export default function HeroStage() {
  const [live, setLive] = useState(false);
  return (
    <div className="absolute inset-0" aria-hidden>
      <div
        className={`absolute inset-x-0 top-24 flex justify-center transition-opacity duration-300 lg:inset-y-0 lg:left-0 lg:right-auto lg:top-0 lg:w-1/2 lg:items-center ${
          live ? "opacity-0" : ""
        }`}
      >
        <LogoTile className="aspect-square w-[44vw] max-w-52 lg:w-[28vw] lg:max-w-md" />
      </div>
      <MarkScene onReady={() => setLive(true)} />
    </div>
  );
}
