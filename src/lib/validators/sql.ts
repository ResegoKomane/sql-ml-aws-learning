// Advanced SQL Validator with rich feedback
import { commonSQLMistakes, detectMistakes, SQLMistake } from '@/data/commonMistakes';

// Types for the validator
export interface TestCase {
  name: string;
  input?: Record<string, unknown>;
  expectedOutput?: string | RegExp;
  expectedColumns?: string[];
  expectedRowCount?: number;
  shouldContain?: string[];
  shouldNotContain?: string[];
  weight?: number; // 0-1, defaults to equal weight
}

export interface ExerciseSchema {
  tables: {
    name: string;
    columns: { name: string; type: string; nullable?: boolean }[];
  }[];
}

export interface ValidationResult {
  isValid: boolean;
  score: number; // 0-100
  issue: string | null;
  realWorldImpact: string | null;
  commonMistakeDetected: SQLMistake | null;
  hints: string[]; // 4-level progressive hints
  nextSteps: string[];
  executionSteps?: ExecutionStep[];
  testResults?: TestCaseResult[];
  syntaxValid: boolean;
  structureAnalysis: StructureAnalysis;
}

export interface ExecutionStep {
  step: number;
  operation: string;
  description: string;
  clause: string;
}

export interface TestCaseResult {
  name: string;
  passed: boolean;
  message: string;
  weight: number;
}

export interface StructureAnalysis {
  hasSelect: boolean;
  hasFrom: boolean;
  hasWhere: boolean;
  hasJoin: boolean;
  hasGroupBy: boolean;
  hasOrderBy: boolean;
  hasLimit: boolean;
  hasAggregate: boolean;
  tables: string[];
  columns: string[];
  estimatedComplexity: 'simple' | 'moderate' | 'complex';
}

// Exercise interface extension for test cases
export interface ExerciseWithTests {
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  language: string;
  // New optional fields for advanced validation
  testCases?: TestCase[];
  schema?: ExerciseSchema;
  requiredClauses?: string[];
  forbiddenPatterns?: string[];
  expectedTables?: string[];
  expectedColumns?: string[];
}

class AdvancedSQLValidator {
  private query: string;
  private exercise: ExerciseWithTests;
  private normalizedQuery: string;
  private normalizedSolution: string;

  constructor(query: string, exercise: ExerciseWithTests) {
    this.query = query.trim();
    this.exercise = exercise;
    this.normalizedQuery = this.normalizeQuery(query);
    this.normalizedSolution = this.normalizeQuery(exercise.solution);
  }

