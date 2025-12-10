'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Target,
  BookOpen,
  Code,
  Trophy,
  ChevronDown,
  ChevronUp,
  Play,
  RotateCcw,
  Lightbulb,
  AlertCircle,
  Sparkles,
  Lock
} from 'lucide-react';
import { curriculum, Phase, Lesson } from '@/data/curriculum';
import { useStore } from '@/lib/store';
import CodeEditor from '@/components/CodeEditor';
import QuizComponent from '@/components/QuizComponent';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const phaseId = params.phaseId as string;
  const lessonId = params.lessonId as string;

  const { 
    completedLessons, 
    unlockedPhases, 
    completeLesson, 
    addXP,
    updateTimeSpent,
    quizScores
  } = useStore();

  const [activeSection, setActiveSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [lessonStartTime] = useState(Date.now());
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));

  // Find current phase and lesson
  const phase = curriculum.find(p => p.id === phaseId);
  const lesson = phase?.lessons.find(l => l.id === lessonId);
  const lessonIndex = phase?.lessons.findIndex(l => l.id === lessonId) ?? -1;
  const phaseIndex = curriculum.findIndex(p => p.id === phaseId);

  // Check if lesson is accessible
  const isPhaseUnlocked = unlockedPhases.includes(phaseId);
  const previousLessonsComplete = phase?.lessons
    .slice(0, lessonIndex)
    .every(l => completedLessons.includes(l.id)) ?? true;
  const isAccessible = isPhaseUnlocked && previousLessonsComplete;
  const isCompleted = completedLessons.includes(lessonId);

  // Navigation
  const prevLesson = lessonIndex > 0 ? phase?.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < (phase?.lessons.length ?? 0) - 1 
    ? phase?.lessons[lessonIndex + 1] 
    : null;
  const nextPhase = phaseIndex < curriculum.length - 1 
    ? curriculum[phaseIndex + 1] 
    : null;

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      updateTimeSpent(Math.floor((Date.now() - lessonStartTime) / 1000 / 60));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [lessonStartTime, updateTimeSpent]);

  if (!phase || !lesson) {
    return (
      <div className="min-h-screen bg-void-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Lesson Not Found</h1>
          <p className="text-void-400 mb-6">This lesson doesn't exist or has been moved.</p>
          <Link 
            href="/curriculum"
            className="px-6 py-3 bg-neon-cyan/20 text-neon-cyan rounded-lg hover:bg-neon-cyan/30 transition-colors"
          >
            Back to Curriculum
          </Link>
        </div>
      </div>
    );
  }

  if (!isAccessible) {
    return (
      <div className="min-h-screen bg-void-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Lock className="w-16 h-16 text-void-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Lesson Locked</h1>
          <p className="text-void-400 mb-6">
            Complete the previous lessons to unlock this content.
          </p>
          <Link 
            href="/curriculum"
            className="px-6 py-3 bg-neon-cyan/20 text-neon-cyan rounded-lg hover:bg-neon-cyan/30 transition-colors"
          >
            View Learning Path
          </Link>
        </div>
      </div>
    );
  }

  const phaseColor = phase.color;

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const handleCompleteLesson = () => {
    if (!isCompleted) {
      completeLesson(lessonId);
      const xpGain = lesson.type === 'capstone' ? 500 : 100;
      addXP(xpGain);
    }
  };

  const handleQuizComplete = (score: number) => {
    const bonusXP = Math.floor(score * 0.5);
    addXP(bonusXP);
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen bg-void-950">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-void-900/95 backdrop-blur-sm border-b border-void-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/curriculum"
                className="p-2 text-void-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <p className="text-xs text-void-500 uppercase tracking-wider">
                  Phase {phase.order}: {phase.title}
                </p>
                <h1 className="text-lg font-semibold text-white">{lesson.title}</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-void-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{lesson.duration}</span>
              </div>
              {isCompleted && (
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Lesson Header */}
            <div 
              className="p-6 rounded-xl border border-void-800 bg-void-900/50"
              style={{ borderColor: `${phaseColor}30` }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${phaseColor}20` }}
                >
                  {lesson.type === 'theory' && <BookOpen className="w-6 h-6" style={{ color: phaseColor }} />}
                  {lesson.type === 'lab' && <Code className="w-6 h-6" style={{ color: phaseColor }} />}
                  {lesson.type === 'capstone' && <Trophy className="w-6 h-6" style={{ color: phaseColor }} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="px-2 py-0.5 text-xs font-medium rounded uppercase"
                      style={{ 
                        backgroundColor: `${phaseColor}20`,
                        color: phaseColor
                      }}
                    >
                      {lesson.type}
                    </span>
                    <span className="text-void-500 text-sm">
                      Lesson {lessonIndex + 1} of {phase.lessons.length}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">{lesson.title}</h2>
                  <p className="text-void-400">{lesson.description}</p>
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            {lesson.objectives && lesson.objectives.length > 0 && (
              <div className="p-6 rounded-xl border border-void-800 bg-void-900/50">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5" style={{ color: phaseColor }} />
                  <h3 className="text-lg font-semibold text-white">Learning Objectives</h3>
                </div>
                <ul className="space-y-3">
                  {lesson.objectives.map((objective, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-void-600 mt-0.5 flex-shrink-0" />
                      <span className="text-void-300">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content Sections */}
            {lesson.content && lesson.content.length > 0 && (
              <div className="space-y-4">
                {lesson.content.map((section, idx) => (
                  <div 
                    key={idx}
                    className="rounded-xl border border-void-800 bg-void-900/50 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSection(idx)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-void-800/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                          style={{ 
                            backgroundColor: `${phaseColor}20`,
                            color: phaseColor
                          }}
                        >
                          {idx + 1}
                        </span>
                        <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                      </div>
                      {expandedSections.has(idx) ? (
                        <ChevronUp className="w-5 h-5 text-void-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-void-500" />
                      )}
                    </button>
                    
                    {expandedSections.has(idx) && (
                      <div className="px-4 pb-6 pt-2">
                        <div className="prose prose-invert max-w-none">
                          <div 
                            className="text-void-300 leading-relaxed whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: formatContent(section.content) }}
                          />
                        </div>

                        {/* Code Example */}
                        {section.codeExample && (
                          <div className="mt-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Code className="w-4 h-4" style={{ color: phaseColor }} />
                              <span className="text-sm font-medium text-void-400">Example Code</span>
                            </div>
                            <div className="bg-void-950 rounded-lg border border-void-800 overflow-hidden">
                              <div className="px-4 py-2 bg-void-900 border-b border-void-800 flex items-center justify-between">
                                <span className="text-xs text-void-500 font-mono">
                                  {section.codeExample.language || 'sql'}
                                </span>
                                <button
                                  onClick={() => navigator.clipboard.writeText(section.codeExample!.code)}
                                  className="text-xs text-void-500 hover:text-white transition-colors"
                                >
                                  Copy
                                </button>
                              </div>
                              <pre className="p-4 overflow-x-auto">
                                <code className="text-sm font-mono text-green-400">
                                  {section.codeExample.code}
                                </code>
                              </pre>
                            </div>
                          </div>
                        )}

                        {/* Tips */}
                        {section.tip && (
                          <div 
                            className="mt-6 p-4 rounded-lg border"
                            style={{ 
                              backgroundColor: `${phaseColor}10`,
                              borderColor: `${phaseColor}30`
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <Lightbulb className="w-5 h-5 flex-shrink-0" style={{ color: phaseColor }} />
                              <div>
                                <p className="font-medium text-white mb-1">Pro Tip</p>
                                <p className="text-sm text-void-300">{section.tip}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Warnings */}
                        {section.warning && (
                          <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                              <div>
                                <p className="font-medium text-red-400 mb-1">Warning</p>
                                <p className="text-sm text-void-300">{section.warning}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quiz Section */}
            {lesson.quiz && lesson.quiz.length > 0 && (
              <div className="p-6 rounded-xl border border-void-800 bg-void-900/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" style={{ color: phaseColor }} />
                    <h3 className="text-lg font-semibold text-white">Knowledge Check</h3>
                  </div>
                  {quizScores[lessonId] !== undefined && (
                    <span className="text-sm text-void-400">
                      Best Score: {quizScores[lessonId]}%
                    </span>
                  )}
                </div>
                
                {!showQuiz ? (
                  <div className="text-center py-8">
                    <p className="text-void-400 mb-4">
                      Test your understanding with {lesson.quiz.length} questions
                    </p>
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="px-6 py-3 rounded-lg font-medium transition-colors"
                      style={{ 
                        backgroundColor: `${phaseColor}20`,
                        color: phaseColor
                      }}
                    >
                      Start Quiz
                    </button>
                  </div>
                ) : (
                  <QuizComponent
                    questions={lesson.quiz}
                    lessonId={lessonId}
                    phaseColor={phaseColor}
                    onComplete={handleQuizComplete}
                    onClose={() => setShowQuiz(false)}
                  />
                )}
              </div>
            )}

            {/* Code Exercise Section */}
            {lesson.exercise && (
              <div className="p-6 rounded-xl border border-void-800 bg-void-900/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5" style={{ color: phaseColor }} />
                    <h3 className="text-lg font-semibold text-white">Hands-on Exercise</h3>
                  </div>
                </div>
                
                {!showExercise ? (
                  <div className="text-center py-8">
                    <p className="text-void-400 mb-4">
                      Practice what you've learned with a coding exercise
                    </p>
                    <button
                      onClick={() => setShowExercise(true)}
                      className="px-6 py-3 rounded-lg font-medium transition-colors"
                      style={{ 
                        backgroundColor: `${phaseColor}20`,
                        color: phaseColor
                      }}
                    >
                      <Play className="w-4 h-4 inline mr-2" />
                      Start Exercise
                    </button>
                  </div>
                ) : (
                  <CodeEditor
                    exercise={lesson.exercise}
                    phaseColor={phaseColor}
                    onClose={() => setShowExercise(false)}
                  />
                )}
              </div>
            )}

            {/* Completion Section */}
            <div className="p-6 rounded-xl border border-void-800 bg-void-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {isCompleted ? 'Lesson Completed!' : 'Ready to Continue?'}
                  </h3>
                  <p className="text-void-400 text-sm">
                    {isCompleted 
                      ? `You earned ${lesson.type === 'capstone' ? 500 : 100} XP for this lesson`
                      : 'Mark this lesson as complete to earn XP and unlock the next lesson'}
                  </p>
                </div>
                
                {!isCompleted && (
                  <button
                    onClick={handleCompleteLesson}
                    className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: phaseColor,
                      color: '#0a0a0f'
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 inline mr-2" />
                    Mark Complete
                  </button>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              {prevLesson ? (
                <Link
                  href={`/learn/${phaseId}/${prevLesson.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-void-800/50 text-void-300 hover:text-white hover:bg-void-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Previous: {prevLesson.title}</span>
                </Link>
              ) : (
                <div />
              )}
              
              {nextLesson ? (
                <Link
                  href={`/learn/${phaseId}/${nextLesson.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors"
                  style={{ backgroundColor: `${phaseColor}20` }}
                >
                  <span className="text-sm">Next: {nextLesson.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : nextPhase ? (
                <Link
                  href={`/learn/${nextPhase.id}/${nextPhase.lessons[0]?.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors"
                  style={{ backgroundColor: `${phaseColor}20` }}
                >
                  <span className="text-sm">Start Phase {nextPhase.order}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-400">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm">Course Complete!</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Progress Card */}
              <div className="p-4 rounded-xl border border-void-800 bg-void-900/50">
                <h4 className="font-semibold text-white mb-3">Phase Progress</h4>
                <div className="space-y-2">
                  {phase.lessons.map((l, idx) => {
                    const isLessonComplete = completedLessons.includes(l.id);
                    const isCurrent = l.id === lessonId;
                    
                    return (
                      <Link
                        key={l.id}
                        href={`/learn/${phaseId}/${l.id}`}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                          isCurrent 
                            ? 'bg-void-800' 
                            : 'hover:bg-void-800/50'
                        }`}
                      >
                        <div 
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            isLessonComplete
                              ? 'bg-green-500 text-white'
                              : isCurrent
                                ? ''
                                : 'bg-void-800 text-void-500'
                          }`}
                          style={isCurrent && !isLessonComplete ? {
                            backgroundColor: `${phaseColor}20`,
                            color: phaseColor
                          } : {}}
                        >
                          {isLessonComplete ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <span className={`text-sm ${
                          isCurrent ? 'text-white' : 'text-void-400'
                        }`}>
                          {l.title.length > 20 ? l.title.slice(0, 20) + '...' : l.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-4 rounded-xl border border-void-800 bg-void-900/50">
                <h4 className="font-semibold text-white mb-3">Lesson Info</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-void-500">Duration</span>
                    <span className="text-void-300">{lesson.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-void-500">Type</span>
                    <span className="text-void-300 capitalize">{lesson.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-void-500">XP Reward</span>
                    <span style={{ color: phaseColor }}>
                      +{lesson.type === 'capstone' ? 500 : 100} XP
                    </span>
                  </div>
                  {lesson.quiz && (
                    <div className="flex justify-between">
                      <span className="text-void-500">Quiz Questions</span>
                      <span className="text-void-300">{lesson.quiz.length}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to format content with basic markdown-like formatting
function formatContent(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-void-800 rounded text-neon-cyan text-sm font-mono">$1</code>')
    .replace(/\n\n/g, '</p><p class="mt-4">')
    .replace(/\n/g, '<br />');
}
