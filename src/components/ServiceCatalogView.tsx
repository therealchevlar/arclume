import React, { useState } from 'react';
import { SERVICES, ServiceDefinition } from '../data/services';
import { 
  Search, 
  Clock, 
  HelpCircle, 
  AlertTriangle, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface ServiceCatalogViewProps {
  onSelectServiceForCopilot: (service: ServiceDefinition) => void;
}

export const ServiceCatalogView: React.FC<ServiceCatalogViewProps> = ({
  onSelectServiceForCopilot,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(1);

  const categories = [
    'All',
    'Web Development',
    'AI & Automation',
    'Design & Prototype',
    'Data & Analytics',
    'Infrastructure & CMS'
  ];

  const filteredServices = SERVICES.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.typicalWork.some(w => w.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* Overview Banner */}
      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg space-y-4 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                20 Core Services & Draft Reference Packages
              </h2>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-medium bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/30">
                USD Reference
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Established reference packages for Farhan's commercial discussions. Prices are draft benchmarks, not rigid quotes. Routine inquiries can be quoted directly; complex, custom, or high-risk projects require Hamza's approval.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-700 dark:text-slate-300 font-medium bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              Total Services: <strong className="text-slate-900 dark:text-white">20</strong>
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services, technologies, or keywords..."
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>

          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {filteredServices.map((service) => {
          const isExpanded = expandedServiceId === service.id;

          return (
            <div
              key={service.id}
              className={`bg-white dark:bg-slate-900/80 rounded-xl border transition-all ${
                isExpanded 
                  ? 'border-indigo-400 dark:border-indigo-500/60 ring-1 ring-indigo-400/30 dark:ring-indigo-500/30' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Header */}
              <div 
                onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      #{service.id}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">&middot;</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Draft Packages Quick Tag & Action */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono">
                    <span className="text-slate-400 dark:text-slate-500">Draft:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">${service.packages.basic.priceUSD}</span>
                    <span className="text-slate-300 dark:text-slate-600">/</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">${service.packages.standard.priceUSD}</span>
                    <span className="text-slate-300 dark:text-slate-600">/</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">${service.packages.premium.priceUSD}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectServiceForCopilot(service);
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Use in Copilot</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
                  {/* Package Cards */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Draft Reference Packages (USD)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Basic */}
                      <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Basic</span>
                          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            ${service.packages.basic.priceUSD}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>Turnaround: {service.packages.basic.turnaroundDays} days</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {service.packages.basic.summary}
                        </p>
                        <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 pt-1.5 border-t border-slate-200 dark:border-slate-800/80">
                          {service.packages.basic.deliverables.map((d, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-slate-400">&bull;</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Standard */}
                      <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg border border-indigo-200 dark:border-indigo-500/40 ring-1 ring-indigo-200 dark:ring-indigo-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Standard (Recommended)</span>
                          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            ${service.packages.standard.priceUSD}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>Turnaround: {service.packages.standard.turnaroundDays} days</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {service.packages.standard.summary}
                        </p>
                        <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 pt-1.5 border-t border-slate-200 dark:border-slate-800/80">
                          {service.packages.standard.deliverables.map((d, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-slate-400">&bull;</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Premium */}
                      <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Premium</span>
                          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            ${service.packages.premium.priceUSD}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>Turnaround: {service.packages.premium.turnaroundDays} days</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {service.packages.premium.summary}
                        </p>
                        <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 pt-1.5 border-t border-slate-200 dark:border-slate-800/80">
                          {service.packages.premium.deliverables.map((d, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-slate-400">&bull;</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Operational Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                    {/* Discovery Questions */}
                    <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <h5 className="font-semibold text-slate-800 dark:text-slate-300 flex items-center gap-1.5 text-[11px]">
                        <HelpCircle className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                        Discovery Questions
                      </h5>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                        {service.keyQuestionsToAsk.map((q, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-slate-400">&bull;</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions */}
                    <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <h5 className="font-semibold text-slate-800 dark:text-slate-300 flex items-center gap-1.5 text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                        Scope Boundaries
                      </h5>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                        {service.scopeBoundaries.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-slate-400">&bull;</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Escalation */}
                    <div className="bg-amber-50/70 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-500/30 space-y-1.5">
                      <h5 className="font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 text-[11px]">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        When to Escalate to Hamza
                      </h5>
                      <ul className="space-y-1 text-amber-800 dark:text-amber-200/90 text-[11px]">
                        {service.hamzaEscalationTriggers.map((t, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-500">&bull;</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-[10px] text-amber-700 dark:text-amber-300/80 pt-1 border-t border-amber-200 dark:border-amber-500/20 font-medium">
                        {service.commercialAdvice}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
