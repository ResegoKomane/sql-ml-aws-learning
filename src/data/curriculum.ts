// Curriculum Data - Complete Learning Path for SQL, ML, AWS, and Database Mastery

export interface ContentSection {
  title: string;
  content: string;
  codeExample?: {
    language: string;
    code: string;
    explanation?: string;
  };
  tip?: string;
  warning?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Exercise {
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  language: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'theory' | 'lab' | 'capstone';
  objectives: string[];
  content: ContentSection[];
  quiz?: QuizQuestion[];
  exercise?: Exercise;
}

export interface Phase {
  id: string;
  order: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  prerequisite: string | null;
  estimatedHours: number;
  lessons: Lesson[];
}

export const curriculum: Phase[] = [
  // ==================== PHASE 1: DATABASE FUNDAMENTALS ====================
  {
    id: 'phase-1-database-fundamentals',
    order: 1,
    title: 'Database Fundamentals',
    description: 'Master the core concepts of databases, understand different types, and write your first SQL queries.',
    color: '#00f5ff',
    icon: 'Database',
    prerequisite: null,
    estimatedHours: 15,
    lessons: [
      {
        id: 'lesson-1-1-what-is-database',
        title: 'What is a Database?',
        description: 'Understand the fundamental concept of databases and why they are essential for modern applications.',
        duration: '45 min',
        type: 'theory',
        objectives: [
          'Define what a database is and its purpose',
          'Understand the role of Database Management Systems (DBMS)',
          'Identify real-world applications of databases',
          'Recognize the advantages of databases over file systems'
        ],
        content: [
          {
            title: 'Introduction to Databases',
            content: `A **database** is an organized collection of structured data stored electronically. Think of it as a sophisticated filing cabinet that can store millions of records and retrieve any piece of information in milliseconds.

Every time you use a banking app, scroll through social media, or shop online, you're interacting with databases. They form the backbone of virtually every modern application.

Databases solve the fundamental problem of how to store, organize, and retrieve large amounts of data efficiently. Without them, applications would need to read through entire files to find single pieces of information.`,
            tip: 'A good way to think about databases: they are like spreadsheets on steroids - with rules, relationships, and the ability to handle millions of rows efficiently.'
          },
          {
            title: 'Database Management Systems (DBMS)',
            content: `A **DBMS** is software that manages databases. It acts as an intermediary between users and the database, handling all the complex operations behind the scenes.

Popular DBMS options include:
- **PostgreSQL** - Open-source, feature-rich, highly reliable
- **MySQL** - Widely used, great for web applications
- **SQLite** - Lightweight, file-based, perfect for mobile apps
- **Microsoft SQL Server** - Enterprise-grade, Windows-focused
- **Oracle** - Enterprise standard, powerful but complex

The DBMS handles critical tasks like ensuring data integrity, managing concurrent access from multiple users, backup and recovery, and security.`,
            codeExample: {
              language: 'sql',
              code: `-- Connecting to a PostgreSQL database
-- This is handled by the DBMS

-- The DBMS processes your queries
SELECT * FROM users WHERE active = true;

-- The DBMS returns results efficiently
-- even from tables with millions of rows`,
              explanation: 'The DBMS interprets your SQL commands and efficiently retrieves or modifies data.'
            }
          },
          {
            title: 'Databases vs File Systems',
            content: `Before databases, applications stored data in flat files. Here's why databases are superior:

**Data Redundancy Control**: Databases prevent duplicate data across your system. In file systems, the same customer info might be stored in 10 different files.

**Data Integrity**: Databases enforce rules (constraints) to ensure data accuracy. A file system cannot prevent invalid data.

**Concurrent Access**: Multiple users can safely read and write simultaneously. File systems create conflicts when two users edit the same file.

**Security**: Databases offer granular permissions - different users can have different access levels. File systems typically offer all-or-nothing access.

**Query Capability**: Need to find all orders over $1000 from last month? Databases can answer in milliseconds. With files, you'd write custom code to scan everything.`,
            warning: 'Never store important business data in spreadsheets or text files for production systems. Databases exist because files cannot handle real-world data requirements.'
          },
          {
            title: 'Real-World Database Applications',
            content: `Databases power virtually every digital service you use:

**Banking & Finance**: Every transaction, balance check, and transfer involves database operations. Banks process millions of transactions daily with zero tolerance for errors.

**E-commerce**: Amazon's catalog, your cart, order history, and recommendations all live in databases. During peak sales, they handle thousands of orders per second.

**Social Media**: Your posts, friends, likes, and messages are stored in distributed databases designed to handle billions of users.

**Healthcare**: Patient records, prescriptions, and medical histories require databases that ensure privacy and availability.

**Transportation**: Uber matches riders with drivers using real-time database queries that consider location, availability, and preferences.`
          }
        ],
        quiz: [
          {
            id: 'q1-1-1',
            question: 'What is the primary purpose of a database?',
            options: [
              'To make computers run faster',
              'To organize and efficiently store/retrieve data',
              'To create websites',
              'To replace spreadsheets entirely'
            ],
            correctAnswer: 1,
            explanation: 'Databases are designed to organize data and enable efficient storage and retrieval. While they can work with websites and are more powerful than spreadsheets, their core purpose is data organization and access.'
          },
          {
            id: 'q1-1-2',
            question: 'What does DBMS stand for?',
            options: [
              'Data Base Memory System',
              'Digital Business Management Software',
              'Database Management System',
              'Data Backup and Migration Service'
            ],
            correctAnswer: 2,
            explanation: 'DBMS stands for Database Management System - software that manages all database operations including storage, retrieval, security, and integrity.'
          },
          {
            id: 'q1-1-3',
            question: 'Which is NOT an advantage of databases over file systems?',
            options: [
              'Better concurrent access handling',
              'Enforced data integrity',
              'Simpler to set up initially',
              'Superior query capabilities'
            ],
            correctAnswer: 2,
            explanation: 'Databases are actually more complex to set up than simple file systems. However, they offer superior concurrent access, data integrity, and querying capabilities that make the extra setup worthwhile.'
          }
        ]
      },
      {
        id: 'lesson-1-2-relational-vs-nonrelational',
        title: 'Relational vs Non-Relational Databases',
        description: 'Learn the differences between SQL and NoSQL databases and when to use each type.',
        duration: '1 hour',
        type: 'theory',
        objectives: [
          'Understand the structure of relational databases',
          'Learn about different types of NoSQL databases',
          'Compare the strengths and weaknesses of each approach',
          'Make informed decisions about which database type to use'
        ],
        content: [
          {
            title: 'Relational Databases (SQL)',
            content: `**Relational databases** organize data into tables with rows and columns, similar to spreadsheets but with powerful relationships between tables.

Key characteristics:
- **Structured data** with predefined schemas
- **Tables** (also called relations) hold data
- **Rows** represent individual records
- **Columns** represent attributes/fields
- **Primary keys** uniquely identify each row
- **Foreign keys** create relationships between tables

Relational databases use **SQL (Structured Query Language)** for all operations. SQL has been the standard for decades and is incredibly powerful.`,
            codeExample: {
              language: 'sql',
              code: `-- A typical relational database structure
-- Customers table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255) UNIQUE
);

-- Orders table with relationship to customers
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    order_date DATE,
    total DECIMAL(10, 2)
);`,
              explanation: 'Tables are related through foreign keys. The orders table references the customers table, creating a relationship.'
            }
          },
          {
            title: 'Non-Relational Databases (NoSQL)',
            content: `**NoSQL databases** break from the traditional table structure. The term stands for "Not Only SQL" - they may use SQL-like queries but aren't limited to relational structures.

**Document Databases** (MongoDB, CouchDB):
Store data as flexible JSON-like documents. Perfect for content management, user profiles, and catalogs where structure varies.

**Key-Value Stores** (Redis, DynamoDB):
Simple but lightning-fast. Data is stored as key-value pairs. Ideal for caching, sessions, and real-time applications.

**Column-Family Stores** (Cassandra, HBase):
Optimize for reading and writing large amounts of data across distributed systems. Used by Netflix, Instagram, and Apple.

**Graph Databases** (Neo4j, Amazon Neptune):
Store data as nodes and relationships. Perfect for social networks, recommendation engines, and fraud detection.`,
            codeExample: {
              language: 'javascript',
              code: `// MongoDB document example
{
  "_id": "user_123",
  "name": "Sarah Connor",
  "email": "sarah@example.com",
  "addresses": [
    {
      "type": "home",
      "city": "Los Angeles",
      "zip": "90001"
    },
    {
      "type": "work", 
      "city": "San Francisco",
      "zip": "94102"
    }
  ],
  "orders": ["order_456", "order_789"]
}`,
              explanation: 'Document databases store nested, flexible structures. No need to define the schema upfront - documents can have different fields.'
            }
          },
          {
            title: 'When to Use Each Type',
            content: `**Choose Relational (SQL) when:**
- Your data has clear, consistent structure
- You need complex queries with JOINs
- Data integrity is critical (banking, healthcare)
- You need ACID transactions
- Your relationships between data are important

**Choose NoSQL when:**
- Your data structure varies or evolves frequently
- You need horizontal scaling across many servers
- You're handling massive volumes of data
- Speed is prioritized over consistency
- Your data is naturally document-like or graph-like

**Real-world example:**
An e-commerce platform might use PostgreSQL for orders and payments (need ACID guarantees) but MongoDB for the product catalog (flexible attributes) and Redis for session caching (speed).`,
            tip: 'Many modern applications use both SQL and NoSQL databases together, choosing the right tool for each specific need. This is called "polyglot persistence."'
          }
        ],
        quiz: [
          {
            id: 'q1-2-1',
            question: 'What structure do relational databases use to organize data?',
            options: [
              'Documents',
              'Key-value pairs',
              'Tables with rows and columns',
              'Graphs with nodes and edges'
            ],
            correctAnswer: 2,
            explanation: 'Relational databases organize data into tables (also called relations) consisting of rows (records) and columns (attributes).'
          },
          {
            id: 'q1-2-2',
            question: 'Which NoSQL database type would be best for storing user social connections?',
            options: [
              'Document database',
              'Key-value store',
              'Column-family store',
              'Graph database'
            ],
            correctAnswer: 3,
            explanation: 'Graph databases excel at storing and querying relationships, making them ideal for social networks where user connections (friendships, follows) are the primary data model.'
          },
          {
            id: 'q1-2-3',
            question: 'When would you choose a relational database over NoSQL?',
            options: [
              'When you need maximum write speed',
              'When your data structure changes frequently',
              'When data integrity and ACID transactions are critical',
              'When you need to scale to thousands of servers'
            ],
            correctAnswer: 2,
            explanation: 'Relational databases excel at maintaining data integrity through ACID transactions, making them the right choice for critical applications like banking and healthcare.'
          }
        ]
      },
      {
        id: 'lesson-1-3-acid-principles',
        title: 'ACID Principles',
        description: 'Master the four properties that guarantee reliable database transactions.',
        duration: '45 min',
        type: 'theory',
        objectives: [
          'Understand each ACID property in depth',
          'Recognize why ACID matters for data reliability',
          'Identify scenarios where ACID is critical',
          'Learn how databases implement ACID guarantees'
        ],
        content: [
          {
            title: 'What is ACID?',
            content: `**ACID** is an acronym for four properties that guarantee database transactions are processed reliably:

- **A**tomicity
- **C**onsistency  
- **I**solation
- **D**urability

These properties work together to ensure that even when things go wrong (power failures, crashes, errors), your data remains accurate and consistent. ACID is what makes databases trustworthy for critical applications.

Think of transferring money between bank accounts: you absolutely cannot have money disappear from one account without appearing in another. ACID guarantees make this possible.`
          },
          {
            title: 'Atomicity',
            content: `**Atomicity** means a transaction is "all or nothing." Either every operation in the transaction succeeds, or none of them do.

Imagine transferring $100 from Account A to Account B:
1. Subtract $100 from Account A
2. Add $100 to Account B

If step 1 succeeds but step 2 fails (maybe there's a crash), atomicity ensures step 1 is rolled back. The money doesn't vanish.

This is achieved through **transaction logs** - the database records what it's about to do before actually doing it. If something fails, it can undo partially completed work.`,
            codeExample: {
              language: 'sql',
              code: `-- Atomic transaction example
BEGIN TRANSACTION;

UPDATE accounts 
SET balance = balance - 100 
WHERE account_id = 'A';

UPDATE accounts 
SET balance = balance + 100 
WHERE account_id = 'B';

-- If both succeed:
COMMIT;

-- If anything fails:
-- ROLLBACK; (automatic)`,
              explanation: 'The BEGIN/COMMIT wrap multiple operations into a single atomic unit. If any statement fails, all changes are rolled back.'
            }
          },
          {
            title: 'Consistency',
            content: `**Consistency** ensures that a transaction brings the database from one valid state to another valid state. All defined rules (constraints, triggers, cascades) must be satisfied.

For example, if you have a rule that account balances cannot be negative, consistency ensures no transaction can violate this rule.

Consistency is enforced through:
- **Constraints** (NOT NULL, UNIQUE, CHECK)
- **Foreign keys** (referential integrity)
- **Triggers** (custom validation logic)
- **Data types** (can't store text in a number field)

If a transaction would violate any rule, it's rejected entirely.`,
            codeExample: {
              language: 'sql',
              code: `-- Consistency through constraints
CREATE TABLE accounts (
    account_id VARCHAR(20) PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL,
    -- Ensure balance is never negative
    CONSTRAINT positive_balance CHECK (balance >= 0)
);

-- This transaction will FAIL due to consistency
BEGIN TRANSACTION;
UPDATE accounts 
SET balance = balance - 1000 
WHERE account_id = 'A';
-- If this makes balance negative, 
-- the entire transaction is rejected
COMMIT;`,
              explanation: 'The CHECK constraint ensures consistency - no transaction can leave an account with a negative balance.'
            }
          },
          {
            title: 'Isolation',
            content: `**Isolation** ensures that concurrent transactions don't interfere with each other. Each transaction executes as if it's the only one running.

Without isolation, you could have problems like:
- **Dirty reads**: Reading data that another transaction hasn't committed yet
- **Non-repeatable reads**: Getting different results when reading the same data twice
- **Phantom reads**: New rows appearing between reads

Databases offer different **isolation levels** balancing safety vs. performance:
1. **Read Uncommitted** (fastest, least safe)
2. **Read Committed** (common default)
3. **Repeatable Read** (safer)
4. **Serializable** (safest, slowest)`,
            warning: 'Higher isolation levels prevent more problems but reduce performance. Choose the right level for your use case - not every application needs serializable isolation.'
          },
          {
            title: 'Durability',
            content: `**Durability** guarantees that once a transaction is committed, it will survive permanently - even if the system crashes immediately after.

This is achieved through:
- **Write-ahead logging (WAL)**: Changes are written to a log before being applied
- **Checkpoints**: Periodic saves of the database state
- **Redundant storage**: Data may be written to multiple disks

When you get "Transaction successful" from your banking app, durability guarantees that transfer won't disappear even if the bank's servers crash one second later.`,
            tip: 'Durability is why databases can recover from crashes. The WAL (write-ahead log) contains everything needed to replay or undo recent operations.'
          }
        ],
        quiz: [
          {
            id: 'q1-3-1',
            question: 'What does the "A" in ACID stand for?',
            options: [
              'Availability',
              'Atomicity',
              'Authentication',
              'Accuracy'
            ],
            correctAnswer: 1,
            explanation: 'Atomicity means transactions are "all or nothing" - either all operations succeed, or none do.'
          },
          {
            id: 'q1-3-2',
            question: 'Which ACID property ensures data rules are never violated?',
            options: [
              'Atomicity',
              'Consistency',
              'Isolation',
              'Durability'
            ],
            correctAnswer: 1,
            explanation: 'Consistency ensures that every transaction brings the database from one valid state to another, maintaining all defined rules and constraints.'
          },
          {
            id: 'q1-3-3',
            question: 'Why is Durability important?',
            options: [
              'It makes queries faster',
              'It prevents unauthorized access',
              'It ensures committed data survives crashes',
              'It allows multiple users to access data'
            ],
            correctAnswer: 2,
            explanation: 'Durability guarantees that once a transaction is committed, the changes are permanent and will survive system failures.'
          }
        ]
      },
      {
        id: 'lesson-1-4-basic-sql-syntax',
        title: 'Basic SQL Syntax',
        description: 'Learn the fundamental structure of SQL statements and common keywords.',
        duration: '1 hour',
        type: 'theory',
        objectives: [
          'Understand SQL statement structure',
          'Learn essential SQL keywords',
          'Master SQL data types',
          'Write basic SQL statements correctly'
        ],
        content: [
          {
            title: 'Introduction to SQL',
            content: `**SQL (Structured Query Language)** is the standard language for interacting with relational databases. Despite being over 50 years old, it remains the most important language for data work.

SQL is:
- **Declarative**: You describe WHAT you want, not HOW to get it
- **Standardized**: Core syntax works across all major databases
- **Powerful**: From simple queries to complex analytics
- **Essential**: Required for data analysts, engineers, and scientists

SQL statements fall into categories:
- **DML (Data Manipulation)**: SELECT, INSERT, UPDATE, DELETE
- **DDL (Data Definition)**: CREATE, ALTER, DROP
- **DCL (Data Control)**: GRANT, REVOKE`,
            tip: 'SQL is pronounced either "sequel" or "S-Q-L" - both are correct. Use whichever your team prefers!'
          },
          {
            title: 'SQL Statement Structure',
            content: `Every SQL statement follows a predictable structure. Let's break down the most common statement - SELECT:

**Basic SELECT anatomy:**
\`\`\`
SELECT columns      -- What data to retrieve
FROM table          -- Where to get it
WHERE condition     -- Filter criteria
ORDER BY column     -- How to sort results
LIMIT number;       -- How many rows
\`\`\`

Key syntax rules:
- SQL keywords are conventionally UPPERCASE (but not required)
- Statements end with semicolons
- Whitespace is ignored (use it for readability)
- String values use single quotes: 'like this'
- Comments use -- for single line or /* */ for blocks`,
            codeExample: {
              language: 'sql',
              code: `-- A complete SELECT statement
SELECT 
    first_name,
    last_name,
    email,
    hire_date
FROM employees
WHERE department = 'Engineering'
    AND salary > 50000
ORDER BY hire_date DESC
LIMIT 10;`,
              explanation: 'This query retrieves specific columns from employees, filters by department and salary, sorts by hire date (newest first), and returns only 10 results.'
            }
          },
          {
            title: 'Essential SQL Keywords',
            content: `**Data Retrieval:**
- \`SELECT\` - Choose which columns to return
- \`FROM\` - Specify the source table
- \`WHERE\` - Filter rows based on conditions
- \`ORDER BY\` - Sort results (ASC or DESC)
- \`LIMIT\` - Restrict number of rows returned
- \`DISTINCT\` - Remove duplicate rows

**Filtering Operators:**
- \`=, !=, <, >, <=, >=\` - Comparisons
- \`AND, OR, NOT\` - Logical operators
- \`IN (list)\` - Match any value in list
- \`BETWEEN x AND y\` - Range matching
- \`LIKE\` - Pattern matching with wildcards
- \`IS NULL, IS NOT NULL\` - Null checks

**Data Modification:**
- \`INSERT INTO\` - Add new rows
- \`UPDATE\` - Modify existing rows
- \`DELETE FROM\` - Remove rows`,
            codeExample: {
              language: 'sql',
              code: `-- Various filtering examples
SELECT * FROM products WHERE price > 100;

SELECT * FROM users WHERE status IN ('active', 'pending');

SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';

SELECT * FROM customers WHERE name LIKE 'John%';  -- Starts with John

SELECT * FROM inventory WHERE quantity IS NOT NULL;`,
              explanation: 'SQL provides flexible filtering options. The % in LIKE is a wildcard matching any characters.'
            }
          },
          {
            title: 'SQL Data Types',
            content: `**Numeric Types:**
- \`INT / INTEGER\` - Whole numbers (-2 billion to 2 billion)
- \`BIGINT\` - Large whole numbers
- \`DECIMAL(p,s)\` - Exact decimals (for money!)
- \`FLOAT / REAL\` - Approximate decimals

**Text Types:**
- \`CHAR(n)\` - Fixed-length string
- \`VARCHAR(n)\` - Variable-length string up to n
- \`TEXT\` - Unlimited length text

**Date/Time Types:**
- \`DATE\` - Date only (YYYY-MM-DD)
- \`TIME\` - Time only (HH:MM:SS)
- \`TIMESTAMP\` - Date and time combined
- \`INTERVAL\` - Time duration

**Other Types:**
- \`BOOLEAN\` - TRUE/FALSE
- \`JSON\` - JSON data (PostgreSQL, MySQL)
- \`UUID\` - Unique identifiers`,
            warning: 'Never use FLOAT for money! Use DECIMAL instead. FLOAT has precision issues - $0.10 + $0.20 might not equal $0.30 exactly.'
          }
        ],
        quiz: [
          {
            id: 'q1-4-1',
            question: 'Which SQL keyword is used to filter rows?',
            options: [
              'SELECT',
              'FROM',
              'WHERE',
              'ORDER BY'
            ],
            correctAnswer: 2,
            explanation: 'WHERE is used to filter rows based on conditions. Only rows matching the WHERE criteria are returned.'
          },
          {
            id: 'q1-4-2',
            question: 'Which data type should you use for storing money?',
            options: [
              'FLOAT',
              'INTEGER',
              'DECIMAL',
              'TEXT'
            ],
            correctAnswer: 2,
            explanation: 'DECIMAL (or NUMERIC) provides exact precision, which is essential for money. FLOAT can have rounding errors that are unacceptable for financial data.'
          },
          {
            id: 'q1-4-3',
            question: 'What does the LIKE operator do?',
            options: [
              'Compares two numbers',
              'Pattern matching with wildcards',
              'Checks if a value exists',
              'Sorts results alphabetically'
            ],
            correctAnswer: 1,
            explanation: 'LIKE performs pattern matching using wildcards: % matches any sequence of characters, and _ matches any single character.'
          }
        ]
      },
      {
        id: 'lesson-1-5-create-insert-select-lab',
        title: 'CREATE, INSERT, SELECT Lab',
        description: 'Hands-on practice creating tables, inserting data, and querying your first database.',
        duration: '1.5 hours',
        type: 'lab',
        objectives: [
          'Create tables with appropriate data types',
          'Insert data into tables',
          'Write SELECT queries to retrieve data',
          'Use basic filtering and sorting'
        ],
        content: [
          {
            title: 'Creating Your First Table',
            content: `The CREATE TABLE statement defines a new table with its columns and data types. Each column must have a name and a type.

**Best practices for table creation:**
- Use descriptive, lowercase table names (plural: users, orders, products)
- Always define a PRIMARY KEY
- Choose appropriate data types
- Add constraints where needed (NOT NULL, UNIQUE)
- Include created_at timestamps for auditing`,
            codeExample: {
              language: 'sql',
              code: `-- Create a products table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity_in_stock INT DEFAULT 0,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
              explanation: 'SERIAL auto-generates unique IDs. DEFAULT provides fallback values. NOT NULL prevents empty values.'
            }
          },
          {
            title: 'Inserting Data',
            content: `INSERT adds new rows to a table. You can insert one row at a time or multiple rows in a single statement.

**Single row insert:**
\`\`\`sql
INSERT INTO table (columns) VALUES (values);
\`\`\`

**Multiple row insert:**
\`\`\`sql
INSERT INTO table (columns) VALUES 
    (row1_values),
    (row2_values),
    (row3_values);
\`\`\`

If inserting into ALL columns in order, you can omit the column list (but it's better practice to include it for clarity).`,
            codeExample: {
              language: 'sql',
              code: `-- Insert single product
INSERT INTO products (name, description, price, quantity_in_stock, category)
VALUES ('Wireless Mouse', 'Ergonomic design, 2.4GHz', 29.99, 150, 'Electronics');

-- Insert multiple products
INSERT INTO products (name, description, price, quantity_in_stock, category)
VALUES 
    ('Mechanical Keyboard', 'RGB backlit, cherry switches', 89.99, 75, 'Electronics'),
    ('USB-C Hub', '7-port hub with power delivery', 49.99, 200, 'Electronics'),
    ('Monitor Stand', 'Adjustable height, aluminum', 39.99, 50, 'Accessories');`,
              explanation: 'Always specify column names explicitly - it makes your code clearer and protects against table schema changes.'
            }
          },
          {
            title: 'Querying Data with SELECT',
            content: `SELECT retrieves data from one or more tables. Start simple and add complexity as needed.

**Building blocks:**
1. Start with \`SELECT *\` to see all columns
2. Replace \`*\` with specific columns
3. Add \`WHERE\` to filter
4. Add \`ORDER BY\` to sort
5. Add \`LIMIT\` to restrict results`,
            codeExample: {
              language: 'sql',
              code: `-- Get all products
SELECT * FROM products;

-- Get specific columns
SELECT name, price, quantity_in_stock FROM products;

-- Filter by category
SELECT name, price 
FROM products 
WHERE category = 'Electronics';

-- Filter with multiple conditions
SELECT name, price, quantity_in_stock
FROM products
WHERE category = 'Electronics' 
    AND price < 50 
    AND quantity_in_stock > 0;

-- Sort results
SELECT name, price
FROM products
WHERE category = 'Electronics'
ORDER BY price DESC;

-- Limit results
SELECT name, price
FROM products
ORDER BY price DESC
LIMIT 5;`,
              explanation: 'Build queries incrementally. Start simple, verify results, then add more conditions.'
            }
          },
          {
            title: 'Practice Exercises',
            content: `Now it's time to practice! Work through these exercises:

**Exercise 1:** Create a table called \`customers\` with:
- customer_id (auto-incrementing primary key)
- first_name (required, max 50 chars)
- last_name (required, max 50 chars)
- email (required, unique, max 255 chars)
- phone (optional, max 20 chars)
- created_at (timestamp, default to current time)

**Exercise 2:** Insert 5 customer records with realistic data.

**Exercise 3:** Write queries to:
- Get all customers
- Get only names and emails
- Find customers with @gmail.com emails
- Get the 3 most recently created customers`,
            tip: 'Try writing these queries yourself before looking at solutions. Making mistakes is part of learning!'
          }
        ],
        quiz: [
          {
            id: 'q1-5-1',
            question: 'What does SERIAL do in PostgreSQL?',
            options: [
              'Creates a text field',
              'Auto-generates unique incrementing numbers',
              'Encrypts the column',
              'Makes the column sortable'
            ],
            correctAnswer: 1,
            explanation: 'SERIAL is a PostgreSQL shorthand that creates an auto-incrementing integer column, perfect for primary keys.'
          },
          {
            id: 'q1-5-2',
            question: 'Which is the correct syntax to insert data?',
            options: [
              'ADD INTO table VALUES (...)',
              'INSERT table (columns) VALUES (...)',
              'INSERT INTO table (columns) VALUES (...)',
              'PUT INTO table VALUES (...)'
            ],
            correctAnswer: 2,
            explanation: 'The correct syntax is INSERT INTO followed by the table name, optional column list, VALUES keyword, and the values to insert.'
          },
          {
            id: 'q1-5-3',
            question: 'How do you select only unique values from a column?',
            options: [
              'SELECT UNIQUE column FROM table',
              'SELECT column FROM table UNIQUE',
              'SELECT DISTINCT column FROM table',
              'SELECT DIFFERENT column FROM table'
            ],
            correctAnswer: 2,
            explanation: 'SELECT DISTINCT removes duplicate values from the result set.'
          }
        ],
        exercise: {
          title: 'Create and Query a Customers Table',
          description: 'Create a customers table, insert sample data, and write queries to retrieve information.',
          language: 'sql',
          starterCode: `-- Exercise: Create a customers table and query it

-- Step 1: Create the customers table
-- Include: customer_id (primary key), first_name, last_name, 
-- email (unique), phone, created_at

CREATE TABLE customers (
    -- Add your columns here
);

-- Step 2: Insert at least 3 customers
INSERT INTO customers (first_name, last_name, email, phone)
VALUES
    -- Add your data here
;

-- Step 3: Write a query to find all customers with gmail addresses
-- (Hint: use LIKE with a wildcard)

SELECT 
    -- Complete this query
;`,
          solution: `-- Complete solution

-- Step 1: Create the customers table
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Insert sample customers
INSERT INTO customers (first_name, last_name, email, phone)
VALUES
    ('John', 'Smith', 'john.smith@gmail.com', '555-0101'),
    ('Sarah', 'Johnson', 'sarah.j@company.com', '555-0102'),
    ('Michael', 'Brown', 'mbrown@gmail.com', NULL),
    ('Emily', 'Davis', 'emily.d@gmail.com', '555-0104'),
    ('David', 'Wilson', 'dwilson@outlook.com', '555-0105');

-- Step 3: Find all customers with gmail addresses
SELECT 
    first_name,
    last_name,
    email
FROM customers
WHERE email LIKE '%@gmail.com'
ORDER BY last_name;`,
          hints: [
            'Use SERIAL PRIMARY KEY for auto-incrementing IDs',
            'NOT NULL ensures required fields cannot be empty',
            'UNIQUE prevents duplicate email addresses',
            'Use LIKE with % wildcard for pattern matching: %@gmail.com matches any email ending with @gmail.com'
          ]
        }
      },
      {
        id: 'lesson-1-6-capstone-inventory-database',
        title: 'Capstone: Build an Inventory Database',
        description: 'Apply everything you\'ve learned to create a complete inventory management database.',
        duration: '2 hours',
        type: 'capstone',
        objectives: [
          'Design a multi-table database schema',
          'Create related tables with foreign keys',
          'Write complex queries across multiple tables',
          'Solve real-world inventory problems with SQL'
        ],
        content: [
          {
            title: 'Project Overview',
            content: `Congratulations on reaching your first capstone! You'll build an inventory database for a small retail business.

**Business Requirements:**
- Track products with categories
- Manage suppliers who provide products
- Record inventory transactions (stock in/out)
- Query inventory levels and movement

**Tables to Create:**
1. \`categories\` - Product categories
2. \`suppliers\` - Vendor information  
3. \`products\` - Product catalog
4. \`inventory_transactions\` - Stock movements

This project tests everything from Phase 1: database design, SQL syntax, data types, and querying.`
          },
          {
            title: 'Schema Design',
            content: `Before writing SQL, let's design our schema:

**categories**
- category_id (PK)
- name
- description

**suppliers**
- supplier_id (PK)
- name
- contact_email
- phone
- address

**products**
- product_id (PK)
- name
- sku (unique product code)
- category_id (FK → categories)
- supplier_id (FK → suppliers)
- unit_price
- reorder_level

**inventory_transactions**
- transaction_id (PK)
- product_id (FK → products)
- quantity (positive = in, negative = out)
- transaction_type ('purchase', 'sale', 'adjustment')
- transaction_date
- notes`,
            codeExample: {
              language: 'sql',
              code: `-- Categories table
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Suppliers table
CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table with foreign keys
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(20) NOT NULL UNIQUE,
    category_id INT REFERENCES categories(category_id),
    supplier_id INT REFERENCES suppliers(supplier_id),
    unit_price DECIMAL(10, 2) NOT NULL,
    reorder_level INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory transactions table
CREATE TABLE inventory_transactions (
    transaction_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(product_id),
    quantity INT NOT NULL,
    transaction_type VARCHAR(20) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    CONSTRAINT valid_transaction_type 
        CHECK (transaction_type IN ('purchase', 'sale', 'adjustment'))
);`,
              explanation: 'Foreign keys (REFERENCES) create relationships between tables. The CHECK constraint ensures only valid transaction types are allowed.'
            }
          },
          {
            title: 'Sample Data & Queries',
            content: `After creating tables, you'll:
1. Insert sample categories, suppliers, and products
2. Record various inventory transactions
3. Write queries to answer business questions

**Business Questions to Answer:**
- What's the current stock level for each product?
- Which products are below reorder level?
- What's the total inventory value?
- Which supplier provides the most products?
- What were this month's stock movements?`,
            codeExample: {
              language: 'sql',
              code: `-- Calculate current stock for each product
-- (sum of all transactions)
SELECT 
    p.name,
    p.sku,
    COALESCE(SUM(it.quantity), 0) AS current_stock,
    p.reorder_level,
    CASE 
        WHEN COALESCE(SUM(it.quantity), 0) < p.reorder_level 
        THEN 'REORDER NEEDED'
        ELSE 'OK'
    END AS status
FROM products p
LEFT JOIN inventory_transactions it ON p.product_id = it.product_id
GROUP BY p.product_id, p.name, p.sku, p.reorder_level
ORDER BY current_stock ASC;

-- Total inventory value
SELECT 
    SUM(current_stock * unit_price) AS total_value
FROM (
    SELECT 
        p.product_id,
        p.unit_price,
        COALESCE(SUM(it.quantity), 0) AS current_stock
    FROM products p
    LEFT JOIN inventory_transactions it ON p.product_id = it.product_id
    GROUP BY p.product_id, p.unit_price
) AS inventory;`,
              explanation: 'These queries combine multiple concepts: JOINs, aggregations, CASE statements, and subqueries. Don\'t worry if this looks complex - you\'ll master these in Phase 2!'
            }
          }
        ],
        quiz: [
          {
            id: 'q1-6-1',
            question: 'What type of relationship exists between products and categories?',
            options: [
              'One-to-one',
              'Many-to-one (many products belong to one category)',
              'One-to-many',
              'Many-to-many'
            ],
            correctAnswer: 1,
            explanation: 'Many products can belong to one category, making this a many-to-one relationship (from the products perspective) or one-to-many (from the categories perspective).'
          },
          {
            id: 'q1-6-2',
            question: 'Why use positive and negative quantities in inventory_transactions?',
            options: [
              'To track errors',
              'To distinguish purchases (in) from sales (out) in a single column',
              'For sorting purposes',
              'Database requirement'
            ],
            correctAnswer: 1,
            explanation: 'Using positive numbers for stock coming in and negative for stock going out allows calculating current stock with a simple SUM of all transactions.'
          },
          {
            id: 'q1-6-3',
            question: 'What does the CHECK constraint do in our inventory_transactions table?',
            options: [
              'Verifies the product exists',
              'Calculates the total quantity',
              'Ensures transaction_type is only purchase, sale, or adjustment',
              'Checks for duplicate entries'
            ],
            correctAnswer: 2,
            explanation: 'The CHECK constraint validates that transaction_type can only be one of the three allowed values, preventing invalid data.'
          }
        ],
        exercise: {
          title: 'Complete Inventory Database',
          description: 'Build the full inventory database schema and write queries to analyze inventory.',
          language: 'sql',
          starterCode: `-- CAPSTONE: Inventory Database
-- Complete all sections below

-- SECTION 1: Create all four tables
-- (categories, suppliers, products, inventory_transactions)

-- Your CREATE TABLE statements here...


-- SECTION 2: Insert sample data
-- Add at least:
-- - 3 categories
-- - 2 suppliers  
-- - 5 products
-- - 10 inventory transactions

-- Your INSERT statements here...


-- SECTION 3: Write queries to answer:
-- 3a. Current stock level for each product

-- 3b. Products below reorder level

-- 3c. Total inventory value (stock * price)
`,
          solution: `-- CAPSTONE SOLUTION: Inventory Database

-- SECTION 1: Create Tables

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(20) NOT NULL UNIQUE,
    category_id INT REFERENCES categories(category_id),
    supplier_id INT REFERENCES suppliers(supplier_id),
    unit_price DECIMAL(10, 2) NOT NULL,
    reorder_level INT DEFAULT 10
);

CREATE TABLE inventory_transactions (
    transaction_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(product_id),
    quantity INT NOT NULL,
    transaction_type VARCHAR(20) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    CHECK (transaction_type IN ('purchase', 'sale', 'adjustment'))
);

-- SECTION 2: Sample Data

INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Office Supplies', 'Paper, pens, and office equipment'),
    ('Furniture', 'Desks, chairs, and storage');

INSERT INTO suppliers (name, contact_email, phone) VALUES
    ('Tech Distributors Inc', 'orders@techdist.com', '555-0200'),
    ('Office Essentials Co', 'sales@officeess.com', '555-0300');

INSERT INTO products (name, sku, category_id, supplier_id, unit_price, reorder_level) VALUES
    ('Wireless Mouse', 'ELEC-001', 1, 1, 29.99, 20),
    ('USB Keyboard', 'ELEC-002', 1, 1, 49.99, 15),
    ('A4 Paper (500 sheets)', 'OFF-001', 2, 2, 8.99, 50),
    ('Ballpoint Pens (12pk)', 'OFF-002', 2, 2, 5.99, 30),
    ('Desk Lamp', 'FURN-001', 3, 1, 34.99, 10);

INSERT INTO inventory_transactions (product_id, quantity, transaction_type, notes) VALUES
    (1, 100, 'purchase', 'Initial stock'),
    (2, 75, 'purchase', 'Initial stock'),
    (3, 200, 'purchase', 'Initial stock'),
    (4, 100, 'purchase', 'Initial stock'),
    (5, 25, 'purchase', 'Initial stock'),
    (1, -15, 'sale', 'Online order #1001'),
    (2, -8, 'sale', 'Store sale'),
    (3, -50, 'sale', 'Bulk corporate order'),
    (1, -5, 'adjustment', 'Damaged units removed'),
    (4, 50, 'purchase', 'Restocking');

-- SECTION 3: Queries

-- 3a. Current stock level for each product
SELECT 
    p.name,
    p.sku,
    SUM(it.quantity) AS current_stock
FROM products p
JOIN inventory_transactions it ON p.product_id = it.product_id
GROUP BY p.product_id, p.name, p.sku
ORDER BY p.name;

-- 3b. Products below reorder level
SELECT 
    p.name,
    p.sku,
    SUM(it.quantity) AS current_stock,
    p.reorder_level
FROM products p
JOIN inventory_transactions it ON p.product_id = it.product_id
GROUP BY p.product_id, p.name, p.sku, p.reorder_level
HAVING SUM(it.quantity) < p.reorder_level;

-- 3c. Total inventory value
SELECT 
    SUM(stock_value) AS total_inventory_value
FROM (
    SELECT 
        p.unit_price * SUM(it.quantity) AS stock_value
    FROM products p
    JOIN inventory_transactions it ON p.product_id = it.product_id
    GROUP BY p.product_id, p.unit_price
) AS values_by_product;`,
          hints: [
            'Create tables in order: categories and suppliers first (no dependencies), then products, then inventory_transactions',
            'Use SERIAL PRIMARY KEY for auto-incrementing IDs',
            'REFERENCES creates foreign key relationships',
            'For current stock, SUM all transaction quantities for each product',
            'HAVING filters groups (use after GROUP BY), WHERE filters rows (use before GROUP BY)'
          ]
        }
      }
    ]
  },

  // ==================== PHASE 2: ADVANCED SQL ====================
  {
    id: 'phase-2-advanced-sql',
    order: 2,
    title: 'Advanced SQL',
    description: 'Master complex queries including JOINs, aggregations, subqueries, and query optimization.',
    color: '#3b82f6',
    icon: 'Code',
    prerequisite: 'phase-1-database-fundamentals',
    estimatedHours: 20,
    lessons: [
      {
        id: 'lesson-2-1-joins',
        title: 'JOINs (INNER, LEFT, RIGHT, FULL)',
        description: 'Learn to combine data from multiple tables using different types of JOINs.',
        duration: '1.5 hours',
        type: 'theory',
        objectives: [
          'Understand the concept of table joins',
          'Master INNER JOIN for matching records',
          'Use LEFT and RIGHT JOIN for inclusive queries',
          'Apply FULL OUTER JOIN when needed'
        ],
        content: [
          {
            title: 'Why JOINs Matter',
            content: `In relational databases, data is split across multiple tables to avoid redundancy. **JOINs** let you combine related data from different tables into a single result.

Without JOINs, you'd need to run separate queries and combine results in your application code - inefficient and error-prone.

**The key to JOINs**: Tables are connected through keys. The foreign key in one table references the primary key in another.`,
            codeExample: {
              language: 'sql',
              code: `-- Example tables
-- customers: customer_id, name, email
-- orders: order_id, customer_id, total, order_date

-- Without JOIN (bad - two queries)
SELECT * FROM customers WHERE customer_id = 1;
SELECT * FROM orders WHERE customer_id = 1;

-- With JOIN (good - one query, combined result)
SELECT 
    c.name,
    c.email,
    o.order_id,
    o.total
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE c.customer_id = 1;`,
              explanation: 'JOINs combine related rows based on a condition (usually matching key values).'
            }
          },
          {
            title: 'INNER JOIN',
            content: `**INNER JOIN** returns only rows that have matching values in both tables. If a customer has no orders, they won't appear in the result.

This is the most common type of JOIN and is often just written as \`JOIN\`.

**Use INNER JOIN when:**
- You only want records that exist in both tables
- Missing relationships should be excluded`,
            codeExample: {
              language: 'sql',
              code: `-- INNER JOIN: Only customers WITH orders
SELECT 
    c.name AS customer_name,
    o.order_id,
    o.total,
    o.order_date
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
ORDER BY o.order_date DESC;

-- Result shows only customers who have placed orders
-- Customers with zero orders are NOT included`,
              explanation: 'Think of INNER JOIN as the intersection of two sets - only matching rows appear.'
            }
          },
          {
            title: 'LEFT JOIN',
            content: `**LEFT JOIN** returns ALL rows from the left table, plus matching rows from the right table. Non-matching rows get NULL values for right table columns.

**Use LEFT JOIN when:**
- You want all records from the primary (left) table
- Missing relationships should show as NULL, not be excluded
- Finding records without matches (WHERE right.id IS NULL)`,
            codeExample: {
              language: 'sql',
              code: `-- LEFT JOIN: All customers, even without orders
SELECT 
    c.name AS customer_name,
    c.email,
    o.order_id,
    o.total
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
ORDER BY o.total DESC NULLS LAST;

-- Customers without orders appear with NULL for order columns

-- Find customers who have NEVER ordered
SELECT 
    c.name,
    c.email
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`,
              explanation: 'LEFT JOIN keeps everything from the left table. The IS NULL check finds orphaned records.'
            }
          },
          {
            title: 'RIGHT JOIN and FULL OUTER JOIN',
            content: `**RIGHT JOIN** is the mirror of LEFT JOIN - all rows from the right table, plus matching rows from the left.

In practice, RIGHT JOIN is rarely used because you can always rewrite it as a LEFT JOIN by swapping table order.

**FULL OUTER JOIN** returns all rows from both tables, matching where possible and filling with NULLs where not.

**Use FULL OUTER JOIN when:**
- You need complete data from both tables
- You want to find mismatches in both directions`,
            codeExample: {
              language: 'sql',
              code: `-- FULL OUTER JOIN: All customers AND all orders
-- Even if some don't match
SELECT 
    c.name AS customer_name,
    o.order_id,
    o.total
FROM customers c
FULL OUTER JOIN orders o ON c.customer_id = o.customer_id;

-- Find mismatches in both directions
SELECT 
    c.name,
    o.order_id
FROM customers c
FULL OUTER JOIN orders o ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL OR o.customer_id IS NULL;`,
              explanation: 'FULL OUTER JOIN shows everything - think of it as combining LEFT JOIN and RIGHT JOIN results.'
            }
          },
          {
            title: 'Joining Multiple Tables',
            content: `Real queries often join three or more tables. Each JOIN adds another table to your result.

**Key tips for multi-table joins:**
- Join tables in a logical order
- Use table aliases for readability
- Be explicit about which table each column comes from
- Watch out for cartesian products (accidental cross joins)`,
            codeExample: {
              language: 'sql',
              code: `-- Join customers, orders, and products
SELECT 
    c.name AS customer_name,
    o.order_date,
    p.name AS product_name,
    oi.quantity,
    oi.unit_price,
    (oi.quantity * oi.unit_price) AS line_total
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date >= '2024-01-01'
ORDER BY o.order_date, c.name;`,
              explanation: 'Chain JOINs together, connecting each table through its relationship keys.'
            },
            tip: 'Always use table aliases (c, o, p) in multi-table queries. It makes SQL much more readable and prevents ambiguous column errors.'
          }
        ],
        quiz: [
          {
            id: 'q2-1-1',
            question: 'What does an INNER JOIN return?',
            options: [
              'All rows from both tables',
              'Only rows that have matches in both tables',
              'All rows from the left table',
              'All rows from the right table'
            ],
            correctAnswer: 1,
            explanation: 'INNER JOIN returns only the rows where the join condition is met in both tables - the intersection.'
          },
          {
            id: 'q2-1-2',
            question: 'Which JOIN type would you use to find customers who have never placed an order?',
            options: [
              'INNER JOIN',
              'LEFT JOIN with WHERE right_table.id IS NULL',
              'RIGHT JOIN',
              'CROSS JOIN'
            ],
            correctAnswer: 1,
            explanation: 'LEFT JOIN with WHERE order.order_id IS NULL shows customers (left table) without matching orders (right table = NULL).'
          },
          {
            id: 'q2-1-3',
            question: 'What happens when a LEFT JOIN finds no matching row in the right table?',
            options: [
              'The row is excluded from results',
              'An error is thrown',
              'The right table columns are filled with NULL',
              'The left table columns are filled with NULL'
            ],
            correctAnswer: 2,
            explanation: 'LEFT JOIN keeps all left table rows. When there is no match, columns from the right table are NULL.'
          }
        ],
        exercise: {
          title: 'Master JOINs with E-commerce Data',
          description: 'Practice different JOIN types on customers, orders, and products tables.',
          language: 'sql',
          starterCode: `-- Setup: customers, orders, order_items, products tables exist

-- Exercise 1: Get all orders with customer names (INNER JOIN)
-- Show: customer name, order_id, order_date, total


-- Exercise 2: Find customers who haven't ordered in 2024 (LEFT JOIN)
-- Show: customer name, email


-- Exercise 3: List products with their total quantity sold (JOIN + aggregation)
-- Include products with zero sales
-- Show: product name, total_quantity_sold`,
          solution: `-- Exercise 1: Orders with customer names
SELECT 
    c.name AS customer_name,
    o.order_id,
    o.order_date,
    o.total
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
ORDER BY o.order_date DESC;

-- Exercise 2: Customers without 2024 orders
SELECT 
    c.name,
    c.email
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id 
    AND o.order_date >= '2024-01-01'
WHERE o.order_id IS NULL;

-- Exercise 3: Products with total quantity sold
SELECT 
    p.name AS product_name,
    COALESCE(SUM(oi.quantity), 0) AS total_quantity_sold
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.name
ORDER BY total_quantity_sold DESC;`,
          hints: [
            'INNER JOIN = only matching rows from both tables',
            'LEFT JOIN keeps all rows from the first table; use WHERE right.column IS NULL to find non-matches',
            'Use COALESCE(SUM(...), 0) to show 0 instead of NULL for products with no sales',
            'When combining JOIN with aggregation, remember to GROUP BY appropriately'
          ]
        }
      },
      {
        id: 'lesson-2-2-aggregations',
        title: 'Aggregations & GROUP BY',
        description: 'Learn to summarize data using aggregate functions and grouping.',
        duration: '1.5 hours',
        type: 'theory',
        objectives: [
          'Master aggregate functions (COUNT, SUM, AVG, MIN, MAX)',
          'Group data effectively with GROUP BY',
          'Filter groups with HAVING',
          'Combine aggregations with JOINs'
        ],
        content: [
          {
            title: 'Aggregate Functions',
            content: `**Aggregate functions** perform calculations across multiple rows and return a single value.

**Common aggregates:**
- \`COUNT(*)\` - Number of rows
- \`COUNT(column)\` - Non-NULL values in column
- \`SUM(column)\` - Total of numeric values
- \`AVG(column)\` - Average (mean) value
- \`MIN(column)\` - Smallest value
- \`MAX(column)\` - Largest value

Without GROUP BY, aggregates operate on the entire result set.`,
            codeExample: {
              language: 'sql',
              code: `-- Aggregates without GROUP BY (whole table)
SELECT 
    COUNT(*) AS total_orders,
    SUM(total) AS revenue,
    AVG(total) AS avg_order_value,
    MIN(total) AS smallest_order,
    MAX(total) AS largest_order
FROM orders;

-- COUNT variations
SELECT 
    COUNT(*) AS all_rows,
    COUNT(phone) AS rows_with_phone,
    COUNT(DISTINCT city) AS unique_cities
FROM customers;`,
              explanation: 'COUNT(*) counts rows regardless of NULLs. COUNT(column) only counts non-NULL values. COUNT(DISTINCT) counts unique values.'
            }
          },
          {
            title: 'GROUP BY Basics',
            content: `**GROUP BY** splits rows into groups based on column values, then applies aggregates to each group separately.

**The rule**: Every column in SELECT must either be:
1. In the GROUP BY clause, OR
2. Inside an aggregate function

Think of it like this: you're collapsing many rows into one row per group, so non-grouped columns must be summarized somehow.`,
            codeExample: {
              language: 'sql',
              code: `-- Sales by category
SELECT 
    category,
    COUNT(*) AS num_products,
    SUM(quantity_sold) AS total_sold,
    AVG(price) AS avg_price
FROM products
GROUP BY category;

-- Monthly revenue
SELECT 
    DATE_TRUNC('month', order_date) AS month,
    COUNT(*) AS num_orders,
    SUM(total) AS revenue
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;`,
              explanation: 'Each unique value in GROUP BY columns creates a separate group. Aggregates are calculated within each group.'
            }
          },
          {
            title: 'Filtering with HAVING',
            content: `**WHERE** filters individual rows BEFORE grouping.
**HAVING** filters groups AFTER aggregation.

Common mistake: trying to use WHERE with aggregate functions. This fails because WHERE runs before GROUP BY.`,
            codeExample: {
              language: 'sql',
              code: `-- Find categories with more than 10 products
SELECT 
    category,
    COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING COUNT(*) > 10;  -- Filter AFTER grouping

-- Find high-spending customers (total > $1000)
SELECT 
    customer_id,
    SUM(total) AS total_spent
FROM orders
GROUP BY customer_id
HAVING SUM(total) > 1000
ORDER BY total_spent DESC;

-- Combining WHERE and HAVING
SELECT 
    category,
    AVG(price) AS avg_price
FROM products
WHERE active = true          -- Filter rows first
GROUP BY category
HAVING AVG(price) > 50;      -- Then filter groups`,
              explanation: 'WHERE filters rows before GROUP BY; HAVING filters groups after aggregation. Use both when needed.'
            },
            warning: 'Cannot use: WHERE COUNT(*) > 10. Use: HAVING COUNT(*) > 10. WHERE only works with individual row values, not aggregated results.'
          },
          {
            title: 'Multiple Grouping Levels',
            content: `You can group by multiple columns for more detailed breakdowns. The combination of all GROUP BY columns defines each group.`,
            codeExample: {
              language: 'sql',
              code: `-- Sales by category AND month
SELECT 
    category,
    DATE_TRUNC('month', sale_date) AS month,
    SUM(amount) AS sales,
    COUNT(*) AS transactions
FROM sales
GROUP BY category, DATE_TRUNC('month', sale_date)
ORDER BY category, month;

-- Customer orders by year
SELECT 
    c.name AS customer,
    EXTRACT(YEAR FROM o.order_date) AS year,
    COUNT(*) AS orders,
    SUM(o.total) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name, EXTRACT(YEAR FROM o.order_date)
ORDER BY customer, year;`,
              explanation: 'With multiple GROUP BY columns, you get one row for each unique combination.'
            },
            tip: 'When joining tables with GROUP BY, remember to include both the ID and any display columns (like name) in your GROUP BY clause.'
          }
        ],
        quiz: [
          {
            id: 'q2-2-1',
            question: 'What is the difference between WHERE and HAVING?',
            options: [
              'There is no difference',
              'WHERE filters rows before grouping; HAVING filters groups after aggregation',
              'HAVING is faster than WHERE',
              'WHERE only works with text; HAVING works with numbers'
            ],
            correctAnswer: 1,
            explanation: 'WHERE filters individual rows before GROUP BY runs. HAVING filters the aggregated groups after GROUP BY completes.'
          },
          {
            id: 'q2-2-2',
            question: 'What does COUNT(DISTINCT column) do?',
            options: [
              'Counts all rows',
              'Counts non-NULL values',
              'Counts unique non-NULL values',
              'Counts NULL values'
            ],
            correctAnswer: 2,
            explanation: 'COUNT(DISTINCT column) counts the number of unique non-NULL values in that column.'
          },
          {
            id: 'q2-2-3',
            question: 'Why would this query fail: SELECT category, COUNT(*) FROM products;',
            options: [
              'COUNT is not a valid function',
              'Missing WHERE clause',
              'category is not in GROUP BY or an aggregate',
              'Need to use HAVING'
            ],
            correctAnswer: 2,
            explanation: 'When using aggregates, all non-aggregated columns must be in GROUP BY. Here, category needs GROUP BY category.'
          }
        ],
        exercise: {
          title: 'Sales Analytics with Aggregations',
          description: 'Write queries to analyze sales data using aggregations and grouping.',
          language: 'sql',
          starterCode: `-- Tables: orders(order_id, customer_id, total, order_date)
--         order_items(item_id, order_id, product_id, quantity, price)
--         products(product_id, name, category)

-- 1. Find total revenue and average order value for 2024


-- 2. Get monthly sales summary (month, orders, revenue)


-- 3. Find top 5 customers by total spending


-- 4. Products that have sold more than 100 units`,
          solution: `-- 1. Revenue and average order value for 2024
SELECT 
    SUM(total) AS total_revenue,
    AVG(total) AS avg_order_value,
    COUNT(*) AS total_orders
FROM orders
WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';

-- 2. Monthly sales summary
SELECT 
    DATE_TRUNC('month', order_date) AS month,
    COUNT(*) AS num_orders,
    SUM(total) AS revenue
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;

-- 3. Top 5 customers by spending
SELECT 
    customer_id,
    COUNT(*) AS order_count,
    SUM(total) AS total_spent
FROM orders
GROUP BY customer_id
ORDER BY total_spent DESC
LIMIT 5;

-- 4. Products with 100+ units sold
SELECT 
    p.name AS product,
    SUM(oi.quantity) AS units_sold
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.name
HAVING SUM(oi.quantity) > 100
ORDER BY units_sold DESC;`,
          hints: [
            'Use DATE_TRUNC for grouping by month',
            'ORDER BY aggregate DESC + LIMIT for top N queries',
            'HAVING filters after GROUP BY - use it for aggregate conditions',
            'Join products and order_items to get product names with quantities'
          ]
        }
      },
      {
        id: 'lesson-2-3-subqueries-ctes',
        title: 'Subqueries & CTEs',
        description: 'Master nested queries and Common Table Expressions for complex data analysis.',
        duration: '1.5 hours',
        type: 'theory',
        objectives: [
          'Write subqueries in SELECT, FROM, and WHERE clauses',
          'Use Common Table Expressions (CTEs) for readable queries',
          'Understand correlated vs non-correlated subqueries',
          'Know when to use subqueries vs JOINs'
        ],
        content: [
          {
            title: 'Introduction to Subqueries',
            content: `A **subquery** is a query nested inside another query. They let you break complex problems into steps.

Subqueries can appear in:
- **SELECT clause** - Compute a value for each row
- **FROM clause** - Create a derived table
- **WHERE clause** - Filter based on another query's results

The inner query runs first, then its results are used by the outer query.`,
            codeExample: {
              language: 'sql',
              code: `-- Subquery in WHERE: Find orders above average
SELECT order_id, customer_id, total
FROM orders
WHERE total > (SELECT AVG(total) FROM orders);

-- The subquery calculates average once
-- Then main query uses that value for filtering`,
              explanation: 'The subquery (SELECT AVG(total) FROM orders) runs first and returns a single value. The outer query then uses that value.'
            }
          },
          {
            title: 'Subqueries in Different Clauses',
            content: `**WHERE subqueries** - Most common, filter based on computed values:

**FROM subqueries** - Create temporary tables to query from:

**SELECT subqueries** - Add computed columns (must return single value per row):`,
            codeExample: {
              language: 'sql',
              code: `-- WHERE: Customers who ordered a specific product
SELECT DISTINCT customer_id
FROM orders
WHERE order_id IN (
    SELECT order_id 
    FROM order_items 
    WHERE product_id = 100
);

-- FROM: Work with aggregated data
SELECT department, avg_salary
FROM (
    SELECT department, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
) AS dept_salaries
WHERE avg_salary > 75000;

-- SELECT: Add comparison column
SELECT 
    name,
    salary,
    salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg
FROM employees;`,
              explanation: 'Each subquery type serves different purposes. IN checks if values exist in a set. FROM creates derived tables. SELECT adds computed values.'
            }
          },
          {
            title: 'Common Table Expressions (CTEs)',
            content: `**CTEs** (WITH clause) let you name a subquery and reference it like a table. They make complex queries much more readable.

Benefits of CTEs:
- Break complex logic into named steps
- Reuse the same subquery multiple times
- Easier to read and maintain
- Can be recursive (for hierarchical data)`,
            codeExample: {
              language: 'sql',
              code: `-- CTE: Named, reusable subquery
WITH high_value_orders AS (
    SELECT customer_id, SUM(total) AS total_spent
    FROM orders
    GROUP BY customer_id
    HAVING SUM(total) > 5000
)
SELECT 
    c.name,
    c.email,
    hvo.total_spent
FROM customers c
JOIN high_value_orders hvo ON c.customer_id = hvo.customer_id;

-- Multiple CTEs
WITH 
monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', order_date) AS month,
        SUM(total) AS revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
),
avg_monthly AS (
    SELECT AVG(revenue) AS avg_revenue FROM monthly_sales
)
SELECT 
    month,
    revenue,
    (SELECT avg_revenue FROM avg_monthly) AS avg,
    revenue - (SELECT avg_revenue FROM avg_monthly) AS diff
FROM monthly_sales
ORDER BY month;`,
              explanation: 'CTEs defined in WITH can be referenced in the main query and even in other CTEs (if defined earlier).'
            },
            tip: 'When a query gets complicated, try writing it as CTEs first. Name each step clearly, then combine them in the final SELECT.'
          },
          {
            title: 'Correlated Subqueries',
            content: `A **correlated subquery** references columns from the outer query. It runs once for each row in the outer query (slower but sometimes necessary).

Non-correlated subqueries run once and return the same result for all outer rows.
Correlated subqueries run repeatedly, with different results based on each outer row.`,
            codeExample: {
              language: 'sql',
              code: `-- Correlated: Find each customer's most recent order
SELECT 
    c.name,
    o.order_id,
    o.order_date
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date = (
    SELECT MAX(order_date) 
    FROM orders 
    WHERE customer_id = c.customer_id  -- References outer query!
);

-- Alternative with CTE (often more efficient)
WITH latest_orders AS (
    SELECT customer_id, MAX(order_date) AS max_date
    FROM orders
    GROUP BY customer_id
)
SELECT 
    c.name,
    o.order_id,
    o.order_date
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN latest_orders lo ON o.customer_id = lo.customer_id 
    AND o.order_date = lo.max_date;`,
              explanation: 'Correlated subqueries reference outer columns (c.customer_id). They run per row, so CTEs or JOINs are often faster for large datasets.'
            },
            warning: 'Correlated subqueries can be slow on large tables because they run once per outer row. Consider rewriting with JOINs or CTEs when possible.'
          }
        ],
        quiz: [
          {
            id: 'q2-3-1',
            question: 'What is a CTE (Common Table Expression)?',
            options: [
              'A permanent table in the database',
              'A named temporary result set defined with WITH',
              'A type of index',
              'A stored procedure'
            ],
            correctAnswer: 1,
            explanation: 'A CTE is a temporary named result set created with the WITH clause. It exists only for the duration of the query.'
          },
          {
            id: 'q2-3-2',
            question: 'What makes a subquery "correlated"?',
            options: [
              'It uses aggregate functions',
              'It references columns from the outer query',
              'It returns multiple rows',
              'It uses DISTINCT'
            ],
            correctAnswer: 1,
            explanation: 'A correlated subquery references columns from the outer query, causing it to be re-evaluated for each row of the outer query.'
          },
          {
            id: 'q2-3-3',
            question: 'When would you choose a CTE over a subquery?',
            options: [
              'CTEs are always faster',
              'When you need to reference the same subquery multiple times',
              'CTEs use less memory',
              'Only for recursive queries'
            ],
            correctAnswer: 1,
            explanation: 'CTEs are particularly useful when you need to reference the same derived result multiple times, and they improve readability of complex queries.'
          }
        ],
        exercise: {
          title: 'Complex Queries with Subqueries and CTEs',
          description: 'Solve analytical problems using subqueries and CTEs.',
          language: 'sql',
          starterCode: `-- 1. Find products priced above category average
-- Hint: Use a correlated subquery or CTE


-- 2. Find customers whose first order was in 2024
-- Hint: Use MIN(order_date) in a subquery


-- 3. Using CTEs, calculate each customer's:
-- - total orders
-- - total spent  
-- - their rank by spending (top spender = 1)`,
          solution: `-- 1. Products priced above category average
WITH category_avg AS (
    SELECT category, AVG(price) AS avg_price
    FROM products
    GROUP BY category
)
SELECT p.name, p.category, p.price, ca.avg_price
FROM products p
JOIN category_avg ca ON p.category = ca.category
WHERE p.price > ca.avg_price;

-- 2. Customers whose first order was in 2024
SELECT c.customer_id, c.name, c.email
FROM customers c
WHERE c.customer_id IN (
    SELECT customer_id
    FROM orders
    GROUP BY customer_id
    HAVING MIN(order_date) >= '2024-01-01'
);

-- 3. Customer analysis with ranking
WITH customer_stats AS (
    SELECT 
        customer_id,
        COUNT(*) AS total_orders,
        SUM(total) AS total_spent
    FROM orders
    GROUP BY customer_id
)
SELECT 
    c.name,
    cs.total_orders,
    cs.total_spent,
    RANK() OVER (ORDER BY cs.total_spent DESC) AS spending_rank
FROM customers c
JOIN customer_stats cs ON c.customer_id = cs.customer_id
ORDER BY spending_rank;`,
          hints: [
            'For category average comparison, first calculate averages per category, then join back to products',
            'MIN(order_date) with GROUP BY and HAVING finds first orders meeting criteria',
            'Use RANK() OVER (ORDER BY ...) to assign rankings based on values'
          ]
        }
      },
      {
        id: 'lesson-2-4-indexes-optimization',
        title: 'Indexes & Query Optimization',
        description: 'Learn to speed up queries with indexes and understand query execution.',
        duration: '1 hour',
        type: 'theory',
        objectives: [
          'Understand how indexes work',
          'Create indexes for common query patterns',
          'Read and interpret EXPLAIN output',
          'Apply optimization best practices'
        ],
        content: [
          {
            title: 'What Are Indexes?',
            content: `An **index** is a data structure that speeds up data retrieval. Think of it like a book's index - instead of reading every page to find a topic, you look it up in the index.

Without indexes, the database must scan every row (full table scan) to find matches. With indexes, it can jump directly to relevant rows.

**Trade-offs:**
- Faster reads (SELECT, WHERE, JOIN)
- Slower writes (INSERT, UPDATE, DELETE must update indexes)
- Additional storage space`,
            codeExample: {
              language: 'sql',
              code: `-- Create an index on frequently searched columns
CREATE INDEX idx_orders_customer 
ON orders(customer_id);

CREATE INDEX idx_orders_date 
ON orders(order_date);

-- Composite index for common query patterns
CREATE INDEX idx_products_category_price 
ON products(category, price);

-- Unique index (also enforces uniqueness)
CREATE UNIQUE INDEX idx_users_email 
ON users(email);`,
              explanation: 'Index names typically start with idx_ and describe the table and columns. Composite indexes cover multiple columns.'
            }
          },
          {
            title: 'When to Create Indexes',
            content: `**Good candidates for indexing:**
- Columns used in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY
- Foreign key columns
- Columns with high selectivity (many unique values)

**Poor candidates:**
- Small tables (full scan is fast anyway)
- Columns with few unique values (boolean, status)
- Columns rarely used in queries
- Tables with very frequent writes`,
            codeExample: {
              language: 'sql',
              code: `-- Index helps this query
SELECT * FROM orders WHERE customer_id = 1234;
-- Without index: scans all rows
-- With index on customer_id: jumps directly to matches

-- Composite index order matters!
CREATE INDEX idx_name_date ON orders(customer_id, order_date);

-- This query can use the index:
SELECT * FROM orders WHERE customer_id = 1 AND order_date > '2024-01-01';

-- This query can PARTIALLY use the index:
SELECT * FROM orders WHERE customer_id = 1;

-- This query CANNOT use the index efficiently:
SELECT * FROM orders WHERE order_date > '2024-01-01';
-- (customer_id is not in the WHERE clause)`,
              explanation: 'Composite indexes work left-to-right. The query must use the leftmost column(s) to benefit from the index.'
            },
            warning: 'Don\'t create indexes on every column! Each index adds overhead to writes and storage. Index strategically based on your actual query patterns.'
          },
          {
            title: 'Using EXPLAIN',
            content: `**EXPLAIN** shows how the database will execute a query. It reveals whether indexes are being used and helps identify bottlenecks.

Key things to look for:
- **Seq Scan** (PostgreSQL) - Full table scan (often slow)
- **Index Scan** - Using an index (usually fast)
- **Nested Loop** - Joining tables one row at a time
- **Hash Join** - Building hash table for joins
- **Cost** - Estimated expense of the operation`,
            codeExample: {
              language: 'sql',
              code: `-- Analyze query execution
EXPLAIN SELECT * FROM orders WHERE customer_id = 1234;

-- Output might show:
-- Seq Scan on orders  (cost=0.00..15.00 rows=1 width=50)
--   Filter: (customer_id = 1234)

-- After adding index:
CREATE INDEX idx_orders_customer ON orders(customer_id);

EXPLAIN SELECT * FROM orders WHERE customer_id = 1234;
-- Output now shows:
-- Index Scan using idx_orders_customer on orders  (cost=0.00..8.27 rows=1)
--   Index Cond: (customer_id = 1234)

-- EXPLAIN ANALYZE actually runs the query and shows real timing
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 1234;`,
              explanation: 'EXPLAIN shows the plan; EXPLAIN ANALYZE executes it and shows actual timings. Lower cost = better.'
            }
          },
          {
            title: 'Optimization Best Practices',
            content: `**Query Writing:**
- Select only needed columns (avoid SELECT *)
- Add appropriate WHERE filters early
- Use LIMIT for large result sets
- Avoid functions on indexed columns in WHERE

**Index Strategy:**
- Index foreign keys
- Create composite indexes for common queries
- Monitor and remove unused indexes
- Rebuild fragmented indexes periodically

**General Tips:**
- Keep statistics updated (ANALYZE)
- Normalize appropriately (but don't over-normalize)
- Consider query caching for repeated queries`,
            codeExample: {
              language: 'sql',
              code: `-- BAD: Function prevents index usage
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';

-- GOOD: Use functional index or match case
CREATE INDEX idx_users_email_lower ON users(LOWER(email));
-- OR ensure consistent case in data

-- BAD: SELECT * fetches unnecessary columns
SELECT * FROM orders WHERE customer_id = 1;

-- GOOD: Select only what you need
SELECT order_id, total, order_date 
FROM orders WHERE customer_id = 1;

-- BAD: Missing LIMIT on large results
SELECT * FROM logs ORDER BY created_at DESC;

-- GOOD: Limit results
SELECT * FROM logs ORDER BY created_at DESC LIMIT 100;`,
              explanation: 'Small optimizations add up. Always think about what data you actually need and how the database will find it.'
            }
          }
        ],
        quiz: [
          {
            id: 'q2-4-1',
            question: 'What is the main trade-off when adding indexes?',
            options: [
              'Faster reads but slower writes',
              'Faster writes but slower reads',
              'Less storage but more CPU usage',
              'Better security but less flexibility'
            ],
            correctAnswer: 0,
            explanation: 'Indexes speed up read operations (SELECT) but slow down write operations (INSERT, UPDATE, DELETE) because the index must be maintained.'
          },
          {
            id: 'q2-4-2',
            question: 'What does "Seq Scan" in EXPLAIN output indicate?',
            options: [
              'Using an index efficiently',
              'Sequential (full) table scan - reading every row',
              'Query error',
              'Cached result'
            ],
            correctAnswer: 1,
            explanation: 'Seq Scan means the database is reading every row in the table. This is often slow for large tables and may indicate a missing index.'
          },
          {
            id: 'q2-4-3',
            question: 'For a composite index on (a, b, c), which WHERE clause can use the index?',
            options: [
              'WHERE b = 1 AND c = 2',
              'WHERE c = 3',
              'WHERE a = 1 AND c = 3',
              'WHERE a = 1 AND b = 2'
            ],
            correctAnswer: 3,
            explanation: 'Composite indexes work left-to-right. The query must include the leftmost column(s). WHERE a = 1 AND b = 2 uses both the first and second columns in order.'
          }
        ]
      },
      {
        id: 'lesson-2-5-real-world-patterns-lab',
        title: 'Real-World SQL Patterns Lab',
        description: 'Practice common SQL patterns used in production applications.',
        duration: '2 hours',
        type: 'lab',
        objectives: [
          'Implement pagination for large datasets',
          'Handle NULL values properly',
          'Use window functions for analytics',
          'Write efficient queries for common scenarios'
        ],
        content: [
          {
            title: 'Pagination',
            content: `**Pagination** returns data in manageable chunks (pages). Essential for web applications displaying lists.

**OFFSET/LIMIT** - Simple but slow for deep pages:
\`\`\`sql
SELECT * FROM products ORDER BY id LIMIT 20 OFFSET 40;  -- Page 3
\`\`\`

**Keyset (Cursor) Pagination** - Faster for large datasets:
\`\`\`sql
SELECT * FROM products WHERE id > :last_seen_id ORDER BY id LIMIT 20;
\`\`\``,
            codeExample: {
              language: 'sql',
              code: `-- OFFSET pagination (simple, common)
-- Page 1: OFFSET 0
SELECT * FROM products ORDER BY created_at DESC LIMIT 20 OFFSET 0;
-- Page 2: OFFSET 20
SELECT * FROM products ORDER BY created_at DESC LIMIT 20 OFFSET 20;
-- Page 3: OFFSET 40
SELECT * FROM products ORDER BY created_at DESC LIMIT 20 OFFSET 40;

-- Keyset pagination (efficient for large datasets)
-- First page
SELECT * FROM products ORDER BY id LIMIT 20;
-- Next page (assuming last id was 42)
SELECT * FROM products WHERE id > 42 ORDER BY id LIMIT 20;

-- Get total count for UI
SELECT COUNT(*) FROM products;`,
              explanation: 'OFFSET skips rows, which gets slower as offset increases. Keyset pagination uses an indexed column to jump directly to the right spot.'
            },
            warning: 'OFFSET 1000000 still needs to scan and skip 1 million rows. For deep pagination, use keyset pagination or search instead.'
          },
          {
            title: 'NULL Handling',
            content: `NULLs represent missing or unknown data. They behave differently than regular values:

- \`NULL = NULL\` is FALSE (use \`IS NULL\`)
- \`NULL != value\` is FALSE (use \`IS NOT NULL\`)
- Aggregates (SUM, AVG) ignore NULLs
- \`COALESCE()\` provides defaults for NULLs
- \`NULLIF()\` returns NULL if values match`,
            codeExample: {
              language: 'sql',
              code: `-- Check for NULL (= doesn't work!)
SELECT * FROM users WHERE phone IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;

-- Provide default value
SELECT 
    name,
    COALESCE(phone, 'Not provided') AS phone
FROM users;

-- COALESCE with multiple fallbacks
SELECT COALESCE(preferred_name, first_name, 'User') AS display_name
FROM users;

-- NULLIF: treat empty strings as NULL
SELECT NULLIF(phone, '') AS phone FROM users;

-- NULL-safe comparison
-- Instead of: WHERE discount = @input OR (discount IS NULL AND @input IS NULL)
-- Use: WHERE discount IS NOT DISTINCT FROM @input`,
              explanation: 'COALESCE returns the first non-NULL value. NULLIF returns NULL if both arguments are equal.'
            }
          },
          {
            title: 'Window Functions',
            content: `**Window functions** perform calculations across related rows without collapsing them into groups (unlike GROUP BY).

Common window functions:
- \`ROW_NUMBER()\` - Sequential number for each row
- \`RANK()\` - Rank with gaps for ties
- \`DENSE_RANK()\` - Rank without gaps
- \`LAG()\` / \`LEAD()\` - Access previous/next rows
- \`SUM() OVER\` - Running totals`,
            codeExample: {
              language: 'sql',
              code: `-- Row numbers within groups
SELECT 
    customer_id,
    order_id,
    order_date,
    ROW_NUMBER() OVER (
        PARTITION BY customer_id 
        ORDER BY order_date DESC
    ) AS order_rank
FROM orders;

-- Running total
SELECT 
    order_date,
    total,
    SUM(total) OVER (ORDER BY order_date) AS running_total
FROM orders;

-- Compare to previous value
SELECT 
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_month,
    revenue - LAG(revenue) OVER (ORDER BY month) AS growth
FROM monthly_sales;

-- Top N per group (using CTE)
WITH ranked_products AS (
    SELECT 
        category,
        name,
        sales,
        ROW_NUMBER() OVER (
            PARTITION BY category 
            ORDER BY sales DESC
        ) AS rank_in_category
    FROM products
)
SELECT * FROM ranked_products WHERE rank_in_category <= 3;`,
              explanation: 'PARTITION BY creates groups (like GROUP BY). ORDER BY within OVER() determines the sequence. The window function calculates across these groups.'
            },
            tip: 'Window functions are perfect for rankings, running totals, comparing to previous rows, and getting top N per group.'
          }
        ],
        quiz: [
          {
            id: 'q2-5-1',
            question: 'Why is keyset pagination faster than OFFSET for large datasets?',
            options: [
              'It uses less memory',
              'It skips directly to the right position using an index',
              'It caches results',
              'It compresses data'
            ],
            correctAnswer: 1,
            explanation: 'OFFSET must scan and skip rows. Keyset pagination uses WHERE id > last_id with an index to jump directly to the correct position.'
          },
          {
            id: 'q2-5-2',
            question: 'What does COALESCE(a, b, c) return?',
            options: [
              'The sum of a, b, and c',
              'The first non-NULL value among a, b, c',
              'NULL if any value is NULL',
              'The average of non-NULL values'
            ],
            correctAnswer: 1,
            explanation: 'COALESCE returns the first non-NULL value from its arguments, going left to right.'
          },
          {
            id: 'q2-5-3',
            question: 'What does PARTITION BY do in a window function?',
            options: [
              'Splits the table into physical partitions',
              'Creates groups for the window calculation without collapsing rows',
              'Filters out certain rows',
              'Sorts the final results'
            ],
            correctAnswer: 1,
            explanation: 'PARTITION BY divides rows into groups for the window function calculation, similar to GROUP BY but without collapsing rows.'
          }
        ],
        exercise: {
          title: 'Implement Common SQL Patterns',
          description: 'Practice pagination, NULL handling, and window functions.',
          language: 'sql',
          starterCode: `-- 1. Implement pagination for products (20 per page, page 3)


-- 2. Get customer orders with COALESCE for missing shipping address


-- 3. Rank customers by total spending within each country


-- 4. Calculate month-over-month revenue growth`,
          solution: `-- 1. Pagination (page 3 = offset 40)
SELECT product_id, name, price
FROM products
ORDER BY product_id
LIMIT 20 OFFSET 40;

-- 2. COALESCE for missing shipping address
SELECT 
    o.order_id,
    c.name,
    COALESCE(o.shipping_address, c.default_address, 'No address') AS ship_to
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;

-- 3. Rank customers by spending per country
SELECT 
    country,
    customer_id,
    name,
    total_spent,
    RANK() OVER (PARTITION BY country ORDER BY total_spent DESC) AS country_rank
FROM (
    SELECT 
        c.country,
        c.customer_id,
        c.name,
        SUM(o.total) AS total_spent
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    GROUP BY c.country, c.customer_id, c.name
) AS customer_totals;

-- 4. Month-over-month growth
WITH monthly_revenue AS (
    SELECT 
        DATE_TRUNC('month', order_date) AS month,
        SUM(total) AS revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT 
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_month_revenue,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY month)) / 
        LAG(revenue) OVER (ORDER BY month) * 100, 
        2
    ) AS growth_percentage
FROM monthly_revenue
ORDER BY month;`,
          hints: [
            'Page N with size 20: OFFSET = (N-1) * 20',
            'COALESCE checks multiple values and returns the first non-NULL',
            'PARTITION BY country creates separate rankings per country',
            'LAG(value) OVER (ORDER BY month) gets the previous month\'s value'
          ]
        }
      },
      {
        id: 'lesson-2-6-capstone-analyze-dataset',
        title: 'Capstone: Analyze a Real Dataset',
        description: 'Apply all your SQL skills to analyze an e-commerce dataset and extract business insights.',
        duration: '3 hours',
        type: 'capstone',
        objectives: [
          'Write complex analytical queries',
          'Combine multiple SQL techniques',
          'Extract meaningful business insights',
          'Present data clearly for stakeholders'
        ],
        content: [
          {
            title: 'Project Overview',
            content: `Welcome to your Phase 2 capstone! You'll analyze a complete e-commerce dataset to answer business questions.

**Dataset Tables:**
- \`customers\` - Customer information
- \`orders\` - Order headers
- \`order_items\` - Line items with products
- \`products\` - Product catalog
- \`categories\` - Product categories

**Business Questions to Answer:**
1. What is the customer lifetime value distribution?
2. Which products are frequently bought together?
3. What's the month-over-month revenue trend?
4. Who are the top customers and what do they buy?
5. Which categories are growing vs declining?`
          },
          {
            title: 'Analysis Tasks',
            content: `Complete these analytical queries:

**Task 1: Customer Segmentation**
Categorize customers into segments (Bronze, Silver, Gold, Platinum) based on their total spending.

**Task 2: Product Affinity Analysis**
Find products commonly purchased together in the same order.

**Task 3: Cohort Analysis**
Track how customers from each signup month behave over time.

**Task 4: Revenue Dashboard Query**
Create a comprehensive revenue summary with growth metrics.

**Task 5: Inventory Intelligence**
Identify products that may need restocking based on sales velocity.`,
            codeExample: {
              language: 'sql',
              code: `-- Example: Customer Segmentation
WITH customer_totals AS (
    SELECT 
        customer_id,
        SUM(total) AS lifetime_value,
        COUNT(*) AS order_count,
        MIN(order_date) AS first_order,
        MAX(order_date) AS last_order
    FROM orders
    GROUP BY customer_id
)
SELECT 
    c.customer_id,
    c.name,
    c.email,
    ct.lifetime_value,
    ct.order_count,
    CASE 
        WHEN ct.lifetime_value >= 10000 THEN 'Platinum'
        WHEN ct.lifetime_value >= 5000 THEN 'Gold'
        WHEN ct.lifetime_value >= 1000 THEN 'Silver'
        ELSE 'Bronze'
    END AS segment
FROM customers c
JOIN customer_totals ct ON c.customer_id = ct.customer_id
ORDER BY ct.lifetime_value DESC;`,
              explanation: 'This query calculates customer lifetime value and assigns segments. Use CASE to create categorical buckets from continuous values.'
            }
          }
        ],
        quiz: [
          {
            id: 'q2-6-1',
            question: 'What SQL technique is best for finding products bought together?',
            options: [
              'Simple GROUP BY',
              'Self-join on order_items',
              'Window functions',
              'Recursive CTE'
            ],
            correctAnswer: 1,
            explanation: 'A self-join on order_items (joining the table to itself) where order_id matches but product_id differs reveals which products appear together in orders.'
          },
          {
            id: 'q2-6-2',
            question: 'How would you calculate month-over-month percentage growth?',
            options: [
              'GROUP BY month',
              'LAG function comparing current to previous month',
              'COUNT DISTINCT',
              'HAVING clause'
            ],
            correctAnswer: 1,
            explanation: 'LAG() OVER (ORDER BY month) gives you the previous month\'s value, allowing you to calculate (current - previous) / previous * 100.'
          }
        ],
        exercise: {
          title: 'E-Commerce Analytics Dashboard',
          description: 'Write queries to power a complete analytics dashboard.',
          language: 'sql',
          starterCode: `-- CAPSTONE: E-Commerce Analytics

-- Query 1: Customer Lifetime Value with Segmentation
-- Show: customer name, total spent, order count, segment (Bronze/Silver/Gold/Platinum)


-- Query 2: Products Frequently Bought Together
-- Show: product pairs and how often they appear in the same order


-- Query 3: Monthly Revenue with Growth Rate
-- Show: month, revenue, previous month revenue, growth %


-- Query 4: Category Performance
-- Show: category, total revenue, % of total revenue, rank


-- Query 5: Top 5 Customers per Country
-- Show: country, customer rank, name, total spent`,
          solution: `-- Query 1: Customer Lifetime Value with Segmentation
WITH customer_stats AS (
    SELECT 
        customer_id,
        SUM(total) AS total_spent,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY customer_id
)
SELECT 
    c.name,
    cs.total_spent,
    cs.order_count,
    CASE 
        WHEN cs.total_spent >= 10000 THEN 'Platinum'
        WHEN cs.total_spent >= 5000 THEN 'Gold'
        WHEN cs.total_spent >= 1000 THEN 'Silver'
        ELSE 'Bronze'
    END AS segment
FROM customers c
JOIN customer_stats cs ON c.customer_id = cs.customer_id
ORDER BY cs.total_spent DESC;

-- Query 2: Products Frequently Bought Together
SELECT 
    p1.name AS product_1,
    p2.name AS product_2,
    COUNT(*) AS times_bought_together
FROM order_items oi1
JOIN order_items oi2 ON oi1.order_id = oi2.order_id 
    AND oi1.product_id < oi2.product_id
JOIN products p1 ON oi1.product_id = p1.product_id
JOIN products p2 ON oi2.product_id = p2.product_id
GROUP BY p1.product_id, p1.name, p2.product_id, p2.name
HAVING COUNT(*) >= 5
ORDER BY times_bought_together DESC
LIMIT 20;

-- Query 3: Monthly Revenue with Growth Rate
WITH monthly AS (
    SELECT 
        DATE_TRUNC('month', order_date) AS month,
        SUM(total) AS revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT 
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
    ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) / 
          LAG(revenue) OVER (ORDER BY month) * 100, 2) AS growth_pct
FROM monthly
ORDER BY month;

-- Query 4: Category Performance
WITH category_revenue AS (
    SELECT 
        cat.name AS category,
        SUM(oi.quantity * oi.unit_price) AS revenue
    FROM categories cat
    JOIN products p ON cat.category_id = p.category_id
    JOIN order_items oi ON p.product_id = oi.product_id
    GROUP BY cat.category_id, cat.name
)
SELECT 
    category,
    revenue,
    ROUND(revenue / SUM(revenue) OVER () * 100, 2) AS pct_of_total,
    RANK() OVER (ORDER BY revenue DESC) AS rank
FROM category_revenue
ORDER BY revenue DESC;

-- Query 5: Top 5 Customers per Country
WITH customer_spending AS (
    SELECT 
        c.country,
        c.customer_id,
        c.name,
        SUM(o.total) AS total_spent,
        ROW_NUMBER() OVER (
            PARTITION BY c.country 
            ORDER BY SUM(o.total) DESC
        ) AS country_rank
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    GROUP BY c.country, c.customer_id, c.name
)
SELECT country, country_rank, name, total_spent
FROM customer_spending
WHERE country_rank <= 5
ORDER BY country, country_rank;`,
          hints: [
            'Self-join order_items with product_id < product_id to avoid duplicates (A,B) and (B,A)',
            'LAG(revenue) OVER (ORDER BY month) gives you previous month\'s revenue',
            'SUM(revenue) OVER () with no PARTITION BY gives total across all rows',
            'ROW_NUMBER with PARTITION BY country creates separate numbering per country'
          ]
        }
      }
    ]
  },

  // ==================== PHASE 3: DATABASE DESIGN & MANAGEMENT ====================
  {
    id: 'phase-3-database-design',
    order: 3,
    title: 'Database Design & Management',
    description: 'Learn professional database design, normalization, and PostgreSQL administration.',
    color: '#a855f7',
    icon: 'Layout',
    prerequisite: 'phase-2-advanced-sql',
    estimatedHours: 18,
    lessons: [
      {
        id: 'lesson-3-1-schema-design-normalization',
        title: 'Schema Design & Normalization',
        description: 'Master the principles of good database design and data normalization.',
        duration: '2 hours',
        type: 'theory',
        objectives: [
          'Design effective database schemas',
          'Understand and apply normalization forms (1NF, 2NF, 3NF)',
          'Balance normalization with practical needs',
          'Recognize and fix common design problems'
        ],
        content: [
          {
            title: 'Principles of Good Schema Design',
            content: `Good database design ensures data integrity, eliminates redundancy, and enables efficient queries.

**Key principles:**
- Each table represents ONE entity type
- Each row is a unique instance
- Each column is a single attribute
- Avoid storing calculated values
- Use consistent naming conventions
- Plan for growth and change`
          },
          {
            title: 'First Normal Form (1NF)',
            content: `**1NF Requirements:**
- Each cell contains a single value (atomic)
- Each row is unique (has a primary key)
- No repeating groups of columns

**Violations:**
- Comma-separated values in a cell
- Columns like phone1, phone2, phone3
- Arrays stored as delimited strings`,
            codeExample: {
              language: 'sql',
              code: `-- VIOLATION of 1NF: Multiple values in one cell
CREATE TABLE contacts_bad (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    phones VARCHAR(255)  -- "555-1234, 555-5678"
);

-- CORRECT 1NF: Separate table for multi-valued attribute
CREATE TABLE contacts (
    contact_id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE contact_phones (
    phone_id SERIAL PRIMARY KEY,
    contact_id INT REFERENCES contacts(contact_id),
    phone_number VARCHAR(20),
    phone_type VARCHAR(20)  -- 'mobile', 'work', 'home'
);`,
              explanation: 'Move repeating data into a separate table with a foreign key relationship.'
            }
          },
          {
            title: 'Second Normal Form (2NF)',
            content: `**2NF Requirements:**
- Must be in 1NF
- Every non-key column must depend on the ENTIRE primary key

This applies mainly to composite primary keys. If a column depends on only part of the key, it should be in a separate table.`,
            codeExample: {
              language: 'sql',
              code: `-- VIOLATION of 2NF: partial dependency
-- Composite key: (order_id, product_id)
-- But product_name depends ONLY on product_id, not the full key
CREATE TABLE order_details_bad (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),  -- Depends only on product_id!
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- CORRECT 2NF: Separate the partial dependency
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100)
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT REFERENCES products(product_id),
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);`,
              explanation: 'If a non-key column depends only on part of a composite key, extract it to its own table.'
            }
          },
          {
            title: 'Third Normal Form (3NF)',
            content: `**3NF Requirements:**
- Must be in 2NF
- No transitive dependencies: non-key columns should not depend on other non-key columns

If column B depends on column A, and column C depends on column B, column C has a transitive dependency.`,
            codeExample: {
              language: 'sql',
              code: `-- VIOLATION of 3NF: Transitive dependency
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100),  -- Depends on department_id, not employee_id!
    department_budget DECIMAL     -- Also depends on department_id
);

-- CORRECT 3NF: Extract transitive dependencies
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    name VARCHAR(100),
    budget DECIMAL(12, 2)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT REFERENCES departments(department_id)
);`,
              explanation: 'If non-key columns depend on other non-key columns, extract them into a separate table.'
            },
            tip: 'A common way to remember: Each non-key column must depend on "the key, the whole key, and nothing but the key."'
          }
        ],
        quiz: [
          {
            id: 'q3-1-1',
            question: 'What does 1NF require?',
            options: [
              'No foreign keys',
              'Atomic values, unique rows, no repeating columns',
              'All columns indexed',
              'Maximum 10 columns per table'
            ],
            correctAnswer: 1,
            explanation: '1NF requires atomic (single) values in each cell, unique rows with primary keys, and no repeating column groups.'
          },
          {
            id: 'q3-1-2',
            question: 'What is a transitive dependency?',
            options: [
              'A column depending on the primary key',
              'A column depending on another non-key column',
              'A foreign key relationship',
              'A self-referencing table'
            ],
            correctAnswer: 1,
            explanation: 'A transitive dependency exists when a non-key column depends on another non-key column rather than directly on the primary key.'
          }
        ],
        exercise: {
          title: 'Normalize a Denormalized Table',
          description: 'Fix normalization violations in a poorly designed table.',
          language: 'sql',
          starterCode: `-- This table has multiple normalization violations
-- Your task: Redesign it into properly normalized tables

CREATE TABLE orders_bad (
    order_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_email VARCHAR(255),
    customer_address TEXT,
    items TEXT,  -- "Widget x2, Gadget x1, Tool x3"
    salesperson_id INT,
    salesperson_name VARCHAR(100),
    salesperson_department VARCHAR(50)
);

-- Create normalized tables below:`,
          solution: `-- Normalized design (3NF)

-- Departments table (3NF - removes transitive dependency)
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Salespeople table (2NF/3NF)
CREATE TABLE salespeople (
    salesperson_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT REFERENCES departments(department_id)
);

-- Customers table (2NF - customer info separated)
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    address TEXT
);

-- Products table (for the items)
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2)
);

-- Orders table (core order info)
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    salesperson_id INT REFERENCES salespeople(salesperson_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table (1NF - atomic values)
CREATE TABLE order_items (
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_id)
);`,
          hints: [
            '1NF violation: "items" column contains comma-separated values - needs separate table',
            '2NF violation: customer info depends on order, not the order specifically - separate customer table',
            '3NF violation: salesperson_department depends on salesperson_id, not order - separate tables'
          ]
        }
      },
      {
        id: 'lesson-3-2-foreign-keys-relationships',
        title: 'Foreign Keys & Relationships',
        description: 'Master referential integrity with foreign keys and understand relationship types.',
        duration: '1.5 hours',
        type: 'theory',
        objectives: [
          'Create and manage foreign key constraints',
          'Understand one-to-one, one-to-many, and many-to-many relationships',
          'Configure CASCADE behaviors',
          'Design junction tables for many-to-many relationships'
        ],
        content: [
          {
            title: 'Foreign Key Basics',
            content: `A **foreign key** is a column that references the primary key of another table, creating a relationship between them.

Foreign keys enforce **referential integrity**: you cannot insert a value that doesn't exist in the referenced table.`,
            codeExample: {
              language: 'sql',
              code: `-- Foreign key syntax
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE,
    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id) 
        REFERENCES customers(customer_id)
);

-- Shorthand syntax
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(customer_id),
    order_date DATE
);`,
              explanation: 'The foreign key ensures every order has a valid customer_id that exists in the customers table.'
            }
          },
          {
            title: 'Relationship Types',
            content: `**One-to-Many (1:N)** - Most common
One customer has many orders. FK goes in the "many" table.

**One-to-One (1:1)** - Rare, used to split large tables
One user has one profile. FK with UNIQUE constraint.

**Many-to-Many (M:N)** - Requires junction table
Students enroll in courses. Courses have many students.`,
            codeExample: {
              language: 'sql',
              code: `-- ONE-TO-MANY: Customer -> Orders
CREATE TABLE customers (customer_id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id)  -- FK on "many" side
);

-- ONE-TO-ONE: User -> Profile
CREATE TABLE users (user_id SERIAL PRIMARY KEY, email TEXT UNIQUE);
CREATE TABLE profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(user_id),  -- UNIQUE makes it 1:1
    bio TEXT, avatar_url TEXT
);

-- MANY-TO-MANY: Students <-> Courses (via junction table)
CREATE TABLE students (student_id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE courses (course_id SERIAL PRIMARY KEY, title TEXT);
CREATE TABLE enrollments (  -- Junction table
    student_id INT REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id),
    enrolled_at DATE,
    PRIMARY KEY (student_id, course_id)
);`,
              explanation: 'Junction tables have composite primary keys and two foreign keys, one to each related table.'
            }
          },
          {
            title: 'CASCADE Behaviors',
            content: `When a referenced row is deleted or updated, what happens to dependent rows?

**ON DELETE:**
- \`RESTRICT\` - Block deletion if dependencies exist (default)
- \`CASCADE\` - Delete dependent rows automatically
- \`SET NULL\` - Set FK to NULL
- \`SET DEFAULT\` - Set FK to default value

**ON UPDATE:**
Same options for when the referenced PK changes.`,
            codeExample: {
              language: 'sql',
              code: `-- CASCADE: Deleting customer deletes their orders
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id)
        ON DELETE CASCADE
);

-- SET NULL: Deleting employee nullifies their assignments
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    assigned_to INT REFERENCES employees(employee_id)
        ON DELETE SET NULL
);

-- RESTRICT (default): Cannot delete category with products
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(category_id)
        ON DELETE RESTRICT  -- Explicit, but this is the default
);`,
              explanation: 'Choose CASCADE carefully - it can delete more than intended. RESTRICT is safer for important data.'
            },
            warning: 'ON DELETE CASCADE can cause cascading deletions through multiple tables. Always understand the full impact before using it.'
          }
        ],
        quiz: [
          {
            id: 'q3-2-1',
            question: 'In a one-to-many relationship, where does the foreign key go?',
            options: [
              'In the "one" side table',
              'In the "many" side table',
              'In both tables',
              'In a separate junction table'
            ],
            correctAnswer: 1,
            explanation: 'The foreign key goes in the "many" side table, pointing back to the "one" side. Example: orders (many) has customer_id pointing to customers (one).'
          },
          {
            id: 'q3-2-2',
            question: 'What does ON DELETE CASCADE do?',
            options: [
              'Prevents deletion of the parent row',
              'Automatically deletes dependent child rows',
              'Sets the foreign key to NULL',
              'Logs the deletion attempt'
            ],
            correctAnswer: 1,
            explanation: 'ON DELETE CASCADE automatically deletes all rows that reference the deleted parent row.'
          }
        ]
      },
      {
        id: 'lesson-3-3-postgresql-administration',
        title: 'PostgreSQL Administration',
        description: 'Learn essential PostgreSQL administration tasks for production databases.',
        duration: '1.5 hours',
        type: 'theory',
        objectives: [
          'Manage PostgreSQL users and permissions',
          'Configure database settings',
          'Monitor database health and performance',
          'Understand PostgreSQL-specific features'
        ],
        content: [
          {
            title: 'User and Permission Management',
            content: `PostgreSQL uses **roles** for both users and groups. A role can own database objects and have permissions.`,
            codeExample: {
              language: 'sql',
              code: `-- Create a role (user)
CREATE ROLE app_user WITH LOGIN PASSWORD 'secure_password';

-- Grant permissions
GRANT CONNECT ON DATABASE myapp TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_user;

-- Create read-only role
CREATE ROLE readonly_user WITH LOGIN PASSWORD 'readonly_pass';
GRANT CONNECT ON DATABASE myapp TO readonly_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;

-- Revoke permissions
REVOKE INSERT, UPDATE, DELETE ON sensitive_table FROM app_user;`,
              explanation: 'Start with minimal permissions and grant only what\'s needed. Use separate roles for different access levels.'
            }
          },
          {
            title: 'Monitoring and Maintenance',
            content: `PostgreSQL provides system views and commands for monitoring:

- \`pg_stat_activity\` - Current connections and queries
- \`pg_stat_user_tables\` - Table statistics
- \`pg_indexes\` - Index information
- \`VACUUM\` - Reclaim storage and update statistics
- \`ANALYZE\` - Update query planner statistics`,
            codeExample: {
              language: 'sql',
              code: `-- View active connections
SELECT pid, usename, application_name, state, query
FROM pg_stat_activity
WHERE state != 'idle';

-- Find slow queries (requires pg_stat_statements extension)
SELECT query, calls, mean_time, total_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Table bloat and maintenance
VACUUM ANALYZE my_table;  -- Clean up and update stats
REINDEX TABLE my_table;   -- Rebuild indexes

-- Check table sizes
SELECT 
    relname AS table_name,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size
FROM pg_stat_user_tables
ORDER BY pg_total_relation_size(relid) DESC;`,
              explanation: 'Regular VACUUM and ANALYZE keep the database performing well. Monitor active connections to prevent overload.'
            }
          }
        ],
        quiz: [
          {
            id: 'q3-3-1',
            question: 'What does VACUUM do in PostgreSQL?',
            options: [
              'Deletes all data',
              'Reclaims storage and updates statistics',
              'Creates backups',
              'Optimizes queries'
            ],
            correctAnswer: 1,
            explanation: 'VACUUM reclaims storage occupied by dead tuples and updates table statistics used by the query planner.'
          }
        ]
      },
      {
        id: 'lesson-3-4-backup-recovery-security',
        title: 'Backup, Recovery & Security',
        description: 'Protect your data with proper backup strategies and security measures.',
        duration: '1.5 hours',
        type: 'theory',
        objectives: [
          'Implement backup strategies',
          'Perform database recovery',
          'Apply security best practices',
          'Protect against common threats'
        ],
        content: [
          {
            title: 'Backup Strategies',
            content: `**Logical backups** (pg_dump) - SQL export, portable, slower
**Physical backups** (pg_basebackup) - File copy, faster, same version only
**Continuous archiving** (WAL) - Point-in-time recovery`,
            codeExample: {
              language: 'bash',
              code: `# Logical backup with pg_dump
pg_dump -h localhost -U admin mydb > backup.sql
pg_dump -Fc mydb > backup.custom  # Custom format (compressed)

# Restore from backup
psql mydb < backup.sql
pg_restore -d mydb backup.custom

# Physical backup
pg_basebackup -h localhost -D /backup/path -U replication_user -P

# Automated daily backup script
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d)
pg_dump -Fc mydb > "$BACKUP_DIR/mydb_$DATE.backup"
# Keep last 7 days
find $BACKUP_DIR -name "*.backup" -mtime +7 -delete`,
              explanation: 'Use pg_dump for regular backups. The custom format (-Fc) allows selective restore and is compressed.'
            }
          },
          {
            title: 'Security Best Practices',
            content: `**Authentication:**
- Use strong passwords
- Prefer certificate authentication
- Configure pg_hba.conf properly

**Network Security:**
- Use SSL/TLS for connections
- Restrict network access
- Use firewalls

**Application Security:**
- Use parameterized queries (prevent SQL injection)
- Principle of least privilege
- Regular security audits`,
            codeExample: {
              language: 'sql',
              code: `-- SQL Injection vulnerable (NEVER DO THIS)
query = "SELECT * FROM users WHERE name = '" + user_input + "'";

-- Safe: Parameterized query
query = "SELECT * FROM users WHERE name = $1";
execute(query, [user_input]);

-- Row-level security (PostgreSQL)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_documents ON documents
    FOR ALL
    USING (owner_id = current_user_id());`,
              explanation: 'Always use parameterized queries. Row-level security adds additional protection for multi-tenant applications.'
            }
          }
        ],
        quiz: [
          {
            id: 'q3-4-1',
            question: 'What is the main advantage of pg_dump over physical backups?',
            options: [
              'Faster backup speed',
              'Smaller file size',
              'Portable across PostgreSQL versions',
              'No downtime required'
            ],
            correctAnswer: 2,
            explanation: 'pg_dump creates logical (SQL) backups that can be restored to different PostgreSQL versions, making them more portable.'
          }
        ]
      },
      {
        id: 'lesson-3-5-database-management-lab',
        title: 'Hands-on Database Management Lab',
        description: 'Practice real-world database administration tasks.',
        duration: '2 hours',
        type: 'lab',
        objectives: [
          'Set up a production-like database environment',
          'Configure users and permissions',
          'Perform backup and restore operations',
          'Monitor and optimize performance'
        ],
        content: [
          {
            title: 'Lab Tasks',
            content: `In this lab, you'll:

1. Design and create a normalized schema
2. Set up application and admin users
3. Create backup procedures
4. Monitor query performance
5. Optimize slow queries`
          }
        ],
        exercise: {
          title: 'Database Administration Tasks',
          description: 'Complete a series of DBA tasks on a sample database.',
          language: 'sql',
          starterCode: `-- Task 1: Create an app_user role with limited permissions
-- Should be able to: SELECT, INSERT, UPDATE on all tables
-- Should NOT be able to: DELETE, DROP, CREATE


-- Task 2: Create a read_only role
-- Should only be able to SELECT


-- Task 3: Write a query to find tables without indexes


-- Task 4: Write a query to find the 5 largest tables`,
          solution: `-- Task 1: App user with limited permissions
CREATE ROLE app_user WITH LOGIN PASSWORD 'secure_app_pass123';
GRANT CONNECT ON DATABASE mydb TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- Task 2: Read-only role
CREATE ROLE read_only WITH LOGIN PASSWORD 'readonly_pass456';
GRANT CONNECT ON DATABASE mydb TO read_only;
GRANT USAGE ON SCHEMA public TO read_only;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO read_only;

-- Task 3: Tables without indexes (excluding primary keys)
SELECT 
    t.tablename
FROM pg_tables t
LEFT JOIN pg_indexes i ON t.tablename = i.tablename 
    AND i.indexname NOT LIKE '%_pkey'
WHERE t.schemaname = 'public'
GROUP BY t.tablename
HAVING COUNT(i.indexname) = 0;

-- Task 4: Five largest tables
SELECT 
    relname AS table_name,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
    pg_size_pretty(pg_relation_size(relid)) AS table_size,
    pg_size_pretty(pg_indexes_size(relid)) AS index_size
FROM pg_stat_user_tables
ORDER BY pg_total_relation_size(relid) DESC
LIMIT 5;`,
          hints: [
            'GRANT specifies permissions; REVOKE removes them',
            'pg_tables and pg_indexes are system catalogs',
            'pg_size_pretty formats bytes as human-readable',
            'Always include USAGE on sequences for INSERT operations'
          ]
        }
      },
      {
        id: 'lesson-3-6-capstone-production-database',
        title: 'Capstone: Design a Production Database',
        description: 'Design and implement a complete production-ready database system.',
        duration: '3 hours',
        type: 'capstone',
        objectives: [
          'Design a normalized schema from requirements',
          'Implement proper constraints and relationships',
          'Set up security and access control',
          'Create maintenance procedures'
        ],
        content: [
          {
            title: 'Project: Event Management System',
            content: `Design a database for an event management platform with:

**Features:**
- Events with multiple sessions
- User registration and attendance
- Speakers and presentations
- Venues and rooms
- Ticketing and payments

**Requirements:**
- Fully normalized (3NF)
- Proper constraints and foreign keys
- Role-based access control
- Backup procedures`
          }
        ],
        quiz: [
          {
            id: 'q3-6-1',
            question: 'When designing a database, what should you do first?',
            options: [
              'Create tables immediately',
              'Understand requirements and identify entities',
              'Set up indexes',
              'Create users and permissions'
            ],
            correctAnswer: 1,
            explanation: 'Always start by understanding requirements, identifying entities and their relationships, then design the schema before implementing.'
          }
        ]
      }
    ]
  },

  // ==================== PHASE 4-9: ABBREVIATED STRUCTURE ====================
  // (Full content would follow the same pattern)
  
  {
    id: 'phase-4-python-data',
    order: 4,
    title: 'Python for Data & Databases',
    description: 'Learn Python programming for data manipulation and database interaction.',
    color: '#22c55e',
    icon: 'Terminal',
    prerequisite: 'phase-3-database-design',
    estimatedHours: 22,
    lessons: [
      {
        id: 'lesson-4-1-python-basics',
        title: 'Python Basics',
        description: 'Learn Python fundamentals: variables, data types, control flow, and functions.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Write basic Python programs', 'Understand data types and variables', 'Use control flow statements', 'Define and call functions'],
        content: [
          { title: 'Getting Started with Python', content: 'Python is a versatile, readable programming language perfect for data work. It\'s known for its clean syntax and extensive libraries.' }
        ]
      },
      {
        id: 'lesson-4-2-pandas-numpy',
        title: 'Libraries: Pandas, NumPy, Matplotlib',
        description: 'Master the essential Python libraries for data analysis.',
        duration: '3 hours',
        type: 'theory',
        objectives: ['Manipulate data with Pandas DataFrames', 'Perform numerical operations with NumPy', 'Create visualizations with Matplotlib'],
        content: [
          { title: 'Pandas DataFrames', content: 'Pandas provides powerful data structures for working with structured data, similar to SQL tables but with more flexibility.' }
        ]
      },
      {
        id: 'lesson-4-3-connecting-databases',
        title: 'Connecting to Databases with Python',
        description: 'Learn to connect Python applications to PostgreSQL and other databases.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Connect to databases using psycopg2', 'Execute queries from Python', 'Handle database transactions safely'],
        content: [
          { title: 'Database Connections', content: 'psycopg2 is the most popular PostgreSQL adapter for Python, providing a robust way to interact with your database.' }
        ]
      },
      {
        id: 'lesson-4-4-data-manipulation',
        title: 'Data Manipulation & Analysis',
        description: 'Combine Python and SQL for powerful data analysis workflows.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Load database data into Pandas', 'Transform and analyze data', 'Write results back to databases'],
        content: [
          { title: 'Python + SQL Workflow', content: 'Combining Python\'s analytical capabilities with SQL\'s data retrieval creates powerful data pipelines.' }
        ]
      },
      {
        id: 'lesson-4-5-python-labs',
        title: 'Hands-on Python Labs',
        description: 'Practice Python data manipulation through guided exercises.',
        duration: '3 hours',
        type: 'lab',
        objectives: ['Build data analysis scripts', 'Create automated reports', 'Process and transform datasets'],
        content: [
          { title: 'Lab Overview', content: 'Apply your Python skills to real-world data analysis scenarios.' }
        ]
      },
      {
        id: 'lesson-4-6-capstone-data-pipeline',
        title: 'Capstone: Build a Data Pipeline',
        description: 'Create a complete ETL pipeline using Python and SQL.',
        duration: '4 hours',
        type: 'capstone',
        objectives: ['Design an ETL pipeline', 'Extract data from multiple sources', 'Transform and load data into a database'],
        content: [
          { title: 'Pipeline Project', content: 'Build an end-to-end data pipeline that extracts, transforms, and loads data.' }
        ]
      }
    ]
  },

  {
    id: 'phase-5-ml-fundamentals',
    order: 5,
    title: 'Machine Learning Fundamentals',
    description: 'Understand core ML concepts and build your first models.',
    color: '#ec4899',
    icon: 'Brain',
    prerequisite: 'phase-4-python-data',
    estimatedHours: 25,
    lessons: [
      {
        id: 'lesson-5-1-what-is-ml',
        title: 'What is Machine Learning?',
        description: 'Understand the fundamentals of machine learning and its applications.',
        duration: '1.5 hours',
        type: 'theory',
        objectives: ['Define machine learning', 'Distinguish supervised vs unsupervised learning', 'Identify ML use cases'],
        content: [
          { title: 'Introduction to ML', content: 'Machine learning enables computers to learn patterns from data without being explicitly programmed.' }
        ]
      },
      {
        id: 'lesson-5-2-regression',
        title: 'Regression Models',
        description: 'Learn to predict continuous values with regression algorithms.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Understand linear regression', 'Implement regression models', 'Evaluate model performance'],
        content: [
          { title: 'Linear Regression', content: 'Regression predicts continuous outcomes by finding relationships between variables.' }
        ]
      },
      {
        id: 'lesson-5-3-classification',
        title: 'Classification Models',
        description: 'Build models that categorize data into discrete classes.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Understand classification algorithms', 'Implement logistic regression and decision trees', 'Handle imbalanced datasets'],
        content: [
          { title: 'Classification Basics', content: 'Classification predicts categorical outcomes like spam/not spam or customer churn.' }
        ]
      },
      {
        id: 'lesson-5-4-model-evaluation',
        title: 'Model Evaluation & Validation',
        description: 'Learn to properly evaluate and validate machine learning models.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Use train/test splits', 'Apply cross-validation', 'Understand metrics (accuracy, precision, recall, F1)'],
        content: [
          { title: 'Evaluation Metrics', content: 'Proper evaluation is crucial for building reliable ML models that work in production.' }
        ]
      },
      {
        id: 'lesson-5-5-ml-labs',
        title: 'Hands-on ML Labs with Scikit-learn',
        description: 'Build complete ML workflows using scikit-learn.',
        duration: '3 hours',
        type: 'lab',
        objectives: ['Use scikit-learn pipelines', 'Preprocess data for ML', 'Train and evaluate models'],
        content: [
          { title: 'Scikit-learn Labs', content: 'Practice building ML models with the industry-standard scikit-learn library.' }
        ]
      },
      {
        id: 'lesson-5-6-capstone-ml-model',
        title: 'Capstone: Build an ML Model',
        description: 'Create a complete machine learning solution for a real problem.',
        duration: '4 hours',
        type: 'capstone',
        objectives: ['Frame a business problem as ML', 'Build end-to-end ML pipeline', 'Deploy and test your model'],
        content: [
          { title: 'ML Project', content: 'Apply everything you\'ve learned to build a production-quality ML model.' }
        ]
      }
    ]
  },

  {
    id: 'phase-6-advanced-ml',
    order: 6,
    title: 'Advanced Machine Learning',
    description: 'Master advanced ML techniques and deep learning basics.',
    color: '#f97316',
    icon: 'Cpu',
    prerequisite: 'phase-5-ml-fundamentals',
    estimatedHours: 28,
    lessons: [
      {
        id: 'lesson-6-1-feature-engineering',
        title: 'Feature Engineering',
        description: 'Learn the art of creating and selecting features for ML models.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Create meaningful features', 'Handle categorical variables', 'Perform feature selection'],
        content: [
          { title: 'Feature Engineering', content: 'Good features often matter more than algorithm choice. Learn to create features that boost model performance.' }
        ]
      },
      {
        id: 'lesson-6-2-ensemble-methods',
        title: 'Ensemble Methods',
        description: 'Combine multiple models for better predictions.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Understand bagging and boosting', 'Use Random Forests and Gradient Boosting', 'Implement XGBoost'],
        content: [
          { title: 'Ensemble Learning', content: 'Ensemble methods combine multiple models to achieve better performance than any single model.' }
        ]
      },
      {
        id: 'lesson-6-3-deep-learning',
        title: 'Deep Learning Basics',
        description: 'Introduction to neural networks and deep learning.',
        duration: '3 hours',
        type: 'theory',
        objectives: ['Understand neural network architecture', 'Build models with TensorFlow/Keras', 'Train deep learning models'],
        content: [
          { title: 'Neural Networks', content: 'Deep learning powers modern AI breakthroughs in vision, language, and more.' }
        ]
      },
      {
        id: 'lesson-6-4-model-deployment',
        title: 'Model Deployment & MLOps',
        description: 'Deploy ML models to production environments.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Package models for deployment', 'Create prediction APIs', 'Monitor model performance'],
        content: [
          { title: 'MLOps Basics', content: 'Deploying models is as important as building them. Learn production ML practices.' }
        ]
      },
      {
        id: 'lesson-6-5-advanced-ml-lab',
        title: 'Advanced ML Lab',
        description: 'Tackle complex ML problems with advanced techniques.',
        duration: '3 hours',
        type: 'lab',
        objectives: ['Implement ensemble models', 'Tune hyperparameters', 'Handle real-world data challenges'],
        content: [
          { title: 'Advanced Lab', content: 'Apply advanced ML techniques to challenging datasets.' }
        ]
      },
      {
        id: 'lesson-6-6-capstone-ml-system',
        title: 'Capstone: Production ML System',
        description: 'Build and deploy a complete ML system.',
        duration: '5 hours',
        type: 'capstone',
        objectives: ['Design ML system architecture', 'Build robust ML pipelines', 'Deploy with monitoring'],
        content: [
          { title: 'ML System Project', content: 'Create a production-ready ML system from scratch.' }
        ]
      }
    ]
  },

  {
    id: 'phase-7-aws-fundamentals',
    order: 7,
    title: 'AWS Fundamentals',
    description: 'Learn cloud computing basics with Amazon Web Services.',
    color: '#eab308',
    icon: 'Cloud',
    prerequisite: 'phase-6-advanced-ml',
    estimatedHours: 20,
    lessons: [
      {
        id: 'lesson-7-1-cloud-intro',
        title: 'Introduction to Cloud Computing',
        description: 'Understand cloud computing concepts and AWS services.',
        duration: '1.5 hours',
        type: 'theory',
        objectives: ['Understand cloud computing models', 'Navigate the AWS console', 'Understand AWS global infrastructure'],
        content: [
          { title: 'Cloud Computing', content: 'Cloud computing provides on-demand IT resources over the internet with pay-as-you-go pricing.' }
        ]
      },
      {
        id: 'lesson-7-2-ec2-compute',
        title: 'EC2 & Compute Services',
        description: 'Launch and manage virtual servers in the cloud.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Launch EC2 instances', 'Configure security groups', 'Understand instance types'],
        content: [
          { title: 'EC2 Basics', content: 'EC2 provides scalable computing capacity in the AWS cloud.' }
        ]
      },
      {
        id: 'lesson-7-3-s3-storage',
        title: 'S3 & Storage Services',
        description: 'Store and retrieve any amount of data in S3.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Create and manage S3 buckets', 'Configure access policies', 'Use S3 for data lakes'],
        content: [
          { title: 'S3 Storage', content: 'S3 provides scalable object storage with high durability and availability.' }
        ]
      },
      {
        id: 'lesson-7-4-rds-databases',
        title: 'RDS & Database Services',
        description: 'Run managed relational databases in AWS.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Launch RDS instances', 'Configure backups and replication', 'Connect applications to RDS'],
        content: [
          { title: 'Managed Databases', content: 'RDS handles database administration tasks so you can focus on your application.' }
        ]
      },
      {
        id: 'lesson-7-5-aws-lab',
        title: 'AWS Hands-on Lab',
        description: 'Build a complete application infrastructure on AWS.',
        duration: '3 hours',
        type: 'lab',
        objectives: ['Deploy multi-tier applications', 'Configure networking', 'Set up monitoring'],
        content: [
          { title: 'AWS Lab', content: 'Build real infrastructure on AWS with hands-on exercises.' }
        ]
      },
      {
        id: 'lesson-7-6-capstone-aws-deployment',
        title: 'Capstone: AWS Deployment',
        description: 'Deploy a complete application to AWS.',
        duration: '4 hours',
        type: 'capstone',
        objectives: ['Design AWS architecture', 'Deploy full-stack application', 'Implement security best practices'],
        content: [
          { title: 'AWS Project', content: 'Deploy a production application using AWS services.' }
        ]
      }
    ]
  },

  {
    id: 'phase-8-aws-data-ml',
    order: 8,
    title: 'AWS Data & ML Services',
    description: 'Build data pipelines and deploy ML models on AWS.',
    color: '#ef4444',
    icon: 'Database',
    prerequisite: 'phase-7-aws-fundamentals',
    estimatedHours: 25,
    lessons: [
      {
        id: 'lesson-8-1-data-services',
        title: 'AWS Data Services Overview',
        description: 'Explore AWS services for data storage, processing, and analytics.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Understand AWS data ecosystem', 'Choose appropriate data services', 'Design data architectures'],
        content: [
          { title: 'AWS Data Services', content: 'AWS provides comprehensive services for every stage of the data lifecycle.' }
        ]
      },
      {
        id: 'lesson-8-2-redshift-athena',
        title: 'Redshift & Athena',
        description: 'Query data at scale with data warehousing and serverless analytics.',
        duration: '2.5 hours',
        type: 'theory',
        objectives: ['Use Redshift for data warehousing', 'Query S3 data with Athena', 'Optimize query performance'],
        content: [
          { title: 'Analytics Services', content: 'Redshift and Athena provide powerful SQL analytics at cloud scale.' }
        ]
      },
      {
        id: 'lesson-8-3-glue-etl',
        title: 'AWS Glue & ETL',
        description: 'Build serverless ETL pipelines with AWS Glue.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Create Glue crawlers and catalogs', 'Build ETL jobs', 'Orchestrate data workflows'],
        content: [
          { title: 'AWS Glue', content: 'Glue provides serverless data integration services for analytics, ML, and application development.' }
        ]
      },
      {
        id: 'lesson-8-4-sagemaker',
        title: 'Amazon SageMaker',
        description: 'Build, train, and deploy ML models with SageMaker.',
        duration: '3 hours',
        type: 'theory',
        objectives: ['Use SageMaker notebooks', 'Train models at scale', 'Deploy ML endpoints'],
        content: [
          { title: 'SageMaker ML', content: 'SageMaker provides a complete platform for the ML lifecycle.' }
        ]
      },
      {
        id: 'lesson-8-5-aws-ml-lab',
        title: 'AWS ML Lab',
        description: 'Build end-to-end ML pipelines on AWS.',
        duration: '3 hours',
        type: 'lab',
        objectives: ['Create SageMaker experiments', 'Deploy production endpoints', 'Implement ML pipelines'],
        content: [
          { title: 'ML on AWS Lab', content: 'Build production ML systems using AWS services.' }
        ]
      },
      {
        id: 'lesson-8-6-capstone-aws-ml-pipeline',
        title: 'Capstone: AWS ML Pipeline',
        description: 'Build a complete ML pipeline on AWS.',
        duration: '5 hours',
        type: 'capstone',
        objectives: ['Design ML architecture', 'Build automated pipelines', 'Deploy and monitor models'],
        content: [
          { title: 'AWS ML Project', content: 'Create a production ML pipeline using AWS data and ML services.' }
        ]
      }
    ]
  },

  {
    id: 'phase-9-professional-mastery',
    order: 9,
    title: 'Professional Mastery',
    description: 'Integrate all skills for professional data & ML engineering.',
    color: '#06b6d4',
    icon: 'Award',
    prerequisite: 'phase-8-aws-data-ml',
    estimatedHours: 30,
    lessons: [
      {
        id: 'lesson-9-1-system-design',
        title: 'Data System Design',
        description: 'Design scalable data systems for real-world applications.',
        duration: '3 hours',
        type: 'theory',
        objectives: ['Design data architectures', 'Handle scale and reliability', 'Make technical tradeoffs'],
        content: [
          { title: 'System Design', content: 'Learn to design systems that handle millions of users and petabytes of data.' }
        ]
      },
      {
        id: 'lesson-9-2-best-practices',
        title: 'Industry Best Practices',
        description: 'Learn professional practices for data engineering and ML.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Follow coding standards', 'Implement testing practices', 'Document effectively'],
        content: [
          { title: 'Best Practices', content: 'Professional practices separate good engineers from great ones.' }
        ]
      },
      {
        id: 'lesson-9-3-real-world-problems',
        title: 'Real-World Problem Solving',
        description: 'Tackle complex, ambiguous problems like a professional.',
        duration: '3 hours',
        type: 'theory',
        objectives: ['Break down complex problems', 'Handle ambiguous requirements', 'Communicate technical solutions'],
        content: [
          { title: 'Problem Solving', content: 'Learn to tackle real-world problems that don\'t have clear solutions.' }
        ]
      },
      {
        id: 'lesson-9-4-portfolio-projects',
        title: 'Portfolio Project Workshop',
        description: 'Build projects that showcase your skills to employers.',
        duration: '4 hours',
        type: 'lab',
        objectives: ['Identify portfolio-worthy projects', 'Document your work', 'Present technical projects'],
        content: [
          { title: 'Portfolio Building', content: 'Create projects that demonstrate your capabilities to potential employers.' }
        ]
      },
      {
        id: 'lesson-9-5-career-prep',
        title: 'Career Preparation',
        description: 'Prepare for data and ML engineering interviews.',
        duration: '2 hours',
        type: 'theory',
        objectives: ['Prepare for technical interviews', 'Build your resume', 'Network effectively'],
        content: [
          { title: 'Career Prep', content: 'Get ready to land your dream job in data or ML engineering.' }
        ]
      },
      {
        id: 'lesson-9-6-final-capstone',
        title: 'Final Capstone: End-to-End Solution',
        description: 'Build a complete production system using all your skills.',
        duration: '8 hours',
        type: 'capstone',
        objectives: ['Design complete solutions', 'Integrate all technologies', 'Deploy production systems'],
        content: [
          { title: 'Final Project', content: 'Your ultimate project combining everything you\'ve learned.' }
        ]
      }
    ]
  }
];

