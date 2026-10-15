export const INITIAL_USERS = [
  {
    id: 'u-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@google.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    role: 'SUPER_ADMIN',
    isVerified: true,
    status: 'active',
    createdAt: '2025-01-10T08:00:00Z',
    department: 'Executive Leadership'
  },
  {
    id: 'u-2',
    name: 'Sarah Chen',
    email: 'sarah.chen@techcorp.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    role: 'ADMIN',
    isVerified: true,
    status: 'active',
    createdAt: '2025-01-15T09:30:00Z',
    department: 'Engineering'
  },
  {
    id: 'u-3',
    name: 'Marcus Vance',
    email: 'marcus.vance@techcorp.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    role: 'ADMIN',
    isVerified: true,
    status: 'active',
    createdAt: '2025-01-20T11:15:00Z',
    department: 'Product Management'
  },
  {
    id: 'u-4',
    name: 'Elena Rostova',
    email: 'elena.rostova@techcorp.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    role: 'MEMBER',
    isVerified: true,
    status: 'active',
    createdAt: '2025-02-01T14:20:00Z',
    department: 'UI/UX Design'
  },
  {
    id: 'u-5',
    name: 'Devon Wright',
    email: 'devon.wright@techcorp.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    role: 'MEMBER',
    isVerified: true,
    status: 'active',
    createdAt: '2025-02-05T16:45:00Z',
    department: 'Backend Infrastructure'
  },
  {
    id: 'u-6',
    name: 'Aisha Patel',
    email: 'aisha.patel@techcorp.io',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    role: 'MEMBER',
    isVerified: true,
    status: 'active',
    createdAt: '2025-02-10T10:00:00Z',
    department: 'QA & DevOps'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'p-1',
    title: 'Cloud SaaS Portal v2.0',
    description: 'Next-gen enterprise multi-tenant analytics engine with real-time dashboards, RBAC, and AI insight summaries.',
    ownerId: 'u-2',
    ownerName: 'Sarah Chen',
    members: [INITIAL_USERS[0], INITIAL_USERS[1], INITIAL_USERS[3], INITIAL_USERS[4]],
    deadline: '2026-09-30',
    status: 'active',
    priority: 'URGENT',
    progress: 68,
    category: 'Engineering',
    createdAt: '2025-03-01T08:00:00Z',
    updatedAt: '2026-08-01T12:00:00Z'
  },
  {
    id: 'p-2',
    title: 'Mobile App Redesign',
    description: 'Native iOS & Android app refresh focusing on smooth Framer Motion interactions, dark mode, and offline sync.',
    ownerId: 'u-3',
    ownerName: 'Marcus Vance',
    members: [INITIAL_USERS[2], INITIAL_USERS[3], INITIAL_USERS[5]],
    deadline: '2026-10-15',
    status: 'active',
    priority: 'HIGH',
    progress: 42,
    category: 'Design & Mobile',
    createdAt: '2025-03-15T09:00:00Z',
    updatedAt: '2026-08-02T14:30:00Z'
  },
  {
    id: 'p-3',
    title: 'AI Copilot Integration',
    description: 'Embed Gemini AI models for automated task generation, natural language command search, and smart summarization.',
    ownerId: 'u-1',
    ownerName: 'Alex Rivera',
    members: [INITIAL_USERS[0], INITIAL_USERS[1], INITIAL_USERS[4]],
    deadline: '2026-08-28',
    status: 'active',
    priority: 'URGENT',
    progress: 85,
    category: 'Artificial Intelligence',
    createdAt: '2025-04-01T10:00:00Z',
    updatedAt: '2026-08-04T16:00:00Z'
  },
  {
    id: 'p-4',
    title: 'Cybersecurity Audit & SOC2',
    description: 'Enterprise penetration testing, role access authorization audits, rate limiting, and automated security hardening.',
    ownerId: 'u-2',
    ownerName: 'Sarah Chen',
    members: [INITIAL_USERS[1], INITIAL_USERS[4], INITIAL_USERS[5]],
    deadline: '2026-11-01',
    status: 'active',
    priority: 'MEDIUM',
    progress: 25,
    category: 'Security',
    createdAt: '2025-05-01T11:00:00Z',
    updatedAt: '2026-08-03T11:00:00Z'
  }
];

