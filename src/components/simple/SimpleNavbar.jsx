import React, { useState, useRef, useEffect } from 'react';
import {
  Shield,
  FolderLock,
  Plus,
  UploadCloud,
  Search,
  CheckCircle2,
  FileText,
  User,
  Layers,
  Sparkles,
  HelpCircle,
  Camera,
  ShieldAlert,
  Bell,
  ChevronDown,
  LogOut,
  UserCheck,
  RefreshCw,
  Key,
  ShieldCheck,
  BadgeAlert
} from 'lucide-react';
import { USERS } from '../../data/forensicData';

export default function SimpleNavbar({
  activeView,
  setActiveView,
  cases = [],
  selectedCaseId,
  onSelectCase,
  currentUser,
  onOpenUpload,
  onOpenNewCase,
  onTriggerPatternCheck,
  onOpenLoginModal,
  onLogout,
  onQuickSwitchUser,
  patternMatchData,
  searchTerm,
  setSearchTerm
}) {
  const selectedCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAdmin = currentUser?.role === 'ADMIN';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Banner & Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900">FOREnX</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                  Forensic Hub
                </span>
                {isAdmin && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1 shadow-2xs">
                    <ShieldCheck className="w-3 h-3 text-purple-600" />
                    Admin Session
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Digital Evidence & Crime Intelligence Network
              </p>
            </div>
          </div>

          {/* Active Case Selector */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200/70 transition-colors p-1.5 px-3 rounded-lg border border-slate-200 text-sm">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Case:</span>
            <select
              value={selectedCaseId}
              onChange={(e) => onSelectCase(e.target.value)}
              className="bg-transparent font-medium text-slate-800 text-sm focus:outline-hidden cursor-pointer max-w-xs truncate"
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id} className="text-slate-900 bg-white">
                  {c.name} ({c.id})
                </option>
              ))}
            </select>
            <span className="text-xs px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200 shrink-0 font-medium">
              {selectedCase?.evidenceCount || 0} files
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative hidden lg:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search files, cases, or notes..."
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-100 hover:bg-slate-150 focus:bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-transparent focus:border-blue-500 focus:outline-hidden transition-all"
            />
          </div>

          {/* Action Buttons & User */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onTriggerPatternCheck}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border rounded-lg shadow-2xs transition-colors cursor-pointer relative ${
                isAdmin
                  ? 'text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200'
                  : 'text-red-700 bg-red-50 hover:bg-red-100 border-red-200'
              }`}
              title={isAdmin ? 'Admin Automated Pattern Correlation Directives' : 'Automated Cross-Case Pattern Match Alerts'}
            >
              <ShieldAlert className={`w-3.5 h-3.5 ${isAdmin ? 'text-purple-600' : 'text-red-600'} animate-pulse`} />
              <span className="hidden sm:inline">
                {isAdmin ? 'Admin Pattern Alert' : 'Pattern Match'}
              </span>
              <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-purple-500' : 'bg-red-500'} animate-ping`}></span>
            </button>

            <button
              onClick={onOpenNewCase}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-600" />
              <span>New Case</span>
            </button>

            <button
              onClick={onOpenUpload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Add File</span>
            </button>

            {/* Explicit Login / Switch Officer Button */}
            <button
              onClick={onOpenLoginModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
              title="Forensic Login & Operator Switcher"
            >
              <Key className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Login / Switch</span>
            </button>

            {/* Interactive Operator Profile Dropdown */}
            <div className="relative pl-2 border-l border-slate-200" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className={`flex items-center gap-2 p-1 rounded-xl transition-all cursor-pointer ${
                  isProfileMenuOpen ? 'bg-slate-100 ring-2 ring-blue-500/20' : 'hover:bg-slate-100'
                }`}
                title="Account, Clearance & Station Security"
              >
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className={`w-8 h-8 rounded-full object-cover border-2 ${
                      isAdmin ? 'border-purple-500' : 'border-blue-500'
                    }`}
                  />
                ) : (
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      isAdmin ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                    }`}
                  >
                    {currentUser?.name?.split(' ')?.map((n) => n[0])?.join('')?.slice(0, 2) || 'OP'}
                  </div>
                )}
                <div className="hidden xl:block text-left leading-tight">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-slate-800">{currentUser?.name || 'Agent Maya'}</p>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        isAdmin ? 'bg-purple-500' : 'bg-blue-500'
                      }`}
                    ></span>
                    {currentUser?.role || 'INVESTIGATOR'}
                  </p>
                </div>
              </button>

              {/* Profile Dropdown Drawer */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 px-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* Operator Header Card */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                        alt={currentUser?.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="font-bold text-sm text-slate-900 truncate">
                            {currentUser?.name}
                          </p>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                              isAdmin
                                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}
                          >
                            {currentUser?.role || 'INVESTIGATOR'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                          {currentUser?.title || 'Forensic Specialist'}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Badge: <span className="font-bold text-slate-700">{currentUser?.badgeNumber || 'FRX-412'}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Security Clearance:</span>
                      <span className="font-bold text-slate-800">{currentUser?.clearanceLevel?.split(' // ')[0] || 'SECRET'}</span>
                    </div>
                  </div>

                  {/* Quick Role Toggles for Easy Testing */}
                  <div className="mb-3 px-1">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Fast Station Switch:
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          onQuickSwitchUser?.(USERS.ADMIN);
                          setIsProfileMenuOpen(false);
                        }}
                        className={`text-left p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isAdmin
                            ? 'bg-purple-50 text-purple-700 border-purple-300 ring-1 ring-purple-300'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span className="truncate">Director (Admin)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onQuickSwitchUser?.(USERS.INVESTIGATOR);
                          setIsProfileMenuOpen(false);
                        }}
                        className={`text-left p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                          !isAdmin && currentUser?.role === 'INVESTIGATOR'
                            ? 'bg-blue-50 text-blue-700 border-blue-300 ring-1 ring-blue-300'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">Maya (Investigator)</span>
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-1 pt-1 border-t border-slate-150">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onOpenLoginModal?.();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <Key className="w-4 h-4 text-slate-500" />
                      <span>Switch Account / Enter Credentials</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onLogout?.();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Lock Workstation / Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Simplified Navigation Bar */}
        <nav className="flex items-center gap-1 sm:gap-2 border-t border-slate-150 pt-2 pb-2 overflow-x-auto">
          {[
            { id: 'cases', label: 'Cases & Projects', icon: FolderLock },
            { id: 'evidence', label: 'Files & Evidence', icon: Layers },
            { id: 'crime-scanner', label: 'Crime Scene Scanner', icon: Camera, badge: 'New AI' },
            { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles, badge: 'Smart' },
            { id: 'reports', label: 'Reports', icon: FileText },
            { id: 'security', label: 'Security & Audit Log', icon: CheckCircle2 },
            { id: 'login', label: 'Auth & Login Terminal', icon: Key, badge: 'Portal' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

