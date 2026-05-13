export type Course = {
  slug: string
  title: string
  desc: string
  tagline: string
  duration: string
  level: string
  image: string
  highlights: string[]
  tools: string[]
  modules: string[]
  outline?: {
    title: string
    topics: string[]
  }[]
  projects: string[]
}

const reactOutline = [
  {
    title: 'Basics of Web Design',
    topics: ['HTML tags and page structure', 'CSS fundamentals', 'Bootstrap basics'],
  },
  {
    title: 'JavaScript ES6',
    topics: ['let, var, const, and arrow functions', 'Array and string methods', 'for-of, for-in, map, and forEach loops', 'Spread, rest, destructuring, callbacks, promises, and async/await'],
  },
  {
    title: 'Introduction to React',
    topics: ['React JS advantages and use cases', 'Virtual DOM fundamentals', 'Development environment setup', 'React project creation and folder structure'],
  },
  {
    title: 'Class Components - 1',
    topics: ['Props, state, and setState', 'Methods as props', 'Forms in React', 'React events, event binding, and form validation'],
  },
  {
    title: 'Styling in React',
    topics: ['Inline and external CSS in React', 'Linking Bootstrap in React', 'Responsive component styling'],
  },
  {
    title: 'Class Components - 2',
    topics: ['Class component syntax', 'constructor and render method', 'JSX in class components'],
  },
  {
    title: 'Advanced Class Components',
    topics: ['Lifecycle methods in class components', 'Pure components', 'Component optimization basics'],
  },
  {
    title: 'Miscellaneous React Topics',
    topics: ['Conditional rendering', 'API calls', 'React fragments', 'LocalStorage and SessionStorage'],
  },
  {
    title: 'Functional Components',
    topics: ['Converting class components to functional components', 'Hooks in functional components', 'useState, useEffect, useMemo, and React.memo', 'useCallback and loaders in React'],
  },
  {
    title: 'Functional Components - 2',
    topics: ['useRef', 'Custom hooks', 'Context API in functional components', 'Design frameworks like Material UI'],
  },
  {
    title: 'Advanced React Topics',
    topics: ['React routing', 'Redux for state management', 'Advanced app structure and integration'],
  },
  {
    title: 'Real World Project and Git',
    topics: ['React JS project development', 'Applying learned concepts to build a complete application', 'Git basics and committing the application to Git'],
  },
]

const nodeOutline = [
  {
    title: 'JavaScript ES6',
    topics: ['ES6 variables, data types, arrow functions, spread, rest, and destructuring', 'Array and string methods, Date in JS, map, and forEach', 'Promises, async programming, setTimeout, and setInterval'],
  },
  {
    title: 'Introduction to Node JS',
    topics: ['Node.js features and use cases', 'Event-driven, non-blocking I/O architecture', 'Development environment setup', 'Building and running a basic Node.js app'],
  },
  {
    title: 'Node JS Modules and NPM',
    topics: ['Working with Node.js modules', 'Managing dependencies with NPM', 'Using popular NPM packages and libraries'],
  },
  {
    title: 'Asynchronous Programming with Node JS',
    topics: ['Asynchronous programming concepts', 'Callbacks, promises, and async/await', 'Error handling and exception management', 'Event-driven programming'],
  },
  {
    title: 'Web Development with Express JS',
    topics: ['Express.js introduction', 'Express app setup', 'Routing and HTTP request handling', 'Middleware usage and templating engines'],
  },
  {
    title: 'Data Persistence with Databases',
    topics: ['Working with MongoDB, MySQL, and other databases', 'CRUD operations and data modelling', 'Database migrations and transactions'],
  },
  {
    title: 'RESTful API Development',
    topics: ['REST API design with Express.js', 'CRUD operations with REST principles', 'JWT authentication and authorization', 'Input validation, error handling, Swagger, and Postman testing'],
  },
  {
    title: 'Project Development and Git',
    topics: ['Collaborative Node.js project development', 'Building a complete Node.js application', 'Project organization and code structure', 'Git basics and committing project work'],
  },
]

