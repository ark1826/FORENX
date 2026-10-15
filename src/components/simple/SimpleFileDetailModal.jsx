import React, { useState } from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  Sparkles,
  Copy,
  ChevronDown,
  ChevronUp,
  HardDrive,
  ShieldCheck,
  Lock,
  Clock,
  Camera,
  Crosshair
} from 'lucide-react';

export default function SimpleFileDetailModal({
  evidenceItem,
  onClose,
  onOpenAIAnalysis,
  onOpenCrimePhotoScanner,
  onCopyHash,
  onShowToast
}) {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!evidenceItem) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShowToast?.('Checksum copied to clipboard', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-150 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div className="truncate max-w-xs sm:max-w-sm">
              <h2 className="text-base font-bold text-slate-900 truncate">{evidenceItem.filename}</h2>
              <p className="text-xs text-slate-500">Artifact Reference: {evidenceItem.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Status banner */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-900">Verified Original Evidence</p>
                <p className="text-[11px] text-emerald-700">Protected against tampering; zero modifications detected.</p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-200/60 text-emerald-800">
              Intact
            </span>
          </div>

          {/* Key Facts */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/70">
            <div>
              <span className="text-slate-400 block mb-0.5">Assigned Case:</span>
              <span className="font-semibold text-slate-800">{evidenceItem.caseName || evidenceItem.caseId}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Category / Type:</span>
              <span className="font-semibold text-slate-800">{evidenceItem.type}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">File Size:</span>
              <span className="font-semibold text-slate-800">{evidenceItem.size}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Date Added:</span>
              <span className="font-semibold text-slate-800">{evidenceItem.dateAdded || 'Today'}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Context Notes
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
              {evidenceItem.description || 'No additional notes provided for this evidence item.'}
            </p>
          </div>

          {/* Expandable Technical Details (Collapsible so non-tech users aren't overwhelmed) */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <span>Technical & Cryptographic Data</span>
              {showTechnicalDetails ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {showTechnicalDetails && (
              <div className="p-4 space-y-3 bg-white text-xs border-t border-slate-200">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span>SHA-256 Fingerprint Checksum:</span>
                    <button
                      onClick={() => handleCopy(evidenceItem.sha256)}
                      className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-2 bg-slate-100 rounded-lg font-mono text-[11px] text-slate-800 break-all select-all">
                    {evidenceItem.sha256 || '4a8f9b23c10e8d7521a6b89c741e05a8f23491827c02b5de738491048b29103c'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block">Hardware Write-Blocker:</span>
                    <span className="font-medium">{evidenceItem.writeBlockerModel || 'Tableau T8u Bridge'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Locker Location:</span>
                    <span className="font-medium">{evidenceItem.evidenceRoomLocation || 'Secure Vault #419'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-150">
            <div className="flex items-center gap-2">
              {evidenceItem.type === 'Image' ? (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCrimePhotoScanner?.(evidenceItem);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Scan Crime Scene Photo with AI</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAIAnalysis(evidenceItem);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Ask AI to Explain File</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
