
export type CloudProvider = 'aws' | 'gcp' | 'azure';
export type BackendRuntime = 'nodejs' | 'python' | 'go' | 'java';
export type DatabaseType = 'postgres' | 'mysql' | 'mongodb' | 'none';

export interface FrontendConfig {
  repoUrl: string;
  buildCommand: string;
  outputDir: string;
}

export interface BackendConfig {
  repoUrl: string;
  runtime: BackendRuntime;
  database: DatabaseType;
}

export interface DeploymentConfig {
  provider: CloudProvider | null;
  frontend: FrontendConfig;
  backend: BackendConfig;
}
