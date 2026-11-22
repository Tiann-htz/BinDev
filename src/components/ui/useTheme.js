"use client";

import { useSyncExternalStore } from "react";

// Reads the current theme from <html data-theme="...">, the same place
// ThemeToggle writes it. Re-renders the component when the theme changes.
function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getServerSnapshot() {
  return "dark";
}

export default function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
