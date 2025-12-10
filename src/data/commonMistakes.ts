// Common SQL mistakes database for intelligent feedback

export interface SQLMistake {
  id: string;
  name: string;
  patterns: RegExp[];
  issue: string;
  correction: string;
  realWorldImpact: string;
  example: {
    wrong: string;
    right: string;
  };
  prevention: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'performance' | 'security' | 'correctness' | 'style' | 'data-integrity';
}

export const commonSQLMistakes: SQLMistake[] = [
  {
    id: 'select-star',
    name: 'SELECT * Anti-pattern',
    patterns: [
      /SELECT\s+\*\s+FROM/i,
      /SELECT\s+\*\s*,/i,
    ],
    issue: 'Using SELECT * retrieves all columns, even those you don\'t need.',
    correction: 'Explicitly list only the columns you need: SELECT id, name, email FROM users',
    realWorldImpact: 'In production, SELECT * can transfer megabytes of unnecessary data, slow down queries by 10-100x, and break applications when schema changes add new columns.',
    example: {
      wrong: 'SELECT * FROM users WHERE active = true;',
      right: 'SELECT id, name, email FROM users WHERE active = true;',
    },
    prevention: 'Always specify column names explicitly. Create views for common column sets.',
    severity: 'medium',
    category: 'performance',
  },
  {
    id: 'missing-where',
    name: 'Missing WHERE Clause',
    patterns: [
      /^(?=.*\b(UPDATE|DELETE)\b)(?!.*\bWHERE\b).*$/i,
    ],
    issue: 'UPDATE or DELETE without WHERE affects ALL rows in the table.',
    correction: 'Always include a WHERE clause to target specific rows.',
    realWorldImpact: 'A missing WHERE clause in production once deleted 77 million user records at GitLab, causing 6 hours of downtime. This is one of the most dangerous SQL mistakes.',
    example: {
      wrong: 'DELETE FROM orders;',
      right: 'DELETE FROM orders WHERE status = \'cancelled\' AND created_at < \'2024-01-01\';',
    },
    prevention: 'Use transactions, test with SELECT first, and implement database safeguards that reject WHERE-less mutations.',
    severity: 'critical',
    category: 'data-integrity',
  },
  {
    id: 'sql-injection-risk',
    name: 'Potential SQL Injection',
    patterns: [
      /'\s*\+\s*\w+\s*\+\s*'/i,
      /'\s*\|\|\s*\w+/i,
      /CONCAT\s*\(\s*['"]/i,
      /'\s*OR\s*'1'\s*=\s*'1'/i,
      /'\s*;\s*DROP/i,
      /--\s*$/i,
    ],
    issue: 'String concatenation in queries can allow SQL injection attacks.',
    correction: 'Use parameterized queries or prepared statements instead.',
    realWorldImpact: 'SQL injection remains the #1 web vulnerability. In 2017, Equifax was breached via SQL injection, exposing 147 million records and costing $700M+ in settlements.',
    example: {
      wrong: "SELECT * FROM users WHERE name = '" + "userInput" + "';",
      right: 'SELECT * FROM users WHERE name = $1; -- with parameterized input',
    },
    prevention: 'Never concatenate user input into queries. Use parameterized queries, ORMs, or prepared statements.',
    severity: 'critical',
    category: 'security',
  },
  {
    id: 'implicit-join',
    name: 'Implicit JOIN (Comma Syntax)',
    patterns: [
      /FROM\s+\w+\s*,\s*\w+/i,
    ],
    issue: 'Comma-separated tables create implicit CROSS JOINs, which are hard to read and error-prone.',
    correction: 'Use explicit JOIN syntax with ON conditions.',
    realWorldImpact: 'Implicit joins make code reviews harder and often hide missing join conditions, causing incorrect results or massive Cartesian products that crash databases.',
    example: {
      wrong: 'SELECT * FROM orders, customers WHERE orders.customer_id = customers.id;',
      right: 'SELECT * FROM orders INNER JOIN customers ON orders.customer_id = customers.id;',
    },
    prevention: 'Always use explicit JOIN keywords. Configure linters to flag comma joins.',
    severity: 'medium',
    category: 'style',
  },
  {
    id: 'not-using-aliases',
    name: 'Missing Table Aliases',
    patterns: [
      /JOIN\s+\w+\s+ON\s+\w+\.\w+\s*=/i,
    ],
    issue: 'Long table names repeated throughout queries reduce readability.',
    correction: 'Use short, meaningful aliases for tables.',
    realWorldImpact: 'Without aliases, complex queries become unreadable and maintenance-prone. Teams waste hours debugging ambiguous column references.',
    example: {
      wrong: 'SELECT orders.id, customers.name FROM orders JOIN customers ON orders.customer_id = customers.id;',
      right: 'SELECT o.id, c.name FROM orders o JOIN customers c ON o.customer_id = c.id;',
    },
    prevention: 'Establish naming conventions for aliases (first letter or short abbreviation).',
    severity: 'low',
    category: 'style',
  },
  {
    id: 'n-plus-one',
    name: 'N+1 Query Pattern',
    patterns: [
      /SELECT.*WHERE\s+\w+\s*=\s*\?/i,
      /SELECT.*WHERE\s+id\s*=\s*\d+/i,
    ],
    issue: 'Fetching related data one row at a time causes excessive database roundtrips.',
    correction: 'Use JOINs or batch queries with IN clauses.',
    realWorldImpact: 'N+1 queries are the #1 cause of slow page loads. A page showing 50 products with categories makes 51 queries instead of 1-2, often adding 5-10 seconds to load time.',
    example: {
      wrong: '-- For each order:\nSELECT * FROM order_items WHERE order_id = 1;\nSELECT * FROM order_items WHERE order_id = 2;\n-- ...repeated N times',
      right: 'SELECT * FROM order_items WHERE order_id IN (1, 2, 3, ...);',
    },
    prevention: 'Use eager loading in ORMs. Monitor query counts per request. Use batch fetching.',
    severity: 'high',
    category: 'performance',
  },
  {
    id: 'like-wildcard-start',
    name: 'Leading Wildcard in LIKE',
    patterns: [
      /LIKE\s+['"]%/i,
    ],
    issue: 'LIKE patterns starting with % cannot use indexes, forcing full table scans.',
    correction: 'Restructure queries to avoid leading wildcards, or use full-text search.',
    realWorldImpact: 'A LIKE \'%search%\' on a million-row table can take 10+ seconds. Full-text search indexes can return results in milliseconds.',
    example: {
      wrong: "SELECT * FROM products WHERE name LIKE '%phone%';",
      right: "SELECT * FROM products WHERE to_tsvector('english', name) @@ to_tsquery('phone'); -- PostgreSQL full-text search",
    },
    prevention: 'Use full-text search (PostgreSQL tsvector, MySQL FULLTEXT, Elasticsearch). Consider search-optimized columns.',
    severity: 'high',
    category: 'performance',
  },
  {
    id: 'null-comparison',
    name: 'NULL Comparison Error',
    patterns: [
      /=\s*NULL/i,
      /!=\s*NULL/i,
      /<>\s*NULL/i,
    ],
    issue: 'NULL cannot be compared with = or !=. These comparisons always return NULL (unknown).',
    correction: 'Use IS NULL or IS NOT NULL for NULL comparisons.',
    realWorldImpact: 'This logic error silently returns wrong results. WHERE status != \'deleted\' won\'t return rows where status is NULL, potentially hiding data.',
    example: {
      wrong: "SELECT * FROM users WHERE deleted_at = NULL;",
      right: 'SELECT * FROM users WHERE deleted_at IS NULL;',
    },
    prevention: 'Understand three-valued logic in SQL. Use COALESCE to handle NULLs explicitly.',
    severity: 'high',
    category: 'correctness',
  },
  {
    id: 'group-by-non-aggregated',
    name: 'Non-aggregated Column in GROUP BY',
    patterns: [
      /GROUP\s+BY\s+\w+(?!\s*,\s*\w+\s*,)/i,
    ],
    issue: 'Selecting columns not in GROUP BY or aggregate functions returns unpredictable results.',
    correction: 'Include all selected columns in GROUP BY or wrap them in aggregate functions.',
    realWorldImpact: 'MySQL\'s permissive mode hides this error, causing silent data corruption. Results vary between executions, making bugs extremely hard to track.',
    example: {
      wrong: 'SELECT customer_id, order_date, SUM(amount) FROM orders GROUP BY customer_id;',
      right: 'SELECT customer_id, MAX(order_date), SUM(amount) FROM orders GROUP BY customer_id;',
    },
    prevention: 'Enable ONLY_FULL_GROUP_BY mode in MySQL. PostgreSQL enforces this by default.',
    severity: 'high',
    category: 'correctness',
  },
  {
    id: 'order-by-rand',
    name: 'ORDER BY RANDOM() Antipattern',
    patterns: [
      /ORDER\s+BY\s+RAND\s*\(\)/i,
      /ORDER\s+BY\s+RANDOM\s*\(\)/i,
      /ORDER\s+BY\s+NEWID\s*\(\)/i,
    ],
    issue: 'ORDER BY RANDOM() scans and sorts the entire table, even for LIMIT 1.',
    correction: 'Use offset-based random selection or pre-generated random columns.',
    realWorldImpact: 'On a table with 1M rows, ORDER BY RANDOM() LIMIT 1 takes 2-5 seconds instead of milliseconds, potentially crashing your database under load.',
    example: {
      wrong: 'SELECT * FROM products ORDER BY RANDOM() LIMIT 5;',
      right: 'SELECT * FROM products WHERE id >= (SELECT FLOOR(RANDOM() * (SELECT MAX(id) FROM products))) LIMIT 5;',
    },
    prevention: 'For random samples, use TABLESAMPLE or application-side random ID generation.',
    severity: 'medium',
    category: 'performance',
  },
  {
    id: 'distinct-overuse',
    name: 'DISTINCT as a Band-Aid',
    patterns: [
      /SELECT\s+DISTINCT/i,
    ],
    issue: 'DISTINCT often masks underlying JOIN problems that create duplicates.',
    correction: 'Fix the root cause (incorrect joins) instead of hiding duplicates with DISTINCT.',
    realWorldImpact: 'DISTINCT sorts the entire result set, which is expensive. The hidden join bug may also cause incorrect counts or aggregations elsewhere.',
    example: {
      wrong: 'SELECT DISTINCT customer_name FROM customers c JOIN orders o ON c.id = o.customer_id;',
      right: 'SELECT customer_name FROM customers WHERE EXISTS (SELECT 1 FROM orders WHERE customer_id = customers.id);',
    },
    prevention: 'If you need DISTINCT, ask why duplicates exist. Often it\'s a many-to-many join issue.',
    severity: 'medium',
    category: 'correctness',
  },
  {
    id: 'subquery-in-select',
    name: 'Correlated Subquery in SELECT',
    patterns: [
      /SELECT\s+.*\(\s*SELECT\s+.*FROM\s+\w+\s+WHERE/i,
    ],
    issue: 'Correlated subqueries in SELECT execute once per row, causing O(n²) performance.',
    correction: 'Rewrite as a JOIN or use window functions.',
    realWorldImpact: 'A report with 10,000 rows and a correlated subquery runs 10,000+ queries. What should take 100ms takes 30+ seconds.',
    example: {
      wrong: 'SELECT name, (SELECT COUNT(*) FROM orders WHERE customer_id = c.id) FROM customers c;',
      right: 'SELECT c.name, COUNT(o.id) FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name;',
    },
    prevention: 'Profile queries with EXPLAIN. Look for "dependent subquery" warnings.',
    severity: 'high',
    category: 'performance',
  },
  {
    id: 'or-vs-union',
    name: 'Multiple OR Conditions',
    patterns: [
      /WHERE.*\bOR\b.*\bOR\b.*\bOR\b/i,
    ],
    issue: 'Multiple OR conditions often prevent index usage and create complex execution plans.',
    correction: 'Use IN clause or UNION ALL for better index utilization.',
    realWorldImpact: 'OR conditions on different columns prevent index intersection in many databases, causing full table scans.',
    example: {
      wrong: "SELECT * FROM products WHERE category = 'A' OR category = 'B' OR category = 'C';",
      right: "SELECT * FROM products WHERE category IN ('A', 'B', 'C');",
    },
    prevention: 'Use IN for same-column conditions. Consider UNION ALL for cross-column OR logic.',
    severity: 'medium',
    category: 'performance',
  },
  {
    id: 'count-star-vs-column',
    name: 'COUNT(*) vs COUNT(column) Confusion',
    patterns: [
      /COUNT\s*\(\s*\w+\s*\)/i,
    ],
    issue: 'COUNT(column) ignores NULLs, which may not be intended. COUNT(*) counts all rows.',
    correction: 'Use COUNT(*) for row counts, COUNT(column) only when NULL exclusion is intentional.',
    realWorldImpact: 'Reports showing "500 orders" when COUNT(discount_code) was used miss the 200 orders without discounts, causing incorrect business decisions.',
    example: {
      wrong: 'SELECT COUNT(email) FROM users; -- excludes users without email',
      right: 'SELECT COUNT(*) FROM users; -- counts all users',
    },
    prevention: 'Be explicit about intent. Add comments explaining why COUNT(column) is used.',
    severity: 'medium',
    category: 'correctness',
  },
  {
    id: 'missing-index-hint',
    name: 'Filtering on Non-indexed Column',
    patterns: [
      /WHERE\s+(created_at|updated_at|status|type|category|is_active|is_deleted)\s*(=|>|<|LIKE)/i,
    ],
    issue: 'Frequently filtered columns without indexes cause full table scans.',
    correction: 'Create indexes on columns used in WHERE, JOIN, and ORDER BY clauses.',
    realWorldImpact: 'A missing index on a datetime filter can make a "get recent orders" query 1000x slower as the table grows.',
    example: {
      wrong: "-- No index on 'status'\nSELECT * FROM orders WHERE status = 'pending';",
      right: "-- After: CREATE INDEX idx_orders_status ON orders(status);\nSELECT * FROM orders WHERE status = 'pending';",
    },
    prevention: 'Use EXPLAIN to check query plans. Monitor slow query logs. Create composite indexes for common filter combinations.',
    severity: 'high',
    category: 'performance',
  },
];

// Helper function to detect mistakes in a query
export function detectMistakes(query: string): SQLMistake[] {
  const detectedMistakes: SQLMistake[] = [];
  
  for (const mistake of commonSQLMistakes) {
    for (const pattern of mistake.patterns) {
      if (pattern.test(query)) {
        detectedMistakes.push(mistake);
        break; // Only add each mistake once
      }
    }
  }
  
  return detectedMistakes;
}

// Get mistake by ID
export function getMistakeById(id: string): SQLMistake | undefined {
  return commonSQLMistakes.find(m => m.id === id);
}

// Get mistakes by category
export function getMistakesByCategory(category: SQLMistake['category']): SQLMistake[] {
  return commonSQLMistakes.filter(m => m.category === category);
}

// Get mistakes by severity
export function getMistakesBySeverity(severity: SQLMistake['severity']): SQLMistake[] {
  return commonSQLMistakes.filter(m => m.severity === severity);
}
