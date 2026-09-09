"use client";
import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
}

export default function Card3D({
  children,
  className = "",
  maxTilt = 12,
  glareOpacity = 0.15,
  style,
  ...props
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width - 0.5) * 2;
      const normY = (y / rect.height - 0.5) * 2;

      // Invert Y for standard natural 3D tilt
      setRotateX(-normY * maxTilt);
      setRotateY(normX * maxTilt);

      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: glareOpacity,
      });
    },
    [maxTilt, glareOpacity]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
      style={style}
      {...props}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-transform duration-200 ease-out rounded-2xl overflow-hidden"
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 24,
        }}
      >
        {/* Dynamic Light Sheen / Specular Glare */}
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle 350px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.22), transparent 70%)`,
          }}
        />

        {/* Content with 3D child preservation */}
        <div className="relative z-10 w-full h-full preserve-3d">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
