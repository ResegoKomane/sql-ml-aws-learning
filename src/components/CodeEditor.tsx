'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Play, 
  RotateCcw, 
  Lightbulb, 
  Eye, 
  EyeOff,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Zap,
  Target,
  ArrowRight,
  Info,
  Shield,
  TrendingUp,
  Database
} from 'lucide-react';
import { validateSQL, ValidationResult, ExecutionStep } from '@/lib/validators/sql';

// Compatible Exercise interface - works with existing curriculum.ts
export interface Exercise {
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  language: string;
  // Optional advanced fields
  testCases?: Array<{
    name: string;
    shouldContain?: string[];
    shouldNotContain?: string[];
    expectedColumns?: string[];
    weight?: number;
  }>;
  schema?: {
    tables: Array<{
      name: string;
      columns: Array<{ name: string; type: string; nullable?: boolean }>;
    }>;
  };
  requiredClauses?: string[];
  forbiddenPatterns?: string[];
  expectedTables?: string[];
  expectedColumns?: string[];
}

interface CodeEditorProps {
  exercise: Exercise;
  phaseColor: string;
  onComplete?: () => void;
  onClose: () => void;
}

export default function CodeEditor({
  exercise,
  phaseColor,
  onComplete,
  onClose
}: CodeEditorProps) {
  const [code, setCode] = useState(exercise.starterCode || '');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintLevel, setCurrentHintLevel] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showExecutionSteps, setShowExecutionSteps] = useState(false);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  // Reset hint level when exercise changes
  useEffect(() => {
    setCurrentHintLevel(0);
    setShowHints(false);
    setValidationResult(null);
    setCode(exercise.starterCode || '');
    setShowSolution(false);
    setHasCompleted(false);
  }, [exercise]);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setValidationResult(null);

    // Simulate processing delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Run the advanced validator
    const result = validateSQL(code, exercise);
    setValidationResult(result);

    // If valid and score is good, mark as completable
    if (result.isValid && result.score >= 70 && !hasCompleted) {
      setHasCompleted(true);
    }

    setIsRunning(false);
  }, [code, exercise, hasCompleted]);

  const handleReset = () => {
    setCode(exercise.starterCode || '');
    setValidationResult(null);
    setShowSolution(false);
    setCurrentHintLevel(0);
    setShowHints(false);
    setHasCompleted(false);
  };

  const handleShowNextHint = () => {
    if (!validationResult) {
      // Run validation first to get proper hints
      handleRun();
    }
    setShowHints(true);
    if (currentHintLevel < 3) {
      setCurrentHintLevel(prev => prev + 1);
    }
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseSolution = () => {
    if (showSolution) {
      setShowSolution(false);
    } else {
      setCode(exercise.solution);
      setShowSolution(true);
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
    onClose();
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/20 border-green-500/30';
    if (score >= 70) return 'bg-yellow-500/20 border-yellow-500/30';
    if (score >= 50) return 'bg-orange-500/20 border-orange-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-void-700 text-void-300 border-void-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return TrendingUp;
      case 'security': return Shield;
      case 'correctness': return Target;
      case 'data-integrity': return Database;
      default: return Info;
    }
  };

  return (
    <div className="space-y-4">
      {/* Exercise Description */}
      <div className="p-4 bg-void-800/50 rounded-lg border border-void-700">
        <h4 className="font-semibold text-white mb-2">{exercise.title}</h4>
        <p className="text-void-300 text-sm">{exercise.description}</p>
      </div>

      {/* Code Editor */}
      <div className="rounded-lg border border-void-700 overflow-hidden bg-void-950">
        {/* Editor Header */}
        <div className="px-4 py-2 bg-void-900 border-b border-void-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs text-void-500 ml-2">
              {exercise.language || 'sql'}
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            className="text-void-500 hover:text-white transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Text Area for Code */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 bg-void-950 text-green-400 font-mono text-sm resize-none focus:outline-none"
          placeholder="Write your SQL query here..."
          spellCheck={false}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning || !code.trim()}
            className="px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 disabled:opacity-50"
            style={{ 
              backgroundColor: phaseColor,
              color: '#0a0a0f'
            }}
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Validating...' : 'Run Query'}
          </button>
          
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-void-800 text-void-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShowNextHint}
            className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors flex items-center gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            Hint {currentHintLevel > 0 ? `(${currentHintLevel}/4)` : ''}
          </button>
          
          <button
            onClick={handleUseSolution}
            className="px-4 py-2 rounded-lg bg-void-800 text-void-300 hover:text-white transition-colors flex items-center gap-2"
          >
            {showSolution ? (
              <>
                <EyeOff className="w-4 h-4" />
                Hide Solution
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Show Solution
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hints Section - Progressive reveal */}
      {showHints && validationResult && currentHintLevel > 0 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-amber-400">
                  Hint Level {currentHintLevel} of 4
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`w-2 h-2 rounded-full ${
                        level <= currentHintLevel ? 'bg-amber-500' : 'bg-void-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {validationResult.hints.slice(0, currentHintLevel).map((hint, idx) => (
                  <p key={idx} className={`text-sm ${idx === currentHintLevel - 1 ? 'text-amber-300' : 'text-void-400'}`}>
                    <span className="font-medium text-amber-500">Level {idx + 1}:</span> {hint}
                  </p>
                ))}
              </div>
              {currentHintLevel < 4 && (
                <button
                  onClick={handleShowNextHint}
                  className="mt-3 text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1"
                >
                  Need more help? <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Validation Results */}
      {validationResult && (
        <div className="space-y-4">
          {/* Score Display */}
          <div className={`p-4 rounded-lg border ${getScoreBgColor(validationResult.score)}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {validationResult.isValid ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
                <div>
                  <p className={`text-lg font-bold ${getScoreColor(validationResult.score)}`}>
                    Score: {validationResult.score}/100
                  </p>
                  <p className="text-xs text-void-400">
                    {validationResult.isValid ? 'Query validated successfully!' : 'Query needs improvement'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(validationResult.score)}`}>
                  {validationResult.score >= 90 ? 'A' :
                   validationResult.score >= 80 ? 'B' :
                   validationResult.score >= 70 ? 'C' :
                   validationResult.score >= 60 ? 'D' : 'F'}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-void-700 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${validationResult.score}%`,
                  backgroundColor: validationResult.score >= 70 ? '#22c55e' : 
                                   validationResult.score >= 50 ? '#eab308' : '#ef4444'
                }}
              />
            </div>
          </div>

          {/* Issue & Real-world Impact */}
          {validationResult.issue && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-400 mb-1">Issue Detected</p>
                  <p className="text-sm text-void-300 mb-3">{validationResult.issue}</p>
                  
                  {validationResult.realWorldImpact && (
                    <div className="p-3 bg-void-800/50 rounded-lg border-l-2 border-red-500">
                      <p className="text-xs text-void-500 mb-1">⚠️ Real-World Impact</p>
                      <p className="text-sm text-void-300">{validationResult.realWorldImpact}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Common Mistake Details */}
          {validationResult.commonMistakeDetected && (
            <div className={`p-4 rounded-lg border ${getSeverityColor(validationResult.commonMistakeDetected.severity)}`}>
              <div className="flex items-start gap-3">
                {(() => {
                  const IconComponent = getCategoryIcon(validationResult.commonMistakeDetected.category);
                  return <IconComponent className="w-5 h-5 flex-shrink-0 mt-0.5" />;
                })()}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium">{validationResult.commonMistakeDetected.name}</p>
                    <span className={`px-2 py-0.5 text-xs rounded-full uppercase ${getSeverityColor(validationResult.commonMistakeDetected.severity)}`}>
                      {validationResult.commonMistakeDetected.severity}
                    </span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-void-700 text-void-300">
                      {validationResult.commonMistakeDetected.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-void-300 mb-3">
                    {validationResult.commonMistakeDetected.correction}
                  </p>

                  {/* Example code comparison */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                      <p className="text-xs text-red-400 mb-1">❌ Avoid</p>
                      <code className="text-xs text-void-300 font-mono break-all">
                        {validationResult.commonMistakeDetected.example.wrong.substring(0, 80)}...
                      </code>
                    </div>
                    <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
                      <p className="text-xs text-green-400 mb-1">✓ Better</p>
                      <code className="text-xs text-void-300 font-mono break-all">
                        {validationResult.commonMistakeDetected.example.right.substring(0, 80)}...
                      </code>
                    </div>
                  </div>

                  <p className="text-xs text-void-500 mt-3">
                    💡 <strong>Prevention:</strong> {validationResult.commonMistakeDetected.prevention}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Execution Steps Visualization */}
          {validationResult.executionSteps && validationResult.executionSteps.length > 0 && (
            <div className="border border-void-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setShowExecutionSteps(!showExecutionSteps)}
                className="w-full px-4 py-3 bg-void-800/50 flex items-center justify-between hover:bg-void-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: phaseColor }} />
                  <span className="text-sm font-medium text-white">Query Execution Order</span>
                </div>
                {showExecutionSteps ? (
                  <ChevronDown className="w-4 h-4 text-void-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-void-400" />
                )}
              </button>
              
              {showExecutionSteps && (
                <div className="p-4 space-y-3">
                  {validationResult.executionSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: `${phaseColor}30`, color: phaseColor }}
                      >
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold" style={{ color: phaseColor }}>
                            {step.operation}
                          </span>
                        </div>
                        <p className="text-xs text-void-400">{step.description}</p>
                        {step.clause && (
                          <code className="text-xs text-void-500 font-mono mt-1 block">
                            {step.clause.substring(0, 60)}{step.clause.length > 60 ? '...' : ''}
                          </code>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Next Steps */}
          {validationResult.nextSteps && validationResult.nextSteps.length > 0 && (
            <div className="border border-void-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setShowNextSteps(!showNextSteps)}
                className="w-full px-4 py-3 bg-void-800/50 flex items-center justify-between hover:bg-void-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" style={{ color: phaseColor }} />
                  <span className="text-sm font-medium text-white">Next Steps</span>
                </div>
                {showNextSteps ? (
                  <ChevronDown className="w-4 h-4 text-void-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-void-400" />
                )}
              </button>
              
              {showNextSteps && (
                <div className="p-4">
                  <ul className="space-y-2">
                    {validationResult.nextSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-void-300">
                        <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: phaseColor }} />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Test Results (if available) */}
          {validationResult.testResults && validationResult.testResults.length > 0 && (
            <div className="p-4 bg-void-800/30 rounded-lg border border-void-700">
              <p className="text-sm font-medium text-void-300 mb-3">Test Results</p>
              <div className="space-y-2">
                {validationResult.testResults.map((test, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {test.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${test.passed ? 'text-green-400' : 'text-red-400'}`}>
                      {test.name}
                    </span>
                    {!test.passed && (
                      <span className="text-xs text-void-500">- {test.message}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Solution Display */}
      {showSolution && (
        <div className="rounded-lg border border-void-700 overflow-hidden bg-void-950">
          <div className="px-4 py-2 bg-void-900 border-b border-void-700">
            <span className="text-xs text-void-500">Solution</span>
          </div>
          <pre className="p-4 text-sm font-mono text-blue-400 overflow-x-auto">
            {exercise.solution}
          </pre>
        </div>
      )}

      {/* Complete Button */}
      {hasCompleted && validationResult?.isValid && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleComplete}
            className="px-6 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2"
            style={{ 
              backgroundColor: phaseColor,
              color: '#0a0a0f'
            }}
          >
            <CheckCircle2 className="w-5 h-5" />
            Complete Exercise
          </button>
        </div>
      )}
    </div>
  );
}
