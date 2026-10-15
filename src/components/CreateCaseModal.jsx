import React, { useState } from 'react';
import {
  X,
  FolderLock,
  Plus,
  ShieldAlert,
  User,
  Tag,
  AlertTriangle
} from 'lucide-react';

export default function CreateCaseModal({
  onClose,
  onCreateSuccess,
  currentUser
}) {
  const [caseId, setCaseId] = useState(`FRX-2026-00${Math.floor(6 + Math.random() * 90)}`);
  const [name, setName] = useState('');
  const [caseType, setCaseType] = useState('Critical Infrastructure Cyberattack');
  const [priority, setPriority] = useState('High');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('Cybercrime, Ransomware, High-Priority');
  const [leadSummary, setLeadSummary] = useState('');
  const [suspectName, setSuspectName] = useState('');
  const [suspectRole, setSuspectRole] = useState('Primary Suspect');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newCase = {
      id: caseId.trim() || `FRX-2026-00${Math.floor(6 + Math.random() * 90)}`,
      name: name.trim(),
      description: description.trim() || 'Active criminal investigation under forensic examination.',
      caseType,
      priority,
      status: 'Active',
      investigator: currentUser?.name || 'Lead Investigator',
      investigatorId: currentUser?.id || 'usr-1',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
      evidenceCount: 0,
      riskScore: priority === 'Critical' ? 95 : priority === 'High' ? 80 : 50,
      leadSummary: leadSummary.trim() || 'Preliminary forensic triage initiated. Collecting host bitstreams and gateway logs.',
      tags,
      keyEntities: suspectName
        ? [{ name: suspectName, type: 'PERSON', role: suspectRole }]
        : [],
      timelineEvents: [
        {
          date: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
          title: 'Case Inception & Evidence Authorization',
          description: `Case ${caseId} formally opened by ${currentUser?.name || 'Lead Investigator'}. Judicial search warrant filed.`
        }
      ]
    };

    onCreateSuccess(newCase);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-xl bg-[#0c121e] border border-cyan-500/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#090e18] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FolderLock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white font-display">
                Create New Investigation Dossier
              </h2>
              <p className="text-[10px] text-slate-400 font-mono-code">
                Assign jurisdictional classification and investigator ownership
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 overflow-y-auto font-mono-code text-xs">
          {/* Case ID and Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Case Identifier *</label>
              <input
                type="text"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#07090e] border border-slate-800 text-cyan-400 font-bold focus:outline-none focus:border-cyan-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Threat Priority *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#07090e] border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/50"
              >
                <option value="Critical">Critical (Immediate Escalation)</option>
                <option value="High">High (Active Threat)</option>
                <option value="Medium">Medium (Standard Investigation)</option>
                <option value="Low">Low (Archival / Oversight)</option>
              </select>
            </div>
          </div>

          {/* Case Name */}
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Case Operation Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Operation Chimera, Crypto Mixer Takedown"
              className="w-full p-2 rounded-lg bg-[#07090e] border border-slate-800 text-white font-semibold focus:outline-none focus:border-cyan-500/50 font-sans"
              required
            />
          </div>

          {/* Case Type */}
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Investigation Classification *</label>
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              className="w-full p-2 rounded-lg bg-[#07090e] border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/50"
            >
              <option value="Critical Infrastructure Cyberattack">Critical Infrastructure Cyberattack</option>
              <option value="Financial Crime / Money Laundering">Financial Crime / Money Laundering</option>
              <option value="Espionage & Trade Secrets">Espionage & Trade Secrets</option>
              <option value="Insider Threat & Data Exfiltration">Insider Threat & Data Exfiltration</option>
              <option value="Darknet / Narcotics Trafficking">Darknet / Narcotics Trafficking</option>
              <option value="Ransomware & Extortion">Ransomware & Extortion</option>
            </select>
          </div>

          {/* Key Suspect */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-[#07090e] border border-slate-800">
            <div>
              <label className="block text-[10px] text-slate-500 uppercase mb-1">Primary Suspect / Target</label>
              <input
                type="text"
                value={suspectName}
                onChange={(e) => setSuspectName(e.target.value)}
                placeholder="e.g. Vikram Sharma, John Doe"
                className="w-full p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-[11px]"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 uppercase mb-1">Role / Affiliation</label>
              <input
                type="text"
                value={suspectRole}
                onChange={(e) => setSuspectRole(e.target.value)}
                placeholder="e.g. Lead Developer, Syndicate Financier"
                className="w-full p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-[11px]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Case Narrative & Scope</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail breach indicators, victim infrastructure, and evidentiary warrants..."
              rows={2}
              className="w-full p-2 rounded-lg bg-[#07090e] border border-slate-800 text-slate-200 resize-none font-sans"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full p-2 rounded-lg bg-[#07090e] border border-slate-800 text-slate-300"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold flex items-center gap-2 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Establish Case Dossier</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