// Helper function to get phase by ID
export function getPhaseById(phaseId: string): Phase | undefined {
  return curriculum.find(p => p.id === phaseId);
}

// Helper function to get lesson by ID
export function getLessonById(phaseId: string, lessonId: string): Lesson | undefined {
  const phase = getPhaseById(phaseId);
  return phase?.lessons.find(l => l.id === lessonId);
}

// Helper function to get next lesson
export function getNextLesson(phaseId: string, lessonId: string): { phase: Phase; lesson: Lesson } | null {
  const phaseIndex = curriculum.findIndex(p => p.id === phaseId);
  const phase = curriculum[phaseIndex];
  
  if (!phase) return null;
  
  const lessonIndex = phase.lessons.findIndex(l => l.id === lessonId);
  
  // Check if there's a next lesson in current phase
  if (lessonIndex < phase.lessons.length - 1) {
    return {
      phase,
      lesson: phase.lessons[lessonIndex + 1]
    };
  }
  
  // Check if there's a next phase
  if (phaseIndex < curriculum.length - 1) {
    const nextPhase = curriculum[phaseIndex + 1];
    return {
      phase: nextPhase,
      lesson: nextPhase.lessons[0]
    };
  }
  
  return null;
}

// Helper function to calculate total course stats
export function getCourseStats() {
  let totalLessons = 0;
  let totalHours = 0;
  
  curriculum.forEach(phase => {
    totalLessons += phase.lessons.length;
    totalHours += phase.estimatedHours;
  });
  
  return {
    totalPhases: curriculum.length,
    totalLessons,
    totalHours
  };
}
