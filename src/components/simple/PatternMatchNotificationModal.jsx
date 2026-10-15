import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  FileCheck2,
  GitMerge,
  Copy,
  Printer,
  X,
  ExternalLink,
  ChevronRight,
  Layers,
  MapPin,
  Calendar,
  CheckCircle2,
  FileText,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  Compass
} from 'lucide-react';

export default function PatternMatchNotificationModal({
  matchData,
  currentUser = null,
  onQuickSwitchUser,
  onClose,
  onLinkCases,
  onNavigateToCase,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'report' | 'directives'
  const [isLinking, setIsLinking] = useState(false);
  const [linked, setLinked] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!matchData) return null;

  const isAdmin = currentUser?.role === 'ADMIN';

  // Normalize confidence percentage
  const rawConfidence = matchData.correlationConfidence || 97.6;
  const confidenceScore = rawConfidence <= 1 ? (rawConfidence * 100).toFixed(1) : Number(rawConfidence).toFixed(1);

  // Normalize matched cases list
  const normalizedCases = (matchData.matchedCases || []).map((c, idx) => {
    if (typeof c === 'string') {
      return {
        id: c,
        name: `Investigation Record ${c}`,
        reason: 'Correlated Modus Operandi & evidentiary artifact overlap'
      };
    }
    return {
      id: c.id || `CASE-00${idx + 1}`,
      name: c.name || c.id || 'Active Investigation',
      reason: c.reason || 'Corroborated crime pattern match'
    };
  });

  // Normalize matching attributes
  const isAttributesArray = Array.isArray(matchData.matchingAttributes);
  const attributesObj = !isAttributesArray && typeof matchData.matchingAttributes === 'object'
    ? matchData.matchingAttributes
    : null;
  const attributesList = isAttributesArray
    ? matchData.matchingAttributes
    : null;

  // Normalize report text
  const reportText = matchData.generatedReport || `================================================================================
FEDERAL CRIME CORRELATION BUREAU // AUTOMATED PATTERN DETECTION REPORT
CLASSIFICATION: LAW ENFORCEMENT SENSITIVE // COURT EXHIBIT
================================================================================
PATTERN NAME     : ${matchData.patternName}
SEVERITY LEVEL   : ${matchData.severity || 'CRITICAL'} (Confidence: ${confidenceScore}%)
CASES CORRELATED : ${normalizedCases.map(c => c.id).join(', ')}

EXECUTIVE CONCLUSION:
${matchData.conclusion}

MATCHING ATTRIBUTES:
${attributesList ? attributesList.map(a => `• ${a}`).join('\n') : Object.entries(attributesObj || {}).map(([k, v]) => `• ${k.toUpperCase()}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n')}

INVESTIGATIVE DIRECTIVES:
${(matchData.actionDirectives || []).map((d, i) => `[${i + 1}] ${d}`).join('\n')}
================================================================================`;

  const handleCopyReport = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShowToast?.('Cross-case correlation report copied to clipboard', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExecuteLinkCases = () => {
    setIsLinking(true);
    setTimeout(() => {
      setIsLinking(false);
      setLinked(true);
      if (onLinkCases) onLinkCases(matchData);
      onShowToast?.(`Cases successfully linked under Pattern: "${matchData.patternName}"`, 'success');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border-2 border-red-500/40 shadow-2xl max-w-3xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-4 max-h-[92vh] flex flex-col">
        {/* Urgent High-Impact Admin Alert Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 animate-pulse border border-white/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white text-red-700">
                  {isAdmin ? 'Admin Direct Action Alert' : 'Admin Notification Alert'}
                </span>
                <span className="text-xs text-red-100 font-mono">
                  Confidence: {confidenceScore}%
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight mt-0.5">
                Automated Crime Pattern Match Detected
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Recipient Dispatch Notification Banner */}
        <div className={`px-6 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b ${
          isAdmin
            ? 'bg-purple-50 text-purple-900 border-purple-200'
            : 'bg-amber-50 text-amber-900 border-amber-200'
        }`}>
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className={`w-4 h-4 shrink-0 ${isAdmin ? 'text-purple-600' : 'text-amber-600'}`} />
            <span>
              {isAdmin
                ? `Authorized Admin Session: Agent Robert Miller (Senior Forensic Director) — Full Executive Directive Clearance`
                : `Automated Dispatch: Report compiled & notified to Director Robert Miller (Admin). Logged in as ${currentUser?.name || 'Investigator'}.`}
            </span>
          </div>

          {!isAdmin && onQuickSwitchUser && (
            <button
              type="button"
              onClick={() => onQuickSwitchUser({
                id: 'usr-1',
                name: 'Agent Robert Miller',
                email: 'r.miller@forenx.gov',
                role: 'ADMIN',
                badgeNumber: 'FRX-901',
                title: 'Senior Forensic Director',
                department: 'Digital Forensic Unit (DFU) HQ',
                clearanceLevel: 'TOP SECRET // SCI',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
              })}
              className="px-2.5 py-1 text-[11px] font-bold text-purple-800 bg-white hover:bg-purple-100 border border-purple-300 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Switch to Director Miller (Admin)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Navigation Tabs inside modal */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'summary'
                ? 'border-red-600 text-red-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Pattern & Conclusion
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'report'
                ? 'border-red-600 text-red-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Generated Dossier Report
          </button>
          <button
            onClick={() => setActiveTab('directives')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'directives'
                ? 'border-red-600 text-red-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Investigative Directives ({matchData.actionDirectives?.length || 0})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'summary' && (
            <>
              {/* Pattern Header Card */}
              <div className="p-4 bg-red-50/70 rounded-xl border border-red-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Cross-Case Criminal Syndicate Signature</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-600 text-white">
                    {matchData.severity || 'CRITICAL'} PRIORITY
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {matchData.patternName}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  The automated pattern detection engine correlated shared Modus Operandi (MO), common entities, matching weapons/tools, and synchronized timestamps across 2 or more active cases.
                </p>
              </div>

              {/* Matched Cases Linkage Box */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Cases Matching This Pattern:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {normalizedCases.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-400 transition-all text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-900 bg-blue-100/70 px-2 py-0.5 rounded text-[11px]">
                          {c.id}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">
                          Case #{idx + 1}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 truncate">{c.name}</p>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        <span className="text-slate-400">Correlation Point: </span>
                        {c.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pattern Matching Attributes Grid */}
              {attributesObj ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Modus Operandi */}
                  {attributesObj.modusOperandi && (
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Modus Operandi (MO)
                      </span>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {attributesObj.modusOperandi}
                      </p>
                    </div>
                  )}

                  {/* Shared Entities & Accounts */}
                  {attributesObj.sharedEntities && (
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Correlated Entities & Handles
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(Array.isArray(attributesObj.sharedEntities) ? attributesObj.sharedEntities : [attributesObj.sharedEntities]).map((ent, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono text-[10px] border border-slate-200"
                          >
                            {ent}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weapons / Tools */}
                  {attributesObj.weaponsOrTools && (
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Weapons / Ballistics / Tools
                      </span>
                      <div className="space-y-1">
                        {(Array.isArray(attributesObj.weaponsOrTools) ? attributesObj.weaponsOrTools : [attributesObj.weaponsOrTools]).map((w, i) => (
                          <p key={i} className="text-slate-800 text-[11px] font-medium flex items-center gap-1">
                            <span className="text-red-500 font-bold">•</span>
                            <span>{w}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Proximity & Temporal Alignment */}
                  {(attributesObj.geographicProximity || attributesObj.temporalCorrelation) && (
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Geographic & Temporal Vector
                      </span>
                      {attributesObj.geographicProximity && (
                        <p className="text-slate-700 text-[11px]">
                          📍 <span className="font-medium">{attributesObj.geographicProximity}</span>
                        </p>
                      )}
                      {attributesObj.temporalCorrelation && (
                        <p className="text-slate-700 text-[11px]">
                          ⏱️ <span className="font-medium">{attributesObj.temporalCorrelation}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : attributesList ? (
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Correlated Criminal Attributes
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {attributesList.map((attr, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 font-medium">
                        🔗 {attr}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* The Conclusion Box */}
              <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl shadow-inner space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Automated AI Judicial & Tactical Conclusion</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {matchData.conclusion}
                </p>
              </div>
            </>
          )}

          {activeTab === 'report' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Court-Admissible Correlation Dossier
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Generated automatically per ISO/IEC 27037 standards
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyReport}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-950 text-slate-200 font-mono text-[11px] rounded-xl overflow-x-auto max-h-[50vh] whitespace-pre leading-relaxed border border-slate-800 shadow-inner select-all">
                {reportText}
              </div>
            </div>
          )}

          {activeTab === 'directives' && (
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Prioritized Action Directives for Administrators & Detectives
                </h4>
                <p className="text-[11px] text-slate-400">
                  Recommended tactical response steps to secure evidence and coordinate cross-case prosecution
                </p>
              </div>

              <div className="space-y-2">
                {(matchData.actionDirectives || []).map((dir, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200 flex items-start gap-3 transition-colors text-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-slate-800 leading-relaxed">
                      {dir}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-4 border-t border-slate-150 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Status: <span className="font-bold text-slate-700">{linked ? 'Cases Linked' : 'Correlation Verified'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Dismiss Alert
            </button>

            <button
              onClick={handleExecuteLinkCases}
              disabled={isLinking || linked}
              className={`inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer ${
                linked
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {linked ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Cases Linked</span>
                </>
              ) : (
                <>
                  <GitMerge className="w-4 h-4" />
                  <span>{isLinking ? 'Linking Cases...' : 'Link Cases & Update Ledger'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
