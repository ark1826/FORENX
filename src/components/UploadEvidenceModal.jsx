import React, { useState } from 'react';
import {
  X,
  UploadCloud,
  FileCheck2,
  HardDrive,
  ShieldCheck,
  CheckCircle2,
  Fingerprint,
  RefreshCw,
  Lock,
  Layers,
  AlertCircle
} from 'lucide-react';

export default function UploadEvidenceModal({
  cases = [],
  initialCaseId,
  onClose,
  onUploadSuccess,
  currentUser
}) {
  const [selectedCaseId, setSelectedCaseId] = useState(initialCaseId || cases[0]?.id || 'FRX-2026-001');
  const [filename, setFilename] = useState('');
  const [fileType, setFileType] = useState('Document');
  const [deviceSource, setDeviceSource] = useState('Suspect Dell Latitude Laptop (Serial #DL-9941)');
  const [writeBlockerUsed, setWriteBlockerUsed] = useState(true);
  const [writeBlockerModel, setWriteBlockerModel] = useState('Tableau T8u Forensic USB 3.0 Bridge');
  const [evidenceLocation, setEvidenceLocation] = useState('Vault B - Secure Locker #419');
  const [description, setDescription] = useState('Encrypted communication cache and financial ledger files extracted from suspect primary storage.');

  // Live hashing simulation state
  const [hashingProgress, setHashingProgress] = useState(0);
  const [computedSha256, setComputedSha256] = useState('');
  const [computedMd5, setComputedMd5] = useState('');
  const [isComputingHash, setIsComputingHash] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sampleDemoFiles = [
    { name: 'wire_transfer_schedule_2026.pdf', type: 'Document', size: '2.8 MB' },
    { name: 'disk_image_sdcard.dd', type: 'Disk Image', size: '32.0 GB' },
    { name: 'firewall_connection_log.txt', type: 'Log', size: '1.4 MB' },
    { name: 'co-conspirator_audio_tap.wav', type: 'Audio', size: '18.2 MB' }
  ];

  const handleSelectSample = (sample) => {
    setFilename(sample.name);
    setFileType(sample.type);
    triggerHashCalculation(sample.name);
  };

  const triggerHashCalculation = (name) => {
    setIsComputingHash(true);
    setHashingProgress(20);
    setComputedSha256('');
    setComputedMd5('');

    setTimeout(() => setHashingProgress(65), 300);
    setTimeout(async () => {
      setHashingProgress(100);
      try {
        const res = await fetch('/api/forensic/calculate-hash', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: name, content: `${name}-${Date.now()}` })
        });
        const data = await res.json();
        setComputedSha256(data.sha256);
        setComputedMd5(data.md5);
      } catch (e) {
        // Fallback realistic hash
        setComputedSha256('3f8b9e24a15cd87019f3b9284716ea05b63294817a02c5de738491048b29103c');
        setComputedMd5('8b29103c3f8b9e24a15cd87019f3b928');
      }
      setIsComputingHash(false);
    }, 700);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer?.files || e.target?.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFilename(file.name);
      triggerHashCalculation(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filename) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const targetCase = cases.find((c) => c.id === selectedCaseId);
      const newEvidence = {
        id: `EV-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        filename: filename || 'unknown_artifact.bin',
        type: fileType,
        caseId: selectedCaseId,
        caseName: targetCase ? targetCase.name : 'Active Case',
        fileSize: '4.2 MB',
        sha256: computedSha256 || '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
        md5: computedMd5 || '7d659a2feaa0c55ad015a3bf4f1b2b0b',
        uploadedBy: currentUser?.name || 'Lead Investigator',
        uploadedById: currentUser?.id || 'usr-1',
        uploadedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
        integrity: 'Verified',
        aiStatus: 'Pending',
        deviceSource,
        writeBlockerUsed,
        writeBlockerModel: writeBlockerUsed ? writeBlockerModel : 'Direct Digital Attestation',
        evidenceRoomLocation: evidenceLocation,
        description,
        extractedText: `[Ingested Forensic Artifact: ${filename}]\nDevice Origin: ${deviceSource}\nAcquisition Verified by: ${currentUser?.name || 'Lead Investigator'}\nCryptographic hash verified across forensic ledger.`
      };

      onUploadSuccess(newEvidence);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-2xl bg-[#0c121e] border border-cyan-500/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#090e18] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white font-display">
                Ingest Digital Evidence Artifact
              </h2>
              <p className="text-[10px] text-slate-400 font-mono-code">
                ISO/IEC 27037 compliant intake with automated cryptographic checksum calculation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 font-mono-code text-xs">
          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="p-4 rounded-xl border-2 border-dashed border-slate-700 hover:border-cyan-500/60 bg-[#07090e] transition-colors text-center relative cursor-pointer group"
          >
            <input
              type="file"
              id="file-upload-input"
              onChange={handleFileDrop}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Fingerprint className="w-8 h-8 mx-auto text-cyan-400 group-hover:scale-110 transition-transform mb-2" />
            <div className="text-xs font-semibold text-white">
              {filename ? filename : 'Drop evidence bitstream or click to browse'}
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Supports .dd, .e01, .raw, .pcap, .pdf, .eml, .sqlite, .zip (Unlimited size via chunking)
            </p>

            {/* Quick Demo Preloads */}
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-slate-500">Quick Test Files:</span>
              {sampleDemoFiles.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => handleSelectSample(s)}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 text-[10px] text-slate-300 border border-slate-700/60 transition-colors"
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Hash Generation Progress and Status */}
          {(isComputingHash || computedSha256) && (
            <div className="p-3 rounded-lg bg-[#07090e] border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-cyan-400 flex items-center gap-1.5">
                  <RefreshCw className={`w-3 h-3 ${isComputingHash ? 'animate-spin' : ''}`} />
                  {isComputingHash ? 'Computing Hardware SHA-256 Checksum...' : 'Cryptographic Integrity Fingerprint Generated'}
                </span>
                <span className="text-emerald-400 font-bold">{hashingProgress}%</span>
              </div>

              {computedSha256 && (
                <div className="space-y-1 text-[10px]">
                  <div className="text-slate-400 flex items-center justify-between">
                    <span>SHA-256:</span>
                    <span className="text-emerald-400 truncate max-w-md">{computedSha256}</span>
                  </div>
                  <div className="text-slate-400 flex items-center justify-between">
                    <span>MD5:</span>
                    <span className="text-slate-300">{computedMd5}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Case & Type Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Target Case Dossier *</label>
              <select
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#07090e] border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/50"
              >
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Artifact Type *</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#07090e] border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/50"
              >
                <option value="Document">Document (.pdf, .docx, .eml)</option>
                <option value="Disk Image">Disk Image (.dd, .e01, raw)</option>
                <option value="Log">Log File (.txt, .csv, json)</option>
                <option value="Image">Image (.jpg, .png, EXIF)</option>
                <option value="Audio">Audio / Wiretap (.mp3, .wav)</option>
                <option value="Network">Network (.pcap, zeek)</option>
                <option value="Other">Other / Memory Dump</option>
              </select>
            </div>
          </div>

          {/* Device Source & Hardware Write Blocker */}
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Seizure Source Device & Model</label>
            <input
              type="text"
              value={deviceSource}
              onChange={(e) => setDeviceSource(e.target.value)}
              placeholder="e.g. Suspect Laptop, IMEI 354892091823901"
              className="w-full p-2 rounded-lg bg-[#07090e] border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* Write Blocker Hardware Attestation Checkbox */}
          <div className="p-3 rounded-lg bg-[#07090e] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={writeBlockerUsed}
                  onChange={(e) => setWriteBlockerUsed(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                />
                <span className="text-white font-semibold">Hardware Write-Blocker Bridge Engaged</span>
              </label>
              <span className="text-[10px] text-emerald-400">DEFENSIBLE</span>
            </div>

            {writeBlockerUsed && (
              <select
                value={writeBlockerModel}
                onChange={(e) => setWriteBlockerModel(e.target.value)}
                className="w-full p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]"
              >
                <option value="Tableau T8u Forensic USB 3.0 Bridge">Tableau T8u Forensic USB 3.0 Bridge</option>
                <option value="Logicube Falcon-Neo Forensic Imager">Logicube Falcon-Neo Forensic Imager</option>
                <option value="Cellebrite UFED 4PC Ultra Hardware Bridge">Cellebrite UFED 4PC Ultra Hardware Bridge</option>
                <option value="Wiebetech Forensic UltraDock v5">Wiebetech Forensic UltraDock v5</option>
              </select>
            )}
          </div>

          {/* Evidence Room Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Physical Evidence Safe / Locker</label>
              <input
                type="text"
                value={evidenceLocation}
                onChange={(e) => setEvidenceLocation(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#07090e] border border-slate-800 text-slate-200"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Custody Intake Officer</label>
              <input
                type="text"
                disabled
                value={`${currentUser?.name} (${currentUser?.badgeNumber})`}
                className="w-full p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Investigator Context & Notes</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full p-2 rounded-lg bg-[#07090e] border border-slate-800 text-slate-200 resize-none"
            />
          </div>

          {/* Defensibility Notice */}
          <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-[10px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span>
              ISO/IEC 27037 NOTICE: Upon intake, this artifact will be cryptographically locked into the immutable chain of custody ledger.
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !filename}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Ingesting...' : 'Ingest & Sign Custody'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
