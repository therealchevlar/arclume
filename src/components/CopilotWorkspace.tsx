import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles, 
  DollarSign, 
  Clock, 
  Info, 
  ShieldAlert, 
  ArrowRight, 
  Zap, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  FileCheck2 
} from 'lucide-react';
import { ToastMessage } from './Toast';

export interface CopilotAnalysisResult {
  taskSummary: string;
  matchedServices?: Array<{
    serviceId: number;
    serviceName: string;
    relevance: string;
  }>;
  internalAdvice: string;
  escalationNeeded: boolean;
  escalationReason?: string | null;
  hamzaMessage?: string | null;
  clientMessage: string;
  commercialRecommendation?: {
    recommendedPrice: string;
    priceRange: string;
    currency: string;
    suggestedPackage: string;
    deliverables: string[];
    provisionalTimeline: string;
    exclusions: string[];
    assumptions: string[];
    requiresHamzaApproval: boolean;
  };
  discoveryQuestions?: string[];
  projectRisks?: string[];
  portfolioRecommendation?: null;
}

interface CopilotWorkspaceProps {
  clientMessage: string;
  setClientMessage: (val: string) => void;
  platform: string;
  setPlatform: (val: string) => void;
  currency: string;
  setCurrency: (val: string) => void;
  action: string;
  setAction: (val: string) => void;
  hamzaResponse: string;
  setHamzaResponse: (val: string) => void;
  context: string;
  setContext: (val: string) => void;
  result: CopilotAnalysisResult | null;
  isLoading: boolean;
  onRunAnalysis: () => void;
  setToast: (toast: ToastMessage) => void;
  onSelectServiceTab: () => void;
}

const QUICK_ACTIONS = [
  { id: 'Analyze Client Message', label: 'Analyze Message', icon: Zap },
  { id: 'Draft Client Reply', label: 'Draft Client Reply', icon: Send },
  { id: 'Prepare Upwork Proposal', label: 'Upwork Proposal', icon: FileCheck2 },
  { id: 'Estimate Project Price', label: 'Estimate Price', icon: DollarSign },
  { id: 'Handle Price Negotiation', label: 'Price Negotiation', icon: Layers },
  { id: 'Ask Hamza', label: 'Ask Hamza', icon: ShieldAlert },
  { id: 'Explain Technical Request', label: 'Explain Tech', icon: Info },
  { id: 'Review Project Risk', label: 'Review Risk', icon: AlertTriangle },
  { id: 'Prepare Client Questions', label: 'Client Questions', icon: HelpCircle },
  { id: 'Generate Project Quote', label: 'Generate Quote', icon: DollarSign },
];

const PLATFORMS = [
  { id: 'Upwork', label: 'Upwork' },
  { id: 'Fiverr', label: 'Fiverr' },
  { id: 'Email', label: 'Email' },
  { id: 'WhatsApp', label: 'WhatsApp' },
  { id: 'LinkedIn', label: 'LinkedIn' },
  { id: 'Website inquiry', label: 'Website' },
];

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£) · UK' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
];

const SAMPLE_PRESETS = [
  {
    name: '5-Page Website ($220)',
    message: 'I need a five-page business website. I have the content and a design reference. What would it cost?',
    platform: 'Upwork',
    action: 'Analyze Client Message',
  },
  {
    name: 'Complex SaaS in 7d (Risk)',
    message: 'Build a SaaS platform with user authentication, subscription payments, an admin dashboard, AI document processing, and production deployment in seven days.',
    platform: 'Upwork',
    action: 'Analyze Client Message',
  },
  {
    name: 'Price Pushback ($300 vs $100)',
    message: 'Your quote is $300, but my budget is only $100. Can you do it for $100?',
    platform: 'Upwork',
    action: 'Handle Price Negotiation',
  },
  {
    name: 'Python Scraper Automation',
    message: 'We need a python automation script to scrape property listings every morning and save to excel with price and location.',
    platform: 'Upwork',
    action: 'Analyze Client Message',
  },
  {
    name: 'London Client in GBP (£)',
    message: 'Hi Farhan, we are an architectural firm based in London. We need a clean 5-page portfolio site. What would this cost in GBP, and what is your schedule?',
    platform: 'Email',
    currency: 'GBP',
    action: 'Generate Project Quote',
  }
];

