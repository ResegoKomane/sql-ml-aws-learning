// lib/validators/sql.ts

import { commonSQLMistakes } from '@/data/commonMistakes';

export interface ValidationResult {
  isValid: boolean;
  score: number;
  issue?: string;
  realWorldImpact?: string;
  commonMistakeDetected?: string;
  commonMistakeExplanation?: string;
  nextSteps: string[];
  hints: string[];
  testsPassedCount?: number;
  testCount?: number;
  executionSteps?: any[];
}

export class AdvancedSQLValidator {
  validate(code: string, exercise: any): ValidationResult {
    const result: ValidationResult = {
      isValid: false,
      score: 0,
      nextSteps: [],
      hints: [],
      testsPassedCount: 0,
      testCount: 0
    };

    // Normalize code
    const normalizedCode = code.toLowerCase().trim();
    const normalizedSolution = exercise.solution.toLowerCase().trim();

    // Check if solution matches
    const isCorrect = normalizedCode === normalizedSolution;

    if (isCorrect) {
      result.isValid = true;
      result.score = 100;
      result.hints = [];
      result.nextSteps = ['Great job!', 'Move to the next exercise'];
      return result;
    }

    // Run test cases if available
    if (exercise.testCases && exercise.testCases.length > 0) {
      result.testCount = exercise.testCases.length;
      let passedTests = 0;

      exercise.testCases.forEach((testCase: any) => {
        // Simplified test: check if query structure matches expected
        const codeUpper = code.toUpperCase();
        const testQueryUpper = testCase.query.toUpperCase();
        
        const hasSelectColumns = extractColumns(code);
        const expectedColumns = extractColumns(testCase.query);
        
        if (JSON.stringify(hasSelectColumns) === JSON.stringify(expectedColumns)) {
          passedTests++;
        }
      });

      result.testsPassedCount = passedTests;
      result.score = Math.round((passedTests / exercise.testCases.length) * 60) + 15;
    }

    // Detect common mistakes
    const detectedMistake = this.detectCommonMistakes(code, exercise);
    if (detectedMistake) {
      result.commonMistakeDetected = detectedMistake.name;
      result.commonMistakeExplanation = detectedMistake.correction;
      result.realWorldImpact = detectedMistake.realWorldImpact;
      result.score = Math.max(result.score - 10, 0);
    }

    // Determine issue
    if (code.toLowerCase().includes('select *')) {
      result.issue = 'SELECT * fetches all columns, which is inefficient';
    } else if (!code.toUpperCase().includes('WHERE')) {
      result.issue = 'Query may need a WHERE clause to filter results';
    } else {
      result.issue = 'Query structure does not match expected output';
    }

    // Generate hints
    result.hints = this.generateHints(code, exercise);

    // Generate next steps
    result.nextSteps = [
      'Review the issue identified',
      'Use hints to guide your solution',
      'Compare with the solution to learn'
    ];

    return result;
  }

  private detectCommonMistakes(code: string, exercise: any): any {
    const codeLower = code.toLowerCase();
    
    for (const mistake of commonSQLMistakes) {
      if (mistake.pattern && mistake.pattern.some((p: string) => codeLower.includes(p.toLowerCase()))) {
        return mistake;
      }
    }
    return null;
  }

  private generateHints(code: string, exercise: any): string[] {
    const hints = [
      'What columns do you really need?',
      'Should you be filtering with WHERE?',
      'Are you selecting all rows or specific ones?',
      'Check the solution for the correct approach'
    ];
    return hints;
  }
}

export function compareResults(userOutput: any, expectedOutput: any): any {
  return {
    match: JSON.stringify(userOutput) === JSON.stringify(expectedOutput),
    userOutput,
    expectedOutput
  };
}

function extractColumns(query: string): string[] {
  const selectMatch = query.match(/SELECT\s+(.*?)\s+FROM/i);
  if (selectMatch) {
    return selectMatch.split(',').map(col => col.trim());
  }
  return [];
}
