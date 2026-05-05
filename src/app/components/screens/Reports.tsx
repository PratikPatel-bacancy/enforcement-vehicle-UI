import { useState } from 'react';
import { TODAY_STATS } from '../../data/vehicleConfig';

// ── Mock analytics data ────────────────────────────────────────────────────

const VIOLATION_STATUS = [
  { label: 'Active',   count: 4, color: '#ef4444', bg: 'rgba(239,68,68,0.15)'  },
  { label: 'Pending',  count: 3, color: '#eab308', bg: 'rgba(234,179,8,0.15)'  },
  { label: 'Resolved', count: 1, color: '#22c55e', bg: 'rgba(34,197,94,0.15)'  },
];

const VIOLATION_TYPES = [
  { label: 'Overstay',              count: 3 },
  { label: 'No Payment',            count: 2 },
  { label: 'Handicap Stall',        count: 1 },
  { label: 'Re-Park Detected',      count: 1 },
  { label: 'No Standing Violation', count: 1 },
];

const KPI_TOOLTIPS: Record<string, string> = {
  'Total Scans Today':
    'Total number of license plate reads captured by all cameras since midnight today.',
  'Unique Plates':
    'Count of distinct plate numbers seen today — repeated reads of the same plate are counted only once.',
  'Read Success Rate':
    'Percentage of scans where the OCR engine successfully identified the plate with acceptable confidence.\nFormula: Successful reads ÷ Total scans × 100',
  'Hit Rate':
    'Percentage of scans that triggered an alert — hotlist match, expired registration, or unknown plate.\nFormula: Alerts triggered ÷ Total scans × 100\nExample: 20 alerts ÷ 247 scans = 8.1%',
};

// ── Component ──────────────────────────────────────────────────────────────

export function Reports() {
  const totalViolations = VIOLATION_STATUS.reduce((s, v) => s + v.count, 0);
  const maxVType        = Math.max(...VIOLATION_TYPES.map(v => v.count));

  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      padding: 10,
      display: 'flex', flexDirection: 'column', gap: 10,
      boxSizing: 'border-box',
    }}>

      {/* ── KPI strip ────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <KpiCard label="Total Scans Today" value={String(TODAY_STATS.totalScans)}   accent="#4d72e8" />
        <KpiCard label="Unique Plates"     value={String(TODAY_STATS.uniquePlates)} accent="#4d72e8" />
        <KpiCard label="Read Success Rate" value={`${TODAY_STATS.readSuccessRate}%`} accent="#22c55e" />
        <KpiCard label="Hit Rate"          value={`${TODAY_STATS.hitRate}%`}         accent="#ef4444" />
      </div>

      {/* ── Violations ───────────────────────────────────────────────────── */}
      <div>
        <Panel title={`Violations Today — ${totalViolations} Total`}>
          {/* Status tiles */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {VIOLATION_STATUS.map(({ label, count, color, bg }) => (
              <div key={label} style={{
                flex: 1, textAlign: 'center', padding: '10px 6px',
                background: bg, borderRadius: 8,
                border: `1px solid ${color}33`,
              }}>
                <div style={{ fontSize: 24, fontWeight: 700, color, fontFamily: 'monospace', lineHeight: 1.1 }}>{count}</div>
                <div style={{ fontSize: 11, color: '#c0d8f8', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Type breakdown */}
          <div style={{ borderTop: '1px solid #0b1f5c', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 9 }}>
            {VIOLATION_TYPES.map(({ label, count }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: '#c0d8f8', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {label}
                </span>
                <div style={{ width: 80, height: 5, background: '#0a2255', borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}>
                  <div style={{ width: `${(count / maxVType) * 100}%`, height: '100%', background: '#4d72e8', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#f0f6ff', fontFamily: 'monospace', width: 16, textAlign: 'right', flexShrink: 0 }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

    </div>
  );
}

// ── KpiCard ────────────────────────────────────────────────────────────────

function KpiCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  const [open, setOpen] = useState(false);
  const tooltip = KPI_TOOLTIPS[label];

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        background: '#071c48',
        border: '1px solid #0b1f5c',
        borderTop: `2px solid ${accent}`,
        borderRadius: 10,
        padding: '14px 16px',
      }}>
        {/* Label + info icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#8aaad8', textTransform: 'uppercase', letterSpacing: '0.1em', flex: 1 }}>
            {label}
          </span>
          {tooltip && (
            <button
              onClick={() => setOpen(o => !o)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}
            >
              <InfoIcon active={open} />
            </button>
          )}
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#f0f6ff', fontFamily: 'monospace', lineHeight: 1 }}>
          {value}
        </div>
      </div>

      {/* Tooltip popup */}
      {open && tooltip && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 10px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          background: '#0a1535',
          border: '1px solid #1e3a70',
          borderRadius: 8,
          padding: '11px 14px',
          width: 248,
          boxShadow: '0 8px 28px rgba(0,0,0,0.75)',
        }}>
          {/* Arrow */}
          <div style={{
            position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)',
            width: 8, height: 8, background: '#0a1535',
            border: '1px solid #1e3a70', borderTop: 'none', borderLeft: 'none',
            rotate: '45deg',
          }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
            {label}
          </div>
          {tooltip.split('\n').map((line, i) => (
            <div key={i} style={{
              fontSize: 12,
              color: i === 0 ? '#c0d8f8' : '#8aaad8',
              lineHeight: 1.55,
              marginTop: i > 0 ? 5 : 0,
              fontFamily: line.startsWith('Formula') || line.startsWith('Example') ? 'ui-monospace, monospace' : 'inherit',
            }}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── InfoIcon ───────────────────────────────────────────────────────────────

function InfoIcon({ active }: { active: boolean }) {
  const c = active ? '#4d72e8' : '#8aaad8';
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: active ? 1 : 0.65 }}>
      <circle cx="7" cy="7" r="6.2" stroke={c} strokeWidth="1.2" fill={active ? 'rgba(77,114,232,0.15)' : 'none'} />
      <rect x="6.3" y="6" width="1.4" height="4.5" rx="0.7" fill={c} />
      <circle cx="7" cy="4.2" r="0.9" fill={c} />
    </svg>
  );
}

// ── Panel ──────────────────────────────────────────────────────────────────

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: '#071c48',
      border: '1px solid #0b1f5c',
      borderRadius: 10,
      padding: '14px 16px',
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#8aaad8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
        {title}
      </div>
      {children}
    </div>
  );
}
