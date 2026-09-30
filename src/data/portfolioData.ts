// ─── Portfolio Data Layer ─────────────────────────────────────────────────────
// All content is centralized here. Edit this file to update projects,
// experience entries, skills, and personal info without touching components.

export const profile = {
  name: 'Kibrom Abebe',
  handle: 'kebi',
  title: 'Full-Stack Software Engineer',
  tagline:
    'Building resilient web applications, scalable backends, and modular systems — from ARM assembly to cloud-deployed microservices.',
  status: 'Available for Full-Stack & Backend Roles',
  statusActive: true,
  location: 'Mekelle, Ethiopia (UTC+3)',
  email: 'kibromabebe20@gmail.com',
  github: 'https://github.com/kibrom-bit',
  linkedin:
    'https://www.linkedin.com/in/kibrom-abebe-a99a63384',
  telegram: 'https://t.me/mylordjesus3',
  resume: '/assets/Kibrom_Abebe_Resume.pdf',
  bio: `I'm a passionate Full-Stack Software Engineer and student leader at Mekelle University, Ethiopia. I architect end-to-end digital solutions — spanning React + Next.js frontends, NestJS/Express microservice backends, Flutter mobile apps, and even ARM Cortex-M3 embedded firmware. I lead teams, contribute to open source, and obsess over clean architecture, API-first design, and developer experience.`,
  philosophyPrinciples: [
    {
      id: 'architecture',
      icon: 'Layers',
      title: 'Clean Architecture & Scalable Systems',
      color: 'blue',
      description:
        'I treat architecture as a first-class citizen — separating concerns, inverting dependencies, and ensuring systems remain testable and evolvable as they grow.',
      points: [
        'Domain-driven design & bounded contexts',
        'Dependency inversion & interface segregation',
        'Hexagonal / Ports-and-Adapters pattern',
      ],
    },
    {
      id: 'api',
      icon: 'Code2',
      title: 'API-First Design',
      color: 'violet',
      description:
        'Contracts before code. Every backend service I build starts with an OpenAPI spec, enabling parallel frontend/backend development and living documentation.',
      points: [
        'OpenAPI / Swagger contract-first specs',
        'RESTful conventions + semantic versioning',
        'Consistent error envelopes & hypermedia',
      ],
    },
    {
      id: 'performance',
      icon: 'Zap',
      title: 'Performance & Accessibility',
      color: 'emerald',
      description:
        'Speed and inclusivity are non-negotiable. I optimize for Core Web Vitals, instrument with tracing tools, and build UIs that work for every user.',
      points: [
        'Core Web Vitals — LCP < 2.5s, CLS < 0.1',
        'WCAG 2.1 AA semantic HTML',
        'Bundle analysis & lazy-loading strategies',
      ],
    },
  ],
};

