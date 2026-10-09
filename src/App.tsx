import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CopilotWorkspace, CopilotAnalysisResult } from './components/CopilotWorkspace';
import { ServiceCatalogView } from './components/ServiceCatalogView';
import { EscalationHub } from './components/EscalationHub';
import { Toast, ToastMessage } from './components/Toast';
import { ServiceDefinition } from './data/services';

export default function App() {
  const [activeTab, setActiveTab] = useState<'workspace' | 'services' | 'coordination'>('workspace');
  
  // Theme state: dark mode by default, persisted in localStorage
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Copilot Input States
  const [clientMessage, setClientMessage] = useState<string>('');
  const [platform, setPlatform] = useState<string>('Upwork');
  const [currency, setCurrency] = useState<string>('USD');
  const [action, setAction] = useState<string>('Analyze Client Message');
  const [hamzaResponse, setHamzaResponse] = useState<string>('');
  const [context, setContext] = useState<string>('');

  // Execution States
  const [result, setResult] = useState<CopilotAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Core Execution Function
  const runCopilotAnalysis = async (customPayload?: {
    clientMessage?: string;
    action?: string;
    platform?: string;
    currency?: string;
    hamzaResponse?: string;
    context?: string;
  }) => {
    const payload = {
      clientMessage: customPayload?.clientMessage ?? clientMessage,
      action: customPayload?.action ?? action,
      platform: customPayload?.platform ?? platform,
      currency: customPayload?.currency ?? currency,
      hamzaResponse: customPayload?.hamzaResponse ?? hamzaResponse,
      context: customPayload?.context ?? context,
    };

    if (!payload.clientMessage.trim() && !payload.hamzaResponse.trim() && !payload.context.trim()) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        text: 'Please paste a client message or Hamza response first.'
      });
      return;
    }

    setIsLoading(true);
    setToast({
      id: Date.now().toString(),
      type: 'info',
      text: `Analyzing ${payload.platform} opportunity...`
    });

    try {
      const response = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to complete analysis');
      }

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        setResult(resJson.data);
        setToast({
          id: Date.now().toString(),
          type: 'success',
          text: 'Copilot analysis ready! Copy ready-to-send messages below.'
        });
      } else {
        throw new Error('Invalid response structure received from server.');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setToast({
        id: Date.now().toString(),
        type: 'error',
        text: err.message || 'Error communicating with AI Copilot.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to fresh client session
  const handleReset = () => {
    setClientMessage('');
    setHamzaResponse('');
    setContext('');
    setResult(null);
    setPlatform('Upwork');
    setCurrency('USD');
    setAction('Analyze Client Message');
    setToast({
      id: Date.now().toString(),
      type: 'info',
      text: 'Workspace cleared. Ready for a new client conversation.'
    });
  };

  // Quick Action from Services tab
  const handleSelectServiceForCopilot = (service: ServiceDefinition) => {
    setClientMessage(`Client requires Service ${service.id} (${service.name}).\nDraft standard scope: ${service.packages.standard.summary}\nDraft standard price: $${service.packages.standard.priceUSD} (${service.packages.standard.turnaroundDays} days).`);
    setAction('Estimate Project Price');
    setActiveTab('workspace');
  };

  // Quick Action from Coordination Hub: Draft Escalation
  const handleDraftEscalation = (clientReq: string, budget: string, deadline: string, plat: string) => {
    const formattedReq = `Client Request: ${clientReq}\nStated Budget: ${budget || 'Not specified'}\nTarget Deadline: ${deadline || 'Not specified'}`;
    setClientMessage(formattedReq);
    setPlatform(plat);
    setAction('Ask Hamza');
    setActiveTab('workspace');
    runCopilotAnalysis({
      clientMessage: formattedReq,
      action: 'Ask Hamza',
      platform: plat
    });
  };

  // Quick Action from Coordination Hub: Incorporate Hamza's Response
  const handleIncorporateHamzaReply = (hamzaText: string) => {
    setHamzaResponse(hamzaText);
    setAction('Draft Client Reply');
    setActiveTab('workspace');
    runCopilotAnalysis({
      hamzaResponse: hamzaText,
      action: 'Draft Client Reply'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white transition-colors">
      {/* Executive Header with Light/Dark Mode Toggle */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={handleReset}
        isProcessing={isLoading}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'workspace' && (
          <CopilotWorkspace
            clientMessage={clientMessage}
            setClientMessage={setClientMessage}
            platform={platform}
            setPlatform={setPlatform}
            currency={currency}
            setCurrency={setCurrency}
            action={action}
            setAction={setAction}
            hamzaResponse={hamzaResponse}
            setHamzaResponse={setHamzaResponse}
            context={context}
            setContext={setContext}
            result={result}
            isLoading={isLoading}
            onRunAnalysis={() => runCopilotAnalysis()}
            setToast={setToast}
            onSelectServiceTab={() => setActiveTab('services')}
          />
        )}

        {activeTab === 'services' && (
          <ServiceCatalogView
            onSelectServiceForCopilot={handleSelectServiceForCopilot}
          />
        )}

        {activeTab === 'coordination' && (
          <EscalationHub
            onDraftEscalation={handleDraftEscalation}
            onIncorporateHamzaReply={handleIncorporateHamzaReply}
            setToast={setToast}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/80 py-3.5 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Farhan's Sales Copilot</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span>Commercial & Technical Coordination</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Sales Lead: <strong className="text-slate-700 dark:text-slate-400">Farhan</strong></span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span>Delivery Authority: <strong className="text-slate-700 dark:text-slate-400">Hamza</strong></span>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
