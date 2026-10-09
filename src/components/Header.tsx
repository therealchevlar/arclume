import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  RotateCcw,
  Sun,
  Moon
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'workspace' | 'services' | 'coordination';
  setActiveTab: (tab: 'workspace' | 'services' | 'coordination') => void;
  onReset: () => void;
  isProcessing: boolean;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onReset,
  isProcessing,
  theme,
  toggleTheme,
  onLogout
}) => {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15">
          {/* Brand & Identity: Clean text title without any square FC avatar */}
          <div className="flex items-center space-x-3">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                  Farhan's Sales Copilot
                </h1>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                  AI Online
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Client Communication · Technical Coordination with Hamza
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <nav className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-medium">
              <button
                onClick={() => setActiveTab('workspace')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'workspace'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Sales Cockpit</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'services'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                <span>20 Services & Pricing</span>
              </button>

              <button
                onClick={() => setActiveTab('coordination')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'coordination'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Hamza Protocol</span>
              </button>
            </nav>

            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block mx-1"></div>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-700" />
              )}
            </button>

            {/* Lock / Sign Out */}
            <button
              onClick={onLogout}
              title="Lock system / Sign out"
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-200 dark:hover:border-red-800 text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 hidden" />
              <span className="text-[10px] font-bold">Lock</span>
            </button>

            {/* New Client Reset */}
            <button
              onClick={onReset}
              disabled={isProcessing}
              title="Clear current client data & start fresh"
              className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800/80 px-2.5 py-1.5 rounded-lg transition-colors border border-slate-200 dark:border-slate-800 active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Client</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
