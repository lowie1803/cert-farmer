/**
 * vocab-ladder · design tokens (TypeScript mirror of tokens.css)
 * Use when you need token values in JS — charts, inline styles, canvas, etc.
 * Keep in sync with tokens.css (the source of truth).
 */
export const tokens = {
  color: {
    paper: "#f4f1ea",
    paper2: "#ebe6da",
    line: "#d8d2c4",
    ink: "#1a1916",
    soft: "#7d7768",
    accent: "#3d5a3d",
    accentSoft: "#e3ebe1",
    miss: "#9a4d3f",
  },
  font: {
    display: '"Fraunces", Georgia, serif',
    body: '"Newsreader", Georgia, serif',
  },
  radius: { sm: "10px", base: "12px", lg: "16px", pill: "999px" },
} as const;

export type Tokens = typeof tokens;
