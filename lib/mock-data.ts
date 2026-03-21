import { format, subMinutes } from 'date-fns';

export const AGENTS = [
  { id: 'orch_001', name: 'Master Controller', role: 'Orchestrator', status: 'active', cpu: 12, memory: 450, tokens: 1250000, color: '#10b981' },
  { id: 'agent_001', name: 'Data Ingestor', role: 'Data Flow', status: 'running', cpu: 45, memory: 890, tokens: 320000, color: '#3b82f6' },
  { id: 'agent_002', name: 'Content Creator', role: 'Automation', status: 'idle', cpu: 2, memory: 120, tokens: 150000, color: '#8b5cf6' },
  { id: 'agent_003', name: 'Security Monitor', role: 'Monitoring', status: 'running', cpu: 18, memory: 340, tokens: 85000, color: '#f59e0b' },
  { id: 'agent_004', name: 'API Integrator', role: 'Integration', status: 'error', cpu: 0, memory: 0, tokens: 45000, color: '#ef4444' },
];

export const MISSIONS = [
  { id: 'm_101', type: 'Generate Report', status: 'done', agent: 'agent_002', start: subMinutes(new Date(), 45).toISOString(), end: subMinutes(new Date(), 40).toISOString(), result: 'Success' },
  { id: 'm_102', type: 'Sync Database', status: 'running', agent: 'agent_001', start: subMinutes(new Date(), 10).toISOString(), end: null, result: null },
  { id: 'm_103', type: 'Optimize Model', status: 'pending', agent: 'agent_003', start: null, end: null, result: null },
  { id: 'm_104', type: 'Process Ingestion', status: 'failed', agent: 'agent_001', start: subMinutes(new Date(), 60).toISOString(), end: subMinutes(new Date(), 55).toISOString(), result: 'Timeout' },
];

export const COMMUNICATIONS = [
  { id: 'c_1', origin: 'agent_001', dest: 'orch_001', type: 'event', content: 'Data chunk processed', tokens: 150, latency: 45, timestamp: subMinutes(new Date(), 2).toISOString() },
  { id: 'c_2', origin: 'orch_001', dest: 'agent_002', type: 'command', content: 'Start summarization', tokens: 450, latency: 120, timestamp: subMinutes(new Date(), 5).toISOString() },
  { id: 'c_3', origin: 'agent_003', dest: 'orch_001', type: 'alert', content: 'Unauthorized access attempt', tokens: 80, latency: 30, timestamp: subMinutes(new Date(), 8).toISOString() },
];

export const TOKEN_USAGE_HISTORY = [
  { time: '10:00', tokens: 450000 },
  { time: '11:00', tokens: 520000 },
  { time: '12:00', tokens: 480000 },
  { time: '13:00', tokens: 610000 },
  { time: '14:00', tokens: 750000 },
  { time: '15:00', tokens: 850000 },
];

export const ERROR_LOGS = [
  { id: 'e_1', agent: 'agent_004', type: 'Connection Fail', message: 'Failed to connect to External API', timestamp: subMinutes(new Date(), 15).toISOString() },
  { id: 'e_2', agent: 'agent_001', type: 'Timeout', message: 'Database sync took too long', timestamp: subMinutes(new Date(), 55).toISOString() },
];
