import { ArrowRight } from 'lucide-react';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'outline-dark';
  text: string;
  href?: string;
}

export default function Button({ variant = 'solid', text, className = "", href, ...props }: ButtonProps) {
  const baseClasses = "group flex items-center justify-between gap-4 rounded-full pl-6 pr-2 py-2 transition-all duration-300 w-fit cursor-pointer outline-none font-bold text-[15px]";
  
  let customClasses = "";
  let innerCircleClasses = "";
  let iconColorClass = "text-white";

  switch (variant) {
    case 'solid':
      customClasses = "bg-[#E8431A] text-white hover:bg-[#d03a15]";
      innerCircleClasses = "bg-white/20 border border-white/30 group-hover:translate-x-1";
      iconColorClass = "text-white";
      break;
    case 'outline':
      customClasses = "border-[1.5px] border-white text-white hover:bg-white/10";
      innerCircleClasses = "border border-white/30 group-hover:bg-white/20 group-hover:translate-x-1";
      iconColorClass = "text-white group-hover:text-white";
      break;
    case 'outline-dark':
      customClasses = "border-[1.5px] border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A]/5";
      innerCircleClasses = "border border-[#1A1A1A]/30 group-hover:bg-[#1A1A1A]/10 group-hover:translate-x-1";
      iconColorClass = "text-[#1A1A1A]";
      break;
  }

  const Content = (
    <>
      <span className="pl-1 pr-1">{text}</span>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${innerCircleClasses}`}>
        <ArrowRight size={18} className={iconColorClass} />
      </div>
    </>
  );

  return href ? (
    <a href={href} className={`${baseClasses} ${customClasses} ${className}`}>
      {Content}
    </a>
  ) : (
    <button className={`${baseClasses} ${customClasses} ${className}`} {...props}>
      {Content}
    </button>
  );
}
