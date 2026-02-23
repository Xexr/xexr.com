"use client";

import { useState } from "react";
import StatusBar from "./StatusBar";

export default function VibeShell() {
  const [, setVibeDrawerOpen] = useState(false);

  return (
    <>
      <StatusBar onVibeClick={() => setVibeDrawerOpen(true)} />
      {/* VibeDrawer will be added here by xr-lfk.3.6 */}
    </>
  );
}
