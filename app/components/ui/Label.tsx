import React from 'react';

export default function Label({ text, dotColor = "#E8431A", className = "" }: { text: string; dotColor?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <div 
        className="w-2 h-2 rounded-[56px] flex-shrink-0" 
        style={{ backgroundColor: dotColor }} 
      />
      <span className="text-[11px] font-bold uppercase tracking-[2px] leading-none mt-0.5">
        {text}
      </span>
    </div>
  );
}
