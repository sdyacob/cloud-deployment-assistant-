
import React from 'react';
import { CloudProvider } from '../../types';
import Card from '../common/Card';
import AwsIcon from '../icons/AwsIcon';
import GcpIcon from '../icons/GcpIcon';
import AzureIcon from '../icons/AzureIcon';

interface ProviderStepProps {
  selectedProvider: CloudProvider | null;
  onSelect: (provider: CloudProvider) => void;
}

const providers = [
  { id: 'aws' as CloudProvider, name: 'AWS', icon: AwsIcon, description: 'Scalable infrastructure from Amazon.' },
  { id: 'gcp' as CloudProvider, name: 'Google Cloud', icon: GcpIcon, description: 'High-performance services from Google.' },
  { id: 'azure' as CloudProvider, name: 'Azure', icon: AzureIcon, description: 'Comprehensive cloud solutions by Microsoft.' },
];

const ProviderStep: React.FC<ProviderStepProps> = ({ selectedProvider, onSelect }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-center text-2xl font-bold text-slate-100">Choose a Cloud Provider</h2>
      <p className="text-center text-slate-400 mt-2 mb-8">Select where you want to deploy your application.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <Card key={provider.id} onClick={() => onSelect(provider.id)} isSelected={selectedProvider === provider.id}>
            <div className="flex flex-col items-center text-center">
              <provider.icon className="h-16 w-16 mb-4" />
              <h3 className="text-lg font-semibold text-slate-100">{provider.name}</h3>
              <p className="text-sm text-slate-400 mt-1">{provider.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProviderStep;
