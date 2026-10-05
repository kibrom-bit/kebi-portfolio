import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';

/**
 * BackgroundEffects
 * ─────────────────
 * Renders a fixed, full-screen backdrop layer. Rules:
 *  • The base color is ALWAYS the preset's bgApp (black/white/navy etc.)
 *  • Accent swatch selection has ZERO effect here
 *  • bgGlowColor (preset-locked) drives the subtle ambient orbs
 *  • bgImage (admin-controlled) renders as an overlay with configurable opacity
 *  • bgPattern renders neutral texture lines (no color tint)
 */
export const BackgroundEffects: React.FC = () => {
  const { themeConfig } = usePortfolio();
  const { bgPattern, glowIntensity, bgGlowColor, bgImage, bgImageOpacity } = themeConfig;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* ── Background Image (admin-uploaded or URL) ── */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: `url(${bgImage})`,
            opacity: bgImageOpacity ?? 0.15,
          }}
        />
      )}

      {/* ── Neutral Texture Patterns (no color) ── */}
      {bgPattern === 'grid' && (
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(128,128,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 90% 70% at 50% 10%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 10%, black, transparent)',
          }}
        />
      )}

      {bgPattern === 'dots' && (
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(rgba(128,128,128,1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 85% 65% at 50% 20%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 20%, black, transparent)',
          }}
        />
      )}

      {bgPattern === 'mesh' && (
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(45deg, rgba(128,128,128,0.5) 25%, transparent 25%), linear-gradient(-45deg, rgba(128,128,128,0.5) 25%, transparent 25%)',
            backgroundSize: '32px 32px',
          }}
        />
      )}

      {/* ── Ambient Glow Orbs (preset color only, very subtle) ── */}
      {glowIntensity > 0 && (
        <>
          <div
            className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full blur-[160px] transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: bgGlowColor,
              opacity: 0.9 * glowIntensity,
            }}
          />
          <div
            className="absolute top-1/3 -right-48 w-[650px] h-[650px] rounded-full blur-[180px] transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: bgGlowColor,
              opacity: 0.7 * glowIntensity,
            }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] rounded-full blur-[200px] transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: bgGlowColor,
              opacity: 0.5 * glowIntensity,
            }}
          />
        </>
      )}
    </div>
  );
};
