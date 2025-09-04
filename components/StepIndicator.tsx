
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, name: 'Provider' },
    { id: 2, name: 'Frontend' },
    { id: 3, name: 'Backend' },
    { id: 4, name: 'Review' },
  ];

  return (
    <nav aria-label="Progress" className="mb-12">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {currentStep > step.id ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-indigo-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-indigo-600 rounded-full hover:bg-indigo-500">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                  </svg>
                   <span className="absolute top-10 w-max text-center text-xs text-slate-300">{step.name}</span>
                </div>
              </>
            ) : currentStep === step.id ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-700" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-slate-800 border-2 border-indigo-600 rounded-full" aria-current="step">
                  <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" aria-hidden="true" />
                  <span className="absolute top-10 w-max text-center text-sm font-medium text-indigo-400">{step.name}</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-700" />
                </div>
                <div className="group relative flex h-8 w-8 items-center justify-center bg-slate-800 border-2 border-slate-600 rounded-full hover:border-slate-400">
                   <span className="h-2.5 w-2.5 bg-transparent rounded-full" aria-hidden="true" />
                   <span className="absolute top-10 w-max text-center text-xs text-slate-500 group-hover:text-slate-300">{step.name}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;
