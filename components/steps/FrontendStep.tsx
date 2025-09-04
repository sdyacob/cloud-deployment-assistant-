
import React from 'react';
import { FrontendConfig } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';

interface FrontendStepProps {
  config: FrontendConfig;
  setConfig: (config: FrontendConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

const FrontendStep: React.FC<FrontendStepProps> = ({ config, setConfig, onNext, onBack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-100">Frontend Configuration</h2>
      <p className="text-slate-400 -mt-4">
        Enter the details for your frontend application. We'll deploy it as a static site on a global CDN.
      </p>
      <div className="space-y-4">
        <Input
          label="Git Repository URL"
          id="repoUrl-frontend"
          name="repoUrl"
          type="text"
          value={config.repoUrl}
          onChange={handleChange}
          placeholder="e.g., https://github.com/user/my-app.git"
        />
        <Input
          label="Build Command"
          id="buildCommand"
          name="buildCommand"
          type="text"
          value={config.buildCommand}
          onChange={handleChange}
          placeholder="e.g., npm run build"
        />
        <Input
          label="Output Directory"
          id="outputDir"
          name="outputDir"
          type="text"
          value={config.outputDir}
          onChange={handleChange}
          placeholder="e.g., dist, build, or out"
        />
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next: Backend</Button>
      </div>
    </div>
  );
};

export default FrontendStep;
