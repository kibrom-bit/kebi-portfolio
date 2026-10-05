import React, { useEffect, useRef, useState } from 'react';

/**
 * SectionReveal
 * ─────────────
 * Apple/Stripe-tier scroll reveal animation engine.
 * Supports bi-directional scrolling (up and down) with velocity awareness,
 * subtle depth physics, scale and blur transitions.
 */

type RevealVariant = 'rise' | 'glide' | 'emerge' | 'depth';

interface SectionRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number; // ms
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  variant = 'rise',
  delay = 0,
  className = '',
  threshold = 0.08,
  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setDirection(currentScrollY >= lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '-20px 0px -20px 0px',
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  const baseStyle: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
  };

  const variantStyles = {
    rise: {
      hidden:
        direction === 'down'
          ? 'opacity-0 translate-y-12 scale-[0.985] blur-[2px]'
          : 'opacity-0 -translate-y-12 scale-[0.985] blur-[2px]',
      visible: 'opacity-100 translate-y-0 scale-100 blur-0',
    },
    glide: {
      hidden: 'opacity-0 -translate-x-10 scale-[0.98]',
      visible: 'opacity-100 translate-x-0 scale-100',
    },
    emerge: {
      hidden: 'opacity-0 scale-95 translate-y-6 blur-[3px]',
      visible: 'opacity-100 scale-100 translate-y-0 blur-0',
    },
    depth: {
      hidden: 'opacity-0 [transform:perspective(1200px)_rotateX(6deg)_translateY(36px)]',
      visible: 'opacity-100 [transform:perspective(1200px)_rotateX(0deg)_translateY(0)]',
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.rise;

  return (
    <div
      ref={ref}
      style={baseStyle}
      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
        visible ? currentVariant.visible : currentVariant.hidden
      } ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * CardReveal — for grid/list items, staggers by index and handles smooth up/down scrolling
 */
export const CardReveal: React.FC<{
  children: React.ReactNode;
  index?: number;
  className?: string;
  once?: boolean;
}> = ({ children, index = 0, className = '', once = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '-15px 0px -15px 0px',
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
      className={`transition-all duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
        visible
          ? 'opacity-100 translate-y-0 scale-100 blur-0'
          : 'opacity-0 translate-y-8 scale-[0.97] blur-[1px]'
      } ${className}`}
    >
      {children}
    </div>
  );
};
