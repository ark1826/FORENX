import React, { useState } from 'react';
import {
  FolderLock,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  User,
  Layers,
  Sparkles,
  FileText,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  ShieldAlert,
  GitMerge
} from 'lucide-react';

export default function SimpleCasesView({
  cases = [],
  evidence = [],
  selectedCaseId,
  onSelectCase,
  onOpenCaseFiles,
  onOpenNewCase,
  onOpenAIForCase,
  onGenerateReportForCase,
  onTriggerPatternCheck
}) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = cases.filter((c) => {
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.investigator?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Active
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            In Review
          </span>
        );
      case 'Closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Closed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Cases & Investigations</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse and organize active investigations. The system automatically tracks cross-case crime patterns and notifies the admin.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onTriggerPatternCheck?.()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-700 hover:to-rose-700 text-white text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Scan Crime Patterns</span>
          </button>

          <button
            onClick={onOpenNewCase}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Case</span>
          </button>
        </div>
      </div>

      {/* Automated Pattern Match Advisory Banner */}
      <div className="p-4 bg-gradient-to-r from-red-50 via-rose-50 to-amber-50 rounded-2xl border border-red-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
            <GitMerge className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-red-900 uppercase tracking-wider">
                Automated Multi-Case Crime Pattern Engine
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-200 text-red-800">
                Auto-Report & Alert
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              When 2 or more cases match a criminal Modus Operandi, weapon profile, or suspect trail, the engine automatically compiles a correlation dossier and notifies the Admin with an instant alert.
            </p>
          </div>
        </div>

        <button
          onClick={() => onTriggerPatternCheck?.()}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-red-50 text-red-700 border border-red-200 text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <span>Run Pattern Scan</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Cases', count: cases.length },
            { id: 'Active', label: 'Active', count: cases.filter((c) => c.status === 'Active').length },
            { id: 'Under Review', label: 'In Review', count: cases.filter((c) => c.status === 'Under Review').length },
            { id: 'Closed', label: 'Closed', count: cases.filter((c) => c.status === 'Closed').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter cases by name or person..."
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-white text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Case Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCases.map((caseItem) => {
          const isSelected = selectedCaseId === caseItem.id;
          const caseEvidence = evidence.filter((ev) => ev.caseId === caseItem.id);
          const fileCount = caseEvidence.length || caseItem.evidenceCount || 0;

          return (
            <div
              key={caseItem.id}
              className={`bg-white rounded-2xl border p-5 transition-all flex flex-col justify-between shadow-2xs hover:shadow-md ${
                isSelected ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Top Row: Case ID & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {caseItem.id}
                  </span>
                  {getStatusBadge(caseItem.status)}
                </div>

                {/* Case Name */}
                <h3 className="text-base font-bold text-slate-900 line-clamp-1 mb-1.5">
                  {caseItem.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {caseItem.description}
                </p>

                {/* Meta details */}
                <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Lead Investigator:</span>
                    <span className="font-medium text-slate-800">{caseItem.investigator}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Attached Evidence:</span>
                    <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {fileCount} {fileCount === 1 ? 'file' : 'files'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Priority:</span>
                    <span
                      className={`font-semibold ${
                        caseItem.priority === 'Critical'
                          ? 'text-rose-600'
                          : caseItem.priority === 'High'
                          ? 'text-amber-600'
                          : 'text-slate-700'
                      }`}
                    >
                      {caseItem.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    onSelectCase(caseItem.id);
                    onOpenCaseFiles(caseItem.id);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-600" />
                  <span>View Files</span>
                </button>

                <button
                  onClick={() => {
                    onSelectCase(caseItem.id);
                    onOpenAIForCase(caseItem);
                  }}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  title="Ask AI to analyze this case"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI</span>
                </button>

                <button
                  onClick={() => onGenerateReportForCase(caseItem)}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  title="Generate Summary Report"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCases.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <FolderLock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">No matching cases found</h3>
          <p className="text-sm text-slate-500 mt-1">
            Try adjusting your search query or status filter.
          </p>
        </div>
      )}
    </div>
  );
}