export const CopilotWorkspace: React.FC<CopilotWorkspaceProps> = ({
  clientMessage,
  setClientMessage,
  platform,
  setPlatform,
  currency,
  setCurrency,
  action,
  setAction,
  hamzaResponse,
  setHamzaResponse,
  context,
  setContext,
  result,
  isLoading,
  onRunAnalysis,
  setToast,
  onSelectServiceTab
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [showHamzaDrawer, setShowHamzaDrawer] = useState<boolean>(false);
  const [showExtraNotes, setShowExtraNotes] = useState<boolean>(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setToast({
      id: Date.now().toString(),
      type: 'success',
      text: `${label} copied to clipboard!`
    });
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onRunAnalysis();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT COLUMN: Input Command Center */}
      <div className="lg:col-span-5 space-y-4">
        {/* Main Input Card */}
        <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-lg shadow-black/5 dark:shadow-black/20 space-y-4 transition-colors">
          {/* Header Row with Presets */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <h2 className="text-xs font-semibold text-slate-900 dark:text-white tracking-wide uppercase">
                Inbound Opportunity
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span>{clientMessage.length} chars</span>
              <span>·</span>
              <span>{clientMessage.trim() ? clientMessage.trim().split(/\s+/).length : 0} w</span>
            </div>
          </div>

          {/* Quick Preset Selector Chips */}
          <div>
            <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1.5 flex items-center justify-between">
              <span>Quick Scenarios:</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">1-click test</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setClientMessage(p.message);
                    setPlatform(p.platform);
                    setAction(p.action);
                    if (p.currency) setCurrency(p.currency);
                  }}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700/50 cursor-pointer"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Switcher */}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Target Channel
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 bg-slate-100 dark:bg-slate-950/60 p-1 rounded-lg border border-slate-200 dark:border-slate-800/80">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id)}
                  className={`text-[11px] font-medium py-1.5 px-1 rounded-md transition-all text-center truncate cursor-pointer ${
                    platform === p.id
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs ring-1 ring-black/5 dark:ring-white/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Currency Switcher */}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Currency
            </label>
            <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-950/60 p-1 rounded-lg border border-slate-200 dark:border-slate-800/80">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCurrency(c.code)}
                  className={`flex-1 text-[11px] font-medium py-1.5 px-2 rounded-md transition-all text-center cursor-pointer ${
                    currency === c.code
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Selector */}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Copilot Objective
            </label>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_ACTIONS.map((act) => {
                const Icon = act.icon;
                const isSelected = action === act.id;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setAction(act.id)}
                    className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : 'bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/80 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/40'
                    }`}
                  >
                    <Icon className="w-3 h-3 shrink-0" />
                    <span>{act.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Client Message Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                Client Message or Job Specification
              </label>
              {clientMessage && (
                <button
                  onClick={() => setClientMessage('')}
                  className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <textarea
              value={clientMessage}
              onChange={(e) => setClientMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste the inbound inquiry, job posting, or client conversation here... (Press ⌘Enter to run)"
              rows={8}
              className="w-full text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 leading-relaxed font-mono resize-y"
            />
          </div>

          {/* Collapsible: Hamza's Response / Decision Input */}
          <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 space-y-2">
            <button
              type="button"
              onClick={() => setShowHamzaDrawer(!showHamzaDrawer)}
              className="w-full flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1 cursor-pointer"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Incorporate Hamza's Technical Decision</span>
                {hamzaResponse && (
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                )}
              </span>
              {showHamzaDrawer ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {showHamzaDrawer && (
              <div className="bg-amber-50/60 dark:bg-slate-950/90 p-3 rounded-lg border border-amber-300 dark:border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-amber-900 dark:text-amber-300 font-medium">
                  <span>Hamza's Raw Reply (Feasibility / Quote / Timeline)</span>
                  {hamzaResponse && (
                    <button
                      onClick={() => setHamzaResponse('')}
                      className="text-slate-500 hover:text-slate-700 dark:hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <textarea
                  value={hamzaResponse}
                  onChange={(e) => setHamzaResponse(e.target.value)}
                  placeholder="e.g. 'Hey Farhan, yes we can deliver this in 10 days using React + Supabase. Quote $300 minimum. Client must provide Figma files first.'"
                  rows={3}
                  className="w-full text-xs text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowExtraNotes(!showExtraNotes)}
              className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 block cursor-pointer"
            >
              {showExtraNotes ? '– Hide Stated Budget / Private Context' : '+ Add Stated Budget or Private Context'}
            </button>

            {showExtraNotes && (
              <div className="bg-slate-50 dark:bg-slate-950/90 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  Private Commercial Notes (Farhan Only)
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="e.g. Client mentioned they have a strict $250 cap, or they've used WordPress before."
                  rows={2}
                  className="w-full text-xs text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              onClick={onRunAnalysis}
              disabled={isLoading || (!clientMessage.trim() && !hamzaResponse.trim())}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs tracking-wide transition-all shadow-lg ${
                isLoading || (!clientMessage.trim() && !hamzaResponse.trim())
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700/40'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 active:scale-[0.99] cursor-pointer'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing Strategy & Messages...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                  <span>Run Copilot ({action})</span>
                  <span className="text-[10px] opacity-75 font-mono ml-1 font-normal">⌘↵</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Services Link Card */}
        <div className="bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800/80 p-4 flex items-center justify-between text-xs transition-colors">
          <div>
            <span className="font-semibold text-slate-900 dark:text-white block">Need package reference?</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Inspect all 20 services & draft USD prices</span>
          </div>
          <button
            onClick={onSelectServiceTab}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Directory</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Executive Output Workspace */}
      <div className="lg:col-span-7 space-y-4">
        {/* Empty State */}
        {!result && !isLoading && (
          <div className="bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800/80 p-12 text-center shadow-lg transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Sales Copilot Workspace Ready
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1.5 leading-relaxed">
              Paste an inquiry on the left or select a quick scenario. The copilot will evaluate scope, draft client replies, generate quotes, and prepare Hamza escalation briefs when needed.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 p-10 text-center shadow-lg space-y-4 transition-colors">
            <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto" />
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Evaluating Technical & Commercial Requirements
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Comparing against 20 service packages, verifying draft prices, and checking technical risks...
              </p>
            </div>
          </div>
        )}

        {/* Results Available */}
        {result && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Status & Identified Services Banner */}
            <div className="bg-white dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-md transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white tracking-wide">Analysis Overview</span>
                    <span className="text-slate-300 dark:text-slate-600">/</span>
                    <span className="text-slate-600 dark:text-slate-400">{platform}</span>
                    <span className="text-slate-300 dark:text-slate-600">/</span>
                    <span className="text-slate-600 dark:text-slate-400">{currency}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {result.taskSummary}
                  </p>
                </div>

                <div className="shrink-0">
                  {result.escalationNeeded ? (
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/30 px-3 py-1.5 rounded-lg font-semibold">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Hamza Approval Needed</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 px-3 py-1.5 rounded-lg font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Routine Service · Ready to Send</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Matched Services Tags */}
              {result.matchedServices && result.matchedServices.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium">Matched:</span>
                  {result.matchedServices.map((s) => (
                    <span
                      key={s.serviceId}
                      className="text-[11px] text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-medium"
                    >
                      Service {s.serviceId}: {s.serviceName}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* CARD 1: READY-TO-SEND CLIENT MESSAGE */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-xl ring-1 ring-black/5 dark:ring-white/5 space-y-3 transition-colors">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    <Send className="w-3 h-3" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                      Ready-to-Send Client Message ({platform})
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {result.escalationNeeded 
                        ? 'Holding reply · Buys time while Hamza evaluates technical scope' 
                        : 'Custom proposal / reply tailored for ' + platform}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(result.clientMessage, 'Client Message')}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  {copiedSection === 'Client Message' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Client Message</span>
                    </>
                  )}
                </button>
              </div>

              {/* Message Box */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800/90 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-line select-text">
                {result.clientMessage}
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>Zero internal notes, cost floors, or developer references exposed to client.</span>
              </div>
            </div>

            {/* CARD 2: TECHNICAL ESCALATION FOR HAMZA */}
            {result.hamzaMessage && (
              <div className="bg-amber-50/80 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-500/40 p-5 shadow-lg space-y-3 transition-colors">
                <div className="flex items-center justify-between pb-2 border-b border-amber-200 dark:border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                      <ShieldAlert className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                        Ready-to-Send Message to Hamza
                      </h3>
                      <p className="text-[10px] text-amber-700 dark:text-amber-400/80">
                        Address Hamza directly to get his approval on feasibility, stack, and pricing
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(result.hamzaMessage || '', 'Message to Hamza')}
                    className="flex items-center gap-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer font-medium"
                  >
                    {copiedSection === 'Message to Hamza' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-slate-950" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy for Hamza</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-white dark:bg-slate-950/90 p-4 rounded-lg border border-amber-200 dark:border-amber-500/30 text-xs text-slate-800 dark:text-amber-100/90 leading-relaxed font-mono whitespace-pre-line">
                  {result.hamzaMessage}
                </div>

                {result.escalationReason && (
                  <p className="text-[11px] text-amber-800 dark:text-amber-300/80 leading-relaxed">
                    <strong>Why Hamza must approve:</strong> {result.escalationReason}
                  </p>
                )}
              </div>
            )}

            {/* CARD 3: INTERNAL ADVICE FOR FARHAN */}
            <div className="bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-md space-y-2.5 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Farhan's Private Commercial Guidance</span>
                </h3>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">Confidential</span>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800/60">
                {result.internalAdvice}
              </div>
            </div>

            {/* CARD 4: COMMERCIAL & PRICING RECOMMENDATION */}
            {result.commercialRecommendation && (
              <div className="bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-md space-y-4 transition-colors">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Commercial & Pricing Breakdown</span>
                  </h3>
                  <button
                    onClick={() => {
                      const quoteText = `Recommended Quote: ${result.commercialRecommendation?.recommendedPrice}\nNegotiation Range: ${result.commercialRecommendation?.priceRange}\nSuggested Tier: ${result.commercialRecommendation?.suggestedPackage}\nProvisional Timeline: ${result.commercialRecommendation?.provisionalTimeline}\nDeliverables:\n- ${result.commercialRecommendation?.deliverables.join('\n- ')}\nExclusions: ${result.commercialRecommendation?.exclusions.join(', ')}`;
                      copyToClipboard(quoteText, 'Quote Details');
                    }}
                    className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Quote</span>
                  </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Recommended Quote</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                      {result.commercialRecommendation.recommendedPrice}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Negotiation Range</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
                      {result.commercialRecommendation.priceRange}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Reference Tier</span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5 block truncate">
                      {result.commercialRecommendation.suggestedPackage}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Provisional Timeline</span>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      {result.commercialRecommendation.provisionalTimeline}
                    </span>
                  </div>
                </div>

                {/* Deliverables & Exclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Included Deliverables:
                    </span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                      {result.commercialRecommendation.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 dark:text-emerald-400">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Exclusions & Client Assumptions:
                    </span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                      {result.commercialRecommendation.exclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-500 dark:text-amber-400">&times;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* CARD 5: DISCOVERY QUESTIONS */}
            {result.discoveryQuestions && result.discoveryQuestions.length > 0 && (
              <div className="bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-md space-y-2.5 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                    <span>Essential Discovery Questions</span>
                  </h3>
                  <button
                    onClick={() => {
                      const questionsText = result.discoveryQuestions?.map((q, i) => `${i + 1}. ${q}`).join('\n') || '';
                      copyToClipboard(questionsText, 'Discovery Questions');
                    }}
                    className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Questions</span>
                  </button>
                </div>
                <ol className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-decimal pl-4">
                  {result.discoveryQuestions.map((q, i) => (
                    <li key={i} className="leading-relaxed">
                      {q}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* CARD 6: PROJECT RISKS & BOUNDARIES */}
            {result.projectRisks && result.projectRisks.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800/80 p-4 text-xs text-slate-600 dark:text-slate-400 space-y-1.5 transition-colors">
                <span className="font-semibold text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Commercial & Delivery Risk Flags
                </span>
                <ul className="space-y-1 pl-4 list-disc text-[11px]">
                  {result.projectRisks.map((risk, idx) => (
                    <li key={idx}>{risk}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
