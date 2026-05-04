import { Search, ShieldAlert, AlertTriangle } from 'lucide-react';

const CAMERAS = [
  { name: 'LYNET-01', location: 'North Entrance' },
  { name: 'LYNET-02', location: 'Employee Parking' },
  // { name: 'LYNET-03', location: 'Exit Gate South' },
  // { name: 'LYNET-04', location: 'Loading Dock' },
];

const ALERTS = [
  { plate: '7XYZ492',  type: 'Hotlist match',      time: '2m ago',  high: true },
  { plate: 'TX7BK891', type: 'Stolen vehicle',      time: '8m ago',  high: true },
  { plate: 'FL8923K',  type: 'Unregistered plate',  time: '15m ago', high: false },
];

const PILLS = [
  { label: 'Stolen',  count: 124, color: '#ef4444' },
  { label: 'Wanted',  count: 58,  color: '#eab308' },
  { label: 'Permit',  count: 312, color: '#22c55e' },
];

function SectionHead({ title, count }: { title: string; count?: number }) {
  return (
    <div style={{ padding: '6px 10px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 9, color: '#2d4280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
        {title}
      </span>
      {count !== undefined && (
        <span style={{ fontSize: 9, color: '#2d4280' }}>{count}</span>
      )}
    </div>
  );
}

interface Props {
  selectedCamera: string;
  onCameraSelect: (id: string) => void;
}

export function CameraSidebar({ selectedCamera, onCameraSelect }: Props) {
  return (
    <div style={{
      width: 200,
      flexShrink: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: '#020b2e',
      borderLeft: '1px solid #0b1f5c',
    }}>

      {/* ── Camera list ── */}
      <div style={{ flexShrink: 0, borderBottom: '1px solid #0b1f5c' }}>
        <SectionHead title="Cameras" count={4} />
        <div style={{ padding: '0 6px 6px' }}>
          {CAMERAS.map(cam => {
            const sel = selectedCamera === cam.name;
            return (
              <div
                key={cam.name}
                onClick={() => onCameraSelect(cam.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '5px 6px', borderRadius: 3, cursor: 'pointer',
                  background: sel ? 'rgba(77,114,232,0.08)' : 'transparent',
                  borderLeft: sel ? '2px solid #0530AD' : '2px solid transparent',
                  marginBottom: 2,
                  transition: 'background 0.12s',
                }}
              >
                {/* Mini cam icon */}
                <div style={{
                  width: 32, height: 20, flexShrink: 0,
                  background: '#01061a', border: '1px solid #0b1f5c', borderRadius: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 12, height: 8, border: '1px solid #0b1f5c', borderRadius: 1 }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: sel ? '#4d72e8' : '#dce5f5' }}>{cam.name}</span>
                    <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                  </div>
                  <span style={{ fontSize: 9, color: '#2d4280', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {cam.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Active Alerts ── */}
      <div style={{ flexShrink: 0, borderBottom: '1px solid #0b1f5c' }}>
        <SectionHead title="Active Alerts" count={ALERTS.length} />
        <div style={{ padding: '0 6px 6px' }}>
          {ALERTS.map((a, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '4px 6px', borderRadius: 3, cursor: 'pointer',
              marginBottom: 2, transition: 'background 0.12s',
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 3, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: a.high ? 'rgba(239,68,68,0.12)' : 'rgba(234,179,8,0.12)',
              }}>
                {a.high
                  ? <ShieldAlert size={13} color="#ef4444" />
                  : <AlertTriangle size={13} color="#eab308" />
                }
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#dce5f5' }}>{a.plate}</span>
                  <span style={{ fontSize: 9, color: '#2d4280' }}>{a.time}</span>
                </div>
                <span style={{ fontSize: 9, color: '#7a9cc8', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {a.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hotlist Lookup — flex:1 ── */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '6px 8px', gap: 8 }}>
        <SectionHead title="Hotlist Lookup" />
        {/* Search */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Search size={12} color="#2d4280" style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Enter plate..."
            style={{
              width: '100%', padding: '5px 8px 5px 26px',
              background: '#01061a', border: '1px solid #0b1f5c', borderRadius: 3,
              color: '#dce5f5', fontSize: 11, outline: 'none',
              transition: 'border-color 0.12s',
            }}
            onFocus={e => (e.target.style.borderColor = '#4d72e8')}
            onBlur={e => (e.target.style.borderColor = '#0b1f5c')}
          />
        </div>
        {/* Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {PILLS.map(p => (
            <span key={p.label} style={{
              padding: '2px 8px', borderRadius: 3, fontSize: 10, fontWeight: 600,
              border: `1px solid ${p.color}44`,
              background: `${p.color}12`,
              color: p.color,
              display: 'flex', alignItems: 'center', gap: 5,
              cursor: 'pointer',
            }}>
              <span>{p.label}</span>
              <span style={{ opacity: 0.75, fontSize: 9 }}>{p.count}</span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
