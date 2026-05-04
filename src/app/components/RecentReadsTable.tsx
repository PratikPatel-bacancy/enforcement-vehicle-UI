import { useState } from 'react';

type Status = 'alert' | 'clear' | 'unknown' | 'stolen';

interface Row {
  plate: string;
  time: string;
  camera: string;
  status: Status;
  label: string;
}

const ROWS: Row[] = [
  { plate: '7XYZ492',  time: '14:23:45', camera: 'LYNET-01', status: 'alert',   label: 'Hotlist' },
  { plate: 'ABC1234', time: '14:22:18', camera: 'LYNET-02', status: 'clear',   label: 'Clear'   },
  { plate: 'TX5KM987', time: '14:21:03', camera: 'LYNET-01', status: 'clear',   label: 'Clear'   },
  { plate: 'FL8923K',  time: '14:19:47', camera: 'LYNET-03', status: 'unknown', label: 'Unknown' },
  { plate: 'TX7BK891', time: '14:15:30', camera: 'LYNET-01', status: 'stolen',  label: 'Stolen'  },
];

const DOT: Record<Status, string> = {
  alert:   '#ef4444',
  stolen:  '#ef4444',
  clear:   '#22c55e',
  unknown: '#eab308',
};

function Badge({ status, label }: { status: Status; label: string }) {
  const c = DOT[status];
  return (
    <span style={{
      padding: '1px 7px', borderRadius: 3, fontSize: 10, fontWeight: 600,
      background: `${c}18`, border: `1px solid ${c}44`, color: c,
    }}>
      {label}
    </span>
  );
}

const FILTERS = ['All', 'Alerts', 'Clear'] as const;

export function RecentReadsTable() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>('All');

  const rows = ROWS.filter(r => {
    if (filter === 'Alerts') return r.status === 'alert' || r.status === 'stolen';
    if (filter === 'Clear')  return r.status === 'clear';
    return true;
  });

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '5px 10px', background: '#020b2e', borderBottom: '1px solid #0b1f5c',
      }}>
        <span style={{ fontSize: 10, color: '#7a9cc8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          Recent Reads
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '1px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700,
              border: '1px solid',
              borderColor: filter === f ? '#4d72e8' : '#0b1f5c',
              background: filter === f ? 'rgba(77,114,232,0.12)' : 'transparent',
              color: filter === f ? '#4d72e8' : '#2d4280',
              textTransform: 'uppercase', letterSpacing: '0.04em',
              transition: 'all 0.12s',
            }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ background: '#020b2e', position: 'sticky', top: 0, zIndex: 1 }}>
              {[['', '20px'], ['Plate', ''], ['Time', '80px'], ['Camera', '72px'], ['Status', '80px']].map(([h, w], i) => (
                <th key={i} style={{
                  textAlign: 'left', padding: '4px 8px',
                  fontSize: 9, color: '#7a9cc8',
                  textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600,
                  borderBottom: '1px solid #0b1f5c',
                  width: w || 'auto',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{
                borderBottom: '1px solid #0b1f5c',
                background: (r.status === 'alert' || r.status === 'stolen')
                  ? 'rgba(239,68,68,0.04)' : 'transparent',
              }}>
                <td style={{ padding: '5px 8px' }}>
                  <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: DOT[r.status] }} />
                </td>
                <td style={{ padding: '5px 8px', color: '#dce5f5', fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.plate}
                </td>
                <td style={{ padding: '5px 8px', color: '#7a9cc8', fontSize: 11 }}>
                  {r.time}
                </td>
                <td style={{ padding: '5px 8px', color: '#7a9cc8', fontSize: 11 }}>
                  {r.camera}
                </td>
                <td style={{ padding: '5px 8px' }}>
                  <Badge status={r.status} label={r.label} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