  private normalizeQuery(q: string): string {
    return q
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/\s*,\s*/g, ', ')
      .replace(/\s*=\s*/g, ' = ')
      .replace(/\s*;\s*$/, '')
      .trim();
  }

  public validate(): ValidationResult {
    // Step 1: Basic syntax check
    const syntaxResult = this.checkSyntax();
    if (!syntaxResult.valid) {
      return this.buildErrorResult(syntaxResult.error!, 'syntax');
    }

    // Step 2: Structure analysis
    const structure = this.analyzeStructure();

    // Step 3: Detect common mistakes
    const mistakes = detectMistakes(this.query);
    const primaryMistake = mistakes.length > 0 ? mistakes[0] : null;

    // Step 4: Run test cases (if available)
    const testResults = this.runTestCases();

    // Step 5: Check required elements
    const requiredCheck = this.checkRequiredElements();

    // Step 6: Check forbidden patterns
    const forbiddenCheck = this.checkForbiddenPatterns();

    // Step 7: Calculate score
    const score = this.calculateScore(
      structure,
      mistakes,
      testResults,
      requiredCheck,
      forbiddenCheck
    );

    // Step 8: Generate hints based on current state
    const hints = this.generateProgressiveHints(structure, mistakes, score);

    // Step 9: Generate next steps
    const nextSteps = this.generateNextSteps(structure, mistakes, score);

    // Step 10: Generate execution visualization
    const executionSteps = this.generateExecutionSteps();

    // Determine overall validity
    const isValid = score >= 70 && mistakes.filter(m => m.severity === 'critical').length === 0;

    // Build issue message
    let issue: string | null = null;
    let realWorldImpact: string | null = null;

    if (primaryMistake) {
      issue = primaryMistake.issue;
      realWorldImpact = primaryMistake.realWorldImpact;
    } else if (!requiredCheck.passed) {
      issue = `Missing required element: ${requiredCheck.missing[0]}`;
      realWorldImpact = 'Incomplete queries may not return the expected results or may fail entirely in production.';
    } else if (!forbiddenCheck.passed) {
      issue = `Forbidden pattern detected: ${forbiddenCheck.violations[0]}`;
      realWorldImpact = 'This pattern is discouraged for this exercise to teach best practices.';
    } else if (score < 70) {
      issue = 'Your query structure differs significantly from the expected solution.';
      realWorldImpact = 'While your query might work, following the expected pattern helps build consistent SQL skills.';
    }

    return {
      isValid,
      score,
      issue,
      realWorldImpact,
      commonMistakeDetected: primaryMistake,
      hints,
      nextSteps,
      executionSteps,
      testResults,
      syntaxValid: true,
      structureAnalysis: structure,
    };
  }

  private checkSyntax(): { valid: boolean; error?: string } {
    const query = this.normalizedQuery;

    // Empty query
    if (!query || query.length === 0) {
      return { valid: false, error: 'Query is empty' };
    }

    // Check for unmatched parentheses
    let parenCount = 0;
    for (const char of query) {
      if (char === '(') parenCount++;
      if (char === ')') parenCount--;
      if (parenCount < 0) {
        return { valid: false, error: 'Unmatched closing parenthesis' };
      }
    }
    if (parenCount !== 0) {
      return { valid: false, error: 'Unmatched opening parenthesis' };
    }

    // Check for unmatched quotes
    const singleQuotes = (query.match(/'/g) || []).length;
    if (singleQuotes % 2 !== 0) {
      return { valid: false, error: 'Unmatched single quote' };
    }

    // Check for basic SQL structure
    const hasStatement = /^(select|insert|update|delete|create|alter|drop|with)/i.test(query);
    if (!hasStatement) {
      return { valid: false, error: 'Query must start with a valid SQL keyword (SELECT, INSERT, UPDATE, DELETE, etc.)' };
    }

    // SELECT requires FROM (usually)
    if (/^select/i.test(query) && !/\bfrom\b/i.test(query) && !/select\s+\d+/i.test(query)) {
      return { valid: false, error: 'SELECT statements typically require a FROM clause' };
    }

    return { valid: true };
  }

  private analyzeStructure(): StructureAnalysis {
    const query = this.normalizedQuery;
    
    const hasSelect = /\bselect\b/i.test(query);
    const hasFrom = /\bfrom\b/i.test(query);
    const hasWhere = /\bwhere\b/i.test(query);
    const hasJoin = /\b(inner|left|right|full|cross)?\s*join\b/i.test(query);
    const hasGroupBy = /\bgroup\s+by\b/i.test(query);
    const hasOrderBy = /\border\s+by\b/i.test(query);
    const hasLimit = /\blimit\b/i.test(query);
    const hasAggregate = /\b(count|sum|avg|max|min)\s*\(/i.test(query);

    // Extract table names
    const tables = this.extractTables(query);
    
    // Extract column names
    const columns = this.extractColumns(query);

    // Estimate complexity
    let complexity: 'simple' | 'moderate' | 'complex' = 'simple';
    const complexityScore = 
      (hasJoin ? 2 : 0) +
      (hasGroupBy ? 1 : 0) +
      (hasAggregate ? 1 : 0) +
      (/\bsubquery\b|select.*select/i.test(query) ? 2 : 0) +
      (tables.length > 2 ? 1 : 0);
    
    if (complexityScore >= 4) complexity = 'complex';
    else if (complexityScore >= 2) complexity = 'moderate';

    return {
      hasSelect,
      hasFrom,
      hasWhere,
      hasJoin,
      hasGroupBy,
      hasOrderBy,
      hasLimit,
      hasAggregate,
      tables,
      columns,
      estimatedComplexity: complexity,
    };
  }

  private extractTables(query: string): string[] {
    const tables: string[] = [];
    
    // FROM clause
    const fromMatch = query.match(/\bfrom\s+([a-z_][a-z0-9_]*)/gi);
    if (fromMatch) {
      fromMatch.forEach(m => {
        const table = m.replace(/from\s+/i, '').trim();
        if (table && !tables.includes(table)) tables.push(table);
      });
    }

    // JOIN clauses
    const joinMatches = query.match(/\bjoin\s+([a-z_][a-z0-9_]*)/gi);
    if (joinMatches) {
      joinMatches.forEach(m => {
        const table = m.replace(/join\s+/i, '').trim();
        if (table && !tables.includes(table)) tables.push(table);
      });
    }

    return tables;
  }

  private extractColumns(query: string): string[] {
    const columns: string[] = [];
    
    // SELECT clause columns
    const selectMatch = query.match(/select\s+(.*?)\s+from/i);
    if (selectMatch && selectMatch[1]) {
      const selectPart = selectMatch[1];
      if (selectPart !== '*') {
        const cols = selectPart.split(',').map(c => {
          // Remove aliases and functions
          const col = c.trim()
            .replace(/\s+as\s+\w+$/i, '')
            .replace(/.*\.\s*/, '')
            .replace(/\(.*\)/, '');
          return col.trim();
        });
        cols.forEach(c => {
          if (c && c !== '*' && !columns.includes(c)) columns.push(c);
        });
      }
    }

    return columns;
  }

  private runTestCases(): TestCaseResult[] {
    if (!this.exercise.testCases || this.exercise.testCases.length === 0) {
      // Fall back to basic solution matching
      return this.runBasicMatch();
    }

    return this.exercise.testCases.map(testCase => {
      const weight = testCase.weight ?? (1 / this.exercise.testCases!.length);
      
      // Check shouldContain
      if (testCase.shouldContain) {
        for (const required of testCase.shouldContain) {
          if (!this.normalizedQuery.includes(required.toLowerCase())) {
            return {
              name: testCase.name,
              passed: false,
              message: `Missing required element: "${required}"`,
              weight,
            };
          }
        }
      }

      // Check shouldNotContain
      if (testCase.shouldNotContain) {
        for (const forbidden of testCase.shouldNotContain) {
          if (this.normalizedQuery.includes(forbidden.toLowerCase())) {
            return {
              name: testCase.name,
              passed: false,
              message: `Should not contain: "${forbidden}"`,
              weight,
            };
          }
        }
      }

      // Check expected columns
      if (testCase.expectedColumns) {
        const queryColumns = this.extractColumns(this.normalizedQuery);
        for (const col of testCase.expectedColumns) {
          if (!queryColumns.some(qc => qc.toLowerCase() === col.toLowerCase())) {
            return {
              name: testCase.name,
              passed: false,
              message: `Missing expected column: "${col}"`,
              weight,
            };
          }
        }
      }

      return {
        name: testCase.name,
        passed: true,
        message: 'Test passed',
        weight,
      };
    });
  }

  private runBasicMatch(): TestCaseResult[] {
    // Extract key elements from solution and check if they exist in user query
    const solutionKeywords = this.extractKeyElements(this.normalizedSolution);
    const userKeywords = this.extractKeyElements(this.normalizedQuery);
    
    const matchCount = solutionKeywords.filter(kw => 
      userKeywords.some(uk => uk.toLowerCase() === kw.toLowerCase())
    ).length;

    const matchPercentage = solutionKeywords.length > 0 
      ? matchCount / solutionKeywords.length 
      : 0;

    return [{
      name: 'Solution Match',
      passed: matchPercentage >= 0.7,
      message: matchPercentage >= 0.7 
        ? 'Query structure matches expected solution'
        : `Query matches ${Math.round(matchPercentage * 100)}% of expected elements`,
      weight: 1,
    }];
  }

  private extractKeyElements(query: string): string[] {
    const elements: string[] = [];
    
    const sqlKeywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER',
      'GROUP BY', 'ORDER BY', 'HAVING', 'INSERT', 'UPDATE', 'DELETE',
      'CREATE', 'TABLE', 'INDEX', 'DROP', 'ALTER', 'AND', 'OR', 'NOT',
      'IN', 'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL', 'COUNT', 'SUM', 
      'AVG', 'MAX', 'MIN', 'DISTINCT', 'AS', 'ON', 'LIMIT', 'OFFSET'
    ];

    const upperQuery = query.toUpperCase();
    for (const keyword of sqlKeywords) {
      if (upperQuery.includes(keyword)) {
        elements.push(keyword);
      }
    }

    // Add table names
    elements.push(...this.extractTables(query));
    
    // Add column references
    elements.push(...this.extractColumns(query));

    return Array.from(new Set(elements));
  }

  private checkRequiredElements(): { passed: boolean; missing: string[] } {
    const missing: string[] = [];
    
    if (this.exercise.requiredClauses) {
      for (const clause of this.exercise.requiredClauses) {
        if (!this.normalizedQuery.includes(clause.toLowerCase())) {
          missing.push(clause);
        }
      }
    }

    if (this.exercise.expectedTables) {
      for (const table of this.exercise.expectedTables) {
        const structure = this.analyzeStructure();
        if (!structure.tables.some(t => t.toLowerCase() === table.toLowerCase())) {
          missing.push(`table: ${table}`);
        }
      }
    }

    if (this.exercise.expectedColumns) {
      const queryColumns = this.extractColumns(this.normalizedQuery);
      for (const col of this.exercise.expectedColumns) {
        if (!queryColumns.some(qc => qc.toLowerCase() === col.toLowerCase())) {
          missing.push(`column: ${col}`);
        }
      }
    }

    return { passed: missing.length === 0, missing };
  }

  private checkForbiddenPatterns(): { passed: boolean; violations: string[] } {
    const violations: string[] = [];
    
    if (this.exercise.forbiddenPatterns) {
      for (const pattern of this.exercise.forbiddenPatterns) {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(this.query)) {
          violations.push(pattern);
        }
      }
    }

    return { passed: violations.length === 0, violations };
  }

  private calculateScore(
    structure: StructureAnalysis,
    mistakes: SQLMistake[],
    testResults: TestCaseResult[],
    requiredCheck: { passed: boolean; missing: string[] },
    forbiddenCheck: { passed: boolean; violations: string[] }
  ): number {
    let score = 100;

    // Deduct for test failures (40% weight)
    const testScore = testResults.reduce((acc, tr) => 
      acc + (tr.passed ? tr.weight : 0), 0
    );
    const totalTestWeight = testResults.reduce((acc, tr) => acc + tr.weight, 0);
    const testPercentage = totalTestWeight > 0 ? testScore / totalTestWeight : 1;
    score -= (1 - testPercentage) * 40;

    // Deduct for common mistakes (30% weight)
    for (const mistake of mistakes) {
      switch (mistake.severity) {
        case 'critical': score -= 30; break;
        case 'high': score -= 15; break;
        case 'medium': score -= 8; break;
        case 'low': score -= 4; break;
      }
    }

    // Deduct for missing required elements (20% weight)
    if (!requiredCheck.passed) {
      score -= requiredCheck.missing.length * 10;
    }

    // Deduct for forbidden patterns (10% weight)
    if (!forbiddenCheck.passed) {
      score -= forbiddenCheck.violations.length * 10;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private generateProgressiveHints(
    structure: StructureAnalysis,
    mistakes: SQLMistake[],
    score: number
  ): string[] {
    const hints: string[] = [];
    const exerciseHints = this.exercise.hints || [];

    // Level 1: Conceptual hint (vague)
    if (mistakes.length > 0) {
      hints.push(`Think about ${mistakes[0].category} best practices. What might be inefficient or risky in your query?`);
    } else if (!structure.hasWhere && this.normalizedSolution.includes('where')) {
      hints.push('Consider whether you need to filter your results in some way.');
    } else if (exerciseHints[0]) {
      hints.push(exerciseHints[0]);
    } else {
      hints.push('Review the basic structure of your query. Is something missing or in the wrong order?');
    }

    // Level 2: Directional hint
    if (mistakes.length > 0) {
      hints.push(`Your query has a ${mistakes[0].category} issue. Look at how you're ${
        mistakes[0].category === 'performance' ? 'selecting data' :
        mistakes[0].category === 'security' ? 'handling input' :
        mistakes[0].category === 'correctness' ? 'structuring your logic' :
        'writing your SQL'
      }.`);
    } else if (exerciseHints[1]) {
      hints.push(exerciseHints[1]);
    } else {
      hints.push('Compare the clauses in your query with what the problem asks for.');
    }

    // Level 3: Specific hint
    if (mistakes.length > 0) {
      hints.push(`Issue detected: ${mistakes[0].name}. ${mistakes[0].correction}`);
    } else if (exerciseHints[2]) {
      hints.push(exerciseHints[2]);
    } else {
      const solutionTables = this.extractTables(this.normalizedSolution);
      if (solutionTables.length > 0) {
        hints.push(`Make sure you're using the correct table(s): ${solutionTables.join(', ')}`);
      }
    }

    // Level 4: Near-solution hint
    if (mistakes.length > 0 && mistakes[0].example) {
      hints.push(`Instead of patterns like "${mistakes[0].example.wrong.substring(0, 50)}...", try "${mistakes[0].example.right.substring(0, 50)}..."`);
    } else if (exerciseHints[3]) {
      hints.push(exerciseHints[3]);
    } else {
      // Show partial solution structure
      const solutionStart = this.exercise.solution.split('\n')[0];
      hints.push(`Your query should start similar to: ${solutionStart}`);
    }

    return hints;
  }

  private generateNextSteps(
    structure: StructureAnalysis,
    mistakes: SQLMistake[],
    score: number
  ): string[] {
    const steps: string[] = [];

    if (score >= 90) {
      steps.push('Great work! Try optimizing your query further or add comments explaining your approach.');
      steps.push('Consider edge cases: what happens with NULL values or empty results?');
    } else if (score >= 70) {
      steps.push('Your query works but could be improved. Review any warnings above.');
      if (mistakes.length > 0) {
        steps.push(`Fix the ${mistakes[0].name} issue for better ${mistakes[0].category}.`);
      }
      steps.push('Try running EXPLAIN on your query to understand its execution plan.');
    } else if (score >= 50) {
      steps.push('You\'re on the right track. Focus on the hints provided.');
      steps.push('Review the lesson content about SQL query structure.');
      if (!structure.hasSelect) steps.push('Make sure your query starts with SELECT.');
      if (!structure.hasFrom) steps.push('Add a FROM clause to specify which table to query.');
    } else {
      steps.push('Start with the basic structure: SELECT columns FROM table');
      steps.push('Read through the exercise description again carefully.');
      steps.push('Use the starter code as a foundation and modify it step by step.');
      steps.push('Check the hint for guidance on what approach to take.');
    }

    return steps.slice(0, 5); // Max 5 steps
  }

  private generateExecutionSteps(): ExecutionStep[] {
    const steps: ExecutionStep[] = [];
    let stepNum = 1;

    // SQL execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT
    const structure = this.analyzeStructure();

    if (structure.hasFrom) {
      steps.push({
        step: stepNum++,
        operation: 'FROM',
        description: `Load data from table(s): ${structure.tables.join(', ') || 'specified table'}`,
        clause: this.extractClause('from'),
      });
    }

    if (structure.hasJoin) {
      steps.push({
        step: stepNum++,
        operation: 'JOIN',
        description: 'Combine rows from multiple tables based on join conditions',
        clause: this.extractClause('join'),
      });
    }

    if (structure.hasWhere) {
      steps.push({
        step: stepNum++,
        operation: 'WHERE',
        description: 'Filter rows based on conditions',
        clause: this.extractClause('where'),
      });
    }

    if (structure.hasGroupBy) {
      steps.push({
        step: stepNum++,
        operation: 'GROUP BY',
        description: 'Group rows for aggregation',
        clause: this.extractClause('group by'),
      });
    }

    if (structure.hasSelect) {
      steps.push({
        step: stepNum++,
        operation: 'SELECT',
        description: `Select columns: ${structure.columns.join(', ') || '*'}`,
        clause: this.extractClause('select'),
      });
    }

    if (structure.hasOrderBy) {
      steps.push({
        step: stepNum++,
        operation: 'ORDER BY',
        description: 'Sort the results',
        clause: this.extractClause('order by'),
      });
    }

    if (structure.hasLimit) {
      steps.push({
        step: stepNum++,
        operation: 'LIMIT',
        description: 'Limit the number of returned rows',
        clause: this.extractClause('limit'),
      });
    }

    return steps;
  }

  private extractClause(keyword: string): string {
    const regex = new RegExp(`\\b${keyword}\\b[^;]*`, 'i');
    const match = this.query.match(regex);
    return match ? match[0].trim() : '';
  }

  private buildErrorResult(error: string, type: string): ValidationResult {
    return {
      isValid: false,
      score: 0,
      issue: error,
      realWorldImpact: type === 'syntax' 
        ? 'Syntax errors prevent your query from running at all. The database will reject it immediately.'
        : 'This error will cause your query to fail or return unexpected results.',
      commonMistakeDetected: null,
      hints: [
        'Check for typos in SQL keywords.',
        'Make sure all parentheses and quotes are properly matched.',
        'Verify that your query follows standard SQL syntax.',
        `The error is: ${error}`,
      ],
      nextSteps: [
        'Fix the syntax error first.',
        'Try a simpler version of your query.',
        'Use the starter code as a reference.',
      ],
      syntaxValid: false,
      structureAnalysis: {
        hasSelect: false,
        hasFrom: false,
        hasWhere: false,
        hasJoin: false,
        hasGroupBy: false,
        hasOrderBy: false,
        hasLimit: false,
        hasAggregate: false,
        tables: [],
        columns: [],
        estimatedComplexity: 'simple',
      },
    };
  }
}

// Export the main validation function
export function validateSQL(userQuery: string, exercise: ExerciseWithTests): ValidationResult {
  const validator = new AdvancedSQLValidator(userQuery, exercise);
  return validator.validate();
}

// Export the class for advanced usage
export { AdvancedSQLValidator };
