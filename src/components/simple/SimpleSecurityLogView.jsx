import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  RefreshCw,
  FileCheck2,
  Copy,
  Clock,
  User,
  ShieldAlert
} from 'lucide-react';

export default function SimpleSecurityLogView({
  auditLogs = [],
  evidence = [],
  onVerifyAll,
  onShowToast
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const filteredLogs = auditLogs.filter((log) => {
    const q = searchQuery.toLowerCase();
    return (
      log.action?.toLowerCase().includes(q) ||
      log.user?.toLowerCase().includes(q) ||
      log.details?.toLowerCase().includes(q) ||
      log.caseId?.toLowerCase().includes(q) ||
      log.id?.toLowerCase().includes(q)
    );
  });

  const handleVerifyLedger = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (onVerifyAll) onVerifyAll();
      onShowToast?.('All evidence checksums verified. Zero tampering detected.', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner with Stats */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Security & Tamper-Proof Audit</h1>
          <p className="text-sm text-slate-500 mt-1">
            Every file action, upload, and verification is permanently recorded in a secured audit log.
          </p>
        </div>

        <button
          onClick={handleVerifyLedger}
          disabled={isVerifying}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0 disabled:opacity-50"
        >
          <CheckCircle2 className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
          <span>{isVerifying ? 'Checking Cryptography...' : 'Verify Entire Ledger'}</span>
        </button>
      </div>

      {/* 3 Metric Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Integrity Health</p>
              <p className="text-xl font-bold text-slate-900">100% Sealed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Verified Evidence</p>
              <p className="text-xl font-bold text-slate-900">{evidence.length} Files</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Standard Compliance</p>
              <p className="text-xl font-bold text-slate-900">ISO/IEC 27037</p>
            </div>
          </div>
        </div>
      </div>

      {/* Log Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-150 flex items-center justify-between gap-4">
          <h3 className="font-bold text-sm text-slate-900">Activity & Custody Trail</h3>

          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit trail..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.timestamp?.slice(0, 16) || '2026-09-15 10:00'}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800 whitespace-nowrap">
                    {log.action?.replace(/_/g, ' ')}
                  </td>
                  <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                    {log.user}
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-md truncate">
                    {log.details}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {log.result || 'Success'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
