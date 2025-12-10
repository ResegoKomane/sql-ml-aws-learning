// data/commonMistakes.ts

export interface SQLMistake {
  id: string;
  name: string;
  pattern: string[];
  issue: string;
  correction: string;
  realWorldImpact: string;
  example: {
    wrong: string;
    right: string;
  };
  prevention: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export const commonSQLMistakes: SQLMistake[] = [
  {
    id: 'using-select-asterisk',
    name: 'Using SELECT *',
    pattern: ['select *'],
    issue: 'SELECT * fetches ALL columns including those you don\'t need',
    correction: 'Always explicitly list only the columns you need',
    realWorldImpact: 'Performance bottleneck - unnecessary data transfer, larger result sets, slower queries on large tables',
    example: {
      wrong: 'SELECT * FROM users;',
      right: 'SELECT id, name, email FROM users;'
    },
    prevention: 'In production, ALWAYS explicitly list columns. Never use SELECT * except in development',
    severity: 'high'
  },
  {
    id: 'missing-where-clause',
    name: 'Missing WHERE Clause',
    pattern: ['select', 'from', 'order by'],
    issue: 'Query returns ALL rows instead of filtering specific ones',
    correction: 'Add WHERE clause to filter results to only needed rows',
    realWorldImpact: 'Can cause massive data retrieval, unnecessary server load, slow application response',
    example: {
      wrong: 'SELECT * FROM orders ORDER BY date DESC LIMIT 10;',
      right: 'SELECT * FROM orders WHERE customer_id = 123 ORDER BY date DESC LIMIT 10;'
    },
    prevention: 'Always think: "Do I need ALL rows?" If not, add a WHERE clause',
    severity: 'critical'
  },
  {
    id: 'incorrect-where-syntax',
    name: 'Incorrect WHERE Condition',
    pattern: ['where', '!='],
    issue: 'WHERE condition syntax is incorrect or doesn\'t filter properly',
    correction: 'Verify your WHERE clause uses correct operators and logic',
    realWorldImpact: 'Returns wrong data, can cause silent bugs that are hard to detect',
    example: {
      wrong: 'SELECT * FROM users WHERE status = "active";',
      right: 'SELECT * FROM users WHERE status = \'active\';'
    },
    prevention: 'Use single quotes for strings, test your WHERE clause separately',
    severity: 'high'
  },
  {
    id: 'missing-join-relationship',
    name: 'Missing JOIN for Related Tables',
    pattern: ['from', 'join'],
    issue: 'Querying multiple tables but not properly joining them',
    correction: 'Use JOIN to explicitly connect related tables',
    realWorldImpact: 'Returns incomplete or incorrect data, Cartesian product creates huge result sets',
    example: {
      wrong: 'SELECT users.name, orders.total FROM users, orders;',
      right: 'SELECT users.name, orders.total FROM users JOIN orders ON users.id = orders.user_id;'
    },
    prevention: 'When querying multiple tables, always use explicit JOIN syntax',
    severity: 'critical'
  },
  {
    id: 'type-mismatch-comparison',
    name: 'Type Mismatch in Comparison',
    pattern: ['where', '='],
    issue: 'Comparing values of different data types',
    correction: 'Ensure both sides of comparison are same type',
    realWorldImpact: 'May not find rows, unexpected NULL results, performance degradation from type conversion',
    example: {
      wrong: 'SELECT * FROM users WHERE user_id = "123";',
      right: 'SELECT * FROM users WHERE user_id = 123;'
    },
    prevention: 'Know your column data types, avoid quotes around numbers',
    severity: 'high'
  },
  {
    id: 'using-like-inefficiently',
    name: 'Inefficient LIKE Usage',
    pattern: ['like', '%'],
    issue: 'LIKE with leading % prevents index usage',
    correction: 'Avoid leading wildcards when possible, or use ILIKE with proper indexes',
    realWorldImpact: 'Full table scan required, query becomes very slow on large tables',
    example: {
      wrong: 'SELECT * FROM products WHERE name LIKE \'%lamp\';',
      right: 'SELECT * FROM products WHERE name LIKE \'lamp%\';'
    },
    prevention: 'Use leading % only when necessary, consider full-text search for complex text matching',
    severity: 'medium'
  },
  {
    id: 'n-plus-one-problem',
    name: 'N+1 Query Problem',
    pattern: ['select', 'from'],
    issue: 'Running one query for each row instead of fetching all at once',
    correction: 'Use JOIN or subqueries to fetch related data in single query',
    realWorldImpact: 'Massive performance degradation, timeouts, database overload',
    example: {
      wrong: 'Get user, then for each user do: SELECT * FROM orders WHERE user_id = ?',
      right: 'SELECT users.*, orders.* FROM users JOIN orders ON users.id = orders.user_id'
    },
    prevention: 'Avoid loops that execute queries. Use JOINs or batch queries',
    severity: 'critical'
  },
  {
    id: 'forgetting-group-by',
    name: 'Forgetting GROUP BY',
    pattern: ['select', 'count'],
    issue: 'Using aggregate function without GROUP BY',
    correction: 'Add GROUP BY for all non-aggregated columns',
    realWorldImpact: 'Returns incorrect aggregations, database may error',
    example: {
      wrong: 'SELECT user_id, COUNT(*) FROM orders;',
      right: 'SELECT user_id, COUNT(*) FROM orders GROUP BY user_id;'
    },
    prevention: 'When using COUNT/SUM/AVG, always include GROUP BY',
    severity: 'critical'
  },
  {
    id: 'logic-error-and-or',
    name: 'Logic Error with AND/OR',
    pattern: ['and', 'or'],
    issue: 'Incorrect use of AND/OR changes filter meaning',
    correction: 'Use parentheses to clarify intent, AND has higher precedence than OR',
    realWorldImpact: 'Wrong rows returned, data quality issues',
    example: {
      wrong: 'WHERE status = \'active\' AND type = \'premium\' OR verified = true;',
      right: 'WHERE (status = \'active\' AND type = \'premium\') OR verified = true;'
    },
    prevention: 'Use parentheses even when not required, for clarity',
    severity: 'high'
  },
  {
    id: 'comparing-with-null',
    name: 'Comparing with NULL Incorrectly',
    pattern: ['null', '=', 'where'],
    issue: 'Using = NULL instead of IS NULL',
    correction: 'Always use IS NULL or IS NOT NULL',
    realWorldImpact: 'No results returned, NULL rows excluded from queries',
    example: {
      wrong: 'SELECT * FROM users WHERE email = NULL;',
      right: 'SELECT * FROM users WHERE email IS NULL;'
    },
    prevention: 'Never use = with NULL. Always use IS NULL or IS NOT NULL',
    severity: 'high'
  },
  {
    id: 'missing-indexes',
    name: 'Not Using Indexes',
    pattern: ['where', 'order by'],
    issue: 'Querying on columns without indexes',
    correction: 'Create indexes on frequently queried/filtered columns',
    realWorldImpact: 'Query becomes 10-100x slower as data grows, database CPU overload',
    example: {
      wrong: 'CREATE TABLE users (id INT, email VARCHAR(255), created_at DATE);',
      right: 'CREATE TABLE users (id INT PRIMARY KEY, email VARCHAR(255) UNIQUE, created_at DATE); CREATE INDEX idx_email ON users(email);'
    },
    prevention: 'Index: primary keys, foreign keys, frequently filtered/sorted columns',
    severity: 'high'
  },
  {
    id: 'implicit-casting',
    name: 'Implicit Type Casting',
    pattern: ['select', 'where'],
    issue: 'Relying on automatic type conversion',
    correction: 'Explicitly cast types when needed',
    realWorldImpact: 'Performance issues, unexpected behavior across databases',
    example: {
      wrong: 'SELECT * FROM orders WHERE order_date = "2024-01-15"',
      right: 'SELECT * FROM orders WHERE order_date = \'2024-01-15\'::DATE'
    },
    prevention: 'Use explicit CAST() or :: operator',
    severity: 'medium'
  },
  {
    id: 'unused-temp-tables',
    name: 'Creating Unnecessary Temporary Tables',
    pattern: ['create temporary table', 'temp'],
    issue: 'Creating temp tables when subqueries or CTEs would suffice',
    correction: 'Use subqueries, CTEs (WITH clause), or views instead',
    realWorldImpact: 'Unnecessary disk I/O, slower performance, more complexity',
    example: {
      wrong: 'CREATE TEMP TABLE active_users AS SELECT * FROM users WHERE status = \'active\'; SELECT * FROM active_users;',
      right: 'SELECT * FROM (SELECT * FROM users WHERE status = \'active\') AS active_users;'
    },
    prevention: 'Use CTEs and subqueries. Only create temp tables for complex, multi-step operations',
    severity: 'low'
  },
  {
    id: 'hardcoded-values',
    name: 'Hardcoded Values in Queries',
    pattern: ['where', '='],
    issue: 'Hardcoding values instead of using parameters',
    correction: 'Use parameterized queries with placeholders',
    realWorldImpact: 'SQL injection vulnerability, security risk, can\'t reuse queries',
    example: {
      wrong: 'query = "SELECT * FROM users WHERE id = " + user_id',
      right: 'query = "SELECT * FROM users WHERE id = $1"; execute(query, [user_id])'
    },
    prevention: 'ALWAYS use parameterized queries, NEVER string concatenation',
    severity: 'critical'
  },
  {
    id: 'ignoring-collation',
    name: 'Ignoring Collation in String Comparisons',
    pattern: ['where', 'like'],
    issue: 'String comparison failing due to case sensitivity',
    correction: 'Use ILIKE or LOWER() for case-insensitive comparisons',
    realWorldImpact: 'Missing rows because of case differences',
    example: {
      wrong: 'SELECT * FROM users WHERE name = \'John\'; -- Misses \'john\', \'JOHN\'',
      right: 'SELECT * FROM users WHERE LOWER(name) = LOWER(\'John\');'
    },
    prevention: 'Use LOWER() for case-insensitive, or ILIKE in PostgreSQL',
    severity: 'medium'
  }
];
