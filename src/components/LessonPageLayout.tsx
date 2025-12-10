'use client';

import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  HelpCircle, 
  Code,
  CheckCircle,
  Clock,
  Trophy
} from 'lucide-react';
import Link from 'next/link';
import { GlassPanel, LiquidButton } from './LiquidGlassCards';

/**
 * LessonPageLayout
 * 
 * Desktop-first responsive layout for lesson detail pages.
 * 
 * LAYOUT STRUCTURE:
 * ┌─────────────────────────────────────────────────┐
 * │  Header: Title + Progress + Navigation         │
 * ├────────────────────────┬────────────────────────┤
 * │                        │                        │
 * │   Theory Content       │   Quiz / Code Editor   │
 * │   (Main column)        │   (Side panel)         │
 * │                        │                        │
 * └────────────────────────┴────────────────────────┘
 * 
 * On mobile: Tabs switch between Theory and Practice
 */

interface LessonPageLayoutProps {
  // Lesson metadata
  lessonTitle: string;
  phaseTitle: string;
  phaseId: string;
  lessonNumber: number;
  totalLessons: number;
  estimatedTime?: string;
  xpReward?: number;
  
  // Navigation
  prevLessonId?: string;
  nextLessonId?: string;
  
  // Content slots
  theoryContent: React.ReactNode;
  practiceContent: React.ReactNode;
  
  // Progress
  progress?: number; // 0-100
  isCompleted?: boolean;
  
  // Callbacks
  onComplete?: () => void;
}

type ActiveTab = 'theory' | 'practice';

