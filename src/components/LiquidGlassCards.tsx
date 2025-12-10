'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Lock, CheckCircle, Clock, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

// ═══════════════════════════════════════════════════════════════════════════
// SHARED HOOK: Mouse-driven 3D tilt effect
// ═══════════════════════════════════════════════════════════════════════════

interface TiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
}

function useTilt3D(maxTilt = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ 
    rotateX: 0, 
    rotateY: 0, 
    glareX: 50, 
    glareY: 50 
  });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Calculate rotation (inverted for natural feel)
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
      const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;
      
      // Calculate glare position (percentage)
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;

      setTilt({ rotateX, rotateY, glareX, glareY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);

  return { ref, tilt, isHovering };
}

// ═══════════════════════════════════════════════════════════════════════════
// PHASE CARD - Large card for curriculum phases
// ═══════════════════════════════════════════════════════════════════════════

interface PhaseCardProps {
  id: string;
  number: number;
  title: string;
  description: string;
  lessonCount: number;
  completedLessons: number;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  estimatedTime?: string;
  icon?: LucideIcon;
}

export function PhaseCard({
  id,
  number,
  title,
  description,
  lessonCount,
  completedLessons,
  status,
  estimatedTime,
  icon: Icon,
}: PhaseCardProps) {
  const { ref, tilt, isHovering } = useTilt3D(6);
  const progress = (completedLessons / lessonCount) * 100;
  const isLocked = status === 'locked';

  return (
    <Link
      href={isLocked ? '#' : `/learn/${id}`}
      className={`block ${isLocked ? 'cursor-not-allowed' : ''}`}
    >
      <div
        ref={ref}
        className={`
          relative overflow-hidden rounded-liquid-lg
          transition-all duration-300 ease-liquid
          ${isLocked ? 'opacity-60' : ''}
        `}
        style={{
          transform: isHovering 
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.02)`
            : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
        }}
      >
        {/* Glass background */}
        <div className="absolute inset-0 glass-surface" />
        
        {/* Metallic shine overlay that follows mouse */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: isHovering ? 0.6 : 0,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
          }}
        />

        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Phase number badge */}
              <div className={`
                w-12 h-12 rounded-pill flex items-center justify-center
                font-display text-lg font-semibold
                transition-all duration-300
                ${status === 'completed' 
                  ? 'bg-mint/20 text-mint' 
                  : status === 'in-progress'
                    ? 'bg-ink text-white shadow-inner-glow'
                    : 'bg-silver-light text-ink-secondary'
                }
                ${isHovering && !isLocked ? 'scale-110' : ''}
              `}>
                {status === 'completed' ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  number
                )}
              </div>
              
              {/* Title */}
              <div>
                <h3 className="font-display text-card-title text-ink">
                  {title}
                </h3>
                <p className="text-small text-ink-secondary">
                  Phase {number}
                </p>
              </div>
            </div>

            {/* Status indicator */}
            {isLocked && <Lock className="w-5 h-5 text-ink-muted" />}
            {!isLocked && (
              <ChevronRight 
                className={`w-5 h-5 text-ink-muted transition-transform duration-300
                           ${isHovering ? 'translate-x-1' : ''}`} 
              />
            )}
          </div>

          {/* Description */}
          <p className="text-small text-ink-secondary mb-4 line-clamp-2">
            {description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Progress */}
            <div className="flex-1 mr-4">
              <div className="flex items-center justify-between text-caption text-ink-muted mb-1.5">
                <span>{completedLessons} of {lessonCount} lessons</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-silver-light/50 rounded-pill overflow-hidden">
                <div 
                  className="h-full bg-ink rounded-pill transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Time estimate */}
            {estimatedTime && (
              <div className="flex items-center gap-1 text-caption text-ink-muted">
                <Clock className="w-3.5 h-3.5" />
                {estimatedTime}
              </div>
            )}
          </div>
        </div>

        {/* Bottom border glow on hover */}
        <div 
          className={`
            absolute bottom-0 left-0 right-0 h-px
            bg-gradient-to-r from-transparent via-glow-active to-transparent
            transition-opacity duration-300
          `}
          style={{ opacity: isHovering ? 1 : 0 }}
        />
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// LESSON CARD - Smaller card for lessons within phases
// ═══════════════════════════════════════════════════════════════════════════

interface LessonCardProps {
  id: string;
  phaseId: string;
  number: number;
  title: string;
  duration?: string;
  type: 'theory' | 'quiz' | 'exercise' | 'lab';
  status: 'locked' | 'available' | 'completed';
  xpReward?: number;
}

export function LessonCard({
  id,
  phaseId,
  number,
  title,
  duration,
  type,
  status,
  xpReward,
}: LessonCardProps) {
  const { ref, tilt, isHovering } = useTilt3D(4);
  const isLocked = status === 'locked';

  const typeConfig = {
    theory: { label: 'Theory', color: 'bg-silver-light text-ink-secondary' },
    quiz: { label: 'Quiz', color: 'bg-gold-light text-gold' },
    exercise: { label: 'Exercise', color: 'bg-mint-light text-mint' },
    lab: { label: 'Lab', color: 'bg-coral-light text-coral' },
  };

  return (
    <Link
      href={isLocked ? '#' : `/learn/${phaseId}/${id}`}
      className={`block ${isLocked ? 'cursor-not-allowed' : ''}`}
    >
      <div
        ref={ref}
        className={`
          relative overflow-hidden rounded-liquid
          transition-all duration-200 ease-out
          ${isLocked ? 'opacity-50' : ''}
        `}
        style={{
          transform: isHovering && !isLocked
            ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-2px)`
            : 'perspective(800px) rotateX(0) rotateY(0) translateY(0)',
        }}
      >
        {/* Glass background */}
        <div className={`
          absolute inset-0 transition-all duration-200
          ${isHovering && !isLocked ? 'glass-surface-elevated' : 'glass-surface'}
        `} />
        
        {/* Glare */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            opacity: isHovering ? 0.5 : 0,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.25) 0%, transparent 50%)`,
          }}
        />

        {/* Content */}
        <div className="relative flex items-center gap-4 p-4">
          {/* Lesson number */}
          <div className={`
            w-10 h-10 rounded-pill flex items-center justify-center
            font-display text-small font-semibold
            transition-all duration-200
            ${status === 'completed' 
              ? 'bg-mint/20 text-mint' 
              : 'bg-silver-light/50 text-ink-secondary'
            }
          `}>
            {status === 'completed' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <span>{number}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-body text-small font-medium text-ink truncate">
              {title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded-pill text-caption ${typeConfig[type].color}`}>
                {typeConfig[type].label}
              </span>
              {duration && (
                <span className="text-caption text-ink-muted">{duration}</span>
              )}
            </div>
          </div>

          {/* XP / Lock */}
          <div className="flex items-center">
            {isLocked ? (
              <Lock className="w-4 h-4 text-ink-muted" />
            ) : xpReward ? (
              <span className="text-caption font-medium text-ink-secondary">
                +{xpReward} XP
              </span>
            ) : (
              <ChevronRight className={`
                w-5 h-5 text-ink-muted transition-transform duration-200
                ${isHovering ? 'translate-x-1' : ''}
              `} />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// LIQUID BUTTON - Primary action button with morphing hover effect
// ═══════════════════════════════════════════════════════════════════════════

interface LiquidButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function LiquidButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  disabled = false,
  fullWidth = false,
  className = '',
}: LiquidButtonProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-small gap-1.5',
    md: 'px-6 py-3 text-body gap-2',
    lg: 'px-8 py-4 text-body gap-2.5',
  };

  const variantClasses = {
    primary: `
      bg-ink text-white
      hover:shadow-glass-hover
      active:bg-ink/90
    `,
    secondary: `
      glass-surface text-ink
      hover:glass-surface-elevated hover:shadow-glass-hover
      active:shadow-glass-active
    `,
    ghost: `
      bg-transparent text-ink-secondary
      hover:bg-glass-subtle hover:text-ink
      active:bg-glass
    `,
  };

  const content = (
    <span
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-300 ease-liquid
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{
        borderRadius: isHovering ? '9999px' : '20px', // Morph to pill on hover
        transform: isPressed ? 'scale(0.98)' : isHovering ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseEnter={() => !disabled && setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setIsPressed(false); }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={`w-5 h-5 transition-transform duration-200 ${isHovering ? '-translate-x-0.5' : ''}`} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className={`w-5 h-5 transition-transform duration-200 ${isHovering ? 'translate-x-0.5' : ''}`} />
      )}
    </span>
  );

  if (href && !disabled) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} disabled={disabled} type="button">
      {content}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GLASS PANEL - Generic container for content sections
// ═══════════════════════════════════════════════════════════════════════════

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function GlassPanel({
  children,
  className = '',
  elevated = false,
  padding = 'md',
  hover = false,
}: GlassPanelProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };

  return (
    <div
      className={`
        rounded-liquid-lg overflow-hidden
        ${elevated ? 'glass-surface-elevated' : 'glass-surface'}
        ${paddingClasses[padding]}
        ${hover ? 'transition-all duration-200 hover:shadow-glass-hover hover:scale-[1.01]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
