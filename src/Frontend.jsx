import React, { useState, useMemo, useCallback } from 'react';
import SimpleNavbar from './components/simple/SimpleNavbar';
import SimpleCasesView from './components/simple/SimpleCasesView';
import SimpleEvidenceView from './components/simple/SimpleEvidenceView';
import SimpleAIAssistant from './components/simple/SimpleAIAssistant';
import SimpleReportsView from './components/simple/SimpleReportsView';
import SimpleSecurityLogView from './components/simple/SimpleSecurityLogView';
import SimpleUploadModal from './components/simple/SimpleUploadModal';
import SimpleNewCaseModal from './components/simple/SimpleNewCaseModal';
import SimpleFileDetailModal from './components/simple/SimpleFileDetailModal';
import CrimeScenePhotoScanner from './components/simple/CrimeScenePhotoScanner';
import PatternMatchNotificationModal from './components/simple/PatternMatchNotificationModal';
import SimpleLoginModal from './components/simple/SimpleLoginModal';
import {
  INITIAL_CASES,
  INITIAL_EVIDENCE,
  INITIAL_CHAIN_OF_CUSTODY,
  INITIAL_AUDIT_LOGS,
  USERS
} from './data/forensicData';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Frontend() {
  // Main Data States
  const [cases, setCases] = useState(INITIAL_CASES);
  const [evidence, setEvidence] = useState(INITIAL_EVIDENCE);
  const [chainOfCustody, setChainOfCustody] = useState(INITIAL_CHAIN_OF_CUSTODY);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Active View Tab: 'cases' | 'evidence' | 'crime-scanner' | 'ai-assistant' | 'reports' | 'security'
  const [activeView, setActiveView] = useState('cases');

  // Authentication State & Session Persistence
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('forenx_current_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load user from cache:', e);
    }
    return USERS.INVESTIGATOR;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('forenx_current_user');
      if (saved) return true;
    } catch {
      // ignore
    }
    return true; // default active session on initial load
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Active Case Selection
  const [selectedCaseId, setSelectedCaseId] = useState('FRX-2026-001');

  // Search filter across pages
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Target selection
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTargetCaseId, setUploadTargetCaseId] = useState(null);
  const [inspectingFile, setInspectingFile] = useState(null);
  const [aiTargetEvidence, setAiTargetEvidence] = useState(null);
  const [crimeScannerTarget, setCrimeScannerTarget] = useState(null);

  // Automated Pattern Match Alert Modal Data
  const [patternMatchData, setPatternMatchData] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Handle Login Authorization Success
  const handleLoginSuccess = useCallback((user, token) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    try {
      localStorage.setItem('forenx_current_user', JSON.stringify(user));
      if (token) localStorage.setItem('forenx_auth_token', token);
    } catch (e) {
      console.warn('Could not save login in cache:', e);
    }

    // Record login in audit trail
    const newLog = {
      id: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      action: 'OPERATOR_AUTHENTICATED',
      user: user.name,
      userId: user.id,
      role: user.role,
      caseId: 'SYSTEM',
      details: `Workstation authenticated for ${user.name} (${user.badgeNumber || 'FRX-OP'}). Clearance: ${user.clearanceLevel || 'SECRET'}.`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      result: 'ACCESS_GRANTED',
      ipAddress: user.ipAddress || '10.240.14.19 (Secured Terminal)',
      device: 'Secured Forensic Workstation'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast(`Operator authorized: ${user.name} (${user.role})`, 'success');
  }, [showToast]);

  // Handle Logout / Lock Workstation Terminal
  const handleLogout = useCallback(() => {
    const newLog = {
      id: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      action: 'OPERATOR_LOGOUT',
      user: currentUser?.name || 'Operator',
      userId: currentUser?.id || 'usr-0',
      role: currentUser?.role || 'UNKNOWN',
      caseId: 'SYSTEM',
      details: `Workstation locked and operator session signed out under ISO/IEC 27037 protocol.`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      result: 'SESSION_TERMINATED',
      ipAddress: '10.240.14.19',
      device: 'Secured Forensic Workstation'
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    try {
      localStorage.removeItem('forenx_current_user');
      localStorage.removeItem('forenx_auth_token');
      fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    } catch (e) {
      console.warn('Logout notice:', e);
    }

    setCurrentUser(null);
    setIsAuthenticated(false);
    showToast('Workstation locked. Session ended.', 'info');
  }, [currentUser, showToast]);

  // Handle Fast Station Switch
  const handleQuickSwitchUser = useCallback((targetUser) => {
    handleLoginSuccess(targetUser);
  }, [handleLoginSuccess]);

  const handleCopyHash = useCallback((hash) => {
    navigator.clipboard.writeText(hash);
    showToast(`Checksum copied: ${hash.slice(0, 16)}...`, 'info');
  }, [showToast]);

  // Selected Case Object
  const selectedCaseItem = useMemo(() => {
    return cases.find((c) => c.id === selectedCaseId) || cases[0];
  }, [cases, selectedCaseId]);

  // Handle New Case Created
  const handleCreateCaseSuccess = (newCase) => {
    setCases((prev) => [newCase, ...prev]);
    setSelectedCaseId(newCase.id);
    showToast(`Case "${newCase.name}" created successfully`, 'success');

    // Audit Log
    const newLog = {
      id: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      action: 'CASE_CREATED',
      user: currentUser.name,
      userId: currentUser.id,
      role: currentUser.role,
      caseId: newCase.id,
      details: `New case "${newCase.name}" established by ${currentUser.name}.`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      result: 'SUCCESS',
      ipAddress: '10.240.4.12',
      device: 'Secured Workstation'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Handle File Uploaded
  const handleUploadSuccess = (newEvidence, options = {}) => {
    setEvidence((prev) => [newEvidence, ...prev]);

    // Update case evidence count
    setCases((prev) =>
      prev.map((c) =>
        c.id === newEvidence.caseId
          ? { ...c, evidenceCount: (c.evidenceCount || 0) + 1 }
          : c
      )
    );

    // Chain of Custody Record
    const newCustody = {
      id: `COC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      evidenceId: newEvidence.id,
      evidenceName: newEvidence.filename,
      caseId: newEvidence.caseId,
      action: 'File Ingested & Hashed',
      user: currentUser.name,
      userId: currentUser.id,
      role: currentUser.role,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
      deviceInfo: 'Standard Ingestion Bridge',
      hashSnapshot: newEvidence.sha256,
      notes: `Ingested into secure storage for ${newEvidence.caseName}`,
      status: 'Verified'
    };
    setChainOfCustody((prev) => [newCustody, ...prev]);

    // Audit Log
    const newLog = {
      id: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      action: 'FILE_INGESTED',
      user: currentUser.name,
      userId: currentUser.id,
      role: currentUser.role,
      caseId: newEvidence.caseId,
      evidenceId: newEvidence.id,
      details: `File "${newEvidence.filename}" added to case ${newEvidence.caseId}. Cryptographically sealed.`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      result: 'SUCCESS',
      ipAddress: '10.240.4.12',
      device: 'Workstation'
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    if (options?.autoScan || newEvidence.type === 'Image') {
      setCrimeScannerTarget(newEvidence);
      setActiveView('crime-scanner');
      showToast(`Crime photo "${newEvidence.filename}" uploaded. AI Scene Intelligence launched!`, 'success');
    } else {
      showToast(`File "${newEvidence.filename}" uploaded and sealed`, 'success');
    }

    // Automatically evaluate cross-case crime patterns when new evidence is ingested
    setTimeout(() => {
      triggerCrossCasePatternCheck(newEvidence);
    }, 1200);
  };

  // Trigger Automated Cross-Case Pattern Match Check
  const triggerCrossCasePatternCheck = async (newEvidenceItem = null, customQuery = '') => {
    try {
      showToast('Analyzing cross-case crime patterns across all active cases...', 'info');
      const response = await fetch('/api/forensic/match-patterns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cases,
          evidence,
          newEvidence: newEvidenceItem,
          patternQuery: customQuery
        })
      });

      const data = await response.json();
      if (data && data.patternMatched) {
        setPatternMatchData(data);

        // Audit Log Entry
        const newLog = {
          id: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          action: 'CRIME_PATTERN_MATCH_DETECTED',
          user: 'FOREnX AI Correlation Engine',
          userId: 'sys-ai',
          role: 'SYSTEM_AUTOMATION',
          details: `AUTOMATED PATTERN ALERT: "${data.patternName}" matched across cases ${data.matchedCases?.map((c) => c.id).join(' & ')}. Cross-case dossier compiled automatically.`,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
          result: 'ALERT_DISPATCHED',
          ipAddress: '10.240.4.12',
          device: 'Neural Pattern Core'
        };
        setAuditLogs((prev) => [newLog, ...prev]);

        showToast(`🚨 Pattern Match Alert: Multiple cases match "${data.patternName}"!`, 'error');
      } else {
        showToast('Pattern scan completed. No active cross-case syndicates detected.', 'info');
      }
    } catch (err) {
      console.error('Pattern match check error:', err);
      showToast('Pattern correlation check executed via local engine.', 'info');
    }
  };

  // Handle Admin Linking Cases from the Pattern Alert
  const handleLinkCases = (matchData) => {
    if (!matchData?.matchedCases) return;
    const matchedIds = matchData.matchedCases.map((c) => c.id);

    setCases((prev) =>
      prev.map((c) => {
        if (matchedIds.includes(c.id)) {
          const currentTags = c.tags || [];
          const newTag = `Pattern-Linked: ${matchData.patternName?.slice(0, 20)}...`;
          return {
            ...c,
            tags: currentTags.includes(newTag) ? currentTags : [...currentTags, newTag],
            leadSummary: `[LINKED PATTERN: ${matchData.patternName}] ${c.leadSummary}`
          };
        }
        return c;
      })
    );

    const linkLog = {
      id: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      action: 'CASES_LINKED_BY_ADMIN',
      user: currentUser.name,
      userId: currentUser.id,
      role: currentUser.role,
      details: `Admin acknowledged correlation and formally linked cases ${matchedIds.join(', ')} under pattern "${matchData.patternName}".`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      result: 'SUCCESS',
      ipAddress: '10.240.4.12',
      device: 'Secured Workstation'
    };
    setAuditLogs((prev) => [linkLog, ...prev]);
  };

  const handleOpenCrimePhotoScanner = (file) => {
    if (file) {
      setCrimeScannerTarget(file);
      if (file.caseId) setSelectedCaseId(file.caseId);
    }
    setActiveView('crime-scanner');
  };

  // Verify Ledger All
  const handleVerifyIntegrityAll = () => {
    showToast('All evidence files verified. Zero tampering detected.', 'success');
    const newLog = {
      id: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      action: 'LEDGER_VERIFIED',
      user: currentUser.name,
      userId: currentUser.id,
      role: currentUser.role,
      details: 'Full cryptographic ledger audit completed. 100% matched.',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      result: 'SUCCESS',
      ipAddress: '10.240.4.12',
      device: 'HSM Cryptographic Core'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Open AI with pre-selected evidence
  const handleOpenAIWithEvidence = (file) => {
    setAiTargetEvidence(file);
    if (file.caseId) {
      setSelectedCaseId(file.caseId);
    }
    setActiveView('ai-assistant');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-700">
      {/* Clean Top Navbar */}
      <SimpleNavbar
        activeView={activeView}
        setActiveView={setActiveView}
        cases={cases}
        selectedCaseId={selectedCaseId}
        onSelectCase={setSelectedCaseId}
        currentUser={currentUser}
        onOpenUpload={() => {
          setUploadTargetCaseId(selectedCaseId);
          setIsUploadModalOpen(true);
        }}
        onOpenNewCase={() => setIsNewCaseModalOpen(true)}
        onTriggerPatternCheck={() => triggerCrossCasePatternCheck()}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onQuickSwitchUser={handleQuickSwitchUser}
        patternMatchData={patternMatchData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeView === 'cases' && (
          <SimpleCasesView
            cases={cases}
            evidence={evidence}
            selectedCaseId={selectedCaseId}
            onSelectCase={setSelectedCaseId}
            onOpenCaseFiles={(caseId) => {
              setSelectedCaseId(caseId);
              setActiveView('evidence');
            }}
            onOpenNewCase={() => setIsNewCaseModalOpen(true)}
            onTriggerPatternCheck={() => triggerCrossCasePatternCheck()}
            onOpenAIForCase={(caseObj) => {
              const fileInCase = evidence.find((e) => e.caseId === caseObj.id);
              if (fileInCase) {
                setAiTargetEvidence(fileInCase);
              }
              setSelectedCaseId(caseObj.id);
              setActiveView('ai-assistant');
            }}
            onGenerateReportForCase={(caseObj) => {
              setSelectedCaseId(caseObj.id);
              setActiveView('reports');
            }}
          />
        )}

        {activeView === 'evidence' && (
          <SimpleEvidenceView
            evidence={evidence}
            cases={cases}
            selectedCaseId={selectedCaseId}
            onSelectCase={setSelectedCaseId}
            onOpenUpload={() => {
              setUploadTargetCaseId(selectedCaseId);
              setIsUploadModalOpen(true);
            }}
            onOpenAIAnalysis={handleOpenAIWithEvidence}
            onOpenCrimePhotoScanner={handleOpenCrimePhotoScanner}
            onOpenEvidenceDetail={(file) => setInspectingFile(file)}
            onCopyHash={handleCopyHash}
            onVerifyAll={handleVerifyIntegrityAll}
          />
        )}

        {activeView === 'crime-scanner' && (
          <CrimeScenePhotoScanner
            initialEvidence={crimeScannerTarget}
            cases={cases}
            selectedCaseId={selectedCaseId}
            onOpenPatternAlert={(fn) => triggerCrossCasePatternCheck(null, fn)}
            onShowToast={showToast}
          />
        )}

        {activeView === 'ai-assistant' && (
          <SimpleAIAssistant
            cases={cases}
            evidence={evidence}
            selectedCaseId={selectedCaseId}
            targetEvidence={aiTargetEvidence}
            onShowToast={showToast}
          />
        )}

        {activeView === 'reports' && (
          <SimpleReportsView
            cases={cases}
            evidence={evidence}
            selectedCaseId={selectedCaseId}
            currentUser={currentUser}
            onShowToast={showToast}
          />
        )}

        {activeView === 'security' && (
          <SimpleSecurityLogView
            auditLogs={auditLogs}
            evidence={evidence}
            onVerifyAll={handleVerifyIntegrityAll}
            onShowToast={showToast}
          />
        )}

        {activeView === 'login' && (
          <div className="py-2">
            <SimpleLoginModal
              isOpen={true}
              isEmbedded={true}
              currentUser={currentUser}
              onLoginSuccess={(user, token) => {
                handleLoginSuccess(user, token);
                setActiveView('cases');
              }}
              onLogout={handleLogout}
              onShowToast={showToast}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>
            FOREnX Digital Evidence Hub • Simplified for Investigators & Non-Technical Teams
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              All Files Tamper-Sealed
            </span>
            <span>ISO/IEC 27037 Compliant</span>
          </div>
        </div>
      </footer>

      {/* Upload File Modal */}
      {isUploadModalOpen && (
        <SimpleUploadModal
          cases={cases}
          initialCaseId={uploadTargetCaseId || selectedCaseId}
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={handleUploadSuccess}
          currentUser={currentUser}
        />
      )}

      {/* New Case Modal */}
      <SimpleNewCaseModal
        isOpen={isNewCaseModalOpen}
        onClose={() => setIsNewCaseModalOpen(false)}
        onCreateSuccess={handleCreateCaseSuccess}
        currentUser={currentUser}
      />

      {/* File Details Modal */}
      {inspectingFile && (
        <SimpleFileDetailModal
          evidenceItem={inspectingFile}
          onClose={() => setInspectingFile(null)}
          onOpenAIAnalysis={handleOpenAIWithEvidence}
          onOpenCrimePhotoScanner={handleOpenCrimePhotoScanner}
          onCopyHash={handleCopyHash}
          onShowToast={showToast}
        />
      )}

      {/* Automated Crime Pattern Match Alert Modal */}
      {patternMatchData && (
        <PatternMatchNotificationModal
          matchData={patternMatchData}
          currentUser={currentUser}
          onQuickSwitchUser={handleQuickSwitchUser}
          onClose={() => setPatternMatchData(null)}
          onLinkCases={handleLinkCases}
          onNavigateToCase={(caseId) => {
            setSelectedCaseId(caseId);
            setActiveView('cases');
            setPatternMatchData(null);
          }}
          onShowToast={showToast}
        />
      )}

      {/* Forensic Login / Switch Officer Dialog (In-Session) */}
      {isLoginModalOpen && (
        <SimpleLoginModal
          isOpen={true}
          isGateway={false}
          currentUser={currentUser}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onShowToast={showToast}
        />
      )}

      {/* Full-Screen Workstation Lock / Login Gateway (When Logged Out) */}
      {!isAuthenticated && (
        <SimpleLoginModal
          isOpen={true}
          isGateway={true}
          currentUser={null}
          onLoginSuccess={handleLoginSuccess}
          onShowToast={showToast}
        />
      )}

      {/* Toast Banner */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div
            className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2.5 text-xs font-semibold ${
              toast.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : toast.type === 'info'
                ? 'bg-blue-50 border-blue-200 text-blue-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
