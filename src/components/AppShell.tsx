'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AnimatedBackground from './AnimatedBackground';
import Navigation3DCarousel, { NavigationMobileStrip } from './Navigation3DCarousel';

/**
 * AppShell
 * 
 * The main layout wrapper that provides:
 * - Animated ribbon background
 * - 3D carousel navigation (desktop) or horizontal strip (mobile)
 * - Content area with proper spacing
 * - Responsive behavior
 */

interface AppShellProps {
  children: React.ReactNode;
  /** Show the main navigation carousel */
  showNavigation?: boolean;
  /** Background intensity */
  backgroundIntensity?: 'minimal' | 'normal' | 'full';
}

export default function AppShell({ 
  children, 
  showNavigation = true,
  backgroundIntensity = 'normal',
}: AppShellProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    setIsLoaded(true);
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine if we're on a lesson detail page (hide main nav)
  const isLessonPage = pathname?.includes('/lesson-') || pathname?.match(/\/learn\/[^/]+\/[^/]+/);
  const shouldShowNav = showNavigation && !isLessonPage;

  return (
    <div className="relative min-h-screen bg-canvas">
      {/* Animated background */}
      <AnimatedBackground intensity={backgroundIntensity} />

      {/* Main content wrapper */}
      <div className="relative z-10">
        {/* Navigation area */}
        {shouldShowNav && (
          <nav className="pt-8 pb-4 px-4">
            {!isLoaded ? (
              // Loading placeholder
              <div className="h-48 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-silver border-t-ink animate-spin" />
              </div>
            ) : isMobile ? (
              // Mobile: Horizontal scrolling strip
              <NavigationMobileStrip currentPath={pathname || '/'} />
            ) : (
              // Desktop: 3D carousel
              <Navigation3DCarousel currentPath={pathname || '/'} />
            )}
          </nav>
        )}

        {/* Page content */}
        <main className={shouldShowNav ? '' : ''}>
          {children}
        </main>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE CONTAINER - Standard content wrapper with max-width
// ═══════════════════════════════════════════════════════════════════════════

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function PageContainer({ 
  children, 
  className = '',
  size = 'lg',
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={`${maxWidthClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION HEADER - For page sections
// ═══════════════════════════════════════════════════════════════════════════

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  action,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex items-start justify-between mb-6 ${className}`}>
      <div>
        <h2 className="font-display text-section text-ink">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-body text-ink-secondary">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
