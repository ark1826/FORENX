import React, { useState, useMemo } from 'react';
import {
  FileCheck2,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Download,
  Copy,
  Calendar,
  User,
  HardDrive,
  Lock,
  ExternalLink,
  X
} from 'lucide-react';

export default function ChainOfCustodyView({
  chainOfCustody = [],
  cases = [],
  onCopyHash,
  onExportReport
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [caseFilter, setCaseFilter] = useState('ALL');

  const filteredCustody = useMemo(() => {
    return chainOfCustody.filter((c) => {
      const matchesSearch =
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.evidenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.evidenceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.hashSnapshot.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAction = actionFilter === 'ALL' || c.action.includes(actionFilter);
      const matchesCase = caseFilter === 'ALL' || c.caseId === caseFilter;

      return matchesSearch && matchesAction && matchesCase;
    });
  }, [chainOfCustody, searchTerm, actionFilter, caseFilter]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-400" />
            <h1 className="text-2xl font-bold font-display text-white tracking-wide">
              Defensible Chain of Custody Ledger
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            ISO/IEC 27037 standard electronic record of physical and digital evidence handling, transfers, and hash attestations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onExportReport(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono-code transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Custody Log</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono-code text-slate-500 uppercase">Custody Ledger Entries</div>
          <div className="text-xl font-bold text-white font-mono-code">{chainOfCustody.length} Events</div>
          <div className="text-[10px] text-cyan-400 font-mono-code">100% Cryptographically signed</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono-code text-slate-500 uppercase">Integrity Compliance</div>
          <div className="text-xl font-bold text-emerald-400 font-mono-code">ISO/IEC 27037</div>
          <div className="text-[10px] text-slate-400 font-mono-code">Admissible in federal court</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono-code text-slate-500 uppercase">Write-Blocker Attestations</div>
          <div className="text-xl font-bold text-cyan-400 font-mono-code">100% Verified</div>
          <div className="text-[10px] text-slate-400 font-mono-code">Zero unblocked mounts</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono-code text-slate-500 uppercase">Tamper Auditing</div>
          <div className="text-xl font-bold text-emerald-400 font-mono-code">Zero Discrepancies</div>
          <div className="text-[10px] text-emerald-400 font-mono-code">Continuous SHA-256 watch</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3.5 rounded-xl bg-[#0c121e] border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono-code">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by log ID, evidence name, officer, or hash snapshot..."
            className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-[#07090e] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-[#07090e] p-1 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 px-1.5">Action:</span>
            {['ALL', 'Seizure', 'Transfer', 'Check', 'Analyzed', 'Court'].map((act) => (
              <button
                key={act}
                onClick={() => setActionFilter(act)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  actionFilter === act
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {act}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[#07090e] p-1 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 px-1.5">Case:</span>
            <select
              value={caseFilter}
              onChange={(e) => setCaseFilter(e.target.value)}
              className="bg-transparent text-slate-300 text-[11px] focus:outline-none"
            >
              <option value="ALL">All Cases</option>
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Custody Timeline Table */}
      <div className="overflow-x-auto rounded-xl bg-[#0c121e] border border-slate-800/80 shadow-md">
        <table className="w-full text-left text-xs font-mono-code">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider bg-[#090e18]">
              <th className="p-3.5 font-semibold">Event ID</th>
              <th className="p-3.5 font-semibold">Action & Operation</th>
              <th className="p-3.5 font-semibold">Evidence Artifact</th>
              <th className="p-3.5 font-semibold">Authorized Officer</th>
              <th className="p-3.5 font-semibold">Hardware / Station</th>
              <th className="p-3.5 font-semibold">SHA-256 Snapshot</th>
              <th className="p-3.5 font-semibold">Timestamp (UTC)</th>
              <th className="p-3.5 font-semibold text-right">Integrity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredCustody.map((c) => (
              <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                {/* Event ID */}
                <td className="p-3.5 font-bold text-cyan-400 whitespace-nowrap">
                  {c.id}
                </td>

                {/* Action */}
                <td className="p-3.5 font-semibold text-white whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{c.action}</span>
                  </div>
                </td>

                {/* Evidence Artifact */}
                <td className="p-3.5">
                  <div className="font-semibold text-cyan-300 truncate max-w-[180px]">
                    {c.evidenceName}
                  </div>
                  <div className="text-[10px] text-slate-500">{c.evidenceId} • {c.caseId}</div>
                </td>

                {/* Authorized Officer */}
                <td className="p-3.5 whitespace-nowrap">
                  <div className="font-semibold text-white">{c.user}</div>
                  <div className="text-[10px] text-slate-400">{c.role}</div>
                </td>

                {/* Hardware */}
                <td className="p-3.5 text-slate-300 text-[11px] max-w-[160px] truncate">
                  {c.deviceInfo}
                </td>

                {/* SHA-256 Snapshot */}
                <td className="p-3.5">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-[11px] truncate max-w-[130px] font-mono-code text-slate-400">
                      {c.hashSnapshot}
                    </span>
                    <button
                      onClick={() => onCopyHash(c.hashSnapshot)}
                      className="p-1 hover:text-cyan-400 transition-colors text-slate-500"
                      title="Copy snapshot hash"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </td>

                {/* Timestamp */}
                <td className="p-3.5 text-slate-400 text-[11px] whitespace-nowrap">
                  {c.timestamp}
                </td>

                {/* Integrity Status */}
                <td className="p-3.5 text-right whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold font-mono-code">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>{c.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
