
import React from 'react';
import Button from '../common/Button';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="text-center animate-fade-in py-8">
      <h2 className="text-3xl font-bold text-slate-100">Deploy with Confidence</h2>
      <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
        Welcome to the AI-powered deployment assistant. Answer a few questions about your project,
        and we'll generate a custom, production-grade deployment script for your chosen cloud provider.
      </p>
      <div className="mt-10">
        <Button onClick={onNext} className="text-lg px-8 py-3">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;