export const INITIAL_TASKS = [
  {
    id: 't-101',
    title: 'Implement JWT Auth & Refresh Tokens',
    description: 'Setup secure HttpOnly cookies, refresh token rotation, and bcrypt password hashing middleware for Express.',
    assignedTo: INITIAL_USERS[4],
    assignedBy: INITIAL_USERS[1],
    projectId: 'p-1',
    projectTitle: 'Cloud SaaS Portal v2.0',
    priority: 'URGENT',
    status: 'DONE',
    deadline: '2026-08-10',
    tags: ['Backend', 'Security', 'Auth'],
    attachments: [
      { id: 'att-1', name: 'auth_architecture_spec.pdf', url: '#', size: '2.4 MB', type: 'application/pdf', uploadedAt: '2026-08-01' }
    ],
    subtasks: [
      { id: 'st-1', title: 'Create JWT signing utility', completed: true },
      { id: 'st-2', title: 'Configure HttpOnly cookie parser', completed: true },
      { id: 'st-3', title: 'Add role authorization guard', completed: true }
    ],
    createdAt: '2026-08-01T09:00:00Z',
    updatedAt: '2026-08-04T10:00:00Z',
    aiSummary: 'Completed core security layer with bcrypt hashing, JWT access/refresh token rotation, and HttpOnly cookie security.'
  },
  {
    id: 't-102',
    title: 'Design Glassmorphism Kanban Column Layout',
    description: 'Build responsive drag-and-drop Kanban columns with translucent backdrop-blur, smooth motion transitions, and priority badges.',
    assignedTo: INITIAL_USERS[3],
    assignedBy: INITIAL_USERS[2],
    projectId: 'p-1',
    projectTitle: 'Cloud SaaS Portal v2.0',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    deadline: '2026-08-18',
    tags: ['Frontend', 'UI/UX', 'Tailwind'],
    attachments: [
      { id: 'att-2', name: 'kanban_wireframe_figma.png', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400', size: '1.1 MB', type: 'image/png', uploadedAt: '2026-08-02' }
    ],
    subtasks: [
      { id: 'st-4', title: 'Design column header with task count badge', completed: true },
      { id: 'st-5', title: 'Add quick inline task creation', completed: false },
      { id: 'st-6', title: 'Implement smooth drag hover states', completed: true }
    ],
    createdAt: '2026-08-02T10:30:00Z',
    updatedAt: '2026-08-05T08:15:00Z',
    aiSummary: 'Kanban view framework active with responsive columns, drag triggers, and custom glassmorphism styling.'
  },
  {
    id: 't-103',
    title: 'Gemini AI Smart Task Summarizer Server Route',
    description: 'Integrate @google/genai SDK on Express backend to summarize task activity logs and generate actionable subtasks.',
    assignedTo: INITIAL_USERS[1],
    assignedBy: INITIAL_USERS[0],
    projectId: 'p-3',
    projectTitle: 'AI Copilot Integration',
    priority: 'URGENT',
    status: 'IN_REVIEW',
    deadline: '2026-08-12',
    tags: ['AI', 'Gemini', 'Express'],
    attachments: [],
    subtasks: [
      { id: 'st-7', title: 'Configure server-side @google/genai SDK', completed: true },
      { id: 'st-8', title: 'Create /api/ai/summarize-task POST endpoint', completed: true },
      { id: 'st-9', title: 'Add fallback error handler for API key limits', completed: true }
    ],
    createdAt: '2026-08-03T11:00:00Z',
    updatedAt: '2026-08-05T12:00:00Z',
    aiSummary: 'Implemented server-side endpoint calling gemini-3.6-flash for automatic task summarization and subtask generation.'
  },
  {
    id: 't-104',
    title: 'Recharts Team Productivity & Velocity Dashboard',
    description: 'Create interactive charts for tasks by status, monthly activity trends, and team member workload distribution.',
    assignedTo: INITIAL_USERS[1],
    assignedBy: INITIAL_USERS[0],
    projectId: 'p-1',
    projectTitle: 'Cloud SaaS Portal v2.0',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    deadline: '2026-08-20',
    tags: ['Analytics', 'Recharts', 'Dashboard'],
    attachments: [],
    subtasks: [
      { id: 'st-10', title: 'Tasks by status PieChart component', completed: true },
      { id: 'st-11', title: 'Monthly velocity AreaChart component', completed: true },
      { id: 'st-12', title: 'Member workload BarChart component', completed: false }
    ],
    createdAt: '2026-08-03T14:20:00Z',
    updatedAt: '2026-08-05T09:00:00Z'
  },
  {
    id: 't-105',
    title: 'Socket.io Real-time Notification Engine',
    description: 'Broadcast task assignments, status changes, and user mentions instantly across active web sessions.',
    assignedTo: INITIAL_USERS[5],
    assignedBy: INITIAL_USERS[1],
    projectId: 'p-3',
    projectTitle: 'AI Copilot Integration',
    priority: 'HIGH',
    status: 'TODO',
    deadline: '2026-08-25',
    tags: ['Realtime', 'WebSockets', 'Backend'],
    attachments: [],
    subtasks: [
      { id: 'st-13', title: 'Setup WebSocket server event handlers', completed: false },
      { id: 'st-14', title: 'Frontend toast notification trigger on event', completed: false }
    ],
    createdAt: '2026-08-04T08:00:00Z',
    updatedAt: '2026-08-04T08:00:00Z'
  },
  {
    id: 't-106',
    title: 'Command Palette (Cmd+K) Quick Navigation',
    description: 'Instant search drawer for jumping between projects, tasks, members, and executing quick actions like Create Task.',
    assignedTo: INITIAL_USERS[3],
    assignedBy: INITIAL_USERS[2],
    projectId: 'p-2',
    projectTitle: 'Mobile App Redesign',
    priority: 'MEDIUM',
    status: 'DONE',
    deadline: '2026-08-15',
    tags: ['Frontend', 'UX', 'Search'],
    attachments: [],
    subtasks: [
      { id: 'st-15', title: 'Keyboard shortcut listener', completed: true },
      { id: 'st-16', title: 'Instant fuzzy filter for tasks and projects', completed: true }
    ],
    createdAt: '2026-08-02T15:00:00Z',
    updatedAt: '2026-08-04T16:45:00Z'
  }
];

export const INITIAL_COMMENTS = [
  {
    id: 'c-1',
    taskId: 't-102',
    userId: 'u-2',
    userName: 'Sarah Chen',
    userAvatar: INITIAL_USERS[1].avatar,
    message: 'Looks great Elena! Make sure the drop indicators highlight cleanly when dragging across columns.',
    createdAt: '2026-08-04T14:20:00Z'
  },
  {
    id: 'c-2',
    taskId: 't-102',
    userId: 'u-4',
    userName: 'Elena Rostova',
    userAvatar: INITIAL_USERS[3].avatar,
    message: 'Thanks Sarah! Adding custom glow effects on the target column now.',
    createdAt: '2026-08-04T15:00:00Z'
  },
  {
    id: 'c-3',
    taskId: 't-103',
    userId: 'u-1',
    userName: 'Alex Rivera',
    userAvatar: INITIAL_USERS[0].avatar,
    message: 'The Gemini summarization response looks razor-sharp! Tested it with 10 activity logs.',
    createdAt: '2026-08-05T10:15:00Z'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'n-1',
    userId: 'u-1',
    title: 'New Task Assigned',
    message: 'Sarah Chen assigned you to "Gemini AI Smart Task Summarizer Server Route".',
    type: 'task_assigned',
    isRead: false,
    createdAt: '2026-08-05T11:00:00Z',
    link: 't-103'
  },
  {
    id: 'n-2',
    userId: 'u-1',
    title: 'Task Completed',
    message: 'Devon Wright completed "Implement JWT Auth & Refresh Tokens".',
    type: 'task_completed',
    isRead: true,
    createdAt: '2026-08-04T10:00:00Z',
    link: 't-101'
  },
  {
    id: 'n-3',
    userId: 'u-1',
    title: 'Project Update',
    message: 'Project "Cloud SaaS Portal v2.0" reached 68% completion milestone.',
    type: 'project_update',
    isRead: false,
    createdAt: '2026-08-03T16:30:00Z',
    link: 'p-1'
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    userId: 'u-2',
    userName: 'Sarah Chen',
    userAvatar: INITIAL_USERS[1].avatar,
    action: 'created project',
    targetTitle: 'Cloud SaaS Portal v2.0',
    projectId: 'p-1',
    createdAt: '2026-08-05T13:45:00Z'
  },
  {
    id: 'act-2',
    userId: 'u-4',
    userName: 'Elena Rostova',
    userAvatar: INITIAL_USERS[3].avatar,
    action: 'updated task status to IN_PROGRESS',
    targetTitle: 'Design Glassmorphism Kanban Column Layout',
    projectId: 'p-1',
    createdAt: '2026-08-05T11:20:00Z'
  },
  {
    id: 'act-3',
    userId: 'u-5',
    userName: 'Devon Wright',
    userAvatar: INITIAL_USERS[4].avatar,
    action: 'completed task',
    targetTitle: 'Implement JWT Auth & Refresh Tokens',
    projectId: 'p-1',
    createdAt: '2026-08-04T10:00:00Z'
  },
  {
    id: 'act-4',
    userId: 'u-1',
    userName: 'Alex Rivera',
    userAvatar: INITIAL_USERS[0].avatar,
    action: 'added comment on',
    targetTitle: 'Gemini AI Smart Task Summarizer Server Route',
    projectId: 'p-3',
    createdAt: '2026-08-05T10:15:00Z'
  }
];
