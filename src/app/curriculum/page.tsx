'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Clock, CheckCircle2, Lock, ChevronRight, ChevronDown, BookOpen,
  Database, Code, Brain, Cloud, Award, Layout, Terminal, Cpu
} from 'lucide-react';
import { useStore, getProgressStats } from '@/lib/store';
import { curriculum, getCourseStats } from '@/data/curriculum';

const phaseIcons: Record<string, React.ElementType> = {
  Database,
  Code,
  Layout,
  Terminal,
  Brain,
  Cpu,
  Cloud,
  Server: Database,
  Award,
};

export default function CurriculumPage() {
  const { completedLessons, unlockedPhases } = useStore();
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(
    new Set([unlockedPhases[unlockedPhases.length - 1] || curriculum[0].id])
  );

  const courseStats = getCourseStats();
  
  // Calculate progress stats
  const totalCompleted = completedLessons.length;
  const progressPercent = Math.round((totalCompleted / courseStats.totalLessons) * 100);
  const phasesCompleted = curriculum.filter(phase => 
    phase.lessons.every(lesson => completedLessons.includes(lesson.id))
  ).length;
  
  // Calculate remaining hours
  const remainingHours = curriculum.reduce((acc, phase) => {
    const completedInPhase = phase.lessons.filter(l => completedLessons.includes(l.id)).length;
    const phasePercent = completedInPhase / phase.lessons.length;
    return acc + (phase.estimatedHours * (1 - phasePercent));
  }, 0);

  const togglePhase = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  return (
    <div className="min-h-screen bg-void-950 p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Curriculum
          </h1>
          <p className="text-void-400 max-w-2xl">
            Your complete learning journey from database fundamentals to professional mastery. 
            Complete each phase to unlock the next.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="mb-8 bg-void-800 rounded-xl border border-void-700 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-void-400 mb-1">Total Progress</p>
              <p className="text-3xl font-bold text-white">
                {progressPercent}%
              </p>
            </div>
            <div>
              <p className="text-sm text-void-400 mb-1">Phases Completed</p>
              <p className="text-3xl font-bold text-green-500">
                {phasesCompleted}
                <span className="text-lg text-void-500">/{courseStats.totalPhases}</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-void-400 mb-1">Lessons Completed</p>
              <p className="text-3xl font-bold text-cyan-400">
                {totalCompleted}
                <span className="text-lg text-void-500">/{courseStats.totalLessons}</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-void-400 mb-1">Est. Time Remaining</p>
              <p className="text-3xl font-bold text-purple-400">
                {Math.round(remainingHours)}h
              </p>
            </div>
          </div>
        </div>

        {/* Phase Cards */}
        <div className="space-y-4">
          {curriculum.map((phase) => {
            const isUnlocked = unlockedPhases.includes(phase.id);
            const completedInPhase = phase.lessons.filter(l => 
              completedLessons.includes(l.id)
            ).length;
            const phasePercent = (completedInPhase / phase.lessons.length) * 100;
            const isComplete = phasePercent >= 100;
            const isExpanded = expandedPhases.has(phase.id);
            const Icon = phaseIcons[phase.icon] || Database;
            
            // Find first incomplete lesson
            const nextLesson = phase.lessons.find(l => !completedLessons.includes(l.id));
            
            return (
              <div
                key={phase.id}
                className={`
                  relative rounded-xl border overflow-hidden transition-all duration-300
                  ${isUnlocked 
                    ? 'bg-void-800 border-void-700' 
                    : 'bg-void-900/50 border-void-800 opacity-60'}
                `}
              >
                {/* Progress bar */}
                <div 
                  className="absolute top-0 left-0 h-1 transition-all duration-500"
                  style={{ 
                    width: `${phasePercent}%`,
                    backgroundColor: phase.color 
                  }}
                />
                
                {/* Phase Header */}
                <button
                  onClick={() => isUnlocked && togglePhase(phase.id)}
                  className={`w-full p-5 text-left ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  disabled={!isUnlocked}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className={`
                        w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0
                        ${isUnlocked ? '' : 'opacity-50'}
                      `}
                      style={{ backgroundColor: `${phase.color}15` }}
                    >
                      {!isUnlocked ? (
                        <Lock className="w-7 h-7 text-void-500" />
                      ) : isComplete ? (
                        <CheckCircle2 className="w-7 h-7" style={{ color: phase.color }} />
                      ) : (
                        <Icon className="w-7 h-7" style={{ color: phase.color }} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span 
                          className="text-xs font-mono px-2 py-0.5 rounded"
                          style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                        >
                          Phase {phase.order}
                        </span>
                        {isComplete && (
                          <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">
                            Completed
                          </span>
                        )}
                        {isUnlocked && !isComplete && completedInPhase > 0 && (
                          <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400">
                            In Progress
                          </span>
                        )}
                      </div>
                      
                      <h2 className={`text-xl font-bold mb-1 ${isUnlocked ? 'text-white' : 'text-void-500'}`}>
                        {phase.title}
                      </h2>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-void-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {phase.estimatedHours}h
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {phase.lessons.length} lessons
                        </span>
                        <span>
                          {completedInPhase}/{phase.lessons.length} complete
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {isUnlocked && nextLesson && (
                        <Link
                          href={`/learn/${phase.id}/${nextLesson.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105"
                          style={{ 
                            backgroundColor: phase.color,
                            color: '#0a0a0f'
                          }}
                        >
                          {completedInPhase > 0 ? 'Continue' : 'Start'}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      )}
                      
                      {isUnlocked && (
                        <ChevronDown 
                          className={`w-5 h-5 text-void-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      )}
                    </div>
                  </div>
                </button>
                
                {/* Lesson List */}
                {isUnlocked && isExpanded && (
                  <div className="px-5 pb-5 border-t border-void-700">
                    <div className="pt-4 space-y-2">
                      {phase.lessons.map((lesson, idx) => {
                        const isLessonComplete = completedLessons.includes(lesson.id);
                        const prevComplete = idx === 0 || completedLessons.includes(phase.lessons[idx - 1].id);
                        const isAccessible = isUnlocked && prevComplete;
                        
                        return (
                          <Link
                            key={lesson.id}
                            href={isAccessible ? `/learn/${phase.id}/${lesson.id}` : '#'}
                            onClick={(e) => !isAccessible && e.preventDefault()}
                            className={`
                              flex items-center gap-4 p-4 rounded-lg transition-all
                              ${isAccessible 
                                ? isLessonComplete
                                  ? 'bg-void-700/30 hover:bg-void-700/50' 
                                  : 'bg-void-700/50 hover:bg-void-600/50'
                                : 'opacity-50 cursor-not-allowed bg-void-800/30'}
                            `}
                          >
                            <div 
                              className={`
                                w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                                ${isLessonComplete 
                                  ? 'bg-green-500/20' 
                                  : isAccessible 
                                    ? '' 
                                    : 'bg-void-700'}
                              `}
                              style={!isLessonComplete && isAccessible ? {
                                backgroundColor: `${phase.color}20`
                              } : {}}
                            >
                              {isLessonComplete ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : !isAccessible ? (
                                <Lock className="w-4 h-4 text-void-500" />
                              ) : (
                                <span 
                                  className="text-sm font-mono"
                                  style={{ color: phase.color }}
                                >
                                  {idx + 1}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-medium truncate ${
                                isLessonComplete ? 'text-void-300' : isAccessible ? 'text-white' : 'text-void-500'
                              }`}>
                                {lesson.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-void-500">
                                <span>{lesson.duration}</span>
                                <span 
                                  className="capitalize px-1.5 py-0.5 rounded"
                                  style={isAccessible ? {
                                    backgroundColor: `${phase.color}15`,
                                    color: phase.color
                                  } : { backgroundColor: 'rgb(30 30 40)' }}
                                >
                                  {lesson.type}
                                </span>
                              </div>
                            </div>
                            
                            {isAccessible && (
                              <ChevronRight className="w-5 h-5 text-void-500" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
