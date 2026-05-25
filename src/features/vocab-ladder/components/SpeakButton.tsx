import React from "react";
import { speak, isSpeechSupported, type SpeakLang } from "../lib/speak";

const LANG_MAP: Record<string, SpeakLang> = {
  en: "en-US",
  zh: "zh-CN",
};

export interface SpeakButtonProps {
  text: string;
  lang: string;
  size?: "sm" | "md";
  className?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({ text, lang, size = "md", className }) => {
  const target = LANG_MAP[lang];
  if (!target || !text || !isSpeechSupported()) return null;
  const handle = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(text, target);
  };
  return (
    <button
      type="button"
      onClick={handle}
      aria-label="Play pronunciation"
      className={`vt-speak${size === "sm" ? " sm" : ""}${className ? " " + className : ""}`}
    >
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M18.5 5.5a9 9 0 0 1 0 13" />
      </svg>
    </button>
  );
};

export default SpeakButton;
