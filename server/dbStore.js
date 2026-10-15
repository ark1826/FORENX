import { INITIAL_USERS, INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_COMMENTS, INITIAL_NOTIFICATIONS, INITIAL_ACTIVITIES } from '../src/data/mockData.js';
import { INITIAL_USERS as FORENSIC_USERS } from '../src/data/forensicData.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-project-management';

// Server-side State Repository - Seeded with Forensic Personnel & Mock Store
let usersStore = [...FORENSIC_USERS, ...INITIAL_USERS];
let projectsStore = [...INITIAL_PROJECTS];
let tasksStore = [...INITIAL_TASKS];
let commentsStore = [...INITIAL_COMMENTS];
let notificationsStore = [...INITIAL_NOTIFICATIONS];
let activitiesStore = [...INITIAL_ACTIVITIES];

export const db = {
  // Auth & Token
  generateToken: (user) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role, badgeNumber: user.badgeNumber || '' }, JWT_SECRET, { expiresIn: '7d' });
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null;
    }
  },

  // Users
  getUsers: () => usersStore,
  getUserById: (id) => usersStore.find((u) => u.id === id),
  getUserByEmail: (email) => usersStore.find((u) => u.email && u.email.toLowerCase() === email.toLowerCase()),
  getUserByIdentifier: (identifier) => {
    if (!identifier) return null;
    const clean = identifier.trim().toLowerCase();
    return usersStore.find(
      (u) =>
        (u.email && u.email.toLowerCase() === clean) ||
        (u.badgeNumber && u.badgeNumber.toLowerCase() === clean) ||
        (u.name && u.name.toLowerCase() === clean) ||
        (u.name && u.name.toLowerCase().includes(clean))
    );
  },
  createUser: (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name || 'New Officer',
      email: userData.email || '',
      badgeNumber: userData.badgeNumber || `FRX-${Math.floor(100 + Math.random() * 899)}`,
      clearanceLevel: userData.clearanceLevel || 'SECRET // LAW ENFORCEMENT SENSITIVE',
      title: userData.title || 'Forensic Specialist',
      department: userData.department || 'Digital Forensic Unit',
      avatar: userData.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      role: userData.role || 'INVESTIGATOR',
      isVerified: true,
      status: 'active',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      ipAddress: '10.240.14.19 (Secured Terminal)'
    };
    usersStore.push(newUser);
    return newUser;
  },
  updateUserRole: (id, role) => {
    const u = usersStore.find((user) => user.id === id);
    if (u) u.role = role;
    return u;
  },
  updateUserProfile: (id, updates) => {
    const idx = usersStore.findIndex((user) => user.id === id);
    if (idx !== -1) {
      usersStore[idx] = { ...usersStore[idx], ...updates };
      return usersStore[idx];
    }
    return null;
  },
  deleteUser: (id) => {
    usersStore = usersStore.filter((u) => u.id !== id);
  },

  // Projects
  getProjects: () => projectsStore,
  getProjectById: (id) => projectsStore.find((p) => p.id === id),
  createProject: (projectData, owner) => {
    const newProject = {
      id: `p-${Date.now()}`,
      title: projectData.title || 'Untitled Project',
      description: projectData.description || '',
      ownerId: owner.id,
      ownerName: owner.name,
      members: projectData.members && projectData.members.length ? projectData.members : [owner],
      deadline: projectData.deadline || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      status: projectData.status || 'active',
      priority: projectData.priority || 'MEDIUM',
      progress: 0,
      category: projectData.category || 'General',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    projectsStore.unshift(newProject);
    
    // Add activity log
    activitiesStore.unshift({
      id: `act-${Date.now()}`,
      userId: owner.id,
      userName: owner.name,
      userAvatar: owner.avatar,
      action: 'created project',
      targetTitle: newProject.title,
      projectId: newProject.id,
      createdAt: new Date().toISOString()
    });

    return newProject;
  },
  updateProject: (id, updates) => {
    const idx = projectsStore.findIndex((p) => p.id === id);
    if (idx !== -1) {
      projectsStore[idx] = { ...projectsStore[idx], ...updates, updatedAt: new Date().toISOString() };
      return projectsStore[idx];
    }
    return null;
  },
  deleteProject: (id) => {
    projectsStore = projectsStore.filter((p) => p.id !== id);
    tasksStore = tasksStore.filter((t) => t.projectId !== id);
  },

  // Tasks
  getTasks: (projectId) => {
    if (projectId) return tasksStore.filter((t) => t.projectId === projectId);
    return tasksStore;
  },
  getTaskById: (id) => tasksStore.find((t) => t.id === id),
  createTask: (taskData, author) => {
    const project = projectsStore.find((p) => p.id === taskData.projectId);
    const newTask = {
      id: `t-${Date.now()}`,
      title: taskData.title || 'Untitled Task',
      description: taskData.description || '',
      assignedTo: taskData.assignedTo,
      assignedBy: author,
      projectId: taskData.projectId || (project ? project.id : 'p-1'),
      projectTitle: project ? project.title : 'General',
      priority: taskData.priority || 'MEDIUM',
      status: taskData.status || 'TODO',
      deadline: taskData.deadline || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      tags: taskData.tags || ['Task'],
      attachments: taskData.attachments || [],
      subtasks: taskData.subtasks || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasksStore.unshift(newTask);

    // Notify assigned user if any
    if (newTask.assignedTo && newTask.assignedTo.id !== author.id) {
      notificationsStore.unshift({
        id: `n-${Date.now()}`,
        userId: newTask.assignedTo.id,
        title: 'New Task Assigned',
        message: `${author.name} assigned you to task "${newTask.title}".`,
        type: 'task_assigned',
        isRead: false,
        createdAt: new Date().toISOString(),
        link: newTask.id
      });
    }

    // Log Activity
    activitiesStore.unshift({
      id: `act-${Date.now()}`,
      userId: author.id,
      userName: author.name,
      userAvatar: author.avatar,
      action: 'created task',
      targetTitle: newTask.title,
      projectId: newTask.projectId,
      createdAt: new Date().toISOString()
    });

    db.recalculateProjectProgress(newTask.projectId);

    return newTask;
  },
  updateTask: (id, updates, modifier) => {
    const idx = tasksStore.findIndex((t) => t.id === id);
    if (idx !== -1) {
      const oldStatus = tasksStore[idx].status;
      tasksStore[idx] = { ...tasksStore[idx], ...updates, updatedAt: new Date().toISOString() };
      const updatedTask = tasksStore[idx];

      if (modifier && updates.status && updates.status !== oldStatus) {
        activitiesStore.unshift({
          id: `act-${Date.now()}`,
          userId: modifier.id,
          userName: modifier.name,
          userAvatar: modifier.avatar,
          action: `updated task status to ${updates.status}`,
          targetTitle: updatedTask.title,
          projectId: updatedTask.projectId,
          createdAt: new Date().toISOString()
        });

        if (updates.status === 'DONE' && updatedTask.assignedBy && updatedTask.assignedBy.id !== modifier.id) {
          notificationsStore.unshift({
            id: `n-${Date.now()}`,
            userId: updatedTask.assignedBy.id,
            title: 'Task Completed',
            message: `${modifier.name} completed task "${updatedTask.title}".`,
            type: 'task_completed',
            isRead: false,
            createdAt: new Date().toISOString(),
            link: updatedTask.id
          });
        }
      }

      db.recalculateProjectProgress(updatedTask.projectId);
      return updatedTask;
    }
    return null;
  },
  deleteTask: (id) => {
    const t = tasksStore.find((x) => x.id === id);
    tasksStore = tasksStore.filter((x) => x.id !== id);
    if (t) db.recalculateProjectProgress(t.projectId);
  },

  recalculateProjectProgress: (projectId) => {
    const projectTasks = tasksStore.filter((t) => t.projectId === projectId);
    if (!projectTasks.length) return;
    const completed = projectTasks.filter((t) => t.status === 'DONE').length;
    const progress = Math.round((completed / projectTasks.length) * 100);
    const p = projectsStore.find((proj) => proj.id === projectId);
    if (p) p.progress = progress;
  },

  // Comments
  getCommentsByTask: (taskId) => commentsStore.filter((c) => c.taskId === taskId),
  addComment: (taskId, message, user) => {
    const comment = {
      id: `c-${Date.now()}`,
      taskId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      message,
      createdAt: new Date().toISOString()
    };
    commentsStore.push(comment);

    const task = tasksStore.find((t) => t.id === taskId);
    if (task) {
      activitiesStore.unshift({
        id: `act-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        action: 'added comment on',
        targetTitle: task.title,
        projectId: task.projectId,
        createdAt: new Date().toISOString()
      });
    }

    return comment;
  },
  deleteComment: (id) => {
    commentsStore = commentsStore.filter((c) => c.id !== id);
  },

  // Notifications
  getNotificationsByUser: (userId) => notificationsStore.filter((n) => n.userId === userId || n.userId === 'u-1'),
  markNotificationsAsRead: (userId) => {
    notificationsStore.forEach((n) => {
      if (n.userId === userId || n.userId === 'u-1') n.isRead = true;
    });
  },

  // Activities
  getActivities: () => activitiesStore
};
