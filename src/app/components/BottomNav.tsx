interface Props {
  activeTab: string;
  onTabChange: (id: string) => void;
}

// ── Detailed SVG icons ─────────────────────────────────────────────────────

function IconMonitor({ active }: { active: boolean }) {
  const c = '#4d72e8';
  const bright = '#6a8cd8';
  return (
    <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
      {/* Screen body */}
      <rect x="3" y="4" width="30" height="20" rx="3" fill={active ? 'url(#mon_bg_a)' : 'url(#mon_bg_i)'} stroke={c} strokeWidth="1.2" />
      {/* Screen glare */}
      <rect x="5" y="6" width="26" height="16" rx="2" fill={active ? 'rgba(147,197,253,0.08)' : 'rgba(74,96,128,0.1)'} />
      {/* Scan line on active */}
      {active && <rect x="5" y="14" width="26" height="1.5" fill="rgba(77,114,232,0.25)" rx="1" />}
      {/* Camera dot */}
      <circle cx="18" cy="5.5" r="1" fill={bright} />
      {/* Stand */}
      <path d="M13 24h10l2 5H11l2-5z" fill={c} opacity="0.7" />
      <rect x="10" y="29" width="16" height="2" rx="1" fill={c} opacity="0.5" />
      {/* Signal dots on screen */}
      <circle cx="12" cy="14" r="1.5" fill="#22c55e" />
      <circle cx="17" cy="12" r="1.5" fill="#4d72e8" />
      <circle cx="22" cy="15" r="1.5" fill="#f59e0b" />
      <path d="M12 14 L17 12 L22 15" stroke="#4d72e8" strokeWidth="0.8" opacity="0.6" />
      <defs>
        <linearGradient id="mon_bg_a" x1="3" y1="4" x2="3" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d2870" /><stop offset="1" stopColor="#0d1e35" />
        </linearGradient>
        <linearGradient id="mon_bg_i" x1="3" y1="4" x2="3" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0a1848" /><stop offset="1" stopColor="#010e38" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconHistory({ active }: { active: boolean }) {
  const c = '#f59e0b';
  return (
    <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
      {/* Clock face */}
      <circle cx="18" cy="18" r="13" fill={active ? 'url(#his_bg)' : 'url(#his_bgi)'} stroke={c} strokeWidth="1.2" />
      {/* Inner ring */}
      <circle cx="18" cy="18" r="10" stroke={active ? 'rgba(245,158,11,0.2)' : 'rgba(74,96,128,0.15)'} strokeWidth="0.8" />
      {/* Hour ticks */}
      {[0,60,120,180,240,300].map((deg, i) => {
        const r = deg * Math.PI / 180;
        const x1 = 18 + 9.5 * Math.sin(r);
        const y1 = 18 - 9.5 * Math.cos(r);
        const x2 = 18 + 11.5 * Math.sin(r);
        const y2 = 18 - 11.5 * Math.cos(r);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="1.2" opacity="0.6" />;
      })}
      {/* Hour hand (pointing ~10 o'clock) */}
      <line x1="18" y1="18" x2="12" y2="11" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1="18" y1="18" x2="18" y2="9" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="18" cy="18" r="1.8" fill={c} />
      {/* Glare */}
      <ellipse cx="14" cy="12" rx="3" ry="2" fill="rgba(255,255,255,0.06)" transform="rotate(-30 14 12)" />
      <defs>
        <linearGradient id="his_bg" x1="5" y1="5" x2="31" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3d2000" /><stop offset="1" stopColor="#1a1000" />
        </linearGradient>
        <linearGradient id="his_bgi" x1="5" y1="5" x2="31" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a2030" /><stop offset="1" stopColor="#020a28" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconViolations({ active }: { active: boolean }) {
  const c = '#ef4444';
  return (
    <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
      {/* Triangle */}
      <path d="M18 4L33 30H3L18 4z" fill={active ? 'url(#vio_bg)' : 'url(#vio_bgi)'} stroke={c} strokeWidth="1.2" strokeLinejoin="round" />
      {/* Inner triangle border */}
      <path d="M18 8L30 28H6L18 8z" stroke={active ? 'rgba(239,68,68,0.25)' : 'rgba(74,96,128,0.1)'} strokeWidth="0.7" strokeLinejoin="round" fill="none" />
      {/* Exclamation mark */}
      <rect x="16.5" y="14" width="3" height="9" rx="1.5" fill="#fca5a5" />
      <circle cx="18" cy="26" r="1.8" fill="#fca5a5" />
      {/* Glare */}
      <path d="M10 20L18 6" stroke="rgba(255,255,255,0.07)" strokeWidth="3" strokeLinecap="round" />
      <defs>
        <linearGradient id="vio_bg" x1="18" y1="4" x2="18" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4d1010" /><stop offset="1" stopColor="#1a0505" />
        </linearGradient>
        <linearGradient id="vio_bgi" x1="18" y1="4" x2="18" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e2535" /><stop offset="1" stopColor="#020a28" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconReports({ active }: { active: boolean }) {
  const c = '#22c55e';
  return (
    <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
      {/* Document base */}
      <rect x="6" y="3" width="24" height="30" rx="3" fill={active ? 'url(#rep_bg)' : 'url(#rep_bgi)'} stroke={c} strokeWidth="1.2" />
      {/* Folded corner */}
      <path d="M24 3 L30 9 L24 9 Z" fill={active ? '#064e3b' : '#010e38'} stroke={c} strokeWidth="1" />
      {/* Bar chart inside */}
      <rect x="10" y="22" width="3"  height="6"  rx="1" fill="#22c55e" />
      <rect x="15" y="18" width="3"  height="10" rx="1" fill="#4ade80" />
      <rect x="20" y="14" width="3"  height="14" rx="1" fill="#86efac" />
      {/* Trend line */}
      <path d="M11.5 22 L16.5 18 L21.5 14" stroke="#bbf7d0" strokeWidth="1.2" strokeDasharray="1.5 1" opacity="0.7" />
      {/* Lines */}
      <rect x="10" y="10" width="10" height="1.2" rx="0.6" fill="rgba(34,197,94,0.4)" />
      <rect x="10" y="13" width="7"  height="1.2" rx="0.6" fill="rgba(34,197,94,0.3)" />
      <defs>
        <linearGradient id="rep_bg" x1="6" y1="3" x2="6" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#052e16" /><stop offset="1" stopColor="#021a0d" />
        </linearGradient>
        <linearGradient id="rep_bgi" x1="6" y1="3" x2="6" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0a1848" /><stop offset="1" stopColor="#010e38" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconSettings({ active }: { active: boolean }) {
  const c = '#7a9cc8';
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
      {/* Outer gear ring */}
      <circle cx="18" cy="18" r="13" fill={active ? 'url(#set_bg)' : 'url(#set_bgi)'} stroke={c} strokeWidth="1.2" />
      {/* Gear teeth */}
      {teeth.map((deg, i) => {
        const r = deg * Math.PI / 180;
        const x1 = 18 + 12 * Math.sin(r);
        const y1 = 18 - 12 * Math.cos(r);
        const x2 = 18 + 15 * Math.sin(r);
        const y2 = 18 - 15 * Math.cos(r);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="3.5" strokeLinecap="round" />;
      })}
      {/* Inner circle */}
      <circle cx="18" cy="18" r="8" fill={active ? '#0d2060' : '#080f3a'} stroke={c} strokeWidth="1" />
      {/* Center hole */}
      <circle cx="18" cy="18" r="3.5" fill={active ? '#010e35' : '#020b2e'} stroke={active ? '#4d72e8' : '#122070'} strokeWidth="0.8" />
      {/* Glare */}
      <ellipse cx="13" cy="13" rx="3" ry="2" fill="rgba(255,255,255,0.05)" transform="rotate(-30 13 13)" />
      <defs>
        <linearGradient id="set_bg" x1="5" y1="5" x2="31" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e2e45" /><stop offset="1" stopColor="#0d1828" />
        </linearGradient>
        <linearGradient id="set_bgi" x1="5" y1="5" x2="31" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#151f2d" /><stop offset="1" stopColor="#0a1020" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Tab config ─────────────────────────────────────────────────────────────

const TABS = [
  { id: 'monitor',    label: 'Monitor',    Icon: IconMonitor },
  { id: 'history',    label: 'History',    Icon: IconHistory },
  { id: 'violations', label: 'Violations', Icon: IconViolations },
  { id: 'reports',    label: 'Reports',    Icon: IconReports },
  { id: 'settings',   label: 'Settings',   Icon: IconSettings },
];

// ── Component ──────────────────────────────────────────────────────────────

export function BottomNav({ activeTab, onTabChange }: Props) {
  return (
    <div style={{
      height: 96,
      flexShrink: 0,
      display: 'flex',
      background: 'linear-gradient(180deg,#020c35 0%,#010818 100%)',
      borderTop: '1px solid #0b1f5c',
      position: 'relative',
    }}>
      {/* Top highlight line */}
      <div style={{
        position: 'absolute', top: 0, left: '5%', right: '5%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(77,114,232,0.15), transparent)',
        pointerEvents: 'none',
      }} />

      {TABS.map(({ id, label, Icon }, i) => {
        const active = activeTab === id;
        return (
          <div key={id} style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
            {/* Separator before each tab except first */}
            {i > 0 && (
              <div style={{
                width: 1, alignSelf: 'center', height: 56,
                background: 'rgba(255,255,255,0.06)',
                flexShrink: 0,
              }} />
            )}
            <button
              onClick={() => onTabChange(id)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                background: active
                  ? 'linear-gradient(180deg, rgba(5,48,173,0.15) 0%, rgba(5,48,173,0.05) 100%)'
                  : 'transparent',
                border: 'none',
                borderTop: active ? '2px solid #0530AD' : '2px solid transparent',
                padding: '0 4px',
                cursor: 'pointer',
                transition: 'background 0.15s',
                position: 'relative',
              }}
            >
              {/* Glow behind active icon */}
              {active && (
                <div style={{
                  position: 'absolute',
                  top: 6, left: '50%', transform: 'translateX(-50%)',
                  width: 58, height: 58, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(77,114,232,0.18) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
              )}

              <Icon active={active} />

              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#e0eaf8',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}>
                {label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
