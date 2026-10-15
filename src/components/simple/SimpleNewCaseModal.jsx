import React, { useState } from 'react';
import {
  X,
  FolderLock,
  Plus,
  ShieldCheck,
  User,
  AlertCircle
} from 'lucide-react';

export default function SimpleNewCaseModal({
  isOpen,
  onClose,
  onCreateSuccess,
  currentUser
}) {
  const [name, setName] = useState('');
  const [caseType, setCaseType] = useState('Cyber Incident');
  const [priority, setPriority] = useState('High');
  const [description, setDescription] = useState('');
  const [investigator, setInvestigator] = useState(currentUser?.name || 'Agent Maya Patel');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCaseId = `FRX-2026-00${Math.floor(6 + Math.random() * 90)}`;

    const newCase = {
      id: newCaseId,
      name: name.trim(),
      description: description.trim() || 'New investigation opened and assigned to forensic team.',
      caseType,
      priority,
      status: 'Active',
      investigator: investigator.trim() || 'Agent Maya Patel',
      createdDate: new Date().toISOString().slice(0, 10),
      lastUpdated: 'Just now',
      evidenceCount: 0,
      riskScore: priority === 'Critical' ? 90 : priority === 'High' ? 70 : 40,
      tags: [caseType, priority],
      keyEntities: [],
      timelineEvents: [
        {
          date: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
          title: 'Case Established',
          description: `Investigation ${name} opened by ${investigator}. Initial docket registered.`
        }
      ]
    };

    onCreateSuccess(newCase);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-150 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FolderLock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Start a New Case</h2>
              <p className="text-xs text-slate-500">Create an investigation dossier to group evidence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Case Title / Name:
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Q3 Unauthorized Wire Transfer Review"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 text-slate-800 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Category:
              </label>
              <select
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 text-slate-800 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              >
                <option value="Cyber Incident">Cyber Incident</option>
                <option value="Financial Crime">Financial Crime / Fraud</option>
                <option value="Data Breach">Data Breach / Leak</option>
                <option value="Internal Audit">Internal Audit</option>
                <option value="HR Compliance">HR Compliance</option>
                <option value="General Investigation">General Investigation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Priority:
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 text-slate-800 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Lead Investigator / Owner:
            </label>
            <input
              type="text"
              value={investigator}
              onChange={(e) => setInvestigator(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 text-slate-800 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Case Background / Description:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the background, key dates, or objectives of this case..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 text-slate-800 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 resize-none"
            />
          </div>

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
              disabled={!name.trim()}
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>Create Case</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
