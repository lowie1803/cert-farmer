import React, { useState, useRef } from 'react';

export default function TermTooltip({ term, definition, children }) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const termRef = useRef(null);
  
  const showTooltip = () => {
    if (termRef.current) {
      const rect = termRef.current.getBoundingClientRect();
      setCoords({
        x: rect.left + rect.width / 2,
        y: rect.top
      });
    }
    setShow(true);
  };
  
  const hideTooltip = () => setShow(false);
  
  const toggleTooltip = (e) => {
    e.stopPropagation();
    if (!show) {
      showTooltip();
    } else {
      hideTooltip();
    }
  };
  
  return (
    <>
      <span
        ref={termRef}
        className="glossary-term"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={toggleTooltip}
      >
        {children}
      </span>
      
      {show && (
        <div
          className="fixed z-[100] max-w-xs p-3 bg-ink border border-accent/30 rounded-lg shadow-xl shadow-black/20 animate-fade-in"
          style={{
            left: Math.min(Math.max(coords.x - 140, 10), window.innerWidth - 290),
            top: coords.y - 10,
            transform: 'translateY(-100%)'
          }}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={hideTooltip}
        >
          {/* Term header */}
          <div className="text-xs text-accent-soft font-semibold mb-1 flex items-center gap-1.5">
            <span className="text-base">🇻🇳</span>
            <span>{term}</span>
          </div>
          
          {/* Vietnamese definition */}
          <div className="text-sm text-paper leading-relaxed">
            {definition}
          </div>
          
          {/* Arrow pointer */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="border-8 border-transparent border-t-ink" />
          </div>
        </div>
      )}
    </>
  );
}
