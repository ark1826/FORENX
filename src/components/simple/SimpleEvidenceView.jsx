import React, { useState, useMemo } from 'react';
import {
  Layers,
  UploadCloud,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  FileSpreadsheet,
  FileCode,
  FileAudio,
  FileImage,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Clock,
  HardDrive,
  Copy,
  ChevronDown,
  Camera,
  Crosshair
} from 'lucide-react';

export default function SimpleEvidenceView({
  evidence = [],
  cases = [],
  selectedCaseId,
  onSelectCase,
  onOpenUpload,
  onOpenAIAnalysis,
  onOpenCrimePhotoScanner,
  onOpenEvidenceDetail,
  onCopyHash,
  onVerifyAll
}) {
  const [activeType, setActiveType] = useState('ALL');
  const [caseFilter, setCaseFilter] = useState(selectedCaseId || 'ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Sync caseFilter if selectedCaseId changes
  React.useEffect(() => {
    if (selectedCaseId) {
      setCaseFilter(selectedCaseId);
    }
  }, [selectedCaseId]);

  const filteredFiles = useMemo(() => {
    return evidence.filter((file) => {
      const matchesCase = caseFilter === 'ALL' || file.caseId === caseFilter;
      const matchesType = activeType === 'ALL' || file.type === activeType;
      const matchesSearch =
        file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.caseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCase && matchesType && matchesSearch;
    });
  }, [evidence, caseFilter, activeType, searchQuery]);

  const getFileIcon = (type) => {
    switch (type) {
      case 'Document':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'Image':
        return <FileImage className="w-5 h-5 text-purple-600" />;
      case 'Audio':
        return <FileAudio className="w-5 h-5 text-amber-600" />;
      case 'Disk Image':
        return <HardDrive className="w-5 h-5 text-cyan-600" />;
      case 'Log':
        return <FileCode className="w-5 h-5 text-emerald-600" />;
      default:
        return <Layers className="w-5 h-5 text-slate-600" />;
    }
  };

  const handleRunVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (onVerifyAll) onVerifyAll();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Files & Evidence</h1>
          <p className="text-sm text-slate-500 mt-1">
            Securely uploaded files for your cases. Every file is automatically verified and sealed against tampering.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onOpenCrimePhotoScanner?.()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <Camera className="w-4 h-4 text-blue-600" />
            <span>Crime Scene Scanner</span>
          </button>

          <button
            onClick={handleRunVerification}
            disabled={isVerifying}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <CheckCircle2 className={`w-4 h-4 text-emerald-600 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Verifying...' : 'Check All Files'}</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      {/* Crime Scene Photo Scanner Quick Feature Callout */}
      <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Crime Scene Photo Scanner</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">AI Vision</span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Upload any photo of a murder, robbery, break-in, or unethical activity. AI scans and extracts date, street address, landmarks, and all surroundings.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenCrimePhotoScanner?.()}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Crosshair className="w-4 h-4" />
          <span>Launch Photo Scanner</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Type Category Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Files' },
            { id: 'Document', label: 'Documents' },
            { id: 'Image', label: 'Images' },
            { id: 'Audio', label: 'Audio' },
            { id: 'Disk Image', label: 'Disk Dumps' },
            { id: 'Log', label: 'Logs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeType === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Case Selector Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <div className="w-full sm:w-56">
            <select
              value={caseFilter}
              onChange={(e) => {
                setCaseFilter(e.target.value);
                if (e.target.value !== 'ALL') {
                  onSelectCase(e.target.value);
                }
              }}
              className="w-full px-3 py-1.5 text-sm bg-white text-slate-800 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 shadow-2xs cursor-pointer font-medium"
            >
              <option value="ALL">Show all cases</option>
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search filename or note..."
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-white text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => {
          return (
            <div
              key={file.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Type icon, Case badge, & Verified Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    {getFileIcon(file.type)}
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Safe
                  </span>
                </div>

                {/* Filename & Case */}
                <h3 className="font-bold text-sm text-slate-900 truncate mb-1" title={file.filename}>
                  {file.filename}
                </h3>
                <p className="text-xs text-blue-600 font-medium truncate mb-2">
                  {file.caseName || `Case ${file.caseId}`}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {file.description || 'No additional notes provided for this file.'}
                </p>

                {/* File Details: Size, Date, ID */}
                <div className="py-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                  <div>
                    <span className="text-slate-400">Size: </span>
                    <span className="font-medium text-slate-700">{file.size}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Type: </span>
                    <span className="font-medium text-slate-700">{file.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Added: </span>
                    <span className="font-medium text-slate-700">{file.dateAdded?.slice(0, 10)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Ref: </span>
                    <span className="font-medium text-slate-700">{file.id}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                {file.type === 'Image' ? (
                  <button
                    onClick={() => onOpenCrimePhotoScanner?.(file)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Scan Crime Scene</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenAIAnalysis(file)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Explain with AI</span>
                  </button>
                )}

                <button
                  onClick={() => onOpenEvidenceDetail(file)}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  title="View Details"
                >
                  <span>Details</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredFiles.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">No files found</h3>
          <p className="text-sm text-slate-500 mt-1 mb-4">
            No evidence matches your search filters in this case.
          </p>
          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload New File</span>
          </button>
        </div>
      )}
    </div>
  );
}
