import React, { useState, useMemo } from 'react';
import {
  FolderLock,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  ShieldAlert,
  User,
  Calendar,
  Layers,
  ChevronRight,
  Activity,
  AlertTriangle,
  X
} from 'lucide-react';

export default function CasesView({
  cases = [],
  onOpenCase,
  onOpenCreateCase,
  currentUser
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const isViewer = currentUser?.role === 'VIEWER';

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchesSearch =
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.investigator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
      const matchesPriority = priorityFilter === 'ALL' || c.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [cases, searchTerm, statusFilter, priorityFilter]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FolderLock className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold font-display text-white tracking-wide">
              Case Management Dossiers
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Secure digital forensic investigations, evidence indexes, and cross-jurisdiction intelligence.
          </p>
        </div>

        {!isViewer && (
          <button
            id="create-new-case-btn"
            onClick={onOpenCreateCase}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold font-mono-code transition-all shadow-md shadow-cyan-950/60 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Case Dossier</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3.5 rounded-xl bg-[#0c121e] border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter cases by title, ID, suspect, or investigator..."
            className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-[#07090e] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono-code"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1 text-xs text-slate-400 font-mono-code">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Status:</span>
          </div>
          <div className="flex items-center gap-1 bg-[#07090e] p-1 rounded-lg border border-slate-800 text-xs font-mono-code">
            {['ALL', 'Active', 'Under Review', 'Closed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  statusFilter === status
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[#07090e] p-1 rounded-lg border border-slate-800 text-xs font-mono-code ml-2">
            <span className="text-[10px] text-slate-500 px-1.5">Priority:</span>
            {['ALL', 'Critical', 'High', 'Medium', 'Low'].map((pri) => (
              <button
                key={pri}
                onClick={() => setPriorityFilter(pri)}
                className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                  priorityFilter === pri
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {pri}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            id={`case-card-${c.id}`}
            onClick={() => onOpenCase(c.id)}
            className="p-5 rounded-xl bg-[#0c121e] border border-slate-800/80 hover:border-cyan-500/40 transition-all cursor-pointer group flex flex-col justify-between shadow-sm hover:shadow-cyan-950/40 relative overflow-hidden"
          >
            {/* Top Priority Accent Line */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 ${
                c.priority === 'Critical'
                  ? 'bg-rose-500'
                  : c.priority === 'High'
                  ? 'bg-amber-400'
                  : 'bg-cyan-500'
              }`}
            ></div>

            <div>
              {/* Header: ID, Status, Priority */}
              <div className="flex items-center justify-between text-xs font-mono-code mb-2.5">
                <span className="font-bold text-cyan-400 tracking-wide">{c.id}</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.priority === 'Critical'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : c.priority === 'High'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    {c.priority}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      c.status === 'Active'
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                        : c.status === 'Under Review'
                        ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>

              {/* Title & Type */}
              <h2 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1 font-display">
                {c.name}
              </h2>
              <div className="text-[11px] text-cyan-500/80 font-mono-code mb-2.5 font-medium">
                {c.caseType}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                {c.description}
              </p>

              {/* Key Suspects preview */}
              {c.keyEntities && c.keyEntities.length > 0 && (
                <div className="mb-4 p-2 rounded-lg bg-[#07090e] border border-slate-800/80">
                  <div className="text-[10px] font-mono-code text-slate-500 uppercase mb-1">
                    Key Subject / Suspect
                  </div>
                  <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{c.keyEntities[0].name}</span>
                    <span className="text-[10px] font-mono-code text-slate-400">({c.keyEntities[0].role})</span>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.tags?.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-slate-800/70 border border-slate-700/50 text-[10px] font-mono-code text-slate-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Metadata & Threat Meter */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                <div className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>{c.evidenceCount} Artifacts</span>
                </div>
                <span>Lead: {c.investigator.replace('Agent ', '')}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono-code text-slate-500">THREAT:</span>
                  <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        c.riskScore > 90 ? 'bg-rose-500' : c.riskScore > 75 ? 'bg-amber-400' : 'bg-blue-400'
                      }`}
                      style={{ width: `${c.riskScore}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-mono-code font-bold text-white">{c.riskScore}%</span>
                </div>

                <span className="text-xs text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center font-mono-code">
                  <span>Enter</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="p-12 text-center rounded-xl bg-[#0c121e] border border-slate-800 text-slate-400">
          <FolderLock className="w-10 h-10 mx-auto text-slate-600 mb-3" />
          <div className="text-sm font-semibold text-white font-mono-code">No matching cases found</div>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search terms or filter parameters.</p>
        </div>
      )}
    </div>
  );
}