const sqlOutline = [
  {
    title: 'Introduction to Databases and SQL',
    topics: ['Overview of databases and DBMS', 'Relational database concepts', 'ACID properties', 'SQL installation and DDL, DML, DCL, TCL command types'],
  },
  {
    title: 'Data Definition Language (DDL)',
    topics: ['Creating databases and tables', 'Data types', 'Primary key, foreign key, unique, not null, and check constraints', 'Altering and dropping tables'],
  },
  {
    title: 'Data Manipulation Language (DML)',
    topics: ['Inserting data into tables', 'Updating and deleting data', 'Retrieving data with SELECT'],
  },
  {
    title: 'Basic Querying Techniques',
    topics: ['SELECT statements', 'WHERE filtering', 'AND, OR, and NOT operators', 'ORDER BY sorting, LIMIT, and pagination'],
  },
  {
    title: 'Advanced Querying Techniques',
    topics: ['COUNT, SUM, AVG, MAX, and MIN aggregate functions', 'GROUP BY and HAVING clauses', 'INNER, LEFT, RIGHT, and FULL JOIN operations', 'Subqueries and nested queries'],
  },
  {
    title: 'Data Control Language (DCL)',
    topics: ['Granting permissions', 'Revoking permissions', 'Database access control basics'],
  },
  {
    title: 'Transaction Control Language (TCL)',
    topics: ['Transactions and ACID properties', 'COMMIT and ROLLBACK', 'Savepoints'],
  },
  {
    title: 'Indexes and Optimization',
    topics: ['Creating and using indexes', 'Query optimization techniques', 'Understanding query execution plans'],
  },
  {
    title: 'Views and Stored Procedures',
    topics: ['Creating and managing views', 'Stored procedures and functions', 'Triggers'],
  },
  {
    title: 'Working with Multiple Tables',
    topics: ['Relationships and foreign keys', 'Using JOINs with multiple tables', 'UNION and UNION ALL'],
  },
  {
    title: 'Database Design and Normalization',
    topics: ['Database design principles', 'Normalization and normal forms', 'Denormalization'],
  },
  {
    title: 'Practical Applications',
    topics: ['Real-world database scenarios', 'SQL coding best practices', 'Debugging and error handling'],
  },
  {
    title: 'Project and Assessment',
    topics: ['Final database design and implementation project', 'Assessments to evaluate SQL understanding and skills'],
  },
]

const basicCodingOutline = [
  {
    title: 'Introduction to JavaScript',
    topics: ['JavaScript overview and applications', 'Development environment setup', 'Basic syntax and data types', 'Variables, constants, and data structures'],
  },
  {
    title: 'Control Flow',
    topics: ['if, else if, and else statements', 'Switch statements', 'for, while, and do-while loops', 'break and continue statements'],
  },
  {
    title: 'Loops',
    topics: ['for loop', 'while loop', 'for-in and for-of loops', 'Loop-based problem solving'],
  },
  {
    title: 'Functions',
    topics: ['Defining and invoking functions', 'Function parameters and arguments', 'Returning values from functions', 'Arrow functions and anonymous expressions'],
  },
  {
    title: 'Arrays and Strings',
    topics: ['Introduction to arrays', 'push, pop, splice, slice, and other array methods', 'Iterating through arrays', 'Strings and string methods'],
  },
  {
    title: 'Objects',
    topics: ['Introduction to objects', 'Object properties and methods', 'Object manipulation and iteration', 'JSON, object to JSON, and JSON to object conversion'],
  },
  {
    title: 'Scope and Closures',
    topics: ['Global, function, and block scope', 'Lexical scoping', 'Closures with practical examples'],
  },
  {
    title: 'Error Handling',
    topics: ['Error handling in JavaScript', 'try, catch, and finally statements', 'Throwing and catching errors'],
  },
]

