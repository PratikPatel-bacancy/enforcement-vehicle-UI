import { useState } from 'react';

interface Read {
  id: number;
  plate: string;
  time: string;
  camera: string;
  status: 'alert' | 'clear' | 'unknown';
  statusLabel: string;
}

const mockReads: Read[] = [
  { id: 1, plate: '7XYZ492', time: '14:23:45', camera: 'CAM-01', status: 'alert', statusLabel: 'Hotlist' },
  { id: 2, plate: 'ABC-1234', time: '14:22:18', camera: 'CAM-02', status: 'clear', statusLabel: 'Clear' },
  { id: 3, plate: 'TX5KM987', time: '14:21:03', camera: 'CAM-01', status: 'clear', statusLabel: 'Clear' },
  { id: 4, plate: 'FL8923K', time: '14:19:47', camera: 'CAM-03', status: 'unknown', statusLabel: 'Unknown' },
  { id: 5, plate: 'NY5HJ729', time: '14:18:22', camera: 'CAM-04', status: 'clear', statusLabel: 'Clear' },
  { id: 6, plate: 'IL3BN456', time: '14:16:55', camera: 'CAM-02', status: 'clear', statusLabel: 'Clear' },
  { id: 7, plate: 'TX7BK891', time: '14:15:30', camera: 'CAM-01', status: 'alert', statusLabel: 'Stolen' },
  { id: 8, plate: 'CA8WP234', time: '14:14:12', camera: 'CAM-03', status: 'clear', statusLabel: 'Clear' },
];

export function RecentReadsTable() {
  const [filter, setFilter] = useState<'all' | 'alerts' | 'clear'>('all');

  const filteredReads = mockReads.filter((read) => {
    if (filter === 'all') return true;
    if (filter === 'alerts') return read.status === 'alert';
    if (filter === 'clear') return read.status === 'clear';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'alert': return 'var(--alert-red)';
      case 'clear': return 'var(--success-green)';
      case 'unknown': return 'var(--warning-amber)';
      default: return 'var(--text-muted)';
    }
  };

  const getRowBg = (status: string) => {
    if (status === 'alert') return 'var(--red-tint)';
    return 'transparent';
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[var(--text-primary)] font-semibold">Recent reads</h3>
        <div className="flex gap-2">
          {(['all', 'alerts', 'clear'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                filter === f
                  ? 'bg-[var(--pure-blue)] text-white'
                  : 'border border-[var(--vf-border)] text-[var(--text-secondary)] hover:border-[var(--pure-blue)]'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--surface)] border-b border-[var(--vf-border)]">
              <th className="text-left px-4 py-2 text-[var(--text-muted)] text-xs uppercase tracking-wide font-semibold w-12"></th>
              <th className="text-left px-4 py-2 text-[var(--text-muted)] text-xs uppercase tracking-wide font-semibold">Plate</th>
              <th className="text-left px-4 py-2 text-[var(--text-muted)] text-xs uppercase tracking-wide font-semibold">Time</th>
              <th className="text-left px-4 py-2 text-[var(--text-muted)] text-xs uppercase tracking-wide font-semibold">Camera</th>
              <th className="text-left px-4 py-2 text-[var(--text-muted)] text-xs uppercase tracking-wide font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredReads.map((read) => (
              <tr
                key={read.id}
                className="border-b border-[var(--vf-border)] last:border-b-0 hover:bg-[var(--surface-raised)] transition-colors cursor-pointer"
                style={{ backgroundColor: getRowBg(read.status) }}
              >
                <td className="px-4 py-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getStatusColor(read.status) }}
                  />
                </td>
                <td className="px-4 py-3 text-[var(--text-primary)] font-mono font-semibold tracking-wider">
                  {read.plate}
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-sm">
                  {read.time}
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-sm">
                  {read.camera}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${getStatusColor(read.status)}1A`,
                      color: getStatusColor(read.status),
                    }}
                  >
                    {read.statusLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
