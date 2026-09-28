'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightRadius?: number;
  borderGlow?: boolean;
  glowColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className,
  spotlightColor = 'rgba(59, 130, 246, 0.12)',
  spotlightRadius = 350,
  borderGlow = true,
  glowColor = 'rgba(96, 165, 250, 0.45)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(-1000);
    mouseY.set(-1000);
  }, [mouseX, mouseY]);

  const bgGlow = useMotionTemplate`radial-gradient(${spotlightRadius}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;
  const borderMask = useMotionTemplate`radial-gradient(${Math.round(spotlightRadius * 0.7)}px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 100%)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative overflow-hidden rounded-card border border-border-subtle bg-surface/80 backdrop-blur-sm transition-all duration-300',
        'hover:border-border-subtle/70 hover:shadow-2xl hover:shadow-blue-500/5',
        className
      )}
      {...props}
    >
      {/* Background Spotlight Shader */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-card transition-opacity duration-300"
        style={{ background: bgGlow, opacity: isHovered ? 1 : 0 }}
        aria-hidden
      />

      {/* Glowing Border Mask */}
      {borderGlow && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-10 rounded-card transition-opacity duration-300"
          style={{
            border: '1px solid transparent',
            WebkitMaskImage: borderMask,
            maskImage: borderMask,
            borderColor: 'var(--border-glow)',
            opacity: isHovered ? 1 : 0,
          }}
          aria-hidden
        />
      )}

      {/* Content */}
      <div className="relative z-20 h-full w-full">{children}</div>
    </div>
  );
};
