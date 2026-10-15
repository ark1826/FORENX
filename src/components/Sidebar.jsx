import React from 'react';
import {
  Shield,
  LayoutDashboard,
  FolderLock,
  HardDrive,
  Cpu,
  Share2,
  FileCheck2,
  History,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Fingerprint,
  CheckCircle2,
  AlertTriangle,
  Lock
} from 'lucide-react';

export default function Sidebar({
  currentView,
  activeView,
  setCurrentView,
  onNavigate,
  currentUser,
  activeCase,
  casesCount,
  totalCases,
  evidenceCount,
  totalEvidence,
  onLogout,
  onOpenCase,
  alertsCount
}) {
  const selectedView = currentView || activeView || 'dashboard';

  const handleNavigate = (viewId) => {
    // Map intelligence to intel-graph if needed
    const target = viewId === 'intelligence' ? 'intel-graph' : viewId;
    if (typeof setCurrentView === 'function') {
      setCurrentView(target);
    }
    if (typeof onNavigate === 'function') {
      onNavigate(target);
    }
  };

  const effectiveCasesCount = casesCount ?? totalCases ?? 5;
  const effectiveEvidenceCount = evidenceCount ?? totalEvidence ?? 9;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Command Center',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'cases',
      label: 'Cases',
      icon: FolderLock,
      badge: effectiveCasesCount
    },
    {
      id: 'evidence',
      label: 'Evidence Vault',
      icon: HardDrive,
      badge: effectiveEvidenceCount
    },
    {
      id: 'ai-analysis',
      label: 'AI Forensic Lab',
      icon: Cpu,
      badge: 'AI',
      badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
    },
    {
      id: 'intelligence',
      label: 'Crime Intelligence',
      icon: Share2,
      badge: 'Graph',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
    },
    {
      id: 'custody',
      label: 'Chain of Custody',
      icon: FileCheck2,
      badge: 'ISO'
    },
    {
      id: 'audit',
      label: 'Audit Trail',
      icon: History,
      badge: null
    },
    {
      id: 'reports',
      label: 'Court Reports',
      icon: FileText,
      badge: null
    },
    {
      id: 'settings',
      label: 'Security & RBAC',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0c121e] border-r border-slate-800/80 flex flex-col justify-between h-screen select-none">
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl tracking-wider text-white">FOREnX</span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono-code font-semibold rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  v3.8
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                Forensic Command Platform
              </p>
            </div>
          </div>

          {/* System Security Pill */}
          <div className="mt-3 px-2.5 py-1.5 rounded-md bg-[#07090e] border border-slate-800 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono-code">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>TLS 1.3 SECURE</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono-code">FIPS 140-2</span>
          </div>
        </div>

        {/* Active Case Banner (if selected) */}
        {activeCase && (
          <div 
            onClick={() => {
              if (typeof onOpenCase === 'function') {
                onOpenCase(activeCase.id);
              } else {
                handleNavigate('case-details');
              }
            }}
            className="mx-3 mt-3 p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 cursor-pointer hover:bg-cyan-950/60 transition-colors group"
          >
            <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono-code mb-1">
              <span>ACTIVE INVESTIGATION</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="font-medium text-xs text-white truncate">{activeCase.name}</div>
            <div className="text-[11px] text-slate-400 font-mono-code">{activeCase.id}</div>
          </div>
        )}

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          <div className="px-2 py-1 text-[10px] font-mono-code uppercase tracking-wider text-slate-500 font-semibold">
            Core Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              selectedView === item.id ||
              (item.id === 'intelligence' && selectedView === 'intel-graph') ||
              (item.id === 'cases' && selectedView === 'case-details');
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-950/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono-code font-semibold ${
                      item.badgeColor || 'bg-slate-800 text-slate-300 border border-slate-700/60'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Area: Forensic Integrity & User Profile */}
      <div className="p-3 border-t border-slate-800/80 bg-[#090e18]">
        {/* Hash Engine Active Pill */}
        <div className="px-2.5 py-2 rounded-md bg-[#07090e] border border-slate-800/80 mb-3">
          <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 mb-1">
            <span className="flex items-center gap-1 text-cyan-400">
              <Fingerprint className="w-3 h-3 text-cyan-400" />
              HASH ENGINE
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" /> SHA-256
            </span>
          </div>
          <div className="text-[9px] font-mono-code text-slate-500 truncate">
            Ledger Root: 7a8f...904b
          </div>
        </div>

        {/* Current User Card */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full object-cover border border-cyan-500/40"
            />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">{currentUser?.name}</div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[9px] font-mono-code font-bold px-1 rounded ${
                  currentUser?.role === 'ADMIN'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : currentUser?.role === 'INVESTIGATOR'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-slate-700/40 text-slate-300 border border-slate-600/30'
                }`}>
                  {currentUser?.role}
                </span>
                <span className="text-[10px] font-mono-code text-slate-500">{currentUser?.badgeNumber}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Sign out of command session"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
