
import React from 'react';
import { BackendConfig } from '../../types';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { RUNTIME_OPTIONS, DATABASE_OPTIONS } from '../../constants';

interface BackendStepProps {
  config: BackendConfig;
  setConfig: (config: BackendConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

const BackendStep: React.FC<BackendStepProps> = ({ config, setConfig, onNext, onBack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-100">Backend Configuration</h2>
      <p className="text-slate-400 -mt-4">
        Specify your backend service details. We'll set up a scalable, serverless environment for it.
      </p>
      <div className="space-y-4">
        <Input
          label="Git Repository URL"
          id="repoUrl-backend"
          name="repoUrl"
          type="text"
          value={config.repoUrl}
          onChange={handleChange}
          placeholder="e.g., https://github.com/user/my-api.git"
        />
        <Select
          label="Runtime"
          id="runtime"
          name="runtime"
          options={RUNTIME_OPTIONS}
          value={config.runtime}
          onChange={handleChange}
        />
        <Select
          label="Database"
          id="database"
          name="database"
          options={DATABASE_OPTIONS}
          value={config.database}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next: Review</Button>
      </div>
    </div>
  );
};

export default BackendStep;
