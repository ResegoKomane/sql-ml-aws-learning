import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { curriculum } from '@/data/curriculum';

export interface UserState {
  // User info
  userName: string;
  userEmail: string;
  avatarUrl?: string;
  joinedAt: string;
  
  // Progress tracking
  completedLessons: string[];
  unlockedPhases: string[];
  quizScores: Record<string, number>;
  currentPhaseId: string;
  currentLessonId: string;
  
  // Stats
  totalXp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  totalTimeSpent: number;
  
  // Achievements
  achievements: string[];
  
  // Settings
  darkMode: boolean;
  soundEnabled: boolean;
  
  // Actions
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
  completeLesson: (lessonId: string) => void;
  setCurrentLesson: (phaseId: string, lessonId: string) => void;
  unlockPhase: (phaseId: string) => void;
  addXP: (amount: number) => void;
  saveQuizScore: (lessonId: string, score: number) => void;
  updateStreak: () => void;
  updateTimeSpent: (minutes: number) => void;
  addAchievement: (achievement: string) => void;
  toggleDarkMode: () => void;
  toggleSound: () => void;
  resetProgress: () => void;
}

// Get first phase ID from curriculum
const firstPhaseId = curriculum[0]?.id || 'phase-1-database-fundamentals';
const firstLessonId = curriculum[0]?.lessons[0]?.id || 'lesson-1-1-what-is-database';

export const useStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      userName: '',
      userEmail: '',
      joinedAt: new Date().toISOString(),
      
      // Progress - Phase 1 unlocked by default
      completedLessons: [],
      unlockedPhases: [firstPhaseId],
      quizScores: {},
      currentPhaseId: firstPhaseId,
      currentLessonId: firstLessonId,
      
      // Stats
      totalXp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalTimeSpent: 0,
      
      // Achievements
      achievements: [],
      
      // Settings
      darkMode: true,
      soundEnabled: true,

      // Actions
      setUserName: (name) => set({ userName: name }),
      
      setUserEmail: (email) => set({ userEmail: email }),
      
      setCurrentLesson: (phaseId, lessonId) => set({ 
        currentPhaseId: phaseId,
        currentLessonId: lessonId 
      }),
      
      completeLesson: (lessonId) => {
        const state = get();
        
        // Don't add if already completed
        if (state.completedLessons.includes(lessonId)) {
          return;
        }
        
        const newCompletedLessons = [...state.completedLessons, lessonId];
        
        // Find which phase this lesson belongs to
        let currentPhase = null;
        let phaseIndex = -1;
        
        for (let i = 0; i < curriculum.length; i++) {
          const idx = curriculum[i].lessons.findIndex(l => l.id === lessonId);
          if (idx !== -1) {
            currentPhase = curriculum[i];
            phaseIndex = i;
            break;
          }
        }
        
        let newUnlockedPhases = [...state.unlockedPhases];
        
        // Check if all lessons in current phase are completed
        if (currentPhase) {
          const allPhaseComplete = currentPhase.lessons.every(
            l => newCompletedLessons.includes(l.id)
          );
          
          // If phase is complete and there's a next phase, unlock it
          if (allPhaseComplete && phaseIndex < curriculum.length - 1) {
            const nextPhaseId = curriculum[phaseIndex + 1].id;
            if (!newUnlockedPhases.includes(nextPhaseId)) {
              newUnlockedPhases.push(nextPhaseId);
            }
          }
        }
        
        // Update streak
        const today = new Date().toISOString().split('T')[0];
        let newStreak = state.streak;
        let newLastActive = state.lastActiveDate;
        
        if (state.lastActiveDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          if (state.lastActiveDate === yesterday) {
            newStreak = state.streak + 1;
          } else {
            newStreak = 1;
          }
          newLastActive = today;
        }
        
        // Calculate new level (every 1000 XP)
        const newLevel = Math.floor(state.totalXp / 1000) + 1;
        
        set({
          completedLessons: newCompletedLessons,
          unlockedPhases: newUnlockedPhases,
          streak: newStreak,
          lastActiveDate: newLastActive,
          level: newLevel,
        });
      },
      
      unlockPhase: (phaseId) => {
        const state = get();
        if (!state.unlockedPhases.includes(phaseId)) {
          set({ unlockedPhases: [...state.unlockedPhases, phaseId] });
        }
      },
      
      addXP: (amount) => {
        const state = get();
        const newXp = state.totalXp + amount;
        const newLevel = Math.floor(newXp / 1000) + 1;
        set({ totalXp: newXp, level: newLevel });
      },
      
      saveQuizScore: (lessonId, score) => {
        const state = get();
        const currentBest = state.quizScores[lessonId] || 0;
        if (score > currentBest) {
          set({
            quizScores: {
              ...state.quizScores,
              [lessonId]: score
            }
          });
        }
      },
      
      updateStreak: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        if (state.lastActiveDate === today) {
          return;
        } else if (state.lastActiveDate === yesterday) {
          set({ streak: state.streak + 1, lastActiveDate: today });
        } else {
          set({ streak: 1, lastActiveDate: today });
        }
      },
      
      updateTimeSpent: (minutes) => {
        const state = get();
        set({ totalTimeSpent: state.totalTimeSpent + minutes });
      },
      
      addAchievement: (achievement) => {
        const state = get();
        if (!state.achievements.includes(achievement)) {
          set({ achievements: [...state.achievements, achievement] });
        }
      },
      
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      
      resetProgress: () => set({
        completedLessons: [],
        unlockedPhases: [firstPhaseId],
        quizScores: {},
        currentPhaseId: firstPhaseId,
        currentLessonId: firstLessonId,
        totalXp: 0,
        level: 1,
        streak: 0,
        achievements: [],
        totalTimeSpent: 0,
      }),
    }),
    {
      name: 'mastery-path-storage',
    }
  )
);

// Utility functions
export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 1000) + 1;
};

export const xpToNextLevel = (xp: number): { current: number; needed: number; percentage: number } => {
  const currentLevelXp = xp % 1000;
  return { 
    current: currentLevelXp, 
    needed: 1000,
    percentage: (currentLevelXp / 1000) * 100
  };
};

export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

// Helper to get progress stats
export const getProgressStats = (state: UserState) => {
  const totalLessons = curriculum.reduce((sum, phase) => sum + phase.lessons.length, 0);
  const completedCount = state.completedLessons.length;
  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  
  return {
    completed: completedCount,
    total: totalLessons,
    percentage
  };
};

// Helper to find current/next lesson
export const findNextLesson = (completedLessons: string[], unlockedPhases: string[]) => {
  for (const phase of curriculum) {
    if (!unlockedPhases.includes(phase.id)) continue;
    
    for (const lesson of phase.lessons) {
      if (!completedLessons.includes(lesson.id)) {
        return { phase, lesson };
      }
    }
  }
  
  // All completed - return last lesson
  const lastPhase = curriculum[curriculum.length - 1];
  return {
    phase: lastPhase,
    lesson: lastPhase.lessons[lastPhase.lessons.length - 1]
  };
};
