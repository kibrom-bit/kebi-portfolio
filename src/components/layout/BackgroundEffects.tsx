import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';

export const BackgroundEffects: React.FC = () => {
  const { themeConfig } = usePortfolio();
  const { bgPattern, glowIntensity, accentColor } = themeConfig;

  if (glowIntensity <= 0 && bgPattern === 'none') {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-500">
      {/* Texture pattern overlay */}
      {bgPattern === 'grid' && (
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 90% 70% at 50% 10%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 10%, black, transparent)',
          }}
        />
      )}

      {bgPattern === 'dots' && (
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 85% 65% at 50% 20%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 20%, black, transparent)',
          }}
        />
      )}

      {bgPattern === 'mesh' && (
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(at 0% 0%, ${accentColor}33 0px, transparent 50%), radial-gradient(at 100% 100%, ${accentColor}22 0px, transparent 50%)`,
          }}
        />
      )}

      {/* Dynamic Ambient Glowing Orbs */}
      {glowIntensity > 0 && (
        <>
          <div
            className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: accentColor,
              opacity: 0.12 * glowIntensity,
            }}
          />
          <div
            className="absolute top-1/3 -right-48 w-[650px] h-[650px] rounded-full blur-[160px] transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: accentColor,
              opacity: 0.09 * glowIntensity,
            }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] rounded-full blur-[180px] transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: accentColor,
              opacity: 0.06 * glowIntensity,
            }}
          />
        </>
      )}
    </div>
  );
};
