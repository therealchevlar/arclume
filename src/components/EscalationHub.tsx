import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Copy, 
  Check, 
  Send, 
  UserCheck, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { ToastMessage } from './Toast';

interface EscalationHubProps {
  onDraftEscalation: (clientReq: string, budget: string, deadline: string, platform: string) => void;
  onIncorporateHamzaReply: (hamzaText: string) => void;
  setToast: (toast: ToastMessage) => void;
}

export const EscalationHub: React.FC<EscalationHubProps> = ({
  onDraftEscalation,
  onIncorporateHamzaReply,
  setToast
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [clientReq, setClientReq] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [platform, setPlatform] = useState('Upwork');

  const [pastedHamzaReply, setPastedHamzaReply] = useState('');

  const copyText = (text: string, id: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setToast({
      id: Date.now().toString(),
      type: 'success',
      text: `${label} copied to clipboard!`
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sampleEscalationTemplate = `Hey Hamza, we've received a new client inquiry and I need your input before I commit to anything.

Client request: [summary of what client wants]
Requested features: [features, stack, APIs]
Budget: [budget or unknown]
Deadline: [deadline or unknown]
Platform: Upwork

Could you confirm:
1. Whether we can deliver this with our current team and stack.
2. What information we still need from the client.
3. A realistic delivery timeline.
4. A suitable price or price range.
5. Any important risks, exclusions, or technical constraints.

I haven't confirmed the final scope, price, or deadline to the client yet. Let me know what I can confidently offer.`;

  return (
    <div className="space-y-5">
      {/* Overview Banner */}
      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg space-y-4 transition-colors">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Hamza Technical Coordination & Escalation Protocol
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              <strong>Core Rule:</strong> Farhan manages the client relationship and commercial discussions. Hamza has technical delivery authority and assesses feasibility, architecture, development estimates, and deadlines.
            </p>
          </div>
        </div>

        {/* 4 Protocol Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">1. Spot Risk</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              SaaS, auth, payments, RAG, tight deadlines, or unfamiliar stacks trigger escalation.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">2. Holding Reply</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              Send the client a professional holding reply with discovery questions. Never commit early.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">3. Brief Hamza</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              Send Hamza the structured 5-point technical brief with client specs and budget.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">4. Synthesize</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              Paste Hamza's technical notes into the Copilot to generate the final client proposal.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Column 1: Escalation Builder */}
        <div className="bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-lg space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Step A: Prepare Escalation for Hamza</span>
            </h3>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">Internal Brief</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                Client Request / Technical Unknowns
              </label>
              <textarea
                value={clientReq}
                onChange={(e) => setClientReq(e.target.value)}
                placeholder="e.g. Build an AI document search tool with user login and Stripe subscriptions in 10 days."
                rows={3}
                className="w-full text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Budget
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. $400 or Unknown"
                  className="w-full text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Deadline
                </label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="e.g. 7 days"
                  className="w-full text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-slate-100"
                >
                  <option value="Upwork">Upwork</option>
                  <option value="Fiverr">Fiverr</option>
                  <option value="Email">Email</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                if (!clientReq.trim()) return;
                onDraftEscalation(clientReq, budget, deadline, platform);
              }}
              disabled={!clientReq.trim()}
              className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                !clientReq.trim()
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Hamza Brief in Copilot &rarr;</span>
            </button>
          </div>

          {/* Template Box */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Official Hamza Brief Template
              </span>
              <button
                onClick={() => copyText(sampleEscalationTemplate, 'template', 'Template')}
                className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedId === 'template' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>Copy Blank Template</span>
              </button>
            </div>
            <pre className="text-[11px] bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
              {sampleEscalationTemplate}
            </pre>
          </div>
        </div>

        {/* Column 2: Incorporate Hamza's Response */}
        <div className="bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-lg space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>Step B: Incorporate Hamza's Decision</span>
            </h3>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">Client Synthesis</span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            When Hamza messages you back with technical feedback, paste his raw notes here to draft the final client response.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                Hamza's Technical Feedback / Decision
              </label>
              <textarea
                value={pastedHamzaReply}
                onChange={(e) => setPastedHamzaReply(e.target.value)}
                placeholder="e.g. 'Hey Farhan, yes we can deliver this. Realistic timeline is 14 days, not 7 days. Tech stack: React + Node + Supabase + Pinecone vector DB. Quote $650 minimum. Client must provide API keys and sample documents.'"
                rows={5}
                className="w-full text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono leading-relaxed"
              />
            </div>

            <button
              onClick={() => {
                if (!pastedHamzaReply.trim()) return;
                onIncorporateHamzaReply(pastedHamzaReply);
              }}
              disabled={!pastedHamzaReply.trim()}
              className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                !pastedHamzaReply.trim()
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Synthesize into Client Reply & Proposal &rarr;</span>
            </button>
          </div>

          {/* Checklist */}
          <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <span className="font-semibold text-slate-800 dark:text-slate-300 block text-[11px]">
              What Farhan Must Check Before Committing:
            </span>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px] list-disc pl-4">
              <li>Has Hamza explicitly confirmed the timeline is deliverable with current bandwidth?</li>
              <li>Has Hamza verified whether third-party APIs (Stripe, Twilio, OpenAI) are supported?</li>
              <li>Are external hosting/subscription fees clearly separated from our dev quote?</li>
              <li>Has client agreed to essential prerequisites (wireframes, API keys, content)?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
