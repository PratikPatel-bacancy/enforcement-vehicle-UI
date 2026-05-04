import { useEffect, useState } from 'react';

function SignalBars() {
  return (
    <svg width="20" height="13" viewBox="0 0 20 13" fill="none">
      <rect x="0"  y="9"  width="3" height="4"  fill="#4d72e8" />
      <rect x="4"  y="6"  width="3" height="7"  fill="#4d72e8" />
      <rect x="8"  y="3"  width="3" height="10" fill="#4d72e8" />
      <rect x="12" y="0"  width="3" height="13" fill="#4d72e8" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
      <rect x="0" y="3" width="18" height="11" rx="2" stroke="#7a9cc8" strokeWidth="1.4" />
      <circle cx="9" cy="8.5" r="2.8" stroke="#7a9cc8" strokeWidth="1.4" />
      <path d="M6.5 3V2a1 1 0 011-1h3a1 1 0 011 1v1" stroke="#7a9cc8" strokeWidth="1.4" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="15" height="18" viewBox="0 0 15 18" fill="none">
      <path d="M7.5 1L1 4v5c0 3.8 2.8 7.2 6.5 8.2C11.2 16.2 14 12.8 14 9V4L7.5 1z"
        stroke="#7a9cc8" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M5 9l1.5 1.5L10 6.5" stroke="#22c55e" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
      <path d="M3 8l2-5h10l2 5" stroke="#7a9cc8" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="1" y="8" width="18" height="5" rx="1.5" stroke="#7a9cc8" strokeWidth="1.4" />
      <circle cx="5"  cy="13" r="1.5" fill="#7a9cc8" />
      <circle cx="15" cy="13" r="1.5" fill="#7a9cc8" />
    </svg>
  );
}

const SEP = (
  <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.09)', flexShrink: 0 }} />
);

export function StatusBar() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();

  return (
    <div style={{
      height: 64,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: 18,
      background: 'linear-gradient(180deg,#020c35 0%,#010c2e 100%)',
      borderBottom: '1px solid #0b1f5c',
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8, flexShrink: 0,
          background: 'linear-gradient(135deg,#0424a0,#0530AD)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L3 7v6c0 4.42 3.05 8.54 7 9.5 3.95-.96 7-5.08 7-9.5V7l-7-5z"
              stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#e0eaf8', letterSpacing: '0.02em', lineHeight: 1.2 }}>
            <span style={{ color: '#4d72e8' }}>VeriFlow</span> SaaS
          </div>
          <div style={{ fontSize: 9, color: '#7a9cc8', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.3 }}>
            In-Vehicle Patrol Dashboard
          </div>
        </div>
      </div>

      {SEP}

      {/* 5G */}
      {/* <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
        <SignalBars />
        <span style={{ color: '#4d72e8', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>5G</span>
        <SignalBars />
      </div> */}

      {/* {SEP} */}

      {/* RTK Lock */}
      {/* <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{
          width: 9, height: 9, borderRadius: '50%', background: '#22c55e', flexShrink: 0,
          boxShadow: '0 0 7px rgba(34,197,94,0.75)',
          animation: 'blink 2s ease-in-out infinite',
        }} />
        <div>
          <div style={{ fontSize: 9, color: '#4a6098', letterSpacing: '0.1em', lineHeight: 1.3 }}>RTK LOCK</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', letterSpacing: '0.06em', lineHeight: 1.3 }}>BONAL</div>
        </div>
      </div> */}

      {/* {SEP} */}

      

      {/* Push right items to the end */}
      <div style={{ flex: 1 }} />

      {/* Lynet Cameras */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <CameraIcon />
        <div>
          <div style={{ fontSize: 9, color: '#7a9cc8', letterSpacing: '0.1em', lineHeight: 1.3 }}>LYNET CAMERAS</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', letterSpacing: '0.06em', lineHeight: 1.3 }}>OPERATIONAL</div>
        </div>
      </div>

      {SEP}

      {/* Clock */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#e0eaf8', letterSpacing: '0.04em', lineHeight: 1.3 }}>{timeStr}</div>
        <div style={{ fontSize: 9, color: '#7a9cc8', letterSpacing: '0.1em', lineHeight: 1.3 }}>{dateStr}</div>
      </div>

      {SEP}

      {/* Officer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <BadgeIcon />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#e0eaf8', letterSpacing: '0.04em', lineHeight: 1.3 }}>OFC. J. ANDERSON</div>
          <div style={{ fontSize: 9, color: '#7a9cc8', letterSpacing: '0.08em', lineHeight: 1.3 }}>ID: 4587</div>
        </div>
      </div>

      {SEP}

      {/* Unit */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <CarIcon />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#e0eaf8', letterSpacing: '0.04em', lineHeight: 1.3 }}>UNIT 12</div>
          <div style={{ fontSize: 9, color: '#7a9cc8', letterSpacing: '0.08em', lineHeight: 1.3 }}>PATROL</div>
        </div>
      </div>

    </div>
  );
}
