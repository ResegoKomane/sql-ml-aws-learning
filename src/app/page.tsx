'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Play, ChevronRight, Trophy, Clock, Target, Sparkles,
  Database, Code, Brain, Cloud, Server, Award, 
  Lock, CheckCircle2, Flame, Zap, Layout, Terminal, Cpu
} from 'lucide-react';
import { useStore, calculateLevel, formatTime, findNextLesson, getProgressStats } from '@/lib/store';
import { curriculum } from '@/data/curriculum';

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

export default function Dashboard() {
  const store = useStore();
  const { 
    userName, 
    totalXp, 
    streak, 
    completedLessons,
    unlockedPhases,
    totalTimeSpent, 
    achievements 
  } = store;
  
  const level = calculateLevel(totalXp);
  const progressStats = getProgressStats(store);
  const nextLessonInfo = findNextLesson(completedLessons, unlockedPhases);
  
  // Calculate phases completed
  const phasesCompleted = curriculum.filter(phase => {
    return phase.lessons.every(lesson => completedLessons.includes(lesson.id));
  }).length;

  return (
    <div className="min-h-screen bg-void-950">
      <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-void-800 via-void-900 to-void-800 border border-void-700 p-6 lg:p-8">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <p className="text-cyan-400 font-mono text-sm">
                  &gt; Welcome back{userName ? `, ${userName}` : ''}
                </p>
                <h1 className="text-3xl lg:text-4xl font-bold text-white">
                  Master Data & ML
                </h1>
                <p className="text-void-400 max-w-lg">
                  Your journey from database fundamentals to production ML systems. 
                  {progressStats.percentage > 0 && ` You're ${progressStats.percentage}% complete!`}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-void-700/50 backdrop-blur rounded-xl px-5 py-4 border border-void-600">
                  <p className="text-xs text-void-500 mb-1">Level</p>
                  <p className="text-3xl font-bold text-white">{level}</p>
                </div>
                <div className="bg-void-700/50 backdrop-blur rounded-xl px-5 py-4 border border-void-600">
                  <p className="text-xs text-void-500 mb-1">Streak</p>
                  <div className="flex items-center gap-1">
                    <p className="text-3xl font-bold text-orange-400">{streak}</p>
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <div className="bg-void-700/50 backdrop-blur rounded-xl px-5 py-4 border border-void-600">
                  <p className="text-xs text-void-500 mb-1">XP</p>
                  <div className="flex items-center gap-1">
                    <p className="text-3xl font-bold text-cyan-400">{totalXp.toLocaleString()}</p>
                    <Zap className="w-5 h-5 text-cyan-500" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Continue Learning Card */}
            {nextLessonInfo && (
              <div className="mt-8 bg-void-700/30 backdrop-blur rounded-xl border border-void-600 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: nextLessonInfo.phase.color }}
                  />
                  <span className="text-sm font-medium" style={{ color: nextLessonInfo.phase.color }}>
                    Phase {nextLessonInfo.phase.order}: {nextLessonInfo.phase.title}
                  </span>
                </div>
                
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {nextLessonInfo.lesson.title}
                    </h3>
                    <p className="text-void-400 text-sm line-clamp-2">
                      {nextLessonInfo.lesson.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-void-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {nextLessonInfo.lesson.duration}
                      </span>
                      <span 
                        className="capitalize px-2 py-0.5 rounded text-xs"
                        style={{ 
                          backgroundColor: `${nextLessonInfo.phase.color}20`,
                          color: nextLessonInfo.phase.color
                        }}
                      >
                        {nextLessonInfo.lesson.type}
                      </span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/learn/${nextLessonInfo.phase.id}/${nextLessonInfo.lesson.id}`}
                    className="flex items-center gap-2 justify-center whitespace-nowrap px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: nextLessonInfo.phase.color,
                      color: '#0a0a0f'
                    }}
                  >
                    <Play className="w-5 h-5" />
                    Continue Learning
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-void-800 rounded-xl p-5 border border-void-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-sm text-void-400">Completed</span>
            </div>
            <p className="text-2xl font-bold text-white">{progressStats.completed}</p>
            <p className="text-xs text-void-500">of {progressStats.total} lessons</p>
          </div>
          
          <div className="bg-void-800 rounded-xl p-5 border border-void-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-sm text-void-400">Phases Done</span>
            </div>
            <p className="text-2xl font-bold text-white">{phasesCompleted}</p>
            <p className="text-xs text-void-500">of {curriculum.length} phases</p>
          </div>
          
          <div className="bg-void-800 rounded-xl p-5 border border-void-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm text-void-400">Time Spent</span>
            </div>
            <p className="text-2xl font-bold text-white">{formatTime(totalTimeSpent)}</p>
            <p className="text-xs text-void-500">total learning</p>
          </div>
          
          <div className="bg-void-800 rounded-xl p-5 border border-void-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-sm text-void-400">Achievements</span>
            </div>
            <p className="text-2xl font-bold text-white">{achievements.length}</p>
            <p className="text-xs text-void-500">badges earned</p>
          </div>
        </section>

        {/* Learning Path */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Learning Path</h2>
            <Link 
              href="/curriculum"
              className="text-cyan-400 text-sm hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid gap-4">
            {curriculum.map((phase) => {
              const isUnlocked = unlockedPhases.includes(phase.id);
              const completedInPhase = phase.lessons.filter(l => 
                completedLessons.includes(l.id)
              ).length;
              const progressPercent = (completedInPhase / phase.lessons.length) * 100;
              const isComplete = progressPercent >= 100;
              const Icon = phaseIcons[phase.icon] || Database;
              
              return (
                <Link
                  key={phase.id}
                  href={isUnlocked ? `/learn/${phase.id}/${phase.lessons[0].id}` : '#'}
                  className={`
                    group relative overflow-hidden rounded-xl border p-5 transition-all duration-300
                    ${isUnlocked 
                      ? 'bg-void-800 border-void-700 hover:border-void-600' 
                      : 'bg-void-900 border-void-800 opacity-60 cursor-not-allowed'}
                  `}
                  onClick={e => !isUnlocked && e.preventDefault()}
                >
                  {/* Progress bar background */}
                  <div 
                    className="absolute inset-0 opacity-5 transition-all duration-500"
                    style={{ 
                      background: `linear-gradient(90deg, ${phase.color} ${progressPercent}%, transparent ${progressPercent}%)` 
                    }}
                  />
                  
                  <div className="relative z-10 flex items-center gap-5">
                    <div 
                      className={`
                        w-14 h-14 rounded-xl flex items-center justify-center transition-all
                        ${isComplete ? 'shadow-lg' : ''}
                      `}
                      style={{ 
                        backgroundColor: `${phase.color}15`,
                        boxShadow: isComplete ? `0 0 20px ${phase.color}30` : undefined
                      }}
                    >
                      {!isUnlocked ? (
                        <Lock className="w-6 h-6 text-void-500" />
                      ) : isComplete ? (
                        <CheckCircle2 className="w-7 h-7" style={{ color: phase.color }} />
                      ) : (
                        <Icon className="w-7 h-7" style={{ color: phase.color }} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className="text-xs font-mono px-2 py-0.5 rounded"
                          style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                        >
                          Phase {phase.order}
                        </span>
                        {phase.prerequisite && !isUnlocked && (
                          <span className="text-xs text-void-500">
                            Complete previous phase first
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-void-400 truncate">{phase.description}</p>
                    </div>
                    
                    <div className="hidden sm:block text-right">
                      <p className="text-sm font-medium text-white">
                        {completedInPhase} / {phase.lessons.length}
                      </p>
                      <p className="text-xs text-void-500">lessons</p>
                      
                      {/* Mini progress bar */}
                      <div className="mt-2 w-24 h-1.5 bg-void-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${progressPercent}%`,
                            backgroundColor: phase.color 
                          }}
                        />
                      </div>
                    </div>
                    
                    <ChevronRight 
                      className={`w-5 h-5 transition-transform ${isUnlocked ? 'group-hover:translate-x-1' : ''}`}
                      style={{ color: isUnlocked ? phase.color : undefined }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">Daily Challenge</h3>
                <p className="text-sm text-void-400 mb-4">
                  Complete a quick SQL challenge to earn bonus XP and maintain your streak!
                </p>
                <button className="px-4 py-2 text-sm rounded-lg border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                  Start Challenge
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">Practice Mode</h3>
                <p className="text-sm text-void-400 mb-4">
                  Sharpen your skills with unlimited practice problems from any phase.
                </p>
                <button className="px-4 py-2 text-sm rounded-lg border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 transition-colors">
                  Start Practice
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
