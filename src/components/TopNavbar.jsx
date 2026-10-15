import React, { useState } from 'react';
import {
  Search,
  Bell,
  FolderLock,
  ShieldAlert,
  CheckCircle,
  Users,
  ChevronDown,
  Terminal,
  Activity,
  AlertTriangle,
  X
} from 'lucide-react';

import { INITIAL_USERS } from '../data/forensicData';

export default function TopNavbar({
  currentView,
  activeView,
  cases = [],
  activeCaseId,
  selectedCaseId,
  onSelectCase,
  currentUser,
  onChangeRole,
  onSelectUser,
  allUsers = INITIAL_USERS,
  onOpenNotifications,
  unreadNotificationsCount = 0,
  searchQuery = '',
  setSearchQuery,
  onOpenNewCaseModal,
  onOpenCreateCase,
  onOpenUploadEvidenceModal,
  onOpenUploadEvidence,
  onExportReport
}) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showCaseDropdown, setShowCaseDropdown] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const effectiveView = currentView || activeView || 'dashboard';
  const effectiveCaseId = activeCaseId || selectedCaseId;
  const effectiveUsers = allUsers && allUsers.length > 0 ? allUsers : INITIAL_USERS;

  const handleRoleChange = (user) => {
    if (typeof onChangeRole === 'function') onChangeRole(user);
    if (typeof onSelectUser === 'function') onSelectUser(user);
  };

  const handleSearchChange = (val) => {
    setLocalSearch(val);
    if (typeof setSearchQuery === 'function') setSearchQuery(val);
  };

  const viewTitles = {
    dashboard: 'Forensic Command Center',
    cases: 'Case Management Dossiers',
    'case-details': 'Case Investigation Deep Dive',
    evidence: 'Cryptographic Evidence Repository',
    'ai-analysis': 'AI Forensic Analytics & NLP Lab',
    intelligence: 'Cross-Case Crime Intelligence Graph',
    custody: 'ISO/IEC 27037 Chain of Custody',
    audit: 'Immutable Security Audit Ledger',
    reports: 'Forensic Evidentiary Reports',
    settings: 'System Security & Role-Based Access'
  };

  const selectedCase = cases.find((c) => c.id === effectiveCaseId);

  return (
    <header className="h-16 bg-[#0a0f1b]/95 backdrop-blur border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: View Title & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono-code text-slate-500 uppercase tracking-wider">SEC//OP</span>
          <span className="text-slate-600">/</span>
          <h1 className="text-sm font-semibold text-white truncate font-display tracking-wide">
            {viewTitles[effectiveView] || 'Forensic Command Center'}
          </h1>
        </div>

        {selectedCase && (
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 font-mono-code">
            <FolderLock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold">{selectedCase.id}</span>
            <span className="text-slate-500">•</span>
            <span className="truncate max-w-[160px] text-slate-300">{selectedCase.name}</span>
          </div>
        )}
      </div>

      {/* Center: Global Forensic Search Input */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="global-forensic-search"
            value={searchQuery !== undefined ? searchQuery : localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by case, evidence ID, SHA-256 hash, or suspect..."
            className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-[#07090e] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono-code"
          />
          {(searchQuery || localSearch) && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Case Selector, Role Demo Switcher, Notification & Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Case Selector */}
        <div className="relative">
          <button
            id="top-case-selector-btn"
            onClick={() => {
              setShowCaseDropdown(!showCaseDropdown);
              setShowRoleDropdown(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0c121e] border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors font-mono-code"
          >
            <FolderLock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">
              {selectedCase ? selectedCase.id : 'All Cases'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {showCaseDropdown && (
            <div className="absolute right-0 mt-2 w-64 rounded-lg bg-[#0d1424] border border-slate-800 shadow-2xl p-2 z-50 text-xs font-mono-code">
              <div className="px-2 py-1 text-[10px] text-slate-400 uppercase font-semibold border-b border-slate-800/80 mb-1">
                Select Active Case
              </div>
              <button
                onClick={() => {
                  onSelectCase(null);
                  setShowCaseDropdown(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800/60 transition-colors flex items-center justify-between ${
                  !activeCaseId ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-300'
                }`}
              >
                <span>View All Cases</span>
                {!activeCaseId && <span className="text-[10px]">Active</span>}
              </button>
              {cases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCase(c.id);
                    setShowCaseDropdown(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800/60 transition-colors flex flex-col ${
                    activeCaseId === c.id ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span>{c.id}</span>
                    <span className={`text-[10px] ${
                      c.priority === 'Critical' ? 'text-rose-400' : 'text-amber-400'
                    }`}>{c.priority}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">{c.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Role Switcher (Crucial for RBAC testing!) */}
        <div className="relative">
          <button
            id="role-switcher-btn"
            onClick={() => {
              setShowRoleDropdown(!showRoleDropdown);
              setShowCaseDropdown(false);
            }}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-mono-code transition-all ${
              currentUser?.role === 'ADMIN'
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                : currentUser?.role === 'INVESTIGATOR'
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                : 'bg-slate-800/40 border-slate-700/60 text-slate-300'
            }`}
            title="Switch roles to test Role-Based Access Control (RBAC)"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="font-bold">{currentUser?.role}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-72 rounded-lg bg-[#0d1424] border border-slate-800 shadow-2xl p-2.5 z-50 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="font-mono-code text-[10px] text-slate-400 uppercase font-semibold">
                  RBAC Role Simulator
                </span>
                <span className="text-[10px] text-cyan-400 font-mono-code">1-Click Switch</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-2">
                Simulate different clearance levels to verify strict permission enforcement.
              </p>
              <div className="space-y-1.5">
                {effectiveUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      handleRoleChange(u);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full p-2 rounded-lg text-left transition-all flex items-center justify-between ${
                      currentUser?.id === u.id
                        ? 'bg-cyan-950/40 border border-cyan-500/40 text-cyan-200'
                        : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs flex items-center gap-1.5">
                        <span>{u.name}</span>
                        <span className={`text-[9px] font-mono-code px-1 rounded ${
                          u.role === 'ADMIN' ? 'bg-rose-500/20 text-rose-300' :
                          u.role === 'INVESTIGATOR' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-slate-700/40 text-slate-300'
                        }`}>
                          {u.role}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">{u.title}</div>
                    </div>
                    {currentUser?.id === u.id && (
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <button
          id="top-notifications-btn"
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors border border-slate-800/80"
          title="Security Notifications & Critical Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {unreadNotificationsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
