'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  User,
  ChevronLeft,
  ChevronRight,
  type LucideIcon 
} from 'lucide-react';
import Link from 'next/link';

/**
 * Navigation3DCarousel
 * 
 * A futuristic HUD-style navigation ring that users can spin/scroll through.
 * Items are arranged in a 3D arc with perspective transforms.
 * 
 * INTERACTION MODES:
 * - Mouse drag (click and drag horizontally)
 * - Scroll wheel (horizontal or vertical)
 * - Arrow keys
 * - Touch swipe on mobile
 * - Click on visible items to navigate
 */

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  description?: string;
}

const navItems: NavItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard, 
    href: '/',
    description: 'Your learning overview'
  },
  { 
    id: 'curriculum', 
    label: 'Curriculum', 
    icon: BookOpen, 
    href: '/curriculum',
    description: 'Phases & lessons'
  },
  { 
    id: 'achievements', 
    label: 'Achievements', 
    icon: Trophy, 
    href: '/achievements',
    description: 'Badges & milestones'
  },
  { 
    id: 'profile', 
    label: 'Profile', 
    icon: User, 
    href: '/profile',
    description: 'Your settings'
  },
];

interface Navigation3DCarouselProps {
  currentPath?: string;
}

export default function Navigation3DCarousel({ 
  currentPath = '/' 
}: Navigation3DCarouselProps) {
  // Find initial index based on current path
  const getInitialIndex = () => {
    const idx = navItems.findIndex(item => item.href === currentPath);
    return idx >= 0 ? idx : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getInitialIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate rotation for each item
  const getItemStyle = (index: number) => {
    const totalItems = navItems.length;
    const angleStep = 360 / totalItems;
    
    // Effective rotation including drag offset
    const dragAngle = (dragOffset / 3); // Sensitivity
    const baseAngle = (index - activeIndex) * angleStep + dragAngle;
    
    // Normalize angle to -180 to 180
    let normalizedAngle = baseAngle % 360;
    if (normalizedAngle > 180) normalizedAngle -= 360;
    if (normalizedAngle < -180) normalizedAngle += 360;

    // Items at the back should be hidden
    const isVisible = Math.abs(normalizedAngle) < 120;
    
    // Calculate 3D position on the arc
    const radius = 280; // Distance from center
    const radians = (normalizedAngle * Math.PI) / 180;
    
    const x = Math.sin(radians) * radius;
    const z = Math.cos(radians) * radius - radius; // Push back into screen
    
    // Scale based on depth (items at front are larger)
    const scale = 0.6 + (Math.cos(radians) + 1) * 0.2; // 0.6 to 1.0
    
    // Opacity based on position
    const opacity = isVisible ? 0.4 + (Math.cos(radians) + 1) * 0.3 : 0;

    // Is this the center/active item?
    const isCenter = Math.abs(normalizedAngle) < 30;

    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
      opacity,
      zIndex: Math.round((Math.cos(radians) + 1) * 10),
      isCenter,
      isVisible,
    };
  };

  // Navigation functions
  const navigate = useCallback((direction: 'prev' | 'next') => {
    setActiveIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % navItems.length;
      } else {
        return (prev - 1 + navItems.length) % navItems.length;
      }
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigate('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Mouse wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaX || e.deltaY;
      if (Math.abs(delta) > 20) {
        navigate(delta > 0 ? 'next' : 'prev');
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [navigate]);

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Determine if we should navigate based on drag distance
    if (Math.abs(dragOffset) > 50) {
      navigate(dragOffset < 0 ? 'next' : 'prev');
    }
    setDragOffset(0);
  };

  return (
    <div className="relative w-full">
      {/* Navigation arrows */}
      <button
        onClick={() => navigate('prev')}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                   w-10 h-10 rounded-full glass-surface
                   flex items-center justify-center
                   text-ink-secondary hover:text-ink transition-all
                   hover:scale-110 hover:shadow-glass-hover"
        aria-label="Previous section"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => navigate('next')}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                   w-10 h-10 rounded-full glass-surface
                   flex items-center justify-center
                   text-ink-secondary hover:text-ink transition-all
                   hover:scale-110 hover:shadow-glass-hover"
        aria-label="Next section"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* 3D Carousel Container */}
      <div
        ref={containerRef}
        className="relative h-48 perspective-1500 cursor-grab active:cursor-grabbing
                   flex items-center justify-center overflow-visible"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        role="navigation"
        aria-label="Main navigation carousel"
      >
        {/* Center reference point */}
        <div className="absolute preserve-3d">
          {navItems.map((item, index) => {
            const style = getItemStyle(index);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-36 transition-all duration-300 ease-out
                  ${!style.isVisible ? 'pointer-events-none' : ''}
                `}
                style={{
                  transform: style.transform,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault();
                    return;
                  }
                  // If not center, navigate to it instead
                  if (!style.isCenter) {
                    e.preventDefault();
                    setActiveIndex(index);
                  }
                }}
              >
                <div
                  className={`
                    flex flex-col items-center p-5 rounded-liquid-lg
                    transition-all duration-300 ease-liquid
                    ${style.isCenter 
                      ? 'glass-surface-elevated shadow-nav-active scale-100' 
                      : 'glass-surface shadow-nav-item scale-95 opacity-80'
                    }
                    hover:scale-105 hover:shadow-glass-hover
                    group
                  `}
                >
                  {/* Icon container with glow */}
                  <div 
                    className={`
                      w-14 h-14 rounded-pill flex items-center justify-center
                      mb-3 transition-all duration-300
                      ${style.isCenter 
                        ? 'bg-ink text-white shadow-inner-glow-strong' 
                        : 'bg-silver-light/50 text-ink-secondary'
                      }
                      group-hover:scale-110
                    `}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Label */}
                  <span 
                    className={`
                      font-display text-sm font-medium transition-colors
                      ${style.isCenter ? 'text-ink' : 'text-ink-secondary'}
                    `}
                  >
                    {item.label}
                  </span>
                  
                  {/* Description (only visible when center) */}
                  {style.isCenter && item.description && (
                    <span className="text-caption text-ink-muted mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.description}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center gap-2 mt-4">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(index)}
            className={`
              h-2 rounded-pill transition-all duration-300
              ${index === activeIndex 
                ? 'w-8 bg-ink' 
                : 'w-2 bg-silver hover:bg-silver-dark'
              }
            `}
            aria-label={`Go to ${item.label}`}
            aria-current={index === activeIndex ? 'page' : undefined}
          />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SIMPLIFIED MOBILE VERSION
// ═══════════════════════════════════════════════════════════════════════════
export function NavigationMobileStrip({ currentPath = '/' }: { currentPath?: string }) {
  return (
    <nav className="flex gap-2 p-2 overflow-x-auto scrollbar-hide">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.href === currentPath;
        
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-pill
              whitespace-nowrap transition-all duration-200
              ${isActive 
                ? 'glass-surface-elevated text-ink shadow-glass' 
                : 'text-ink-secondary hover:text-ink hover:bg-glass-subtle'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span className="text-small font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
