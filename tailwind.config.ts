import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════
      // COLOR PALETTE - Liquid Glass Light Theme
      // ═══════════════════════════════════════════════
      colors: {
        // Base backgrounds
        canvas: {
          DEFAULT: '#f8f9fc',
          deep: '#eef1f7',
          muted: '#e4e8f0',
        },
        // Glass surfaces
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.72)',
          elevated: 'rgba(255, 255, 255, 0.85)',
          subtle: 'rgba(255, 255, 255, 0.50)',
          solid: '#ffffff',
        },
        // Text
        ink: {
          DEFAULT: '#1a1a2e',
          secondary: '#4a4a6a',
          muted: '#8888a8',
          inverse: '#ffffff',
        },
        // Borders & Glows
        edge: {
          DEFAULT: 'rgba(180, 190, 210, 0.25)',
          active: 'rgba(160, 170, 200, 0.50)',
          strong: 'rgba(140, 150, 180, 0.40)',
        },
        glow: {
          soft: 'rgba(200, 210, 240, 0.30)',
          active: 'rgba(180, 200, 255, 0.45)',
          white: 'rgba(255, 255, 255, 0.60)',
        },
        // Status (muted tones)
        mint: {
          DEFAULT: '#7dd3a8',
          light: 'rgba(125, 211, 168, 0.15)',
        },
        gold: {
          DEFAULT: '#e8c87d',
          light: 'rgba(232, 200, 125, 0.15)',
        },
        coral: {
          DEFAULT: '#e88b8b',
          light: 'rgba(232, 139, 139, 0.15)',
        },
        // Metallic accents
        silver: {
          DEFAULT: '#d0d8e8',
          light: '#e8ecf4',
          dark: '#b8c0d4',
        },
      },

      // ═══════════════════════════════════════════════
      // TYPOGRAPHY
      // ═══════════════════════════════════════════════
      fontFamily: {
        display: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'section': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'card-title': ['1.25rem', { lineHeight: '1.3', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
      },

      // ═══════════════════════════════════════════════
      // BORDER RADIUS - Liquid Pills
      // ═══════════════════════════════════════════════
      borderRadius: {
        'liquid-sm': '12px',
        'liquid': '20px',
        'liquid-lg': '32px',
        'pill': '9999px',
      },

      // ═══════════════════════════════════════════════
      // SHADOWS - Layered Depth
      // ═══════════════════════════════════════════════
      boxShadow: {
        'glass': '0 4px 24px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 12px 48px rgba(0, 0, 0, 0.10), 0 4px 16px rgba(0, 0, 0, 0.06)',
        'glass-active': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
        'inner-glow-strong': 'inset 0 2px 4px rgba(255, 255, 255, 0.8), inset 0 -1px 2px rgba(255, 255, 255, 0.2)',
        'soft-ring': '0 0 0 3px rgba(180, 200, 255, 0.25)',
        'nav-item': '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
        'nav-active': '0 16px 64px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.10)',
      },

      // ═══════════════════════════════════════════════
      // BACKDROP BLUR
      // ═══════════════════════════════════════════════
      backdropBlur: {
        'glass': '24px',
        'glass-lg': '32px',
        'glass-xl': '48px',
      },

      // ═══════════════════════════════════════════════
      // ANIMATIONS & TRANSITIONS
      // ═══════════════════════════════════════════════
      transitionTimingFunction: {
        'liquid': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      animation: {
        'ribbon-1': 'ribbon1 25s ease-in-out infinite',
        'ribbon-2': 'ribbon2 30s ease-in-out infinite',
        'ribbon-3': 'ribbon3 35s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        ribbon1: {
          '0%, 100%': { transform: 'translateX(-5%) translateY(0) rotate(-3deg) scaleY(1)' },
          '25%': { transform: 'translateX(5%) translateY(-20px) rotate(2deg) scaleY(1.05)' },
          '50%': { transform: 'translateX(-3%) translateY(-10px) rotate(-1deg) scaleY(0.98)' },
          '75%': { transform: 'translateX(8%) translateY(-25px) rotate(3deg) scaleY(1.02)' },
        },
        ribbon2: {
          '0%, 100%': { transform: 'translateX(3%) translateY(0) rotate(2deg) scaleY(1)' },
          '33%': { transform: 'translateX(-8%) translateY(-30px) rotate(-2deg) scaleY(1.08)' },
          '66%': { transform: 'translateX(5%) translateY(-15px) rotate(1deg) scaleY(0.95)' },
        },
        ribbon3: {
          '0%, 100%': { transform: 'translateX(-2%) translateY(-5px) rotate(-1deg) scaleY(1)' },
          '50%': { transform: 'translateX(6%) translateY(-35px) rotate(2deg) scaleY(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.9' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
      },

      // ═══════════════════════════════════════════════
      // PERSPECTIVE & 3D
      // ═══════════════════════════════════════════════
      perspective: {
        'none': 'none',
        '500': '500px',
        '1000': '1000px',
        '1500': '1500px',
        '2000': '2000px',
      },
    },
  },
  plugins: [
    // Custom plugin for glass utilities
    function({ addUtilities }: { addUtilities: Function }) {
      addUtilities({
        '.glass-surface': {
          background: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(24px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(24px) saturate(180%)',
          border: '1px solid rgba(180, 190, 210, 0.25)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        },
        '.glass-surface-elevated': {
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(32px) saturate(200%)',
          '-webkit-backdrop-filter': 'blur(32px) saturate(200%)',
          border: '1px solid rgba(180, 190, 210, 0.30)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
        },
        '.metallic-shine': {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 60%)',
        },
        '.text-gradient-silver': {
          background: 'linear-gradient(135deg, #e8ecf4 0%, #b8c0d4 50%, #e8ecf4 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          backgroundClip: 'text',
        },
        '.preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-1500': {
          perspective: '1500px',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
      });
    },
  ],
};

export default config;
