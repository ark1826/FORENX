import React, { useState, useMemo } from 'react';
import {
  Share2,
  Search,
  Filter,
  User,
  FolderLock,
  HardDrive,
  MapPin,
  Building,
  CreditCard,
  Key,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';
import { CRIME_INTEL_GRAPH } from '../data/forensicData';

export default function CrimeIntelligenceView({
  onOpenCase,
  onOpenEvidenceDetail,
  evidence = []
}) {
  const [selectedNodeId, setSelectedNodeId] = useState('p-1'); // Default to Vikram Sharma
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Position nodes mathematically in an attractive command-center radial/bipartite network
  const nodeCoordinates = useMemo(() => {
    const coords = {
      // People (Center-left ring)
      'p-1': { x: 380, y: 220 }, // Vikram Sharma
      'p-2': { x: 520, y: 280 }, // John Doe
      'p-3': { x: 260, y: 380 }, // Elena Rostova
      'p-4': { x: 680, y: 380 }, // Dr. Arthur Pendelton

      // Cases (Top & outer ring)
      'c-1': { x: 280, y: 120 }, // Case 001
      'c-2': { x: 500, y: 120 }, // Case 002
      'c-3': { x: 180, y: 280 }, // Case 003
      'c-4': { x: 740, y: 250 }, // Case 004

      // Evidence
      'e-1': { x: 240, y: 200 }, // suspect_document.pdf
      'e-2': { x: 340, y: 320 }, // device_image.dd
      'e-3': { x: 580, y: 200 }, // transaction_log.txt
      'e-4': { x: 160, y: 440 }, // surveillance_photo.jpg
      'e-5': { x: 440, y: 380 }, // email_archive.eml

      // Locations
      'l-1': { x: 300, y: 460 }, // Kanpur Safehouse
      'l-2': { x: 620, y: 460 }, // Zurich
      'l-3': { x: 120, y: 350 }, // Prague

      // Organizations
      'o-1': { x: 460, y: 480 }, // CipherCorp
      'o-2': { x: 640, y: 160 }, // Apex Global
      'o-3': { x: 140, y: 180 }, // AeroDynamics

      // Accounts / Keys
      'k-1': { x: 420, y: 160 }, // USDT Wallet
      'k-2': { x: 200, y: 100 }  // SCADA Key
    };
    return coords;
  }, []);

  const selectedNode = useMemo(() => {
    return CRIME_INTEL_GRAPH.nodes.find((n) => n.id === selectedNodeId) || CRIME_INTEL_GRAPH.nodes[0];
  }, [selectedNodeId]);

  // Connected edges for the selected node
  const connectedLinks = useMemo(() => {
    return CRIME_INTEL_GRAPH.links.filter(
      (l) => l.source === selectedNodeId || l.target === selectedNodeId
    );
  }, [selectedNodeId]);

  // Connected neighbor nodes
  const neighborNodes = useMemo(() => {
    const neighborIds = new Set();
    connectedLinks.forEach((l) => {
      if (l.source === selectedNodeId) neighborIds.add(l.target);
      if (l.target === selectedNodeId) neighborIds.add(l.source);
    });
    return CRIME_INTEL_GRAPH.nodes.filter((n) => neighborIds.has(n.id));
  }, [connectedLinks, selectedNodeId]);

  // Category Color Map
  const getNodeColor = (type) => {
    switch (type) {
      case 'PERSON':
        return { fill: '#f43f5e', stroke: '#fb7185', text: 'text-rose-400', bg: 'bg-rose-500/20' };
      case 'CASE':
        return { fill: '#3b82f6', stroke: '#60a5fa', text: 'text-blue-400', bg: 'bg-blue-500/20' };
      case 'EVIDENCE':
        return { fill: '#06b6d4', stroke: '#22d3ee', text: 'text-cyan-400', bg: 'bg-cyan-500/20' };
      case 'LOCATION':
        return { fill: '#10b981', stroke: '#34d399', text: 'text-emerald-400', bg: 'bg-emerald-500/20' };
      case 'ORGANIZATION':
        return { fill: '#a855f7', stroke: '#c084fc', text: 'text-purple-400', bg: 'bg-purple-500/20' };
      case 'ACCOUNT':
      case 'KEYWORD':
        return { fill: '#f59e0b', stroke: '#fbbf24', text: 'text-amber-400', bg: 'bg-amber-500/20' };
      default:
        return { fill: '#64748b', stroke: '#94a3b8', text: 'text-slate-400', bg: 'bg-slate-500/20' };
    }
  };

  const filteredNodes = useMemo(() => {
    return CRIME_INTEL_GRAPH.nodes.filter((n) => {
      const matchesCategory = categoryFilter === 'ALL' || n.category === categoryFilter;
      const matchesSearch =
        n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.details?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold font-display text-white tracking-wide">
              Cross-Case Crime Intelligence Graph
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Connect evidence across cases to reveal hidden criminal syndicates, money trails, and recurring actors.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2.5 flex-wrap text-[10px] font-mono-code">
          <span className="flex items-center gap-1 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> People
          </span>
          <span className="flex items-center gap-1 text-blue-400">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Cases
          </span>
          <span className="flex items-center gap-1 text-cyan-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Evidence
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Locations
          </span>
          <span className="flex items-center gap-1 text-purple-400">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Organizations
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Crypto / Keys
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 rounded-xl bg-[#0c121e] border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-code">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entities, suspects, or organizations..."
            className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-[#07090e] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1 flex-wrap bg-[#07090e] p-1 rounded-lg border border-slate-800">
          {['ALL', 'People', 'Cases', 'Evidence', 'Locations', 'Organizations', 'Accounts'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                categoryFilter === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Graph + Side Dossier Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Graph Canvas Stage (8 cols) */}
        <div className="lg:col-span-8 rounded-xl bg-[#07090e] border border-slate-800 relative overflow-hidden h-[540px] flex flex-col justify-between bg-radar-grid">
          {/* Canvas Floating Controls */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#0c121e]/90 backdrop-blur p-1 rounded-lg border border-slate-800 text-slate-400 font-mono-code text-[11px]">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.6))}
              className="p-1 hover:text-white hover:bg-slate-800 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.7))}
              className="p-1 hover:text-white hover:bg-slate-800 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 hover:text-white hover:bg-slate-800 rounded"
              title="Reset View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-cyan-400 font-semibold">{Math.round(zoomLevel * 100)}%</span>
          </div>

          <div className="absolute top-3 right-3 z-10 text-[10px] font-mono-code text-slate-500 bg-[#0c121e]/80 px-2 py-1 rounded border border-slate-800">
            Click any node to inspect relationship dossier
          </div>

          {/* SVG Graph Visualization */}
          <div className="w-full h-full overflow-hidden flex items-center justify-center">
            <svg
              viewBox="0 0 860 560"
              className="w-full h-full transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Defs for gradients & glow */}
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Link Lines */}
              {CRIME_INTEL_GRAPH.links.map((link, idx) => {
                const sourceCoord = nodeCoordinates[link.source] || { x: 400, y: 250 };
                const targetCoord = nodeCoordinates[link.target] || { x: 450, y: 300 };
                const isConnectedToSelected =
                  link.source === selectedNodeId || link.target === selectedNodeId;

                return (
                  <g key={idx}>
                    <line
                      x1={sourceCoord.x}
                      y1={sourceCoord.y}
                      x2={targetCoord.x}
                      y2={targetCoord.y}
                      stroke={isConnectedToSelected ? '#22d3ee' : '#1e293b'}
                      strokeWidth={isConnectedToSelected ? 2 : 1}
                      strokeDasharray={isConnectedToSelected ? 'none' : '2,2'}
                      className="transition-colors duration-200"
                    />
                    {isConnectedToSelected && (
                      <text
                        x={(sourceCoord.x + targetCoord.x) / 2}
                        y={(sourceCoord.y + targetCoord.y) / 2 - 4}
                        fill="#67e8f9"
                        fontSize="9"
                        fontFamily="JetBrains Mono"
                        textAnchor="middle"
                        className="pointer-events-none select-none"
                      >
                        {link.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {CRIME_INTEL_GRAPH.nodes.map((node) => {
                const coord = nodeCoordinates[node.id] || { x: 400, y: 250 };
                const isSelected = node.id === selectedNodeId;
                const colors = getNodeColor(node.type);

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className="cursor-pointer group"
                  >
                    {/* Outer Selection Halo */}
                    {isSelected && (
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r={22}
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth={2}
                        strokeDasharray="4,2"
                        className="animate-spin origin-center"
                        style={{ transformOrigin: `${coord.x}px ${coord.y}px` }}
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isSelected ? 16 : 12}
                      fill={colors.fill}
                      stroke={colors.stroke}
                      strokeWidth={2}
                      filter={isSelected ? 'url(#glow)' : undefined}
                      className="transition-all duration-200 group-hover:r-[16px]"
                    />

                    {/* Node Label Text */}
                    <text
                      x={coord.x}
                      y={coord.y + (isSelected ? 26 : 22)}
                      fill={isSelected ? '#ffffff' : '#94a3b8'}
                      fontSize={isSelected ? '11' : '9.5'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="JetBrains Mono"
                      textAnchor="middle"
                      className="pointer-events-none select-none drop-shadow"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Banner */}
          <div className="p-3 bg-[#0c121e]/90 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
            <span className="text-cyan-400">
              Active Focus: {selectedNode.label} ({selectedNode.type})
            </span>
            <span className="text-slate-500">
              Connections: {connectedLinks.length} Direct Edges
            </span>
          </div>
        </div>

        {/* Right: Selected Node Dossier & Link Pivot (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-xl bg-[#0c121e] border border-slate-800/80 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono-code text-slate-400 uppercase font-semibold">
                Entity Intelligence Dossier
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                  getNodeColor(selectedNode.type).bg
                } ${getNodeColor(selectedNode.type).text}`}
              >
                {selectedNode.type}
              </span>
            </div>

            {/* Entity Title & Details */}
            <div>
              <h2 className="text-lg font-bold text-white font-display">
                {selectedNode.label}
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {selectedNode.details}
              </p>
            </div>

            {/* Threat Risk Score (if person) */}
            {selectedNode.riskScore && (
              <div className="p-3 rounded-lg bg-[#07090e] border border-slate-800 space-y-1.5 font-mono-code text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Synthesized Threat Rating:</span>
                  <span className="text-rose-400 font-bold">{selectedNode.riskScore}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full"
                    style={{ width: `${selectedNode.riskScore}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Associated Cases */}
            {selectedNode.cases && selectedNode.cases.length > 0 && (
              <div className="space-y-1.5 font-mono-code text-xs">
                <div className="text-[10px] text-slate-500 uppercase">Associated Case Files</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.cases.map((cId) => (
                    <button
                      key={cId}
                      onClick={() => onOpenCase(cId)}
                      className="px-2 py-1 rounded bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <span>{cId}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Relationship Links */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono-code text-slate-400 uppercase">
                Direct Forensic Links ({neighborNodes.length})
              </div>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {neighborNodes.map((n) => {
                  const link = connectedLinks.find(
                    (l) =>
                      (l.source === selectedNodeId && l.target === n.id) ||
                      (l.target === selectedNodeId && l.source === n.id)
                  );
                  return (
                    <div
                      key={n.id}
                      onClick={() => setSelectedNodeId(n.id)}
                      className="p-2 rounded-lg bg-[#07090e] hover:bg-slate-800/60 border border-slate-800 flex items-center justify-between text-xs font-mono-code cursor-pointer transition-colors group"
                    >
                      <div className="truncate">
                        <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {n.label}
                        </div>
                        <div className="text-[9px] text-cyan-400 truncate">
                          {link?.label || 'Related to'}
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Pivot */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                if (selectedNode.cases && selectedNode.cases.length > 0) {
                  onOpenCase(selectedNode.cases[0]);
                }
              }}
              className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono-code text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Pivot to Target Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Intelligence Signals & Lead Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Signal 1: Recurring Suspect */}
        <div className="p-4 rounded-xl bg-[#0c121e] border border-cyan-500/30 space-y-2 text-xs">
          <div className="flex items-center justify-between font-mono-code">
            <span className="text-cyan-400 font-bold">RECURRING SIGNAL #01</span>
            <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[10px]">
              2 CASES LINKED
            </span>
          </div>
          <h3 className="font-semibold text-white font-display">
            Subject Vikram Sharma
          </h3>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Identified as signed authorizer in SCADA intrusion (<span className="text-cyan-300 font-mono-code">FRX-2026-001</span>) and beneficiary in Zurich cryptocurrency laundering ledger (<span className="text-cyan-300 font-mono-code">FRX-2026-002</span>).
          </p>
        </div>

        {/* Signal 2: Common Location */}
        <div className="p-4 rounded-xl bg-[#0c121e] border border-emerald-500/30 space-y-2 text-xs">
          <div className="flex items-center justify-between font-mono-code">
            <span className="text-emerald-400 font-bold">SHARED PHYSICAL NEXUS</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
              3 DEVICES
            </span>
          </div>
          <h3 className="font-semibold text-white font-display">
            Kanpur Safehouse Sector 4
          </h3>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            GPS cache recovered from Samsung S23 matches physical staging site for seized field laptops and offshore shell incorporation documents.
          </p>
        </div>

        {/* Signal 3: Financial Tracing */}
        <div className="p-4 rounded-xl bg-[#0c121e] border border-amber-500/30 space-y-2 text-xs">
          <div className="flex items-center justify-between font-mono-code">
            <span className="text-amber-400 font-bold">CRYPTO ESCROW TRACE</span>
            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px]">
              $4.25M FLAGGED
            </span>
          </div>
          <h3 className="font-semibold text-white font-display">
            0x71C...4e8 (USDT Cold Wallet)
          </h3>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Mixer peeled outputs confirmed funding real-estate purchases under shell company Apex Global Assets in Zurich financial district.
          </p>
        </div>
      </div>

      {/* Planned Advanced Features Roadmap */}
      <div className="p-4 rounded-xl bg-[#07090e] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-code">
        <div className="flex items-center gap-2 text-slate-400">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>ADVANCED PLATFORM CAPABILITIES:</span>
          <span className="text-purple-300">Interpol Syndicate Automated Sync [Planned Q1 2027]</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-300">GNN Predictive Threat Modeling [Beta]</span>
        </div>
        <span className="text-[10px] text-slate-500 uppercase">ISO/IEC 27037 Compliant Node Graph</span>
      </div>
    </div>
  );
}
