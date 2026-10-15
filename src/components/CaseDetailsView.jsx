import React, { useState } from 'react';
import {
  ArrowLeft,
  FolderLock,
  HardDrive,
  Cpu,
  Share2,
  FileCheck2,
  History,
  FileText,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Copy,
  ExternalLink,
  Plus,
  Send,
  Trash2,
  Shield,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function CaseDetailsView({
  caseItem,
  evidence = [],
  chainOfCustody = [],
  auditLogs = [],
  onBack,
  onOpenEvidenceDetail,
  onOpenUploadEvidence,
  onOpenAIAnalysis,
  onOpenIntelligenceGraph,
  onExportReport,
  currentUser,
  onAddCaseNote,
  onCopyHash
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [newNoteText, setNewNoteText] = useState('');
  const [localNotes, setLocalNotes] = useState([
    {
      id: 'n-1',
      author: 'Agent Maya Patel',
      time: '2026-09-14 21:04 UTC',
      content: 'Subpoenaed AWS logs confirm outbound connection from suspect server to bulletproof host in Eastern Europe matching Cobalt Strike beacon timestamps.'
    },
    {
      id: 'n-2',
      author: 'Dr. Sarah Chen',
      time: '2026-09-13 16:30 UTC',
      content: 'Memory dump Volatility pass completed. Recovered raw AES-256 key from volatile RAM cache. Ransomware decryptor tool under development.'
    }
  ]);

  if (!caseItem) {
    return (
      <div className="p-12 text-center text-slate-400">
        <FolderLock className="w-12 h-12 mx-auto text-slate-600 mb-3" />
        <div className="text-lg font-semibold text-white">Case Dossier Not Found</div>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-cyan-600 rounded text-xs text-white">
          Back to Cases
        </button>
      </div>
    );
  }

  // Filter items specific to this case
  const caseEvidence = evidence.filter((e) => e.caseId === caseItem.id);
  const caseCustody = chainOfCustody.filter((c) => c.caseId === caseItem.id);
  const caseAudit = auditLogs.filter((a) => a.caseId === caseItem.id);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote = {
      id: `n-${Date.now()}`,
      author: currentUser?.name || 'Lead Investigator',
      time: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
      content: newNoteText.trim()
    };

    setLocalNotes([newNote, ...localNotes]);
    setNewNoteText('');
    if (onAddCaseNote) onAddCaseNote(caseItem.id, newNote);
  };

  const isViewer = currentUser?.role === 'VIEWER';

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono-code text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Case Management</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onExportReport(caseItem)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono-code text-slate-200 border border-slate-700 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Generate Court Dossier</span>
          </button>
        </div>
      </div>

      {/* Case Header Card */}
      <div className="p-5 rounded-xl bg-[#0c121e] border border-slate-800/80 shadow-md relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 ${
            caseItem.priority === 'Critical' ? 'bg-rose-500' : 'bg-amber-400'
          }`}
        ></div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-mono-code mb-1.5">
              <span className="font-bold text-cyan-400 text-sm">{caseItem.id}</span>
              <span className="text-slate-600">•</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  caseItem.priority === 'Critical'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {caseItem.priority} Priority
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px]">
                {caseItem.status}
              </span>
              <span className="text-slate-500">Classification: LAW ENFORCEMENT SENSITIVE</span>
            </div>

            <h1 className="text-2xl font-bold font-display text-white tracking-wide">
              {caseItem.name}
            </h1>
            <p className="text-xs text-cyan-400/90 font-mono-code mt-0.5">{caseItem.caseType}</p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-[#07090e] px-4 py-2.5 rounded-lg border border-slate-800/80 text-xs font-mono-code">
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Artifacts</div>
              <div className="text-base font-bold text-white">{caseEvidence.length}</div>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Threat Level</div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-rose-400">{caseItem.riskScore}%</span>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Lead Investigator</div>
              <div className="text-xs font-semibold text-slate-200">{caseItem.investigator}</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto text-xs font-mono-code">
          {[
            { id: 'overview', label: 'Case Overview', icon: FolderLock },
            { id: 'evidence', label: `Evidence (${caseEvidence.length})`, icon: HardDrive },
            { id: 'timeline', label: 'Investigative Timeline', icon: Calendar },
            { id: 'ai-analysis', label: 'AI Intelligence', icon: Cpu },
            { id: 'custody', label: `Chain of Custody (${caseCustody.length})`, icon: FileCheck2 },
            { id: 'audit', label: `Audit Log (${caseAudit.length})`, icon: History },
            { id: 'intel', label: 'Connected Entities', icon: Share2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Summary & Suspects - 7 cols */}
          <div className="lg:col-span-7 space-y-5">
            {/* Executive Case Summary */}
            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800/80">
              <h2 className="text-sm font-semibold text-white font-display mb-2">
                Executive Case Summary
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {caseItem.description}
              </p>
              <div className="mt-3 p-3 rounded-lg bg-[#07090e] border border-slate-800/80 text-xs">
                <div className="text-[10px] font-mono-code text-cyan-400 uppercase font-semibold mb-1">
                  Current Operational Lead
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {caseItem.leadSummary}
                </p>
              </div>
            </div>

            {/* Key Suspects & Persons of Interest */}
            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-white font-display">
                  Identified Key Subjects & Entities
                </h2>
                <span className="text-[10px] font-mono-code text-slate-400">
                  {caseItem.keyEntities?.length || 0} cataloged
                </span>
              </div>

              <div className="space-y-2">
                {caseItem.keyEntities?.map((ent, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#07090e] border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center text-cyan-400 font-mono-code font-bold text-xs">
                        {ent.type[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{ent.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono-code">{ent.role}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-slate-800 text-cyan-300 border border-slate-700">
                      {ent.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Investigator Notes & Tags - 5 cols */}
          <div className="lg:col-span-5 space-y-5">
            {/* Investigator Notes */}
            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800/80 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-white font-display">
                  Investigator Working Notes
                </h2>
                <span className="text-[10px] font-mono-code text-cyan-400">Chronological</span>
              </div>

              {/* Add note form */}
              {!isViewer && (
                <form onSubmit={handleAddNote} className="mb-4">
                  <div className="relative">
                    <textarea
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Add timestamped investigative note or lead..."
                      rows={2}
                      className="w-full p-2.5 pr-10 rounded-lg bg-[#07090e] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono-code resize-none"
                    />
                    <button
                      type="submit"
                      className="absolute right-2.5 bottom-3 p-1.5 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
                      title="Post note"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              )}

              {/* Notes list */}
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {localNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-lg bg-[#07090e] border border-slate-800/80 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400">
                      <span className="font-semibold text-cyan-300">{note.author}</span>
                      <span>{note.time}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Evidence */}
      {activeTab === 'evidence' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white font-display">
                Seized Digital Artifacts for {caseItem.id}
              </h2>
              <p className="text-xs text-slate-400">
                All items secured under write-blocker hardware with verified SHA-256 signatures
              </p>
            </div>

            {!isViewer && (
              <button
                onClick={() => onOpenUploadEvidence(caseItem.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono-code font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Ingest Evidence to Case</span>
              </button>
            )}
          </div>

          <div className="overflow-x-auto rounded-xl bg-[#0c121e] border border-slate-800/80">
            <table className="w-full text-left text-xs font-mono-code">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider bg-[#090e18]">
                  <th className="p-3 font-semibold">Evidence ID</th>
                  <th className="p-3 font-semibold">Filename</th>
                  <th className="p-3 font-semibold">Type</th>
                  <th className="p-3 font-semibold">Size</th>
                  <th className="p-3 font-semibold">SHA-256 Hash</th>
                  <th className="p-3 font-semibold">Integrity</th>
                  <th className="p-3 font-semibold">AI Status</th>
                  <th className="p-3 font-semibold text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {caseEvidence.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3 font-bold text-cyan-400">{ev.id}</td>
                    <td className="p-3 font-semibold text-white">{ev.filename}</td>
                    <td className="p-3 text-slate-300">{ev.type}</td>
                    <td className="p-3 text-slate-400">{ev.fileSize}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="font-mono-code text-[11px] truncate max-w-[140px]">
                          {ev.sha256}
                        </span>
                        <button
                          onClick={() => onCopyHash(ev.sha256)}
                          className="p-1 hover:text-cyan-400 transition-colors text-slate-500"
                          title="Copy SHA-256"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ev.integrity === 'Verified'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        ✓ {ev.integrity}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px]">
                        {ev.aiStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onOpenEvidenceDetail(ev)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-300 text-[11px] transition-colors"
                      >
                        Examine
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Timeline */}
      {activeTab === 'timeline' && (
        <div className="p-5 rounded-xl bg-[#0c121e] border border-slate-800/80">
          <h2 className="text-sm font-semibold text-white font-display mb-4">
            Defensible Forensic Event Timeline
          </h2>
          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {caseItem.timelineEvents?.map((evt, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-cyan-500/20 border-2 border-cyan-400"></div>
                <div className="text-[10px] font-mono-code text-cyan-400 font-semibold mb-0.5">
                  {evt.date}
                </div>
                <div className="text-xs font-semibold text-white">{evt.title}</div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{evt.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: AI Analysis */}
      {activeTab === 'ai-analysis' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#0c121e] border border-purple-500/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                <h2 className="text-sm font-semibold text-white font-display">
                  AI Forensic Intelligence Synthesis
                </h2>
              </div>
              <span className="text-[10px] font-mono-code text-purple-300 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-500/30">
                Gemini 3.8 Flash Engine
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Cross-artifact NLP analysis on Case {caseItem.id} has synthesized high correlation
              between suspect communication records and unauthorized SCADA configuration pushes.
            </p>

            <div className="p-3 rounded-lg bg-[#07090e] border border-slate-800 text-xs font-mono-code text-amber-300/90 mb-4">
              [AI-ASSISTED FORENSIC ANALYSIS - HUMAN INVESTIGATOR REVIEW & COURT VERIFICATION REQUIRED]
            </div>

            <button
              onClick={onOpenAIAnalysis}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono-code font-semibold transition-colors"
            >
              <span>Launch Evidence AI Laboratory</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 5: Chain of Custody */}
      {activeTab === 'custody' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white font-display">
                Custody Chain Logs ({caseCustody.length} Events)
              </h2>
              <p className="text-xs text-slate-400">
                ISO/IEC 27037 compliant chronological ledger of evidentiary custody
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {caseCustody.map((c) => (
              <div
                key={c.id}
                className="p-3.5 rounded-lg bg-[#0c121e] border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono-code"
              >
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <span>{c.action}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-white font-normal">{c.evidenceName}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Officer: <span className="text-slate-200">{c.user}</span> ({c.role}) • Device: {c.deviceInfo}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 truncate max-w-lg">
                    SHA-256 Snapshot: {c.hashSnapshot}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    ✓ {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Audit Log */}
      {activeTab === 'audit' && (
        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800/80">
          <h2 className="text-sm font-semibold text-white font-display mb-3">
            Case Access & Inspection Log
          </h2>
          <div className="space-y-2 font-mono-code text-xs">
            {caseAudit.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-lg bg-[#07090e] border border-slate-800 flex items-center justify-between text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">{log.action}</span>
                  <span className="text-slate-300">{log.user}</span>
                  <span className="text-slate-500">({log.ipAddress})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">{log.timestamp}</span>
                  <span className={`px-1.5 rounded text-[10px] ${
                    log.result === 'SUCCESS' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {log.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Intelligence Graph Links */}
      {activeTab === 'intel' && (
        <div className="p-5 rounded-xl bg-[#0c121e] border border-slate-800/80 text-center">
          <Share2 className="w-10 h-10 mx-auto text-cyan-400 mb-2" />
          <h2 className="text-base font-semibold text-white font-display">
            Crime Intelligence Network Links
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
            Cross-reference suspects, shell companies, and cryptographic wallets associated with {caseItem.name} across other federal investigations.
          </p>
          <button
            onClick={onOpenIntelligenceGraph}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono-code font-semibold transition-colors"
          >
            Launch Interactive Intelligence Graph
          </button>
        </div>
      )}
    </div>
  );
}