export default function LessonPageLayout({
  lessonTitle,
  phaseTitle,
  phaseId,
  lessonNumber,
  totalLessons,
  estimatedTime,
  xpReward,
  prevLessonId,
  nextLessonId,
  theoryContent,
  practiceContent,
  progress = 0,
  isCompleted = false,
  onComplete,
}: LessonPageLayoutProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('theory');

  return (
    <div className="min-h-screen">
      {/* 
        ═══════════════════════════════════════════════════════════════
        HEADER SECTION
        ═══════════════════════════════════════════════════════════════
      */}
      <header className="sticky top-0 z-40">
        <div className="glass-surface-elevated border-b border-edge">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 gap-4">
              
              {/* Back navigation */}
              <Link 
                href={`/learn/${phaseId}`}
                className="flex items-center gap-2 text-ink-secondary hover:text-ink transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline text-small">{phaseTitle}</span>
              </Link>

              {/* Title & Progress */}
              <div className="flex-1 text-center">
                <h1 className="font-display text-body font-medium text-ink truncate">
                  {lessonTitle}
                </h1>
                <div className="flex items-center justify-center gap-3 mt-0.5">
                  <span className="text-caption text-ink-muted">
                    Lesson {lessonNumber} of {totalLessons}
                  </span>
                  {estimatedTime && (
                    <span className="flex items-center gap-1 text-caption text-ink-muted">
                      <Clock className="w-3 h-3" />
                      {estimatedTime}
                    </span>
                  )}
                </div>
              </div>

              {/* Lesson navigation */}
              <div className="flex items-center gap-2">
                <Link
                  href={prevLessonId ? `/learn/${phaseId}/${prevLessonId}` : '#'}
                  className={`
                    w-8 h-8 rounded-pill flex items-center justify-center
                    transition-all duration-200
                    ${prevLessonId 
                      ? 'text-ink-secondary hover:text-ink hover:bg-glass-subtle' 
                      : 'text-ink-muted cursor-not-allowed opacity-40'
                    }
                  `}
                  aria-disabled={!prevLessonId}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Link>
                <Link
                  href={nextLessonId ? `/learn/${phaseId}/${nextLessonId}` : '#'}
                  className={`
                    w-8 h-8 rounded-pill flex items-center justify-center
                    transition-all duration-200
                    ${nextLessonId 
                      ? 'text-ink-secondary hover:text-ink hover:bg-glass-subtle' 
                      : 'text-ink-muted cursor-not-allowed opacity-40'
                    }
                  `}
                  aria-disabled={!nextLessonId}
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 -mx-4 sm:-mx-6 lg:-mx-8 bg-silver-light/30">
              <div 
                className="h-full bg-ink transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* 
        ═══════════════════════════════════════════════════════════════
        MOBILE TAB SWITCHER (hidden on desktop)
        ═══════════════════════════════════════════════════════════════
      */}
      <div className="lg:hidden sticky top-[65px] z-30 glass-surface border-b border-edge">
        <div className="flex">
          <button
            onClick={() => setActiveTab('theory')}
            className={`
              flex-1 flex items-center justify-center gap-2 py-3
              text-small font-medium transition-all duration-200
              ${activeTab === 'theory' 
                ? 'text-ink border-b-2 border-ink' 
                : 'text-ink-secondary'
              }
            `}
          >
            <BookOpen className="w-4 h-4" />
            Theory
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`
              flex-1 flex items-center justify-center gap-2 py-3
              text-small font-medium transition-all duration-200
              ${activeTab === 'practice' 
                ? 'text-ink border-b-2 border-ink' 
                : 'text-ink-secondary'
              }
            `}
          >
            <Code className="w-4 h-4" />
            Practice
          </button>
        </div>
      </div>

      {/* 
        ═══════════════════════════════════════════════════════════════
        MAIN CONTENT AREA
        ═══════════════════════════════════════════════════════════════
      */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* 
            LEFT COLUMN: Theory Content
            Desktop: Always visible, 7 columns
            Mobile: Visible only when 'theory' tab is active
          */}
          <div 
            className={`
              lg:col-span-7 
              ${activeTab === 'theory' ? 'block' : 'hidden lg:block'}
            `}
          >
            <GlassPanel elevated padding="lg" className="mb-6 lg:mb-0">
              {/* Section indicator */}
              <div className="flex items-center gap-2 mb-6 text-ink-secondary">
                <BookOpen className="w-5 h-5" />
                <span className="text-small font-medium">Theory</span>
              </div>

              {/* Theory content slot */}
              <div className="prose prose-slate max-w-none">
                {theoryContent}
              </div>
            </GlassPanel>
          </div>

          {/* 
            RIGHT COLUMN: Practice Content (Quiz / Code Editor)
            Desktop: Sticky sidebar, 5 columns
            Mobile: Visible only when 'practice' tab is active
          */}
          <div 
            className={`
              lg:col-span-5
              ${activeTab === 'practice' ? 'block' : 'hidden lg:block'}
            `}
          >
            <div className="lg:sticky lg:top-24">
              <GlassPanel elevated padding="lg">
                {/* Section indicator */}
                <div className="flex items-center gap-2 mb-6 text-ink-secondary">
                  <Code className="w-5 h-5" />
                  <span className="text-small font-medium">Practice</span>
                </div>

                {/* Practice content slot */}
                <div>
                  {practiceContent}
                </div>

                {/* Completion section */}
                <div className="mt-8 pt-6 border-t border-edge">
                  {isCompleted ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-mint">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Completed!</span>
                      </div>
                      {xpReward && (
                        <div className="flex items-center gap-1 text-gold">
                          <Trophy className="w-4 h-4" />
                          <span className="text-small font-medium">+{xpReward} XP</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="text-small text-ink-muted">
                        Complete practice to earn XP
                      </div>
                      {xpReward && (
                        <div className="flex items-center gap-1 text-ink-secondary">
                          <Trophy className="w-4 h-4" />
                          <span className="text-small">+{xpReward} XP</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </GlassPanel>

              {/* Navigation buttons */}
              <div className="flex gap-3 mt-6">
                {nextLessonId && (
                  <LiquidButton 
                    href={`/learn/${phaseId}/${nextLessonId}`}
                    variant="primary"
                    icon={ChevronRight}
                    fullWidth
                  >
                    Next Lesson
                  </LiquidButton>
                )}
                {!nextLessonId && isCompleted && (
                  <LiquidButton 
                    href={`/learn/${phaseId}`}
                    variant="primary"
                    icon={CheckCircle}
                    fullWidth
                  >
                    Finish Phase
                  </LiquidButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE USAGE
// ═══════════════════════════════════════════════════════════════════════════
/*
import LessonPageLayout from '@/components/LessonPageLayout';
import QuizComponent from '@/components/QuizComponent';

export default function LessonPage() {
  return (
    <LessonPageLayout
      lessonTitle="Introduction to SELECT Statements"
      phaseTitle="Phase 1: Database Fundamentals"
      phaseId="phase-1-database-fundamentals"
      lessonNumber={3}
      totalLessons={12}
      estimatedTime="15 min"
      xpReward={50}
      prevLessonId="lesson-1-2"
      nextLessonId="lesson-1-4"
      progress={25}
      theoryContent={
        <>
          <h2>Understanding SELECT</h2>
          <p>The SELECT statement is used to query data from a database...</p>
          <pre><code>SELECT column1, column2 FROM table_name;</code></pre>
        </>
      }
      practiceContent={
        <QuizComponent 
          questions={[...]} 
          onComplete={() => {...}}
        />
      }
    />
  );
}
*/
