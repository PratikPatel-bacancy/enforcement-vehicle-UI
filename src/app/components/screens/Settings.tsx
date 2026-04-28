import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const [alertSound, setAlertSound] = useState(true);
  const [autoCapture, setAutoCapture] = useState(true);
  const [saveToDb, setSaveToDb] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition-colors relative ${
        checked ? 'bg-[var(--pure-blue)]' : 'bg-[var(--text-muted)]'
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  );

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      {/* Camera Settings */}
      <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--vf-border)]">
          <h3 className="text-[var(--text-primary)] font-semibold">Camera settings</h3>
        </div>
        <div>
          {['Configure cameras', 'Video quality', 'Frame rate', 'PTZ controls'].map((item, index) => (
            <button
              key={item}
              className="w-full px-4 py-3 flex items-center justify-between border-b border-[var(--vf-border)] last:border-b-0 hover:bg-[var(--surface-raised)] transition-colors"
            >
              <span className="text-[var(--text-primary)]">{item}</span>
              <ChevronRight size={16} className="text-[var(--text-muted)]" />
            </button>
          ))}
        </div>
      </div>

      {/* LPR Settings */}
      <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--vf-border)]">
          <h3 className="text-[var(--text-primary)] font-semibold">LPR settings</h3>
        </div>
        <div>
          <button className="w-full px-4 py-3 flex items-center justify-between border-b border-[var(--vf-border)] hover:bg-[var(--surface-raised)] transition-colors">
            <span className="text-[var(--text-primary)]">Confidence threshold</span>
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-secondary)] font-mono">85%</span>
              <ChevronRight size={16} className="text-[var(--text-muted)]" />
            </div>
          </button>

          <div className="px-4 py-3 flex items-center justify-between border-b border-[var(--vf-border)]">
            <span className="text-[var(--text-primary)]">Alert sound</span>
            <Toggle checked={alertSound} onChange={setAlertSound} />
          </div>

          <div className="px-4 py-3 flex items-center justify-between border-b border-[var(--vf-border)]">
            <span className="text-[var(--text-primary)]">Auto-capture</span>
            <Toggle checked={autoCapture} onChange={setAutoCapture} />
          </div>

          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-[var(--text-primary)]">Save to database</span>
            <Toggle checked={saveToDb} onChange={setSaveToDb} />
          </div>
        </div>
      </div>

      {/* Hotlist */}
      <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--vf-border)]">
          <h3 className="text-[var(--text-primary)] font-semibold">Hotlist</h3>
        </div>
        <div>
          <button className="w-full px-4 py-3 flex items-center justify-between border-b border-[var(--vf-border)] hover:bg-[var(--surface-raised)] transition-colors">
            <span className="text-[var(--text-primary)]">Manage entries</span>
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-secondary)] font-mono">12 active</span>
              <ChevronRight size={16} className="text-[var(--text-muted)]" />
            </div>
          </button>

          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-[var(--text-primary)]">Auto-sync</span>
            <Toggle checked={autoSync} onChange={setAutoSync} />
          </div>
        </div>
      </div>

      {/* System */}
      <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--vf-border)]">
          <h3 className="text-[var(--text-primary)] font-semibold">System</h3>
        </div>
        <div>
          <div className="px-4 py-3 border-b border-[var(--vf-border)]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[var(--text-primary)]">Server</span>
              <span className="text-[var(--success-green)] text-sm font-semibold">Connected</span>
            </div>
            <span className="text-[var(--text-secondary)] text-sm font-mono">192.168.1.100:5000</span>
          </div>

          <button className="w-full px-4 py-3 flex items-center justify-between border-b border-[var(--vf-border)] hover:bg-[var(--surface-raised)] transition-colors">
            <span className="text-[var(--text-primary)]">Data retention</span>
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-secondary)]">90 days</span>
              <ChevronRight size={16} className="text-[var(--text-muted)]" />
            </div>
          </button>

          <div className="px-4 py-3">
            <div className="text-[var(--text-primary)]">Version</div>
            <div className="text-[var(--text-secondary)] text-sm font-mono">Veriflow 1.0.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
