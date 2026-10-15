import React, { useState, useMemo } from 'react';
import {
  HardDrive,
  Plus,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  ExternalLink,
  Cpu,
  RefreshCw,
  FileCheck2,
  Lock,
  Layers,
  FileText,
  FileSpreadsheet,
  FileCode,
  FileAudio,
  FileImage,
  Radio,
  X
} from 'lucide-react';

export default function EvidenceView({
  evidence = [],
  cases = [],
  onOpenEvidenceDetail,
  onOpenUploadEvidence,
  onOpenAIAnalysis,
  currentUser,
  onCopyHash,
  onVerifyIntegrityAll
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [integrityFilter, setIntegrityFilter] = useState('ALL');
  const [caseFilter, setCaseFilter] = useState('ALL');
  const [isVerifyingAll, setIsVerifyingAll] = useState(false);

  const isViewer = currentUser?.role === 'VIEWER';

  const filteredEvidence = useMemo(() => {
    return evidence.filter((ev) => {
      const matchesSearch =
        ev.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.sha256.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.caseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === 'ALL' || ev.type === typeFilter;
      const matchesIntegrity = integrityFilter === 'ALL' || ev.integrity === integrityFilter;
      const matchesCase = caseFilter === 'ALL' || ev.caseId === caseFilter;

      return matchesSearch && matchesType && matchesIntegrity && matchesCase;
    });
  }, [evidence, searchTerm, typeFilter, integrityFilter, caseFilter]);

  const handleVerifyAll = () => {
    setIsVerifyingAll(true);
    setTimeout(() => {
      setIsVerifyingAll(false);
      if (onVerifyIntegrityAll) onVerifyIntegrityAll();
    }, 1200);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'Document':
        return <FileText className="w-4 h-4 text-sky-400" />;
      case 'Disk Image':
        return <HardDrive className="w-4 h-4 text-cyan-400" />;
      case 'Log':
        return <FileCode className="w-4 h-4 text-emerald-400" />;
      case 'Image':
        return <FileImage className="w-4 h-4 text-purple-400" />;
      case 'Audio':
        return <FileAudio className="w-4 h-4 text-amber-400" />;
      case 'Network':
        return <Radio className="w-4 h-4 text-rose-400" />;
      default:
        return <Layers className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold font-display text-white tracking-wide">
              Cryptographic Evidence Repository
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            FIPS 180-4 compliant SHA-256 integrity verification, write-blocker tracking, and automated AI analysis.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleVerifyAll}
            disabled={isVerifyingAll}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono-code text-slate-200 transition-colors"
            title="Re-calculate and verify all digital artifact hashes against ledger"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isVerifyingAll ? 'animate-spin' : ''}`} />
            <span>{isVerifyingAll ? 'Verifying Ledger...' : 'Verify All Hashes'}</span>
          </button>

          {!isViewer && (
            <button
              id="upload-evidence-main-btn"
              onClick={() => onOpenUploadEvidence(null)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold font-mono-code transition-all shadow-md shadow-cyan-950/60"
            >
              <Plus className="w-4 h-4" />
              <span>+ Ingest Evidence</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-3.5 rounded-xl bg-[#0c121e] border border-slate-800/80 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search filename, evidence ID, or SHA-256 hash..."
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

          <div className="flex items-center gap-2 flex-wrap text-xs font-mono-code">
            <div className="flex items-center gap-1 bg-[#07090e] p-1 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 px-1.5">Type:</span>
              {['ALL', 'Document', 'Disk Image', 'Log', 'Image', 'Audio', 'Network'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                    typeFilter === t
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-[#07090e] p-1 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 px-1.5">Integrity:</span>
              {['ALL', 'Verified', 'Requires Review'].map((i) => (
                <button
                  key={i}
                  onClick={() => setIntegrityFilter(i)}
                  className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                    integrityFilter === i
                      ? 'bg-slate-700 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Repository Table */}
      <div className="overflow-x-auto rounded-xl bg-[#0c121e] border border-slate-800/80 shadow-md">
        <table className="w-full text-left text-xs font-mono-code">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider bg-[#090e18]">
              <th className="p-3.5 font-semibold">Evidence ID</th>
              <th className="p-3.5 font-semibold">Artifact / Filename</th>
              <th className="p-3.5 font-semibold">Type</th>
              <th className="p-3.5 font-semibold">Case Dossier</th>
              <th className="p-3.5 font-semibold">Size</th>
              <th className="p-3.5 font-semibold">SHA-256 Fingerprint</th>
              <th className="p-3.5 font-semibold">Integrity Status</th>
              <th className="p-3.5 font-semibold">AI Pipeline</th>
              <th className="p-3.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredEvidence.map((ev) => (
              <tr key={ev.id} className="hover:bg-slate-800/30 transition-colors group">
                {/* Evidence ID */}
                <td className="p-3.5 font-bold text-cyan-400 whitespace-nowrap">
                  {ev.id}
                </td>

                {/* Filename & Source */}
                <td className="p-3.5 max-w-[220px]">
                  <div className="flex items-center gap-2">
                    {getFileIcon(ev.type)}
                    <div className="truncate">
                      <div className="font-semibold text-white truncate">{ev.filename}</div>
                      <div className="text-[10px] text-slate-400 truncate">{ev.deviceSource}</div>
                    </div>
                  </div>
                </td>

                {/* Type */}
                <td className="p-3.5 text-slate-300 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700 text-[11px]">
                    {ev.type}
                  </span>
                </td>

                {/* Case */}
                <td className="p-3.5 text-slate-300 max-w-[180px]">
                  <div className="font-semibold text-cyan-300 text-[11px]">{ev.caseId}</div>
                  <div className="text-[10px] text-slate-400 truncate">{ev.caseName}</div>
                </td>

                {/* Size */}
                <td className="p-3.5 text-slate-400 whitespace-nowrap">{ev.fileSize}</td>

                {/* SHA-256 Hash with 1-click copy */}
                <td className="p-3.5">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-[11px] truncate max-w-[130px] text-slate-400">
                      {ev.sha256}
                    </span>
                    <button
                      onClick={() => onCopyHash(ev.sha256)}
                      className="p-1 hover:text-cyan-400 transition-colors text-slate-500 flex-shrink-0"
                      title="Copy full SHA-256 checksum"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </td>

                {/* Integrity Status */}
                <td className="p-3.5 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      ev.integrity === 'Verified'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {ev.integrity === 'Verified' ? (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    ) : (
                      <AlertTriangle className="w-2.5 h-2.5" />
                    )}
                    <span>{ev.integrity}</span>
                  </span>
                </td>

                {/* AI Status */}
                <td className="p-3.5 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      ev.aiStatus === 'Analyzed'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {ev.aiStatus}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3.5 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onOpenEvidenceDetail(ev)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-300 text-[11px] transition-colors border border-slate-700/60 font-semibold"
                    >
                      Examine
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEvidence.length === 0 && (
        <div className="p-12 text-center rounded-xl bg-[#0c121e] border border-slate-800 text-slate-400 font-mono-code">
          <HardDrive className="w-10 h-10 mx-auto text-slate-600 mb-3" />
          <div className="text-sm font-semibold text-white">No evidence artifacts match current filter</div>
        </div>
      )}
    </div>
  );
}