export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend & UI',
    icon: 'Monitor',
    color: 'blue',
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'Next.js 15', level: 90 },
      { name: 'TypeScript', level: 92 },
      { name: 'Tailwind CSS', level: 93 },
      { name: 'Framer Motion', level: 80 },
      { name: 'State Management', level: 85 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & System Design',
    icon: 'Server',
    color: 'violet',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 85 },
      { name: 'NestJS', level: 80 },
      { name: 'RESTful APIs', level: 92 },
      { name: 'OpenAPI / Swagger', level: 82 },
      { name: 'Clean Architecture', level: 85 },
    ],
  },
  {
    id: 'databases',
    label: 'Databases & ORMs',
    icon: 'Database',
    color: 'emerald',
    skills: [
      { name: 'PostgreSQL', level: 82 },
      { name: 'MongoDB', level: 80 },
      { name: 'Prisma ORM', level: 80 },
      { name: 'TypeORM', level: 75 },
      { name: 'SQL', level: 85 },
      { name: 'Redis', level: 70 },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile & Low-Level',
    icon: 'Cpu',
    color: 'amber',
    skills: [
      { name: 'Flutter', level: 78 },
      { name: 'ARM Cortex-M3 Asm', level: 72 },
      { name: 'C / C++', level: 75 },
      { name: 'Embedded CMSIS', level: 68 },
      { name: 'Dart', level: 76 },
    ],
  },
  {
    id: 'devops',
    label: 'Tools & Infrastructure',
    icon: 'GitBranch',
    color: 'rose',
    skills: [
      { name: 'Git / GitHub', level: 93 },
      { name: 'Docker', level: 82 },
      { name: 'Monorepos', level: 78 },
      { name: 'Vercel', level: 88 },
      { name: 'Render CI/CD', level: 80 },
      { name: 'Design Patterns', level: 85 },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  category: string;
  featured: boolean;
  timeline: string;
  techStack: string[];
  metrics: { label: string; value: string; description: string }[];
  problemStatement: string;
  architectureDescription: string;
  tradeoffs: { decision: string; chosen: string; rejected: string; rationale: string }[];
  role: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  apiEndpoint?: { method: string; path: string; description: string; response: object };
  accentColor: string;
};

export const projects: Project[] = [
  {
    id: 'nexus-api-gateway',
    title: 'Nexus API Gateway',
    tagline: 'High-throughput NestJS microservice gateway handling 10k+ concurrent sessions with sub-200ms p99 latency.',
    category: 'backend',
    featured: true,
    timeline: 'Jan 2025 – Jun 2025',
    techStack: ['NestJS', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker', 'Redis', 'OpenAPI'],
    metrics: [
      { label: 'API Uptime', value: '99.97%', description: 'Measured over 6-month production window' },
      { label: 'P99 Latency', value: '<180ms', description: 'Under 10k concurrent sessions' },
      { label: 'Endpoints', value: '48+', description: 'Fully documented via OpenAPI 3.1' },
    ],
    problemStatement:
      'A university IT system required a unified API layer to federate 6 independent legacy services — each with different auth models, data schemas, and rate limits — into a single, consistent REST interface consumable by a React SPA and a Flutter mobile client.',
    architectureDescription:
      'Client → NestJS Gateway (JWT Guard + Rate Limiter) → Service Router → [Auth Svc | Student Svc | Records Svc] → PostgreSQL / Redis Cache',
    tradeoffs: [
      {
        decision: 'Caching Strategy',
        chosen: 'Redis read-through cache at gateway layer',
        rejected: 'In-process LRU cache per service instance',
        rationale: 'Redis provides a shared cache across horizontally scaled gateway replicas, whereas in-process LRU fragments under multi-instance deployments.',
      },
      {
        decision: 'ORM Choice',
        chosen: 'Prisma ORM with type-safe migrations',
        rejected: 'Raw SQL via pg driver',
        rationale: 'Prisma migrations are declarative and version-controlled, reducing schema drift risk at the cost of minor query flexibility.',
      },
    ],
    role: 'Lead Backend Architect — sole ownership of NestJS gateway, OpenAPI specs, and Docker Compose orchestration.',
    githubUrl: 'https://github.com/kibrom-bit/nexus-api-gateway',
    liveUrl: 'https://nexus-gateway-api.onrender.com',
    apiEndpoint: {
      method: 'GET',
      path: '/api/v1/gateway/health',
      description: 'Cluster telemetry, DB pool status, and p99 latency metrics.',
      response: {
        status: 'healthy',
        uptime: '99.97%',
        cluster: 'prod-eth-01',
        activeConnections: 142,
        cache: { provider: 'Redis', hitRate: '87.4%', avgTtlSec: 300 },
        database: { pool: 'Prisma/PostgreSQL', status: 'healthy', pingMs: 3.8 },
        p99Latency: '178ms',
      },
    },
    accentColor: 'blue',
  },
  {
    id: 'collab-board',
    title: 'CollabBoard — Real-Time Task Platform',
    tagline: 'Full-stack task management SaaS with Socket.io real-time sync, drag-and-drop boards, and team collaboration for 200+ concurrent users.',
    category: 'fullstack',
    featured: true,
    timeline: 'Aug 2024 – Dec 2024',
    techStack: ['Next.js 15', 'React', 'TypeScript', 'Socket.io', 'Express', 'MongoDB', 'Tailwind CSS'],
    metrics: [
      { label: 'Concurrent Users', value: '200+', description: 'WebSocket sessions under load test' },
      { label: 'Event Lag', value: '<50ms', description: 'Real-time board update broadcast latency' },
      { label: 'Code Coverage', value: '84%', description: 'Jest unit + integration test suite' },
    ],
    problemStatement:
      'Student project teams at Mekelle University struggled to coordinate tasks across WhatsApp and Google Docs — neither of which offered a structured kanban workflow. The requirement was a real-time, multi-board task system with role-based access, file attachment, and mobile-responsive UI.',
    architectureDescription:
      'Next.js (SSR + Client) → Express REST API → MongoDB Atlas | Socket.io Event Bus → Connected Clients',
    tradeoffs: [
      {
        decision: 'State Sync Model',
        chosen: 'Server-authoritative Socket.io event broadcasts',
        rejected: 'Optimistic client-side CRDT updates',
        rationale: 'Server-authoritative model is simpler to reason about and prevents split-brain scenarios, at the cost of one extra RTT per mutation.',
      },
    ],
    role: 'Full-Stack Lead — React component architecture, Express REST layer, Socket.io integration, and MongoDB schema design.',
    githubUrl: 'https://github.com/kibrom-bit/collab-board',
    liveUrl: 'https://collab-board.vercel.app',
    apiEndpoint: {
      method: 'POST',
      path: '/api/v1/boards/:boardId/tasks',
      description: 'Creates a new task and broadcasts the event to all board subscribers.',
      response: {
        id: 'tsk_7fa3bc12',
        title: 'Design API schema for Sprint 4',
        status: 'todo',
        boardId: 'brd_99de44',
        assignee: { name: 'Kibrom Abebe', handle: '@kibrom-bit' },
        createdAt: '2025-01-15T09:32:00Z',
        broadcastedTo: 8,
      },
    },
    accentColor: 'violet',
  },
  {
    id: 'flutter-fintrack',
    title: 'FinTrack Mobile — Flutter Finance App',
    tagline: 'Cross-platform Flutter app with offline-first SQLite storage, real-time expense charts, and local biometric authentication.',
    category: 'mobile',
    featured: true,
    timeline: 'Mar 2025 – Jul 2025',
    techStack: ['Flutter', 'Dart', 'SQLite', 'Provider', 'REST API', 'fl_chart'],
    metrics: [
      { label: 'Platforms', value: 'iOS + Android', description: 'Single Dart codebase' },
      { label: 'Offline Support', value: '100%', description: 'Full CRUD without network' },
      { label: 'App Size', value: '12MB', description: 'Optimized release build' },
    ],
    problemStatement:
      'Users in regions with unreliable internet needed a personal finance tracker that worked fully offline and synced with a remote backend when connectivity resumed. Biometric gate was required for financial data security.',
    architectureDescription:
      'Flutter App → Provider State Layer → Local SQLite → Background Sync Svc → REST API (Express/Node.js)',
    tradeoffs: [
      {
        decision: 'State Management',
        chosen: 'Provider + ChangeNotifier',
        rejected: 'BLoC / Cubit pattern',
        rationale: 'Provider offered lower boilerplate for a single-developer project. BLoC would be preferable for a larger team needing strict event/state separation.',
      },
    ],
    role: 'Sole Mobile Engineer — Flutter architecture, SQLite schema, Provider state management, biometric auth integration.',
    githubUrl: 'https://github.com/kibrom-bit/fintrack-mobile',
    liveUrl: 'https://fintrack-mobile.web.app',
    accentColor: 'emerald',
  },
  {
    id: 'arm-scheduler',
    title: 'ARM RTOS Scheduler — Embedded Systems',
    tagline: 'Bare-metal round-robin task scheduler in ARM Cortex-M3 Assembly and C, with context switching under 8µs interrupt latency.',
    category: 'embedded',
    featured: false,
    timeline: 'Sep 2024 – Nov 2024',
    techStack: ['ARM Cortex-M3 Assembly', 'C/C++', 'CMSIS', 'STM32', 'Keil uVision'],
    metrics: [
      { label: 'IRQ Latency', value: '<8µs', description: 'Context switch interrupt response' },
      { label: 'Tasks Scheduled', value: '16 max', description: 'Round-robin task slots' },
      { label: 'RAM Footprint', value: '2KB', description: 'Scheduler overhead on 64KB device' },
    ],
    problemStatement:
      'A university embedded systems course required implementing a cooperative multitasking scheduler without an OS abstraction layer. The scheduler had to handle task registration, stack isolation, and SysTick-driven preemption entirely in assembly and C.',
    architectureDescription:
      'SysTick ISR → Context Save (PendSV) → Scheduler (Round-Robin) → Task Stack Restore → Task Resume',
    tradeoffs: [
      {
        decision: 'Context Switch Trigger',
        chosen: 'PendSV handler for deferred context switching',
        rejected: 'Direct context switch in SysTick ISR',
        rationale: 'PendSV has the lowest priority and prevents nested context switches, which is a common source of hard faults in bare-metal schedulers.',
      },
    ],
    role: 'Sole Engineer — ISR design, task stack frame layout, round-robin scheduler, and CMSIS integration.',
    githubUrl: 'https://github.com/kibrom-bit/arm-rtos-scheduler',
    liveUrl: 'https://github.com/kibrom-bit/arm-rtos-scheduler',
    accentColor: 'amber',
  },
];

export type Experience = {
  id: string;
  role: string;
  organization: string;
  location: string;
  category: 'engineering' | 'leadership' | 'research';
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  summary: string;
  accomplishments: string[];
  technologies: string[];
  leadershipScope?: string;
};

export const experiences: Experience[] = [
  {
    id: 'mekelle-uni',
    role: 'Software Engineering Student & Project Lead',
    organization: 'Mekelle University',
    location: 'Mekelle, Ethiopia',
    category: 'engineering',
    startDate: '2022-09',
    endDate: null,
    isCurrent: true,
    summary: 'Pursuing a BSc in Software Engineering with a focus on distributed systems, algorithms, and embedded programming. Led several capstone projects with measurable engineering outcomes.',
    accomplishments: [
      'Built and deployed the Nexus API Gateway handling 10k+ sessions for the university IT division',
      'Designed ARM Cortex-M3 RTOS scheduler as part of embedded systems coursework — IRQ latency < 8µs',
      'Led a 4-person team to deliver CollabBoard, a real-time task management SaaS adopted by 3 student clubs',
      'Maintained top-quartile academic performance across algorithms, OS, and computer architecture modules',
    ],
    technologies: ['React', 'NestJS', 'PostgreSQL', 'Flutter', 'ARM Assembly', 'C/C++', 'Docker'],
  },
  {
    id: 'student-union-lead',
    role: 'Technical Lead & Student Union Officer',
    organization: 'Mekelle University Students Union',
    location: 'Mekelle, Ethiopia',
    category: 'leadership',
    startDate: '2023-10',
    endDate: null,
    isCurrent: true,
    summary: 'Elected technical lead of the student union, managing digital infrastructure and a team of 14 student officers serving over 2,000 members across 6 faculties.',
    accomplishments: [
      "Architected and deployed the union's internal web portal reducing administrative overhead by an estimated 40%",
      'Managed tech operations for 3 major campus events with 500+ attendees each',
      'Mentored 8 junior developers through a structured code review and pair programming program',
      'Liaised between the union board and university IT department to deliver a unified student services platform',
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Vercel'],
    leadershipScope: 'Directly led 14 student officers; oversaw digital operations for 2,000+ member base.',
  },
  {
    id: 'freelance-fullstack',
    role: 'Freelance Full-Stack Engineer',
    organization: 'Independent Contracts',
    location: 'Remote',
    category: 'engineering',
    startDate: '2023-01',
    endDate: null,
    isCurrent: true,
    summary: 'Delivered custom web and mobile solutions for 5+ clients across education, retail, and services sectors.',
    accomplishments: [
      'Delivered a multi-tenant e-commerce backend with Stripe integration and PostgreSQL multi-schema architecture',
      'Built a React + Express dashboard for a local NGO tracking supply chain logistics across 12 warehouses',
      'Created a Flutter mobile app for a retail client featuring barcode scanning and offline SQLite sync',
    ],
    technologies: ['React', 'Next.js', 'Express', 'PostgreSQL', 'Flutter', 'Stripe API', 'Docker'],
  },
];

// ─── Mock OpenAPI Endpoints for Live Playground ──────────────────────────────
export const mockEndpoints = [
  {
    id: 'health',
    name: 'Cluster Health & Telemetry',
    method: 'GET' as const,
    path: '/api/v1/gateway/health',
    description: 'Polls system status, DB connection pool health, cache hit rate, and p99 response latency.',
    latencyMs: 38,
    statusCode: 200,
    response: {
      status: 'healthy',
      uptime: '99.97%',
      cluster: 'prod-eth-01',
      activeConnections: 142,
      cache: { provider: 'Redis', hitRate: '87.4%', avgTtlSec: 300 },
      database: { pool: 'Prisma/PostgreSQL', status: 'healthy', pingMs: 3.8 },
      p99Latency: '178ms',
      timestamp: new Date().toISOString(),
    },
  },
  {
    id: 'tasks',
    name: 'Create Task & Broadcast',
    method: 'POST' as const,
    path: '/api/v1/boards/{boardId}/tasks',
    description: 'Creates a task card on the specified board and broadcasts the event to all Socket.io subscribers.',
    latencyMs: 72,
    statusCode: 201,
    response: {
      id: 'tsk_7fa3bc12',
      title: 'Implement OpenAPI specification review',
      status: 'todo',
      priority: 'high',
      boardId: 'brd_99de44',
      assignee: { name: 'Kibrom Abebe', handle: '@kibrom-bit' },
      createdAt: new Date().toISOString(),
      broadcastedTo: 8,
      schemaValidation: 'PASSED',
    },
  },
  {
    id: 'profile',
    name: 'Get Student Profile',
    method: 'GET' as const,
    path: '/api/v1/students/{studentId}/profile',
    description: "Retrieves a student's full profile including enrolled courses, GPA, and academic standing.",
    latencyMs: 24,
    statusCode: 200,
    response: {
      studentId: 'STU-2022-0047',
      name: 'Kibrom Abebe',
      faculty: 'Computing & Informatics',
      major: 'Software Engineering',
      year: 4,
      gpa: 3.82,
      standing: 'Good',
      enrolledCourses: 6,
      cachedAt: new Date().toISOString(),
      source: 'redis-cache',
    },
  },
];
