
import React, { useState, useCallback } from 'react';
import { DeploymentConfig, CloudProvider, BackendRuntime, DatabaseType } from './types';
import StepIndicator from './components/StepIndicator';
import WelcomeStep from './components/steps/WelcomeStep';
import ProviderStep from './components/steps/ProviderStep';
import FrontendStep from './components/steps/FrontendStep';
import BackendStep from './components/steps/BackendStep';
import ReviewStep from './components/steps/ReviewStep';
import ResultStep from './components/steps/ResultStep';
import { generateDeploymentScript } from './services/geminiService';
import Loader from './components/common/Loader';

const TOTAL_STEPS = 5;

const App: React.FC = () => {
  const [step, setStep] = useState(0); // 0: Welcome, 1-5: Form, 6: Result
  const [isLoading, setIsLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [config, setConfig] = useState<DeploymentConfig>({
    provider: null,
    frontend: {
      repoUrl: 'https://github.com/user/my-react-app.git',
      buildCommand: 'npm run build',
      outputDir: 'dist',
    },
    backend: {
      repoUrl: 'https://github.com/user/my-express-api.git',
      runtime: 'nodejs',
      database: 'none',
    },
  });

  const handleNext = () => setStep((prev) => (prev < TOTAL_STEPS ? prev + 1 : prev));
  const handleBack = () => setStep((prev) => (prev > 0 ? prev - 1 : prev));

  const handleGenerateScript = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedScript('');
    try {
      const script = await generateDeploymentScript(config);
      setGeneratedScript(script);
      setStep(TOTAL_STEPS + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setStep(TOTAL_STEPS); // Stay on review step to show error
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  const updateConfig = <K extends keyof DeploymentConfig>(key: K, value: DeploymentConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleRestart = () => {
    setStep(1);
    setConfig({
      provider: null,
      frontend: { repoUrl: 'https://github.com/user/my-react-app.git', buildCommand: 'npm run build', outputDir: 'dist' },
      backend: { repoUrl: 'https://github.com/user/my-express-api.git', runtime: 'nodejs', database: 'none' },
    });
    setGeneratedScript('');
    setError(null);
  }

  const renderStep = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <Loader />
          <p className="text-slate-300 mt-4 text-lg">Generating your deployment script...</p>
          <p className="text-slate-400 mt-2 text-sm">This may take a moment. The AI is crafting the perfect configuration for you.</p>
        </div>
      );
    }

    switch (step) {
      case 0:
        return <WelcomeStep onNext={() => setStep(1)} />;
      case 1:
        return <ProviderStep 
          selectedProvider={config.provider}
          onSelect={(provider: CloudProvider) => {
            updateConfig('provider', provider);
            handleNext();
          }}
        />;
      case 2:
        return <FrontendStep 
          config={config.frontend}
          setConfig={(frontendConfig) => updateConfig('frontend', frontendConfig)}
          onNext={handleNext} 
          onBack={handleBack} 
        />;
      case 3:
        return <BackendStep
          config={config.backend}
          setConfig={(backendConfig) => updateConfig('backend', backendConfig)}
          onNext={handleNext} 
          onBack={handleBack} 
        />;
      case 4:
        return <ReviewStep 
          config={config} 
          onGenerate={handleGenerateScript} 
          onBack={handleBack} 
          error={error}
        />;
      case TOTAL_STEPS + 1:
        return <ResultStep 
          script={generatedScript} 
          config={config} 
          onRestart={handleRestart}
        />;
      default:
        return <WelcomeStep onNext={() => setStep(1)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Cloud Deployment Assistant
          </h1>
          <p className="text-slate-400 mt-2">Generate scalable deployment scripts with the power of AI.</p>
        </header>
        
        <main className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-indigo-500/10 border border-slate-700 p-6 sm:p-10 transition-all duration-300">
          {step > 0 && step <= TOTAL_STEPS && <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />}
          {renderStep()}
        </main>
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