const pythonOutline = [
  {
    title: 'Python Fundamentals',
    topics: ['Python setup and real-world applications', 'Syntax, variables, data types, and operators', 'Input and output operations', 'Conditionals, loops, control statements, functions, lambda, map, filter, reduce, and list comprehensions'],
  },
  {
    title: 'File Handling',
    topics: ['Working with files in Python', 'Project-focused Python workflows', 'Using Python for academic and practical project topics'],
  },
  {
    title: 'OOP (Object-Oriented Programming)',
    topics: ['Classes and objects', 'Constructors and instance methods', 'Encapsulation and abstraction', 'Inheritance and polymorphism'],
  },
  {
    title: 'Libraries (NumPy and Pandas)',
    topics: ['NumPy arrays, indexing, and operations', 'Pandas Series and DataFrames', 'Data cleaning and preprocessing', 'Filtering, grouping, aggregation, and basic visualization'],
  },
  {
    title: 'API Development (FastAPI / Flask)',
    topics: ['API fundamentals and REST concepts', 'GET, POST, PUT, and DELETE methods', 'Routing and request/response handling', 'Swagger, Postman, middleware, and validation'],
  },
  {
    title: 'Pydantic',
    topics: ['Data validation fundamentals', 'BaseModel and field types', 'Built-in types and collections', 'Nested models, serialization, deserialization, and API usage'],
  },
  {
    title: 'Database (MongoDB / SQL)',
    topics: ['SQL and NoSQL basics', 'CRUD operations', 'Queries, joins, and aggregation', 'Connecting Python APIs with databases'],
  },
  {
    title: 'Capstone Project and Git',
    topics: ['Git and GitHub workflow', 'Building a real-world project', 'API and database integration', 'Project testing and presentation'],
  },
]

const mernOutline = [
  ...reactOutline.slice(0, 11),
  ...nodeOutline.slice(0, 7),
  {
    title: 'MongoDB Basics',
    topics: ['NoSQL database introduction and use cases', 'BSON format', 'Mongo shell, MongoDB Compass, and Robo 3T'],
  },
  {
    title: 'MongoDB CRUD',
    topics: ['insertOne and insertMany', 'find queries', 'updateOne, updateMany, and replaceOne', 'deleteOne and deleteMany'],
  },
  {
    title: 'SQL-like Querying in MongoDB',
    topics: ['distinct queries', 'like-style filtering', 'groupBy-style workflows'],
  },
  {
    title: 'Aggregation',
    topics: ['Basic aggregation', 'count, sort, and limit', 'Aggregation pipeline practice'],
  },
  {
    title: 'Indexes',
    topics: ['Single field indexes', 'Compound indexes', 'Index usage for query performance'],
  },
  {
    title: 'Usage with Node JS',
    topics: ['Mongoose with NPM', 'Database connection', 'Model creation', 'Basic CRUD application'],
  },
  {
    title: 'Project',
    topics: ['Build APIs in Node JS', 'Build frontend in React JS', 'Connect MongoDB database', 'Complete MERN stack integration'],
  },
]

const fullStackOutline = [
  ...reactOutline.slice(0, 11),
  ...nodeOutline.slice(0, 7),
  {
    title: 'SQL Setup',
    topics: ['SQL introduction', 'Installation', 'Database setup'],
  },
  {
    title: 'DDL',
    topics: ['Create, drop, alter, truncate, and rename operations', 'Creating tables', 'Normalization basics'],
  },
  {
    title: 'DML',
    topics: ['Select, insert, update, and delete operations', 'WHERE clause queries', 'Distinct, limit, top, and, or, not, order by, in, and between', 'LIKE, wildcards, aliases, and SQL joins'],
  },
  {
    title: 'Views',
    topics: ['Creating views', 'Altering and calling views', 'Deleting views'],
  },
  {
    title: 'Usage with Node JS',
    topics: ['Database connection', 'Querying from Node JS', 'Building a basic CRUD application'],
  },
]

