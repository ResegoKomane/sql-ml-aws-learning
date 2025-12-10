/**
 * Example Exercises with Advanced Test Cases
 * 
 * This file shows how to extend exercises in curriculum.ts with testCases
 * for more precise validation. All fields are optional and backward-compatible
 * with existing exercises.
 */

import { Exercise } from '@/components/CodeEditor';

// Example 1: Basic SELECT exercise with test cases
export const selectExerciseWithTests: Exercise = {
  title: 'Select Specific Columns',
  description: 'Write a query to select only the name and email columns from the users table.',
  starterCode: '-- Select name and email from users\nSELECT ',
  solution: 'SELECT name, email FROM users;',
  hints: [
    'Think about which columns you need',
    'You need to specify columns after SELECT',
    'The columns should be name and email',
    'SELECT name, email FROM users'
  ],
  language: 'sql',
  
  // NEW: Test cases for precise validation
  testCases: [
    {
      name: 'Contains SELECT keyword',
      shouldContain: ['select'],
      weight: 0.2
    },
    {
      name: 'Selects from users table',
      shouldContain: ['from users'],
      weight: 0.2
    },
    {
      name: 'Includes name column',
      expectedColumns: ['name'],
      weight: 0.3
    },
    {
      name: 'Includes email column',
      expectedColumns: ['email'],
      weight: 0.3
    }
  ],

  // NEW: Forbidden patterns (will deduct points if found)
  forbiddenPatterns: [
    '\\*'  // Don't allow SELECT *
  ],

  // NEW: Expected tables
  expectedTables: ['users'],

  // NEW: Expected columns
  expectedColumns: ['name', 'email']
};

// Example 2: JOIN exercise with schema
export const joinExerciseWithTests: Exercise = {
  title: 'Join Orders with Customers',
  description: 'Write a query that joins the orders table with customers to show order_id, customer_name, and total_amount.',
  starterCode: '-- Join orders with customers\nSELECT ',
  solution: `SELECT o.order_id, c.customer_name, o.total_amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;`,
  hints: [
    'You need to combine data from two tables',
    'Use JOIN to connect orders and customers',
    'Join on the customer_id field',
    'SELECT o.order_id, c.customer_name, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id'
  ],
  language: 'sql',

  // Schema helps users understand table structure
  schema: {
    tables: [
      {
        name: 'orders',
        columns: [
          { name: 'order_id', type: 'INT' },
          { name: 'customer_id', type: 'INT' },
          { name: 'total_amount', type: 'DECIMAL(10,2)' },
          { name: 'order_date', type: 'DATE' }
        ]
      },
      {
        name: 'customers',
        columns: [
          { name: 'id', type: 'INT' },
          { name: 'customer_name', type: 'VARCHAR(100)' },
          { name: 'email', type: 'VARCHAR(100)' }
        ]
      }
    ]
  },

  testCases: [
    {
      name: 'Uses JOIN keyword',
      shouldContain: ['join'],
      weight: 0.25
    },
    {
      name: 'Includes ON condition',
      shouldContain: ['on'],
      weight: 0.25
    },
    {
      name: 'References orders table',
      shouldContain: ['orders'],
      weight: 0.15
    },
    {
      name: 'References customers table',
      shouldContain: ['customers'],
      weight: 0.15
    },
    {
      name: 'Does not use comma join',
      shouldNotContain: ['from orders, customers', 'from customers, orders'],
      weight: 0.2
    }
  ],

  requiredClauses: ['JOIN', 'ON'],
  expectedTables: ['orders', 'customers']
};

// Example 3: Aggregation exercise
export const aggregationExerciseWithTests: Exercise = {
  title: 'Count Orders by Status',
  description: 'Write a query to count the number of orders for each status, showing status and count.',
  starterCode: '-- Count orders grouped by status\nSELECT ',
  solution: `SELECT status, COUNT(*) as order_count
FROM orders
GROUP BY status;`,
  hints: [
    'You need to group results by something',
    'Use GROUP BY to organize by status',
    'COUNT(*) will count rows in each group',
    'SELECT status, COUNT(*) FROM orders GROUP BY status'
  ],
  language: 'sql',

  testCases: [
    {
      name: 'Uses COUNT function',
      shouldContain: ['count('],
      weight: 0.3
    },
    {
      name: 'Uses GROUP BY',
      shouldContain: ['group by'],
      weight: 0.3
    },
    {
      name: 'Groups by status',
      shouldContain: ['group by status'],
      weight: 0.2
    },
    {
      name: 'Selects from orders',
      shouldContain: ['from orders'],
      weight: 0.2
    }
  ],

  requiredClauses: ['GROUP BY'],
  expectedTables: ['orders']
};

/**
 * HOW TO UPDATE YOUR curriculum.ts:
 * 
 * 1. Find the exercise you want to enhance
 * 2. Add any of these optional fields:
 *    - testCases: Array of test conditions
 *    - schema: Table structure for reference
 *    - requiredClauses: SQL clauses that must be present
 *    - forbiddenPatterns: Regex patterns to reject
 *    - expectedTables: Tables that should be referenced
 *    - expectedColumns: Columns that should be selected
 * 
 * All fields are optional - existing exercises will work without changes!
 * 
 * Test Case Structure:
 * {
 *   name: string;           // Test name shown in UI
 *   shouldContain?: string[];    // Strings that must appear (case-insensitive)
 *   shouldNotContain?: string[]; // Strings that must NOT appear
 *   expectedColumns?: string[];  // Columns that should be in SELECT
 *   weight?: number;        // 0-1, importance (defaults to equal weight)
 * }
 */

export default {
  selectExerciseWithTests,
  joinExerciseWithTests,
  aggregationExerciseWithTests
};
