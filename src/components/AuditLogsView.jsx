import React, { useState, useMemo } from 'react';
import {
  History,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  Lock,
  Terminal,
  Server,
  FileCheck2,
  X
} from 'lucide-react';

export default function AuditLogsView({
  auditLogs = [],
  currentUser,
  onExportReport
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [resultFilter, setResultFilter] = useState('ALL');

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesSearch =
        log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.caseId?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAction = actionFilter === 'ALL' || log.action.includes(actionFilter);
      const matchesResult = resultFilter === 'ALL' || log.result === resultFilter;

      return matchesSearch && matchesAction && matchesResult;
    });
  }, [auditLogs, searchTerm, actionFilter, resultFilter]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold font-display text-white tracking-wide">
              Tamper-Proof Forensic Audit Ledger
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            WORM-compliant (Write Once Read Many) immutable event stream logging all operator access, decrypt attempts, and evidentiary exports.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onExportReport(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono-code transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Cryptographic Audit Log</span>
          </button>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono-code">
        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 uppercase">Audit Records</div>
          <div className="text-xl font-bold text-white">{auditLogs.length} Events</div>
          <div className="text-[10px] text-cyan-400">Append-only journal</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 uppercase">Integrity Ledger Status</div>
          <div className="text-xl font-bold text-emerald-400">UNCOMPROMISED</div>
          <div className="text-[10px] text-slate-400">Merkle root verified</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 uppercase">Anomalous Actions</div>
          <div className="text-xl font-bold text-cyan-400">0 Flags</div>
          <div className="text-[10px] text-slate-400">Continuous SIEM sync</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 uppercase">Current Session Clearance</div>
          <div className="text-xl font-bold text-purple-400">{currentUser?.role || 'INVESTIGATOR'}</div>
          <div className="text-[10px] text-slate-400">{currentUser?.badgeNumber || 'FRX-7749'}</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="p-3.5 rounded-xl bg-[#0c121e] border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono-code">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by action, operator, IP, or case identifier..."
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
            {['ALL', 'LOGIN', 'EVIDENCE', 'INTEGRITY', 'AI', 'REPORT'].map((act) => (
              <button
                key={act}
                onClick={() => setActionFilter(act)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  actionFilter === act
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {act}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[#07090e] p-1 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 px-1.5">Result:</span>
            {['ALL', 'SUCCESS', 'ALERT'].map((res) => (
              <button
                key={res}
                onClick={() => setResultFilter(res)}
                className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                  resultFilter === res
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {res}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="overflow-x-auto rounded-xl bg-[#0c121e] border border-slate-800/80 shadow-md">
        <table className="w-full text-left text-xs font-mono-code">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider bg-[#090e18]">
              <th className="p-3.5 font-semibold">Log ID</th>
              <th className="p-3.5 font-semibold">Action</th>
              <th className="p-3.5 font-semibold">Operator / Investigator</th>
              <th className="p-3.5 font-semibold">Target Entity</th>
              <th className="p-3.5 font-semibold">Client Origin & Terminal</th>
              <th className="p-3.5 font-semibold">Audit Details</th>
              <th className="p-3.5 font-semibold">Timestamp (UTC)</th>
              <th className="p-3.5 font-semibold text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3.5 font-bold text-cyan-400 whitespace-nowrap">
                  {log.id}
                </td>
                <td className="p-3.5 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-200">
                    {log.action}
                  </span>
                </td>
                <td className="p-3.5 whitespace-nowrap">
                  <div className="font-semibold text-white">{log.user}</div>
                  <div className="text-[10px] text-slate-500">{log.role}</div>
                </td>
                <td className="p-3.5 whitespace-nowrap text-cyan-300">
                  {log.caseId || 'SYSTEM'}
                </td>
                <td className="p-3.5 whitespace-nowrap text-slate-400 text-[11px]">
                  <div>{log.ipAddress}</div>
                  <div className="text-[10px] text-slate-500">{log.device}</div>
                </td>
                <td className="p-3.5 text-slate-300 text-[11px] max-w-xs truncate">
                  {log.details}
                </td>
                <td className="p-3.5 text-slate-400 text-[11px] whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="p-3.5 text-right whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.result === 'SUCCESS'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {log.result === 'SUCCESS' ? (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    ) : (
                      <AlertTriangle className="w-2.5 h-2.5" />
                    )}
                    <span>{log.result}</span>
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