export const courses: Course[] = [
  {
    slug: 'reactjs',
    title: 'ReactJS',
    desc: 'Frontend Development with live projects',
    tagline: 'Build fast, modern interfaces with components, hooks, routing, and real production patterns.',
    duration: '8 weeks',
    level: 'Beginner to Intermediate',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    highlights: [
      'Learn React fundamentals through hands-on UI builds',
      'Create responsive pages with reusable components',
      'Connect frontend apps to APIs and deploy them online',
    ],
    tools: ['React', 'Next.js', 'Tailwind CSS', 'GitHub', 'Vercel'],
    modules: [
      'JavaScript refresh and component thinking',
      'Props, state, events, hooks, and forms',
      'Routing, API calls, loading states, and deployment',
    ],
    outline: reactOutline,
    projects: ['Portfolio website', 'Course dashboard', 'API-powered mini app'],
  },
  {
    slug: 'python',
    title: 'Python',
    desc: 'Automation + AI + backend development',
    tagline: 'Use Python to automate tasks, work with data, build APIs, and create practical AI workflows.',
    duration: '10 weeks',
    level: 'Beginner Friendly',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
    highlights: [
      'Start from Python basics and move into real automation',
      'Build backend APIs and connect them to simple interfaces',
      'Use Python libraries for files, data, and AI-powered tasks',
    ],
    tools: ['Python', 'Flask', 'FastAPI', 'Pandas', 'OpenAI APIs'],
    modules: [
      'Python syntax, functions, loops, and data structures',
      'Files, automation scripts, packages, and virtual environments',
      'APIs, data workflows, and AI integrations',
    ],
    outline: pythonOutline,
    projects: ['Automation script', 'Backend API', 'AI assistant prototype'],
  },
  {
    slug: 'genai',
    title: 'GenAI',
    desc: 'AI tools, prompt engineering & APIs',
    tagline: 'Learn how modern AI tools work and build useful AI features with prompts, workflows, and APIs.',
    duration: '6 weeks',
    level: 'Beginner to Intermediate',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    highlights: [
      'Understand prompt structure, model behavior, and AI workflows',
      'Create assistants, content tools, and automation flows',
      'Build API-based AI features for websites and apps',
    ],
    tools: ['ChatGPT', 'OpenAI APIs', 'Prompt Engineering', 'Automation Tools', 'No-code AI'],
    modules: [
      'Prompting fundamentals and structured outputs',
      'AI tools for research, content, coding, and productivity',
      'Building AI apps with APIs and safe evaluation habits',
    ],
    projects: ['Prompt toolkit', 'AI content workflow', 'Custom AI app prototype'],
  },
  {
    slug: 'web-design',
    title: 'Web Development',
    desc: 'Frontend websites with HTML, CSS, JavaScript & UI basics',
    tagline: 'Build clean, modern websites with strong layouts, responsive styling, and user-friendly flows.',
    duration: '6 weeks',
    level: 'Beginner Friendly',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e',
    highlights: [
      'Learn HTML, CSS, JavaScript, layout, spacing, and UI patterns',
      'Build responsive website pages from polished designs',
      'Create portfolio-ready web projects with clean structure',
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Responsive Design'],
    modules: [
      'Web basics, visual hierarchy, and layout systems',
      'HTML, CSS, responsive styling, and interactive JavaScript',
      'Figma to website workflow, deployment, and portfolio polish',
    ],
    projects: ['Responsive landing page', 'Business website', 'Portfolio case study'],
  },
  {
    slug: 'sql',
    title: 'SQL',
    desc: 'Database queries, joins, reports & data basics',
    tagline: 'Learn how to store, query, filter, join, and analyze data using practical database examples.',
    duration: '4 weeks',
    level: 'Beginner Friendly',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
    highlights: [
      'Write clean SQL queries for real database tasks',
      'Understand tables, relationships, joins, and constraints',
      'Create reports using filters, grouping, sorting, and aggregate functions',
    ],
    tools: ['SQL', 'MySQL', 'PostgreSQL', 'Database Design', 'Reports'],
    modules: [
      'Tables, columns, data types, keys, and relationships',
      'SELECT queries, filters, sorting, joins, and subqueries',
      'Grouping, aggregate functions, reports, and database practice',
    ],
    outline: sqlOutline,
    projects: ['Student database', 'Sales report queries', 'Mini analytics dashboard data'],
  },
  {
    slug: 'nodejs',
    title: 'NodeJs',
    desc: 'Backend APIs with JavaScript, Express & databases',
    tagline: 'Build backend services, REST APIs, authentication flows, and database-connected applications.',
    duration: '8 weeks',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
    highlights: [
      'Use JavaScript on the server with NodeJs and Express',
      'Create REST APIs with routing, validation, and middleware',
      'Connect APIs to databases and handle real backend workflows',
    ],
    tools: ['NodeJs', 'Express', 'MongoDB', 'REST APIs', 'Postman'],
    modules: [
      'NodeJs fundamentals, npm, modules, and server setup',
      'Express routes, middleware, controllers, and API structure',
      'Database connection, authentication basics, and deployment',
    ],
    outline: nodeOutline,
    projects: ['Task manager API', 'Authentication backend', 'Course inquiry API'],
  },
  {
    slug: 'basic-coding',
    title: 'Basic Coding',
    desc: 'Programming fundamentals for complete beginners',
    tagline: 'Start coding from scratch with logic building, problem solving, and beginner-friendly projects.',
    duration: '6 weeks',
    level: 'Beginner Friendly',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    highlights: [
      'Understand variables, conditions, loops, functions, and arrays',
      'Build confidence with simple coding exercises and mini projects',
      'Learn how to think through problems step by step',
    ],
    tools: ['JavaScript', 'Python Basics', 'VS Code', 'Logic Building', 'GitHub'],
    modules: [
      'Computer basics, code editors, variables, and data types',
      'Conditions, loops, functions, arrays, and debugging',
      'Problem solving practice and small project building',
    ],
    outline: basicCodingOutline,
    projects: ['Calculator app', 'Quiz program', 'Student marks analyzer'],
  },
  {
    slug: 'mern-stack',
    title: 'MERN Stack',
    desc: 'MongoDB, Express, React & NodeJs full project training',
    tagline: 'Build complete web applications with React frontend, NodeJs backend, APIs, and MongoDB.',
    duration: '12 weeks',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    highlights: [
      'Create full stack apps with MongoDB, Express, React, and NodeJs',
      'Build reusable frontend components and backend API endpoints',
      'Handle forms, authentication, database records, and deployment',
    ],
    tools: ['MongoDB', 'Express', 'React', 'NodeJs', 'Tailwind CSS'],
    modules: [
      'React frontend, components, hooks, routing, and forms',
      'NodeJs and Express APIs with MongoDB database operations',
      'Authentication, integration, deployment, and project polish',
    ],
    outline: mernOutline,
    projects: ['Job portal app', 'Student management system', 'Full stack dashboard'],
  },
  {
    slug: 'full-stack',
    title: 'Full Stack',
    desc: 'Frontend, backend, databases & deployment',
    tagline: 'Learn the complete web development workflow from user interface to backend logic and hosting.',
    duration: '14 weeks',
    level: 'Beginner to Intermediate',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    highlights: [
      'Build responsive frontends and scalable backend APIs',
      'Work with databases, authentication, and complete app flows',
      'Deploy full stack projects with portfolio-ready presentation',
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'React', 'NodeJs', 'Databases'],
    modules: [
      'Frontend foundations, React components, routing, and UI states',
      'Backend APIs, database design, authentication, and validation',
      'Full app integration, deployment, testing basics, and portfolio preparation',
    ],
    outline: fullStackOutline,
    projects: ['E-commerce app', 'Admin dashboard', 'Capstone full stack project'],
  },
]

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug)
}
