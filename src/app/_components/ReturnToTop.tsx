"use client";

import { useState, useEffect } from "react";
import { ArrowUpCircle } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export default function ReturnToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      className="fixed bottom-4 right-4 z-50 rounded-full bg-accent/10 p-2 text-accent hover:bg-accent/20"
      onClick={scrollToTop}
      aria-label="Return to top"
    >
      <ArrowUpCircle className="h-6 w-6" />
    </Button>
  );
}
