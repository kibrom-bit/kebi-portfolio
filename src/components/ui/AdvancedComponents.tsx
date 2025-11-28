import React from 'react';
import { useApp } from '../../contexts/AppContext';

export const CustomCursor: React.FC = () => {
  const { cursorVariant } = useApp();
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const mouseLeave = () => setIsVisible(false);
    const mouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseleave', mouseLeave);
    document.addEventListener('mouseenter', mouseEnter);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mouseenter', mouseEnter);
    };
  }, []);

  const variants = {
    default: {
      x: position.x - 8,
      y: position.y - 8,
      scale: 1,
    },
    hover: {
      x: position.x - 16,
      y: position.y - 16,
      scale: 2,
    },
    click: {
      x: position.x - 8,
      y: position.y - 8,
      scale: 0.8,
    },
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-0 left-0 w-4 h-4 bg-primary-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
      style={{
        transform: `translate(${variants[cursorVariant].x}px, ${variants[cursorVariant].y}px) scale(${variants[cursorVariant].scale})`,
      }}
    />
  );
};
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div 
      className={`
        ${sizes[size]} 
        border-gray-200 
        border-t-primary-500 
        rounded-full 
        animate-spin
        ${className}
      `} 
    />
  );
};

export const GradientText: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <span className={`bg-gradient-to-r from-primary-500 via-purple-600 to-blue-500 bg-clip-text text-transparent bg-300% animate-gradient ${className}`}>
      {children}
    </span>
  );
};

export const AnimatedCard: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  return (
    <div 
      className={`
        relative 
        bg-white dark:bg-gray-800 
        rounded-2xl p-6 
        shadow-lg hover:shadow-2xl 
        border border-gray-100 dark:border-gray-700
        hover:scale-105 hover:border-primary-300 dark:hover:border-primary-600
        transition-all duration-500 ease-out
        transform-gpu
        group
        ${className}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const ParticleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated background particles */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-300 rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 animate-float animation-delay-2000"></div>
      <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-15 animate-float animation-delay-1000"></div>
    </div>
  );
};

export const TypewriterText: React.FC<{ text: string; speed?: number; className?: string }> = ({
  text,
  speed = 50,
  className = ''
}) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      <span className="animate-blink-caret">|</span>
    </span>
  );
};

export const ShimmerButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = ({
  children,
  onClick,
  className = '',
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        relative
        inline-flex
        items-center
        justify-center
        px-8
        py-3
        overflow-hidden
        font-medium
        text-white
        transition-all
        duration-300
        bg-gradient-to-r from-primary-500 to-purple-600
        rounded-xl
        hover:scale-105
        hover:shadow-2xl
        group
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};