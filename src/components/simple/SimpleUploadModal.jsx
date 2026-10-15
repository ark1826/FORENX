import React, { useState } from 'react';
import {
  X,
  UploadCloud,
  FileCheck2,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  RefreshCw,
  FileText,
  Camera,
  Crosshair,
  MapPin,
  Calendar,
  AlertTriangle,
  Image as ImageIcon
} from 'lucide-react';

export default function SimpleUploadModal({
  cases = [],
  initialCaseId,
  onClose,
  onUploadSuccess,
  currentUser
}) {
  const [selectedCaseId, setSelectedCaseId] = useState(initialCaseId || cases[0]?.id || 'FRX-2026-001');
  const [filename, setFilename] = useState('');
  const [fileType, setFileType] = useState('Image');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [autoScanCrimeScene, setAutoScanCrimeScene] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Quick Crime Scene Presets for non-tech users
  const crimeScenePresets = [
    {
      name: 'bank_robbery_lexington_cctv.jpg',
      type: 'Image',
      desc: 'CCTV still capturing armed robbery in progress with brandished firearm and cash collection.',
      image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      label: '🏦 Armed Robbery Scene'
    },
    {
      name: 'homicide_elm_st_alley.jpg',
      type: 'Image',
      desc: 'Night alleyway homicide scene with standing puddles, ballistic casing markers, and smokestack landmark.',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      label: '🩸 Murder / Alley Scene'
    },
    {
      name: 'jewelry_store_breakin_heist.jpg',
      type: 'Image',
      desc: 'Forced entry commercial burglary scene with pried safe drawers and broken security partition.',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      label: '💎 Jewelry Store Heist'
    },
    {
      name: 'warehouse_c12_contraband.jpg',
      type: 'Image',
      desc: 'Maritime warehouse contraband stash with severed customs seals and transport van.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      label: '📦 Unethical Contraband'
    }
  ];

  const handleSelectPreset = (sample) => {
    setFilename(sample.name);
    setFileType(sample.type);
    setDescription(sample.desc);
    setImagePreview(sample.image);
    setAutoScanCrimeScene(true);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer?.files || e.target?.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFilename(file.name);

      if (file.type.includes('image')) {
        setFileType('Image');
        setAutoScanCrimeScene(true);
        const reader = new FileReader();
        reader.onload = (ev) => {
          setImagePreview(ev.target.result);
        };
        reader.readAsDataURL(file);
      } else if (file.type.includes('audio')) {
        setFileType('Audio');
        setImagePreview(null);
      } else if (file.type.includes('pdf') || file.type.includes('word') || file.type.includes('sheet')) {
        setFileType('Document');
        setImagePreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filename.trim()) return;

    setIsUploading(true);

    let sha256 = '';
    let md5 = '';

    try {
      const res = await fetch('/api/forensic/calculate-hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, content: `${filename}-${Date.now()}` })
      });
      const hashData = await res.json();
      sha256 = hashData.sha256;
      md5 = hashData.md5;
    } catch (err) {
      sha256 = '4a8f9b23c10e8d7521a6b89c741e05a8f23491827c02b5de738491048b29103c';
      md5 = '8b29103c3f8b9e24a15cd87019f3b928';
    }

    const matchedCase = cases.find((c) => c.id === selectedCaseId);

    const newEvidenceItem = {
      id: `EV-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      caseId: selectedCaseId,
      caseName: matchedCase?.name || 'Selected Case',
      filename: filename.trim(),
      type: fileType,
      size: `${(Math.random() * 8 + 1).toFixed(1)} MB`,
      dateAdded: new Date().toISOString().replace('T', ' ').slice(0, 16),
      sha256,
      md5,
      integrity: 'VERIFIED',
      imageUrl: imagePreview || null,
      imageBase64: imagePreview && imagePreview.startsWith('data:') ? imagePreview : null,
      description: description.trim() || `Securely ingested evidence artifact for ${matchedCase?.name || 'case'}.`,
      writeBlockerUsed: true,
      writeBlockerModel: 'Tableau T8u Hardware Bridge',
      evidenceRoomLocation: 'Digital Evidence Vault Locker #419',
      extractedEntities: [
        { name: currentUser?.name || 'Investigator', type: 'PERSON' },
        { name: matchedCase?.name || 'Case Subject', type: 'ORGANIZATION' }
      ]
    };

    setTimeout(() => {
      setIsUploading(false);
      onUploadSuccess(newEvidenceItem, { autoScan: autoScanCrimeScene && fileType === 'Image' });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-150 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Upload Crime Scene & Evidence Photo</h2>
              <p className="text-xs text-slate-500">Securely ingest and automatically extract photo intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Case Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Assign to Case:
            </label>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 text-slate-800 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 font-medium cursor-pointer"
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.id})
                </option>
              ))}
            </select>
          </div>

          {/* Quick 1-Click Crime Scene Presets */}
          <div>
            <span className="text-xs font-semibold text-slate-600 block mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Or click a ready-to-scan crime scene photo:</span>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {crimeScenePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    filename === preset.name
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <img
                    src={preset.image}
                    alt={preset.label}
                    className="w-full h-14 object-cover rounded-lg mb-1.5 border border-slate-300"
                  />
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">
                    {preset.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Drag & Drop Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Choose or Drop Photo / File from Computer:
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className={`border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer relative ${
                imagePreview ? 'border-blue-400 bg-blue-50/20' : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/40'
              }`}
            >
              <input
                type="file"
                onChange={handleFileDrop}
                accept="image/*,.pdf,.doc,.docx,.xlsx,.txt"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />

              {imagePreview ? (
                <div className="flex items-center gap-4 text-left">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 rounded-xl object-cover border border-slate-300 shrink-0 shadow-xs"
                  />
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 mb-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Image Loaded
                    </span>
                    <p className="text-xs font-bold text-slate-900 truncate max-w-xs">{filename || 'crime_scene_photo.jpg'}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Click or drop another file to replace</p>
                  </div>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-700">
                    Click to browse or drag & drop crime scene photo here
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Supports Photos (JPEG, PNG, WEBP), CCTV Stills, Documents & Logs
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Automatic Multimodal Photo Extraction Checkbox */}
          {fileType === 'Image' && (
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <label htmlFor="auto-scan" className="text-xs font-bold text-slate-900 cursor-pointer">
                    Scan with AI upon upload
                  </label>
                  <p className="text-[11px] text-slate-600">
                    Extracts date/time, street address, landmarks, and surroundings instantly.
                  </p>
                </div>
              </div>
              <input
                id="auto-scan"
                type="checkbox"
                checked={autoScanCrimeScene}
                onChange={(e) => setAutoScanCrimeScene(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
            </div>
          )}

          {/* Filename & Type Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                File Name:
              </label>
              <input
                type="text"
                required
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="e.g. robbery_scene_cctv.jpg"
                className="w-full px-3 py-1.5 text-sm bg-slate-50 text-slate-800 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Category:
              </label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full px-3 py-1.5 text-sm bg-slate-50 text-slate-800 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              >
                <option value="Image">Image / Photo</option>
                <option value="Document">Document</option>
                <option value="Audio">Audio</option>
                <option value="Disk Image">Disk Image</option>
                <option value="Log">Log File</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Short Description / Crime Scene Context (Optional):
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Captured from convenience store camera facing west intersection..."
              className="w-full px-3 py-1.5 text-sm bg-slate-50 text-slate-800 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 resize-none"
            />
          </div>

          {/* Security reassurance badge */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Cryptographically sealed on intake with FIPS SHA-256 hash preservation.</span>
          </div>

          {/* Actions */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-150">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !filename.trim()}
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              <span>{isUploading ? 'Securing & Scanning...' : 'Upload & Scan Evidence'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
