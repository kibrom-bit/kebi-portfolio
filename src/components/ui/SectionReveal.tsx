import React, { useEffect, useRef, useState } from 'react';

/**
 * SectionReveal
 * ─────────────
 * Wraps any section in a premium scroll-reveal animation.
 * Uses IntersectionObserver — zero framer-motion dependency.
 *
 * Variants:
 *   'rise'    – slides up + fades in (default)
 *   'glide'   – slides in from left
 *   'emerge'  – zooms up with scale + blur
 *   'cascade' – staggered children via CSS variable --i
 */

type RevealVariant = 'rise' | 'glide' | 'emerge';

interface SectionRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number; // ms
  className?: string;
  threshold?: number;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  variant = 'rise',
  delay = 0,
  className = '',
  threshold = 0.08,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const baseStyle: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
  };

  const variantClasses: Record<RevealVariant, { hidden: string; visible: string }> = {
    rise: {
      hidden: 'opacity-0 translate-y-16',
      visible: 'opacity-100 translate-y-0',
    },
    glide: {
      hidden: 'opacity-0 -translate-x-12',
      visible: 'opacity-100 translate-x-0',
    },
    emerge: {
      hidden: 'opacity-0 translate-y-10 scale-95',
      visible: 'opacity-100 translate-y-0 scale-100',
    },
  };

  const { hidden, visible: vis } = variantClasses[variant];

  return (
    <div
      ref={ref}
      style={baseStyle}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? vis : hidden
      } ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * CardReveal — for grid/list items, staggers via index
 */
export const CardReveal: React.FC<{
  children: React.ReactNode;
  index?: number;
  className?: string;
}> = ({ children, index = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.97]'
      } ${className}`}
    >
      {children}
    </div>
  );
};
