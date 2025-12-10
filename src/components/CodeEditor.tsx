'use client';

import { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Lightbulb, 
  Eye, 
  EyeOff,
  CheckCircle2,
  XCircle,
  Copy,
  Check
} from 'lucide-react';
import { Exercise } from '@/data/curriculum';

interface CodeEditorProps {
  exercise: Exercise;
  phaseColor: string;
  onClose: () => void;
}

export default function CodeEditor({
  exercise,
  phaseColor,
  onClose
}: CodeEditorProps) {
  const [code, setCode] = useState(exercise.starterCode || '');
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);
    setIsCorrect(null);

    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple validation - check if the code contains key elements from the solution
    const normalizedCode = code.toLowerCase().replace(/\s+/g, ' ').trim();
    const normalizedSolution = exercise.solution.toLowerCase().replace(/\s+/g, ' ').trim();
    
    // Extract key SQL keywords and table names from solution
    const keyElements = extractKeyElements(exercise.solution);
    const matchCount = keyElements.filter(element => 
      normalizedCode.includes(element.toLowerCase())
    ).length;
    
    const matchPercentage = matchCount / keyElements.length;
    
    if (matchPercentage >= 0.7) {
      setIsCorrect(true);
      setOutput(generateSuccessOutput(exercise));
    } else {
      setIsCorrect(false);
      setOutput(generateErrorOutput(matchPercentage, keyElements, normalizedCode));
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    setCode(exercise.starterCode || '');
    setOutput(null);
    setIsCorrect(null);
    setShowSolution(false);
  };

  const handleShowNextHint = () => {
    if (exercise.hints && currentHint < exercise.hints.length - 1) {
      setCurrentHint(prev => prev + 1);
    }
    setShowHints(true);
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseSolution = () => {
    setCode(exercise.solution);
    setShowSolution(true);
  };

  return (
    <div className="space-y-4">
      {/* Exercise Description */}
      <div className="p-4 bg-void-800/50 rounded-lg">
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
          placeholder="Write your code here..."
          spellCheck={false}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
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
            {isRunning ? 'Running...' : 'Run Code'}
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
          {exercise.hints && exercise.hints.length > 0 && (
            <button
              onClick={handleShowNextHint}
              className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Hint ({currentHint + 1}/{exercise.hints.length})
            </button>
          )}
          
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

      {/* Hints */}
      {showHints && exercise.hints && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-400 mb-1">
                Hint {currentHint + 1}
              </p>
              <p className="text-sm text-void-300">
                {exercise.hints[currentHint]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Output */}
      {output && (
        <div 
          className={`p-4 rounded-lg border ${
            isCorrect 
              ? 'bg-green-500/10 border-green-500/30' 
              : 'bg-red-500/10 border-red-500/30'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-medium mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Success!' : 'Not quite right'}
              </p>
              <pre className="text-sm text-void-300 font-mono whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          </div>
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
      {isCorrect && (
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium transition-colors"
            style={{ 
              backgroundColor: phaseColor,
              color: '#0a0a0f'
            }}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

// Helper functions for code validation
function extractKeyElements(solution: string): string[] {
  const sqlKeywords = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER',
    'GROUP BY', 'ORDER BY', 'HAVING', 'INSERT', 'UPDATE', 'DELETE',
    'CREATE', 'TABLE', 'INDEX', 'DROP', 'ALTER', 'AND', 'OR', 'NOT',
    'IN', 'BETWEEN', 'LIKE', 'IS NULL', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN',
    'DISTINCT', 'AS', 'ON', 'LIMIT', 'OFFSET'
  ];

  const elements: string[] = [];
  const upperSolution = solution.toUpperCase();

  // Find SQL keywords used
  for (const keyword of sqlKeywords) {
    if (upperSolution.includes(keyword)) {
      elements.push(keyword);
    }
  }

  // Extract table names (words after FROM or JOIN)
  const tableMatches = solution.match(/(?:FROM|JOIN)\s+(\w+)/gi);
  if (tableMatches) {
    for (const match of tableMatches) {
      const tableName = match.split(/\s+/)[1];
      if (tableName) elements.push(tableName);
    }
  }

  // Extract column names
  const columnMatches = solution.match(/SELECT\s+([\w\s,.*]+?)\s+FROM/i);
  if (columnMatches && columnMatches[1]) {
    const columns = columnMatches[1].split(',').map(c => c.trim());
    elements.push(...columns.filter(c => c && c !== '*'));
  }

  return Array.from(new Set(elements)); // Remove duplicates
}

function generateSuccessOutput(exercise: Exercise): string {
  // Generate a mock successful output based on the exercise
  const outputs = [
    '✓ Query executed successfully\n\n' +
    'Results:\n' +
    '┌──────────┬───────────┬──────────┐\n' +
    '│  id      │  name     │  value   │\n' +
    '├──────────┼───────────┼──────────┤\n' +
    '│  1       │  Item A   │  100     │\n' +
    '│  2       │  Item B   │  200     │\n' +
    '│  3       │  Item C   │  150     │\n' +
    '└──────────┴───────────┴──────────┘\n' +
    '\n3 rows returned',
    
    '✓ Query executed successfully\n\n' +
    'Your solution correctly:\n' +
    '• Retrieves the required data\n' +
    '• Uses proper SQL syntax\n' +
    '• Returns expected results',
    
    '✓ Excellent work!\n\n' +
    'Query completed in 0.023s\n' +
    'Rows affected: 3'
  ];
  
  return outputs[Math.floor(Math.random() * outputs.length)];
}

function generateErrorOutput(
  matchPercentage: number, 
  keyElements: string[], 
  userCode: string
): string {
  const missingElements = keyElements.filter(
    el => !userCode.includes(el.toLowerCase())
  ).slice(0, 3);

  if (missingElements.length > 0) {
    return `Your query is missing some key elements.\n\n` +
           `Consider using: ${missingElements.join(', ')}\n\n` +
           `Try reviewing the lesson content or use a hint for guidance.`;
  }

  return `Your query structure needs adjustment.\n\n` +
         `Check:\n` +
         `• SQL syntax and keyword order\n` +
         `• Table and column names\n` +
         `• WHERE clause conditions\n\n` +
         `Use hints or review the solution for guidance.`;
}
