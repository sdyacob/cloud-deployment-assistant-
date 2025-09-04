
import React from 'react';
import { DeploymentConfig } from '../../types';
import Button from '../common/Button';

interface ReviewStepProps {
  config: DeploymentConfig;
  onGenerate: () => void;
  onBack: () => void;
  error?: string | null;
}

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-slate-700/50">
    <dt className="text-sm font-medium text-slate-400">{label}</dt>
    <dd className="text-sm text-slate-100 font-mono">{value}</dd>
  </div>
);

const ReviewStep: React.FC<ReviewStepProps> = ({ config, onGenerate, onBack, error }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-100">Review Your Configuration</h2>
      <p className="text-slate-400 mt-1 mb-6">
        Confirm the details below before we generate your deployment script.
      </p>

      <div className="space-y-6">
        <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">General</h3>
            <dl className="bg-slate-800/50 p-4 rounded-lg">
                <DetailItem label="Cloud Provider" value={config.provider?.toUpperCase() ?? 'N/A'} />
            </dl>
        </div>
        <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">Frontend</h3>
            <dl className="bg-slate-800/50 p-4 rounded-lg">
                <DetailItem label="Repository URL" value={config.frontend.repoUrl} />
                <DetailItem label="Build Command" value={config.frontend.buildCommand} />
                <DetailItem label="Output Directory" value={config.frontend.outputDir} />
            </dl>
        </div>
        <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">Backend</h3>
            <dl className="bg-slate-800/50 p-4 rounded-lg">
                <DetailItem label="Repository URL" value={config.backend.repoUrl} />
                <DetailItem label="Runtime" value={config.backend.runtime} />
                <DetailItem label="Database" value={config.backend.database} />
            </dl>
        </div>
      </div>
      
      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
          <strong>Generation Failed:</strong> {error}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button onClick={onGenerate}>Generate Script</Button>
      </div>
    </div>
  );
};

export default ReviewStep;
