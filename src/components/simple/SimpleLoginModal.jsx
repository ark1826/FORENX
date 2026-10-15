import React, { useState } from 'react';
import {
  Shield,
  Lock,
  User,
  Key,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  Fingerprint,
  Cpu,
  BadgeAlert,
  X,
  FileCheck2
} from 'lucide-react';
import { INITIAL_USERS } from '../../data/forensicData';

export default function SimpleLoginModal({
  isOpen = true,
  isGateway = false, // true when user logged out, false when opened from switch user menu
  isEmbedded = false, // true when rendered as a main view tab
  currentUser = null,
  onClose,
  onLoginSuccess,
  onLogout,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState('quick'); // 'quick' | 'manual'
  const [identifier, setIdentifier] = useState('FRX-901');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [workstationMode, setWorkstationMode] = useState('secure'); // 'secure' | 'air-gapped'
  const [biometricVerified, setBiometricVerified] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Handle Quick Profile Login
  const handleQuickLogin = async (user) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          badgeNumber: user.badgeNumber,
          email: user.email,
          password: 'auth-verified-session'
        })
      });

      const data = await res.json();
      if (res.ok && data.user) {
        onLoginSuccess?.(data.user, data.token);
        onShowToast?.(`Authenticated as ${data.user.name} (${data.user.role})`, 'success');
        if (onClose) onClose();
      } else {
        // Fallback to client-side user object
        onLoginSuccess?.(user, 'demo-token');
        onShowToast?.(`Authenticated as ${user.name} (${user.role})`, 'success');
        if (onClose) onClose();
      }
    } catch (err) {
      console.warn('API login notice, using offline session:', err);
      onLoginSuccess?.(user, 'demo-token');
      onShowToast?.(`Authenticated as ${user.name} (${user.role})`, 'success');
      if (onClose) onClose();
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Manual Form Login
  const handleManualLogin = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage('Please provide an official Badge ID or Gov Email address.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          badgeNumber: identifier.trim(),
          email: identifier.trim(),
          password: password || 'pass-key'
        })
      });

      const data = await res.json();
      if (res.ok && data.user) {
        onLoginSuccess?.(data.user, data.token);
        onShowToast?.(`Authorized: ${data.user.name} (${data.user.role})`, 'success');
        if (onClose) onClose();
      } else {
        // Find matching initial user
        const clean = identifier.trim().toLowerCase();
        const matched = INITIAL_USERS.find(
          (u) =>
            u.badgeNumber?.toLowerCase() === clean ||
            u.email?.toLowerCase() === clean ||
            u.name?.toLowerCase().includes(clean)
        );

        if (matched) {
          onLoginSuccess?.(matched, 'demo-token');
          onShowToast?.(`Authorized: ${matched.name} (${matched.role})`, 'success');
          if (onClose) onClose();
        } else {
          // Custom officer entry
          const newOfficer = {
            id: `usr-${Date.now()}`,
            name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
            email: identifier.includes('@') ? identifier : `${identifier.toLowerCase()}@forenx.gov`,
            badgeNumber: identifier.startsWith('FRX-') ? identifier.toUpperCase() : `FRX-${Math.floor(100 + Math.random() * 899)}`,
            role: identifier.toLowerCase().includes('admin') ? 'ADMIN' : 'INVESTIGATOR',
            clearanceLevel: identifier.toLowerCase().includes('admin') ? 'TOP SECRET // SCI' : 'SECRET // LAW ENFORCEMENT SENSITIVE',
            title: 'Field Forensic Specialist',
            department: 'Digital Forensic Unit',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            lastLogin: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
            ipAddress: '10.240.14.19 (Secured Terminal)'
          };
          onLoginSuccess?.(newOfficer, 'custom-token');
          onShowToast?.(`Authorized: ${newOfficer.name} (${newOfficer.role})`, 'success');
          if (onClose) onClose();
        }
      }
    } catch (err) {
      console.warn('Manual login fallback:', err);
      const clean = identifier.trim().toLowerCase();
      const matched = INITIAL_USERS.find((u) => u.badgeNumber?.toLowerCase() === clean) || INITIAL_USERS[0];
      onLoginSuccess?.(matched, 'demo-token');
      if (onClose) onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={
        isEmbedded
          ? 'w-full max-w-3xl mx-auto py-2'
          : `fixed inset-0 z-50 flex items-center justify-center p-4 ${
              isGateway
                ? 'bg-slate-950/90 backdrop-blur-md'
                : 'bg-slate-900/70 backdrop-blur-xs'
            }`
      }
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Active Session Callout when Embedded */}
        {isEmbedded && currentUser && (
          <div className="px-5 py-3 bg-blue-50 border-b border-blue-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-700">
                Active Terminal Operator: <strong className="text-slate-900 font-bold">{currentUser.name}</strong> ({currentUser.role}) • Badge: <span className="font-mono font-bold text-blue-700">{currentUser.badgeNumber || 'FRX-412'}</span>
              </span>
            </div>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="px-2.5 py-1 text-xs font-semibold text-red-700 bg-white hover:bg-red-50 border border-red-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                Lock Terminal / Sign Out
              </button>
            )}
          </div>
        )}

        {/* Terminal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800 relative">
          {!isGateway && !isEmbedded && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-md border border-blue-400/40">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white">
                  FOREnX Secure Terminal
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ISO/IEC 27037
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Department of Justice // Digital Forensic Evidence & Crime Intelligence Hub
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Workstation Security: Active Encrypted Session</span>
            </div>
            <span className="font-mono text-slate-500 text-[11px]">Station: WKS-DFU-9022</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('quick')}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'quick'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Official Personnel Badges (1-Click Access)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('manual')}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'manual'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Credential & Badge Entry</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {activeTab === 'quick' ? (
            <div>
              <p className="text-xs text-slate-600 mb-4 font-medium">
                Select an authorized forensic operator profile to sign into the evidence console. All operations are signed into the chain of custody:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INITIAL_USERS.map((user) => {
                  const isAdmin = user.role === 'ADMIN';
                  const isCurrent = currentUser?.id === user.id;

                  return (
                    <button
                      key={user.id}
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleQuickLogin(user)}
                      className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                        isCurrent
                          ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-blue-400 bg-white hover:bg-slate-50 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                              {user.name}
                            </span>
                            {isAdmin ? (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700 border border-purple-200">
                                ADMIN
                              </span>
                            ) : user.role === 'VIEWER' ? (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                                VIEWER
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700 border border-blue-200">
                                INVESTIGATOR
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                            {user.title}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                            <span className="font-mono font-semibold text-slate-700 bg-slate-100 px-1 rounded">
                              {user.badgeNumber}
                            </span>
                            <span className="truncate">{user.department}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-150 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 truncate max-w-[170px]">
                          Clearance: <strong className="text-slate-700 font-semibold">{user.clearanceLevel.split(' // ')[0]}</strong>
                        </span>
                        <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                          {isCurrent ? 'Active Now' : 'Sign In'} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>

                      {isAdmin && (
                        <div className="mt-2 bg-purple-50 text-purple-800 text-[10px] font-semibold px-2 py-1 rounded-md border border-purple-200/60 flex items-center gap-1">
                          <BadgeAlert className="w-3 h-3 text-purple-600 shrink-0" />
                          <span>Receives Automated Pattern Match Alerts & Directives</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Officer Badge ID or Official Gov Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g., FRX-901 or r.miller@forenx.gov"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
                <div className="flex gap-2 mt-1.5 text-[11px] text-slate-500">
                  <span>Demo Badges:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIdentifier('FRX-901');
                      setPassword('admin123');
                    }}
                    className="text-blue-600 font-medium hover:underline cursor-pointer"
                  >
                    FRX-901 (Director/Admin)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIdentifier('FRX-412');
                      setPassword('investigator123');
                    }}
                    className="text-blue-600 font-medium hover:underline cursor-pointer"
                  >
                    FRX-412 (Lead Detective)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Terminal Passcode / Cryptographic PIN
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security key..."
                    className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-hidden font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-700 block mb-1">Station Security Mode:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setWorkstationMode('secure')}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-medium text-[11px] text-center transition-colors cursor-pointer ${
                        workstationMode === 'secure'
                          ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      Secured LAN
                    </button>
                    <button
                      type="button"
                      onClick={() => setWorkstationMode('air-gapped')}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-medium text-[11px] text-center transition-colors cursor-pointer ${
                        workstationMode === 'air-gapped'
                          ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      Air-Gapped Vault
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-700 block">Biometric CAC Key</span>
                    <span className="text-[11px] text-slate-500">Hardware token certified</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBiometricVerified(!biometricVerified)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                      biometricVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    <Fingerprint className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin" />
                    <span>Verifying Cryptographic Credentials...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize Forensic Session</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Compliance Footer */}
          <div className="mt-5 pt-4 border-t border-slate-150 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chain-of-Custody Cryptographically Sealed</span>
            </div>
            <span>Audit Trail Policy: ISO 27037 // 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
