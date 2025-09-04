
import { BackendRuntime, DatabaseType } from './types';

export const RUNTIME_OPTIONS: { value: BackendRuntime; label: string }[] = [
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
];

export const DATABASE_OPTIONS: { value: DatabaseType; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'postgres', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'mongodb', label: 'MongoDB' },
];
