import React, { useState } from 'react';
import { 
  Download, 
  Upload, 
  RotateCcw, 
  Database, 
  HardDrive, 
  ShieldCheck, 
  AlertTriangle,
  Check,
  FileSpreadsheet,
  FileCode
} from 'lucide-react';

interface SettingsViewProps {
  onExportJSON: () => void;
  onExportCSV: () => void;
  onImportJSON: (file: File) => void;
  onResetData: () => void;
  totalRecords: {
    ideas: number;
    assumptions: number;
    interviews: number;
    competitors: number;
    experiments: number;
  };
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onExportJSON,
  onExportCSV,
  onImportJSON,
  onResetData,
  totalRecords
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJSON(file);
      setImportStatus(`Imported ${file.name} successfully!`);
      setTimeout(() => setImportStatus(null), 3000);
    }
  };

  return (
    <div className="max-w-3xl space-y-6 pb-12">
      {/* Title */}
      <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <h2 className="text-base font-bold text-[#0f172a]">Settings & Local Data Storage</h2>
        <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
          Manage your research data, export empirical audits for investors, or backup locally.
        </p>
      </div>

      {/* 1. Local Data Storage Explanation */}
      <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-5 shadow-[0_1px_2px_0_rgba(15,23_42,0.04)] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0f172a]">
          <HardDrive className="w-4 h-4 text-[#4f46e5]" />
          <span>Local Storage Architecture & Privacy</span>
        </div>
        <p className="text-xs text-[#64748b] leading-relaxed">
          IdeaValidator operates completely client-side in your browser's private <code className="bg-[#f1f5f9] px-1.5 py-0.5 rounded font-mono text-[#0f172a]">localStorage</code> sandbox. Your interview quotes, assumption testing, competitor intelligence, and business model hypotheses never leave this device and are never sent to external servers or used for model training.
        </p>

        {/* Current Database Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-[#f1f5f9] text-xs">
          <div className="p-2.5 bg-[#faf8ff] rounded border border-[#e2e8f0]">
            <span className="text-[10px] text-[#64748b] block">Ideas</span>
            <span className="font-mono text-base font-bold text-[#0f172a]">{totalRecords.ideas}</span>
          </div>
          <div className="p-2.5 bg-[#faf8ff] rounded border border-[#e2e8f0]">
            <span className="text-[10px] text-[#64748b] block">Assumptions</span>
            <span className="font-mono text-base font-bold text-[#0f172a]">{totalRecords.assumptions}</span>
          </div>
          <div className="p-2.5 bg-[#faf8ff] rounded border border-[#e2e8f0]">
            <span className="text-[10px] text-[#64748b] block">Interviews</span>
            <span className="font-mono text-base font-bold text-[#0f172a]">{totalRecords.interviews}</span>
          </div>
          <div className="p-2.5 bg-[#faf8ff] rounded border border-[#e2e8f0]">
            <span className="text-[10px] text-[#64748b] block">Competitors</span>
            <span className="font-mono text-base font-bold text-[#0f172a]">{totalRecords.competitors}</span>
          </div>
          <div className="p-2.5 bg-[#faf8ff] rounded border border-[#e2e8f0] col-span-2 sm:col-span-1">
            <span className="text-[10px] text-[#64748b] block">Experiments</span>
            <span className="font-mono text-base font-bold text-[#0f172a]">{totalRecords.experiments}</span>
          </div>
        </div>
      </div>

      {/* 2. Export Data (JSON & CSV fit inside viewport on mobile) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0f172a]">
          <Download className="w-4 h-4 text-[#4f46e5]" />
          <span>Export Research & Audit Data</span>
        </div>
        <p className="text-xs text-[#64748b] leading-relaxed">
          Download clean snapshots of all validation records for team sharing, spreadsheets, or investor memos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={onExportJSON}
            className="w-full min-h-[44px] px-4 py-2 bg-white border border-[#e2e8f0] hover:bg-[#faf8ff] rounded-[6px] text-xs font-semibold text-[#0f172a] flex items-center justify-center gap-2 transition-colors"
          >
            <FileCode className="w-4 h-4 text-[#4f46e5]" />
            <span>Export Complete Backup (JSON)</span>
          </button>

          <button
            onClick={onExportCSV}
            className="w-full min-h-[44px] px-4 py-2 bg-white border border-[#e2e8f0] hover:bg-[#faf8ff] rounded-[6px] text-xs font-semibold text-[#0f172a] flex items-center justify-center gap-2 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export Assumptions & Data (CSV)</span>
          </button>
        </div>
      </div>

      {/* 3. Import Data */}
      <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0f172a]">
          <Upload className="w-4 h-4 text-[#4f46e5]" />
          <span>Restore Backup (Import JSON)</span>
        </div>
        <p className="text-xs text-[#64748b] leading-relaxed">
          Restore an existing research file from a prior session or device.
        </p>

        <div className="pt-1">
          <label className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-[#f8f9fa] border border-[#e2e8f0] hover:border-[#cbd5e1] rounded-[6px] text-xs font-semibold text-[#0f172a] cursor-pointer transition-colors">
            <Upload className="w-4 h-4 text-[#64748b]" />
            <span>Select JSON File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {importStatus && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-[6px] text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{importStatus}</span>
          </div>
        )}
      </div>

      {/* 4. Reset to Seed Data */}
      <div className="bg-white border border-rose-200 rounded-[8px] p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#991b1b]">
          <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
          <span>Reset Sample Seed Data</span>
        </div>
        <p className="text-xs text-[#64748b] leading-relaxed">
          Replace your current database with the default sample ideas, assumptions, customer discovery interviews, and experiments.
        </p>

        {showConfirmReset ? (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-[6px] space-y-3">
            <p className="text-xs font-semibold text-[#991b1b]">
              Are you sure? This will overwrite existing local changes with the initial seed state.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onResetData();
                  setShowConfirmReset(false);
                }}
                className="min-h-[44px] px-4 bg-[#ef4444] text-white rounded-[6px] text-xs font-semibold hover:bg-[#dc2626]"
              >
                Yes, Reset All Data
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="min-h-[44px] px-4 bg-white border border-[#e2e8f0] text-[#0f172a] rounded-[6px] text-xs font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="w-full sm:w-auto min-h-[44px] px-4 py-2 bg-white border border-rose-300 text-[#991b1b] hover:bg-rose-50 rounded-[6px] text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-[#ef4444]" />
            <span>Reset to Initial Demo State</span>
          </button>
        )}
      </div>
    </div>
  );
};
