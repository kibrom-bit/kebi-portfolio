// Smooth scroll utility
export const smoothScrollTo = (elementId: string, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Intersection Observer utility
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    return new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });
  }
  return null;
};

// Animation delay calculator
export const getStaggerDelay = (index: number, baseDelay = 0.1) => {
  return `${index * baseDelay}s`;
};

// Color utilities for theme
export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Performance throttling
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// CSS in JS utilities
export const cssVariables = (variables: Record<string, string>) => {
  return Object.entries(variables)
    .map(([key, value]) => `--${key}: ${value};`)
    .join(' ');
};

// Format numbers with commas
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

// Generate random ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Check if element is in viewport
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Calculate reading time
export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};