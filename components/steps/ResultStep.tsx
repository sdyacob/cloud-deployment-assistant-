import React, { useState } from 'react';
import { DeploymentConfig } from '../../types';
import Button from '../common/Button';
import CopyIcon from '../icons/CopyIcon';
import CheckIcon from '../icons/CheckIcon';
import CodeIcon from '../icons/CodeIcon';
import DownloadIcon from '../icons/DownloadIcon';

interface ResultStepProps {
  script: string;
  config: DeploymentConfig;
  onRestart: () => void;
}

const BashSyntaxHighlighter: React.FC<{ code: string }> = ({ code }) => {
  // A simple regex-based highlighter. May not cover all edge cases perfectly.
  const highlight = (text: string) => {
    if (!text) return { __html: '' };
    
    let highlighted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Order of replacement is important to avoid conflicts.
    
    // 1. Comments
    highlighted = highlighted.replace(/(#.*)$/gm, '<span class="text-slate-500 italic">$1</span>');
    
    // 2. Strings (handles escaped quotes poorly, but good enough for this context)
    highlighted = highlighted.replace(/(".*?"|'.*?')/g, '<span class="text-green-400">$1</span>');
    
    // 3. Variables
    highlighted = highlighted.replace(/(\$[a-zA-Z_][a-zA-Z0-9_]*|\$\{[^}]+\})/g, '<span class="text-amber-400">$1</span>');
    
    // 4. Keywords
    const keywords = ['if', 'then', 'else', 'elif', 'fi', 'for', 'in', 'do', 'done', 'while', 'until', 'case', 'esac', 'function', 'select', 'set', 'exit', 'return'];
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    highlighted = highlighted.replace(keywordRegex, '<span class="text-indigo-400 font-semibold">$1</span>');

    // 5. Common commands and built-ins
    const commands = ['echo', 'export', 'readonly', 'unset', 'shift', 'trap', 'git', 'npm', 'aws', 'gcloud', 'az', 'chmod', 'mkdir', 'cd', 'cp', 'mv', 'rm', 'cat', 'grep', 'find', 'sudo', 'printf', 'read', 'sleep', 'kill', 'jobs', 'bg', 'fg'];
    const commandRegex = new RegExp(`\\b(${commands.join('|')})\\b`, 'g');
    highlighted = highlighted.replace(commandRegex, '<span class="text-cyan-400">$1</span>');

    // 6. Flags/Options
    highlighted = highlighted.replace(/( -{1,2}[a-zA-Z0-9-_=]+)/g, '<span class="text-rose-400">$1</span>');

    return { __html: highlighted };
  };

  return <code className="language-bash font-mono text-slate-300 whitespace-pre-wrap" dangerouslySetInnerHTML={highlight(code)} />;
};


const ResultStep: React.FC<ResultStepProps> = ({ script, config, onRestart }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([script], { type: 'text/x-shellscript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deployment-script.sh';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const providerName = config.provider?.toUpperCase() ?? 'Cloud';

  return (
    <div className="animate-fade-in">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mx-auto w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 mb-4">
            <CodeIcon className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100">Your Deployment Script is Ready!</h2>
        <p className="text-slate-400 mt-2">
          Below is the generated bash script to deploy your application to {providerName}.
        </p>
      </div>

      <div className="mt-8 relative">
        <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
          <div className="flex justify-between items-center p-3 bg-slate-800 border-b border-slate-700">
            <p className="text-sm font-medium text-slate-300">deployment-script.sh</p>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={handleDownload} className="px-3 py-1.5 text-xs">
                <DownloadIcon className="w-4 h-4" />
                Download
              </Button>
              <Button variant="secondary" onClick={handleCopy} className="px-3 py-1.5 text-xs">
                {copied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Script'}
              </Button>
            </div>
          </div>
          <pre className="p-4 text-sm overflow-x-auto max-h-[400px]">
            <BashSyntaxHighlighter code={script} />
          </pre>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-indigo-600/10 border border-indigo-500/30 rounded-lg">
          <h3 className="font-semibold text-indigo-300">Next Steps:</h3>
          <ol className="list-decimal list-inside mt-2 text-sm text-slate-400 space-y-1">
              <li>Save or download the script above as a file, for example, <code>deploy.sh</code>.</li>
              <li>Make it executable by running: <code>chmod +x deploy.sh</code>.</li>
              <li>Ensure you have the required CLI tool ({config.provider}-cli) installed and authenticated.</li>
              <li>Run the script from your terminal: <code>./deploy.sh</code>.</li>
          </ol>
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="ghost" onClick={onRestart}>
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default ResultStep;
