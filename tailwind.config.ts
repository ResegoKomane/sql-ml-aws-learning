import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark terminal-inspired palette
        void: {
          950: '#030308',
          900: '#0a0a12',
          800: '#12121e',
          700: '#1a1a2a',
          600: '#252538',
        },
        // Glowing accent colors
        neon: {
          cyan: '#00f5ff',
          blue: '#3b82f6',
          purple: '#a855f7',
          pink: '#ec4899',
          green: '#22c55e',
          orange: '#f97316',
          yellow: '#eab308',
        },
        // Phase-specific colors
        phase: {
          1: '#00f5ff',
          2: '#3b82f6',
          3: '#a855f7',
          4: '#22c55e',
          5: '#ec4899',
          6: '#f97316',
          7: '#eab308',
          8: '#ef4444',
          9: '#06b6d4',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui'],
        mono: ['var(--font-mono)', 'monospace'],
        body: ['var(--font-body)', 'system-ui'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'blink': 'blink 1s step-end infinite',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'progress': 'progress 1s ease-out forwards',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'typewriter': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink': {
          '50%': { opacity: '0' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'progress': {
          'from': { width: '0%' },
          'to': { width: 'var(--progress-width)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)`,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 245, 255, 0.3), 0 0 40px rgba(0, 245, 255, 0.1)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(168, 85, 247, 0.1)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.1)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.3), 0 0 40px rgba(236, 72, 153, 0.1)',
        'inner-glow': 'inset 0 0 20px rgba(0, 245, 255, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
