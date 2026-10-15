import React from 'react';
import {
  FolderLock,
  HardDrive,
  Cpu,
  ShieldCheck,
  Share2,
  FileCheck2,
  TrendingUp,
  AlertOctagon,
  ArrowUpRight,
  Plus,
  Search,
  ExternalLink,
  ChevronRight,
  Fingerprint,
  FileSearch,
  Activity,
  Zap,
  Lock
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function DashboardView({
  cases = [],
  evidence = [],
  onOpenCase,
  onOpenCreateCase,
  onOpenUploadEvidence,
  onOpenAIAnalysis,
  currentUser
}) {
  // Analytical Mock Data for Forensic Visualizations
  const ingestionActivityData = [
    { month: 'Apr', ingested: 95, verified: 95, aiProcessed: 88 },
    { month: 'May', ingested: 140, verified: 139, aiProcessed: 130 },
    { month: 'Jun', ingested: 180, verified: 179, aiProcessed: 172 },
    { month: 'Jul', ingested: 220, verified: 218, aiProcessed: 205 },
    { month: 'Aug', ingested: 310, verified: 308, aiProcessed: 295 },
    { month: 'Sep', ingested: 339, verified: 335, aiProcessed: 322 }
  ];

  const caseStatusData = [
    { name: 'Active', value: 16, color: '#06b6d4' }, // Cyan
    { name: 'Under Review', value: 5, color: '#a855f7' }, // Purple
    { name: 'Closed/Archived', value: 3, color: '#10b981' } // Emerald
  ];

  const evidenceTypesData = [
    { type: 'Documents', count: 480, fill: '#38bdf8' },
    { type: 'Disk Images', count: 290, fill: '#06b6d4' },
    { type: 'Surveillance', count: 195, fill: '#818cf8' },
    { type: 'PCAP / Net', count: 142, fill: '#a855f7' },
    { type: 'Mem Dumps', count: 112, fill: '#f43f5e' },
    { type: 'Audio Taps', count: 65, fill: '#eab308' }
  ];

  const aiPipelineData = [
    { stage: 'OCR Extracted', processed: 480, accuracy: '99.4%' },
    { stage: 'NLP Entities', processed: 418, accuracy: '98.2%' },
    { stage: 'ML Classification', processed: 395, accuracy: '97.8%' },
    { stage: 'Anomaly Flagged', processed: 46, accuracy: '94.1%' }
  ];

  // Forensic Telemetry Feeds
  const recentEvents = [
    { time: '10 mins ago', title: 'SHA-256 Checksum Verified', target: 'EV-2026-001284 (suspect_document.pdf)', type: 'hash' },
    { time: '35 mins ago', title: 'Gemini NLP Extraction Completed', target: '5 entities & 1 crypto wallet linked', type: 'ai' },
    { time: '1 hr ago', title: 'Title III Intercept Ingested', target: 'EV-2026-001292 under Case FRX-2026-001', type: 'evidence' },
    { time: '3 hrs ago', title: 'Tamper Anomaly Detected', target: 'EV-2026-001291 (FAT32 timestamp divergence)', type: 'alert' }
  ];

  const isViewer = currentUser?.role === 'VIEWER';

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <h1 className="text-2xl font-bold font-display text-white tracking-wide">
              Investigation Command Center
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time digital evidence integrity, automated AI extraction, and inter-agency crime intelligence.
          </p>
        </div>

        {/* Action Controls (Role-aware) */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            id="dash-run-ai-pipeline-btn"
            onClick={onOpenAIAnalysis}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-colors font-mono-code shadow-sm"
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>AI Forensic Lab</span>
          </button>

          {!isViewer && (
            <>
              <button
                id="dash-ingest-evidence-btn"
                onClick={onOpenUploadEvidence}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors font-mono-code shadow-sm"
              >
                <HardDrive className="w-4 h-4 text-cyan-400" />
                <span>+ Ingest Evidence</span>
              </button>

              <button
                id="dash-create-case-btn"
                onClick={onOpenCreateCase}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-950/60 font-mono-code"
              >
                <Plus className="w-4 h-4" />
                <span>+ New Case Dossier</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Critical Tampering / Integrity Alert Banner */}
      <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 flex items-start gap-3 text-xs">
        <AlertOctagon className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center gap-2 font-bold text-rose-300 font-mono-code">
            <span>CRITICAL TAMPER WARNING</span>
            <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-200 text-[10px]">CASE FRX-2026-004</span>
          </div>
          <p className="text-slate-300 text-[11px] mt-0.5">
            Burner phone backup <span className="text-white font-mono-code">EV-2026-001291</span> exhibits FAT32 directory timestamp divergence. Physical re-acquisition check mandatory under supervisor oversight.
          </p>
        </div>
        <button
          onClick={() => onOpenCase('FRX-2026-004')}
          className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-[11px] font-mono-code font-semibold transition-colors"
        >
          Inspect Artifact
        </button>
      </div>

      {/* KPI Stats Grid (6 Forensic Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Active Cases */}
        <div className="p-3.5 rounded-xl bg-[#0c121e] border border-slate-800/80 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code mb-2">
            <span>ACTIVE CASES</span>
            <FolderLock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white">24</div>
          <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono-code mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+4 this week (3 Critical)</span>
          </div>
        </div>

        {/* Card 2: Total Evidence */}
        <div className="p-3.5 rounded-xl bg-[#0c121e] border border-slate-800/80 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code mb-2">
            <span>EVIDENCE ARTIFACTS</span>
            <HardDrive className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white">1,284</div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono-code mt-1">
            <span>Indexed across 5 vaults</span>
          </div>
        </div>

        {/* Card 3: Pending AI Analysis */}
        <div className="p-3.5 rounded-xl bg-[#0c121e] border border-slate-800/80 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code mb-2">
            <span>AI QUEUE</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-display text-purple-300">37</div>
          <div className="flex items-center gap-1 text-[10px] text-purple-400 font-mono-code mt-1">
            <span>12 High-priority OCR</span>
          </div>
        </div>

        {/* Card 4: Verified Integrity */}
        <div className="p-3.5 rounded-xl bg-[#0c121e] border border-slate-800/80 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code mb-2">
            <span>VERIFIED INTEGRITY</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-display text-emerald-400">99.2%</div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono-code mt-1">
            <span>1,274 SHA-256 Validated</span>
          </div>
        </div>

        {/* Card 5: AI Insights */}
        <div className="p-3.5 rounded-xl bg-[#0c121e] border border-slate-800/80 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code mb-2">
            <span>AI INSIGHTS</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-display text-amber-300">418</div>
          <div className="flex items-center gap-1 text-[10px] text-amber-400 font-mono-code mt-1">
            <span>+28 Cross-case leads</span>
          </div>
        </div>

        {/* Card 6: Chain of Custody */}
        <div className="p-3.5 rounded-xl bg-[#0c121e] border border-slate-800/80 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code mb-2">
            <span>CUSTODY EVENTS</span>
            <FileCheck2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white">3,890</div>
          <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono-code mt-1">
            <span>100% ISO/IEC 27037</span>
          </div>
        </div>
      </div>

      {/* Analytics Visualization Grid (4 Forensic Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Chart 1: Evidence Processing Activity (Line / Area) - 8 cols */}
        <div className="lg:col-span-8 p-4 rounded-xl bg-[#0c121e] border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white font-display">
                Evidence Ingestion & Verification Trend
              </h2>
              <p className="text-[11px] text-slate-400">
                Monthly volume of seized digital artifacts vs. cryptographic verification completion
              </p>
            </div>
            <span className="text-[11px] font-mono-code text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
              Live Ingest Ledger
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ingestionActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ingestGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1424',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#e2e8f0',
                    fontFamily: 'JetBrains Mono'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="ingested" stroke="#06b6d4" strokeWidth={2} fill="url(#ingestGradient)" name="Ingested Artifacts" />
                <Area type="monotone" dataKey="verified" stroke="#10b981" strokeWidth={2} fill="transparent" name="Cryptographically Verified" />
                <Area type="monotone" dataKey="aiProcessed" stroke="#a855f7" strokeWidth={2} fill="url(#aiGradient)" name="AI Analyzed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Case Status Breakdown (Donut) - 4 cols */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-[#0c121e] border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-white font-display">
                Case Status Distribution
              </h2>
              <span className="text-[10px] font-mono-code text-slate-400">24 TOTAL</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">
              Active operational readiness breakdown
            </p>
          </div>

          <div className="h-44 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={caseStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {caseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0c121e" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1424',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#e2e8f0',
                    fontFamily: 'JetBrains Mono'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold font-display text-white">16</span>
              <span className="text-[9px] font-mono-code text-cyan-400 uppercase">Active</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800/60 font-mono-code text-[11px]">
            {caseStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></span>
                  <span>{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Charts Row: Evidence Types & AI Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Chart 3: Evidence Breakdown by Artifact Type (Bar) - 6 cols */}
        <div className="lg:col-span-6 p-4 rounded-xl bg-[#0c121e] border border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-white font-display">
                Evidence Artifact Composition
              </h2>
              <p className="text-[11px] text-slate-400">
                Classification distribution across storage media, captures, and memory dumps
              </p>
            </div>
            <HardDrive className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evidenceTypesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="type" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1424',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#e2e8f0',
                    fontFamily: 'JetBrains Mono'
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {evidenceTypesData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: AI Processing Breakdown & Throughput - 6 cols */}
        <div className="lg:col-span-6 p-4 rounded-xl bg-[#0c121e] border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-white font-display">
                AI Forensic Pipeline Stages
              </h2>
              <span className="text-[10px] font-mono-code text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Automated optical character recognition, NLP entity extraction, and anomaly classification
            </p>
          </div>

          <div className="space-y-2.5">
            {aiPipelineData.map((stage) => (
              <div key={stage.stage} className="p-2.5 rounded-lg bg-[#07090e] border border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">{stage.stage}</span>
                  <div className="flex items-center gap-2 font-mono-code text-[11px]">
                    <span className="text-purple-300 font-bold">{stage.processed} items</span>
                    <span className="text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-500/20 text-[10px]">
                      {stage.accuracy} Conf
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                    style={{ width: `${(stage.processed / 500) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono-code">
            <span>Total Artifacts Extracted: 1,739</span>
            <button 
              onClick={onOpenAIAnalysis}
              className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              <span>Launch Lab</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Cases Table & Live Forensic Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Cases Table - 8 cols */}
        <div className="lg:col-span-8 p-4 rounded-xl bg-[#0c121e] border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white font-display">
                Active Forensic Investigations
              </h2>
              <p className="text-[11px] text-slate-400">
                High-priority criminal dossiers currently under active digital forensic analysis
              </p>
            </div>
            <span className="text-[10px] font-mono-code text-slate-400">Sorted by Priority</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-code">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider">
                  <th className="pb-2.5 font-semibold">Case ID</th>
                  <th className="pb-2.5 font-semibold">Case Name</th>
                  <th className="pb-2.5 font-semibold">Priority</th>
                  <th className="pb-2.5 font-semibold">Lead Investigator</th>
                  <th className="pb-2.5 font-semibold">Evidence</th>
                  <th className="pb-2.5 font-semibold">Threat Score</th>
                  <th className="pb-2.5 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {cases.slice(0, 4).map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="py-3 font-bold text-cyan-400">{c.id}</td>
                    <td className="py-3 max-w-[200px]">
                      <div className="font-semibold text-white truncate">{c.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{c.caseType}</div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.priority === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        c.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300">{c.investigator}</td>
                    <td className="py-3">
                      <span className="text-white font-bold">{c.evidenceCount}</span>
                      <span className="text-slate-500 text-[10px]"> items</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              c.riskScore > 90 ? 'bg-rose-500' :
                              c.riskScore > 75 ? 'bg-amber-400' : 'bg-blue-400'
                            }`}
                            style={{ width: `${c.riskScore}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] text-slate-300">{c.riskScore}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onOpenCase(c.id)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 text-[11px] transition-colors border border-slate-700/60"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Forensic Telemetry Feed - 4 cols */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-[#0c121e] border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-semibold text-white font-display">
                  Live Forensic Telemetry
                </h2>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-mono-code text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Real-time audit events from ingestion bridges and HSM modules
            </p>
          </div>

          <div className="space-y-2.5">
            {recentEvents.map((evt, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-[#07090e] border border-slate-800/80 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono-code mb-1">
                  <span className={`font-semibold ${
                    evt.type === 'alert' ? 'text-rose-400' :
                    evt.type === 'ai' ? 'text-purple-400' :
                    evt.type === 'hash' ? 'text-emerald-400' : 'text-cyan-400'
                  }`}>
                    {evt.title}
                  </span>
                  <span className="text-slate-500">{evt.time}</span>
                </div>
                <div className="text-[11px] text-slate-300 font-mono-code truncate">
                  {evt.target}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] font-mono-code text-slate-500 flex items-center justify-between">
            <span>Cryptographic Chain: DEFENSIVE</span>
            <span className="text-cyan-400">ISO 27037</span>
          </div>
        </div>
      </div>
    </div>
  );
}
