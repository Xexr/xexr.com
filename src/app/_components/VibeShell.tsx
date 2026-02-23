"use client";

import { useRef, useState } from "react";
import StatusBar from "./StatusBar";
import VibeDrawer from "./VibeDrawer";

export default function VibeShell() {
  const [vibeDrawerOpen, setVibeDrawerOpen] = useState(false);
  const vibeButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <StatusBar
        onVibeClick={() => setVibeDrawerOpen(true)}
        buttonRef={vibeButtonRef}
      />
      <VibeDrawer
        open={vibeDrawerOpen}
        onOpenChange={setVibeDrawerOpen}
        anchorRef={vibeButtonRef}
      />
    </>
  );
}
