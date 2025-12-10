'use client';

import { useEffect, useState } from 'react';

/**
 * AnimatedBackground
 * 
 * PlayStation-inspired flowing ribbon background.
 * Uses pure CSS with layered gradients and keyframe animations.
 * 
 * WHY CSS OVER CANVAS/WEBGL:
 * - Better performance on low-end devices (GPU compositing vs CPU)
 * - No JavaScript overhead for animation loop
 * - Graceful degradation with prefers-reduced-motion
 * - Simpler maintenance and smaller bundle size
 * - Canvas/WebGL adds ~20-40KB and complexity for marginal visual gain
 * 
 * The ribbons use:
 * - Multiple layered pseudo-elements
 * - Large border-radius for organic curves
 * - Subtle gradient fills (silver/white)
 * - Slow, offset keyframe animations for natural flow
 */

interface AnimatedBackgroundProps {
  /** Intensity: 'minimal' reduces ribbons, 'full' shows all layers */
  intensity?: 'minimal' | 'normal' | 'full';
  /** Optional className for positioning */
  className?: string;
}

export default function AnimatedBackground({ 
  intensity = 'normal',
  className = '' 
}: AnimatedBackgroundProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Ribbon configurations
  const ribbons = [
    {
      id: 1,
      gradient: 'from-silver-light/30 via-white/20 to-silver/20',
      position: 'top-[10%] -left-[20%]',
      size: 'w-[140%] h-[300px]',
      rotation: '-rotate-6',
      animation: reducedMotion ? '' : 'animate-ribbon-1',
      blur: 'blur-[2px]',
      opacity: 'opacity-60',
    },
    {
      id: 2,
      gradient: 'from-silver/25 via-silver-light/15 to-transparent',
      position: 'top-[35%] -right-[15%]',
      size: 'w-[130%] h-[250px]',
      rotation: 'rotate-3',
      animation: reducedMotion ? '' : 'animate-ribbon-2',
      blur: 'blur-[1px]',
      opacity: 'opacity-50',
    },
    {
      id: 3,
      gradient: 'from-transparent via-white/25 to-silver-light/30',
      position: 'top-[60%] -left-[10%]',
      size: 'w-[120%] h-[280px]',
      rotation: '-rotate-2',
      animation: reducedMotion ? '' : 'animate-ribbon-3',
      blur: 'blur-[3px]',
      opacity: 'opacity-40',
    },
    {
      id: 4,
      gradient: 'from-silver-light/20 via-transparent to-silver/15',
      position: 'bottom-[5%] -right-[25%]',
      size: 'w-[150%] h-[320px]',
      rotation: 'rotate-8',
      animation: reducedMotion ? '' : 'animate-ribbon-1',
      blur: 'blur-[4px]',
      opacity: 'opacity-35',
      delay: 'animation-delay: -10s',
    },
  ];

  // Filter ribbons based on intensity
  const visibleRibbons = intensity === 'minimal' 
    ? ribbons.slice(0, 2) 
    : intensity === 'full' 
      ? ribbons 
      : ribbons.slice(0, 3);

  return (
    <div 
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-canvas via-canvas-deep to-canvas" />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Flowing ribbons */}
      {visibleRibbons.map((ribbon) => (
        <div
          key={ribbon.id}
          className={`
            absolute ${ribbon.position} ${ribbon.size} ${ribbon.rotation}
            bg-gradient-to-r ${ribbon.gradient}
            rounded-[100px] ${ribbon.blur} ${ribbon.opacity}
            ${ribbon.animation}
          `}
          style={ribbon.delay ? { animationDelay: '-10s' } : undefined}
        />
      ))}

      {/* Soft radial glow in center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[80%] h-[60%] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%)',
        }}
      />

      {/* Top edge fade for header area */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-canvas to-transparent" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ADDITIONAL CSS (add to globals.css)
// ═══════════════════════════════════════════════════════════════════════════
/*
@layer utilities {
  .animation-delay-1000 {
    animation-delay: 1s;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-3000 {
    animation-delay: 3s;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-ribbon-1,
  .animate-ribbon-2,
  .animate-ribbon-3 {
    animation: none !important;
  }
}
*/
