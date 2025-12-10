# SQL/ML/AWS Learning Platform – Visual Design System

## Design Philosophy

**Core Aesthetic**: Apple-like minimal calm meets PlayStation-style futuristic motion.

- **Calm**: Generous whitespace, subtle gradients, muted palette
- **Futuristic**: Liquid morphing shapes, parallax depth, flowing ribbons
- **Glassy**: Frosted translucency, soft inner glows, layered surfaces

---

## 1. Color Palette (Light Theme)

### Base Colors
```
--background:        #f8f9fc   /* Soft off-white with blue undertone */
--background-deep:   #eef1f7   /* Slightly deeper for layering */
--surface:           rgba(255, 255, 255, 0.72)  /* Glass surface */
--surface-elevated:  rgba(255, 255, 255, 0.85)  /* More opaque glass */
```

### Text Colors
```
--text-primary:      #1a1a2e   /* Near-black with blue tint */
--text-secondary:    #4a4a6a   /* Muted purple-grey */
--text-muted:        #8888a8   /* Light grey for hints */
--text-inverse:      #ffffff   /* On dark surfaces */
```

### Border & Glow
```
--border-subtle:     rgba(180, 190, 210, 0.25)  /* Soft silver border */
--border-active:     rgba(160, 170, 200, 0.50)  /* Active state */
--glow-soft:         rgba(200, 210, 240, 0.30)  /* Inner glow */
--glow-active:       rgba(180, 200, 255, 0.45)  /* Hover glow */
```

### Metallic Highlights
```
--metallic-silver:   linear-gradient(135deg, #e8ecf4 0%, #d0d8e8 50%, #e8ecf4 100%)
--metallic-shine:    linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 60%)
```

### Status Colors (Muted)
```
--success:           #7dd3a8   /* Soft mint */
--success-bg:        rgba(125, 211, 168, 0.15)
--warning:           #e8c87d   /* Soft gold */
--warning-bg:        rgba(232, 200, 125, 0.15)
--error:             #e88b8b   /* Soft coral */
--error-bg:          rgba(232, 139, 139, 0.15)
```

---

## 2. Typography

### Font Stack
```css
--font-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'SF Mono', 'Fira Code', 'Consolas', monospace;
```

### Scale
| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| H1 (Hero) | 48px / 3rem | 600 | 1.1 | -0.02em |
| H2 (Section) | 32px / 2rem | 600 | 1.2 | -0.01em |
| H3 (Card title) | 20px / 1.25rem | 500 | 1.3 | 0 |
| Body | 16px / 1rem | 400 | 1.6 | 0 |
| Body Small | 14px / 0.875rem | 400 | 1.5 | 0 |
| Caption | 12px / 0.75rem | 500 | 1.4 | 0.02em |
| Code | 14px / 0.875rem | 450 | 1.6 | 0 |

---

## 3. Depth & Motion System

### Border Radius (Liquid Pills)
```
--radius-sm:    12px   /* Small elements */
--radius-md:    20px   /* Cards, inputs */
--radius-lg:    32px   /* Large panels */
--radius-pill:  9999px /* Buttons, pills */
```

### Shadows (Layered Depth)
```css
/* Subtle elevation */
--shadow-sm: 
  0 2px 8px rgba(0, 0, 0, 0.04),
  0 1px 2px rgba(0, 0, 0, 0.06);

/* Card elevation */
--shadow-md:
  0 4px 24px rgba(0, 0, 0, 0.06),
  0 2px 8px rgba(0, 0, 0, 0.04);

/* Floating/active */
--shadow-lg:
  0 12px 48px rgba(0, 0, 0, 0.10),
  0 4px 16px rgba(0, 0, 0, 0.06);

/* Inner glow for glass */
--shadow-inner-glow:
  inset 0 1px 0 rgba(255, 255, 255, 0.6),
  inset 0 -1px 0 rgba(255, 255, 255, 0.1);
```

### Glassmorphism Rules
```css
.glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(180, 190, 210, 0.25);
  box-shadow: 
    0 4px 24px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.glass-elevated {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(32px) saturate(200%);
}
```

### Motion Timing
```css
--ease-liquid: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Bouncy morph */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);       /* Standard */
--ease-out:    cubic-bezier(0, 0, 0.2, 1);         /* Decelerate */

--duration-fast:   150ms;
--duration-normal: 300ms;
--duration-slow:   500ms;
```

---

## 4. Interactive States

### Hover Behavior
1. **Scale**: Slight lift (1.02–1.04)
2. **Shadow**: Increase depth
3. **Border**: Brighten slightly
4. **Glow**: Add inner radiance
5. **Shape**: Corners become more pill-like (radius increases)

### Focus Behavior
- Soft outer ring (not harsh outline)
- 2px offset, rgba glow matching surface

### Active/Pressed
- Scale down slightly (0.98)
- Shadow reduces
- Background opacity increases
