const API_BASE = 'https://shogol.runasp.net/api/Notification';

export const NOTIFICATION_TYPES = {
  PROJECT: 'project',
  MESSAGE: 'message',
  REVIEW: 'review',
  SYSTEM: 'system',
  PAYMENT: 'payment',
  JOB_COMPLETED: 'JobCompleted',
  PROPOSAL_RECEIVED: 'ProposalReceived',
  JOB_REQUEST_CREATED: 'JobRequestCreated',
} as const;

export const NOTIFICATION_ROUTES = {
  JOB_REQUESTS: '/requests',
  PROPOSALS: '/proposals',
} as const;

export const API_ENDPOINTS = {
  BASE: API_BASE,
  MARK_READ: (id: string) => `${API_BASE}/${id}/mark-read`,
  MARK_ALL_READ: `${API_BASE}/mark-all-read`,
} as const;

export const ANIMATION_CONFIG = {
  STAGGER_DELAY: 0.05,
  DURATION: 0.6,
  Y_OFFSET: 40,
  X_OFFSET: 20,
} as const;

export const UI_CONFIG = {
  MAX_WIDTH: 'max-w-4xl',
  PADDING: 'px-6 py-20',
  LOADING_SIZE: 'h-8 w-8',
} as const;
