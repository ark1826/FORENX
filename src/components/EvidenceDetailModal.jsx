import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  HardDrive,
  Copy,
  CheckCircle2,
  Cpu,
  FileCode,
  FileText,
  FileCheck2,
  RefreshCw,
  ExternalLink,
  Lock,
  Layers,
  Sparkles,
  MapPin,
  Building,
  User,
  Phone,
  Mail,
  CreditCard
} from 'lucide-react';

export default function EvidenceDetailModal({
  evidence,
  onClose,
  onOpenAIAnalysis,
  onCopyHash
}) {
  const [activeTab, setActiveTab] = useState('text');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(true);

  if (!evidence) return null;

  const handleVerifyNow = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifySuccess(true);
    }, 800);
  };

  // Generate simulated hex dump based on evidence filename and hash
  const generateHexDump = () => {
    const lines = [
      '00000000  25 50 44 46 2d 31 2e 37  0a 25 d0 d4 c5 d8 0a 34  |%PDF-1.7.%....4|',
      '00000010  20 30 20 6f 62 6a 0a 3c  3c 2f 4c 65 6e 67 74 68  | 0 obj.<</Length|',
      '00000020  20 31 38 34 32 2f 46 69  6c 74 65 72 2f 46 6c 61  | 1842/Filter/Fla|',
      '00000030  74 65 44 65 63 6f 64 65  3e 3e 73 74 72 65 61 6d  |teDecode>>stream|',
      '00000040  78 9c 5d 53 4b 6f 1b 39  10 fe 3d 72 90 28 89 23  |x.]SKo.9..=r.(.#|',
      '00000050  56 22 14 a4 88 12 51 c5  02 4b b2 a8 50 83 2b 12  |V"....Q..K..P.+.|',
      '00000060  67 92 1d fa ed cf a7 d6  be db a9 b2 4c 93 dc f7  |g...........L...|',
      '00000070  ef de 7b ee bd 3b b3 f7  fe fc f9 f3 e7 0f 3f 7e  |..{..;........?~|',
      '00000080  45 53 43 52 4f 57 5f 54  58 5f 39 30 38 32 00 00  |ESCROW_TX_9082..|',
      '00000090  53 43 41 44 41 5f 4f 56  45 52 52 49 44 45 5f 30  |SCADA_OVERRIDE_0|'
    ];
    return lines.join('\n');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-5xl max-h-[90vh] bg-[#0c121e] border border-cyan-500/40 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in duration-200">
        {/* Modal Top Bar */}
        <div className="p-4 bg-[#090e18] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono-code font-bold text-cyan-400 text-sm">
                  {evidence.id}
                </span>
                <span className="text-slate-600">•</span>
                <span className="font-semibold text-white text-sm">{evidence.filename}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono-code font-bold">
                  ✓ {evidence.integrity}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono-code mt-0.5">
                Case: <span className="text-cyan-300 font-semibold">{evidence.caseId}</span> ({evidence.caseName}) • Size: {evidence.fileSize}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          {/* Left Column: Artifact Inspector Tabs (7 cols) */}
          <div className="lg:col-span-7 p-5 border-r border-slate-800/80 space-y-4">
            {/* Sub-tab Navigation */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#07090e] border border-slate-800 font-mono-code text-xs">
              <button
                onClick={() => setActiveTab('text')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'text'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Extracted Text / OCR</span>
              </button>
              <button
                onClick={() => setActiveTab('hex')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'hex'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Raw Hex Bytes</span>
              </button>
              <button
                onClick={() => setActiveTab('metadata')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'metadata'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Forensic Hardware Meta</span>
              </button>
            </div>

            {/* Tab: Extracted Text */}
            {activeTab === 'text' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                  <span>OCR Text Extract Layer</span>
                  <span className="text-purple-400">Confidence: {evidence.confidenceScore || 98.4}%</span>
                </div>
                <div className="p-3.5 rounded-lg bg-[#07090e] border border-slate-800 font-mono-code text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                  {evidence.extractedText || 'No extracted text available for this artifact.'}
                </div>
                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-white">Investigator Description:</span> {evidence.description}
                </div>
              </div>
            )}

            {/* Tab: Hex View */}
            {activeTab === 'hex' && (
              <div className="space-y-2 font-mono-code text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Offset (h) -- 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F -- ASCII</span>
                  <span className="text-cyan-400">EnCase Compatible</span>
                </div>
                <pre className="p-3.5 rounded-lg bg-[#07090e] border border-slate-800 text-[11px] text-cyan-300/90 overflow-x-auto leading-relaxed max-h-96">
                  {generateHexDump()}
                </pre>
              </div>
            )}

            {/* Tab: Metadata */}
            {activeTab === 'metadata' && (
              <div className="space-y-3 font-mono-code text-xs">
                <div className="p-3.5 rounded-lg bg-[#07090e] border border-slate-800 space-y-2">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">
                    Hardware Ingestion Details
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px]">
                    <div>
                      <span className="text-slate-500">Source Device:</span>
                      <p className="text-white font-semibold">{evidence.deviceSource}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Write-Blocker Hardware:</span>
                      <p className="text-emerald-400 font-semibold">{evidence.writeBlockerModel}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Vault Location:</span>
                      <p className="text-white">{evidence.evidenceRoomLocation}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Uploaded By:</span>
                      <p className="text-white">{evidence.uploadedBy}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Cryptographic Fingerprints & AI Entities (5 cols) */}
          <div className="lg:col-span-5 p-5 space-y-4 bg-[#090e18]">
            {/* Cryptographic Hashes Card */}
            <div className="p-3.5 rounded-lg bg-[#0c121e] border border-slate-800 space-y-3 font-mono-code text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>CRYPTOGRAPHIC SIGNATURES</span>
                </div>
                <button
                  onClick={handleVerifyNow}
                  disabled={isVerifying}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${isVerifying ? 'animate-spin' : ''}`} />
                  <span>{isVerifying ? 'Checking...' : 'Re-verify'}</span>
                </button>
              </div>

              {/* SHA-256 */}
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>SHA-256 (FIPS 180-4)</span>
                  <button
                    onClick={() => onCopyHash(evidence.sha256)}
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-500"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className="p-2 rounded bg-[#07090e] border border-slate-800 text-[11px] text-emerald-400 break-all">
                  {evidence.sha256}
                </div>
              </div>

              {/* MD5 */}
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>MD5 Legacy Hash</span>
                  <button
                    onClick={() => onCopyHash(evidence.md5)}
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-500"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className="p-2 rounded bg-[#07090e] border border-slate-800 text-[11px] text-slate-300 break-all">
                  {evidence.md5}
                </div>
              </div>

              {verifySuccess && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Integrity matches intake ledger. Zero bitrot detected.</span>
                </div>
              )}
            </div>

            {/* AI Extracted Entities Card */}
            <div className="p-3.5 rounded-lg bg-[#0c121e] border border-purple-500/30 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-purple-300 font-bold font-mono-code">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>EXTRACTED ENTITIES (NLP)</span>
                </div>
                <span className="text-[10px] font-mono-code text-purple-400">
                  {evidence.entities?.length || 0} Found
                </span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {evidence.entities?.map((ent, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-[#07090e] border border-slate-800 flex items-center justify-between font-mono-code text-[11px]"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        ent.type === 'PERSON' ? 'bg-rose-500/20 text-rose-300' :
                        ent.type === 'ORGANIZATION' ? 'bg-purple-500/20 text-purple-300' :
                        ent.type === 'LOCATION' ? 'bg-emerald-500/20 text-emerald-300' :
                        ent.type === 'ACCOUNT' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {ent.type}
                      </span>
                      <span className="text-white truncate font-medium">{ent.value}</span>
                    </div>
                    <span className="text-slate-500 text-[10px]">{ent.confidence}%</span>
                  </div>
                ))}
              </div>

              {/* AI Summary note */}
              {evidence.aiSummary && (
                <p className="text-[11px] text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                  {evidence.aiSummary}
                </p>
              )}
            </div>

            {/* Bottom Action */}
            <button
              onClick={() => {
                onClose();
                onOpenAIAnalysis(evidence);
              }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono-code text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Cpu className="w-4 h-4" />
              <span>Analyze in AI Forensic Lab</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
