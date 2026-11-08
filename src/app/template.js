"use client";

// Runs on every navigation (unlike layout.js), so it is the right place for a
// soft page-enter transition. transform + opacity only, and disabled for
// reduced-motion users via the matching CSS.
export default function Template({ children }) {
  return <div className="page-enter">{children}</div>;
}