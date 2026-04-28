import { Search, Download, Calendar } from 'lucide-react';

interface HistoryRecord {
  id: number;
  plate: string;
  date: string;
  time: string;
  camera: string;
  status: 'alert' | 'clear' | 'unknown';
  statusLabel: string;
  confidence: string;
  region: string;
}

const mockHistory: HistoryRecord[] = [
  { id: 1, plate: '7XYZ492', date: '2026-04-17', time: '14:23:45', camera: 'CAM-01', status: 'alert', statusLabel: 'Hotlist', confidence: '98.4%', region: 'California' },
  { id: 2, plate: 'ABC-1234', date: '2026-04-17', time: '14:22:18', camera: 'CAM-02', status: 'clear', statusLabel: 'Clear', confidence: '99.2%', region: 'New York' },
  { id: 3, plate: 'TX5KM987', date: '2026-04-17', time: '14:21:03', camera: 'CAM-01', status: 'clear', statusLabel: 'Clear', confidence: '97.8%', region: 'Texas' },
  { id: 4, plate: 'FL8923K', date: '2026-04-17', time: '14:19:47', camera: 'CAM-03', status: 'unknown', statusLabel: 'Unknown', confidence: '85.3%', region: 'Florida' },
  { id: 5, plate: 'NY5HJ729', date: '2026-04-17', time: '14:18:22', camera: 'CAM-04', status: 'clear', statusLabel: 'Clear', confidence: '96.7%', region: 'New York' },
  { id: 6, plate: 'IL3BN456', date: '2026-04-17', time: '14:16:55', camera: 'CAM-02', status: 'clear', statusLabel: 'Clear', confidence: '98.9%', region: 'Illinois' },
  { id: 7, plate: 'TX7BK891', date: '2026-04-17', time: '14:15:30', camera: 'CAM-01', status: 'alert', statusLabel: 'Stolen', confidence: '99.5%', region: 'Texas' },
  { id: 8, plate: 'CA8WP234', date: '2026-04-17', time: '14:14:12', camera: 'CAM-03', status: 'clear', statusLabel: 'Clear', confidence: '97.3%', region: 'California' },
  { id: 9, plate: 'AZ4MR567', date: '2026-04-17', time: '14:12:45', camera: 'CAM-02', status: 'clear', statusLabel: 'Clear', confidence: '98.1%', region: 'Arizona' },
  { id: 10, plate: 'NV2PQ890', date: '2026-04-17', time: '14:11:30', camera: 'CAM-04', status: 'unknown', statusLabel: 'Unknown', confidence: '82.6%', region: 'Nevada' },
];

export function History() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'alert': return 'var(--alert-red)';
      case 'clear': return 'var(--success-green)';
      case 'unknown': return 'var(--warning-amber)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      {/* Filter Bar */}
      <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg p-4">
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search plate number..."
              className="w-full bg-[var(--surface-raised)] border border-[var(--vf-border)] rounded px-9 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--pure-blue)] focus:ring-opacity-40"
            />
          </div>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="date"
              className="w-full bg-[var(--surface-raised)] border border-[var(--vf-border)] rounded px-9 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--pure-blue)] focus:ring-opacity-40"
            />
          </div>
          <button className="bg-[var(--pure-blue)] text-white rounded px-4 py-2 text-sm font-semibold hover:bg-[var(--royal-navy)] transition-colors">
            Search
          </button>
          <button className="bg-[var(--blue-tint)] text-[var(--pure-blue)] border border-[var(--royal-navy)] rounded px-4 py-2 text-sm font-semibold hover:bg-[var(--royal-navy)] hover:text-white transition-colors flex items-center justify-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--surface-raised)] border-b border-[var(--vf-border)]">
              <th className="text-left px-4 py-3 text-[var(--text-muted)] text-xs uppercase tracking-wide font-semibold">Plate</th>
              <th className="text-left px-4 py-3 text-[var(--text-muted)] text-xs uppercase tracking-wide font-semibold">Date</th>
              <th className="text-left px-4 py-3 text-[var(--text-muted)] text-xs uppercase tracking-wide font-semibold">Time</th>
              <th className="text-left px-4 py-3 text-[var(--text-muted)] text-xs uppercase tracking-wide font-semibold">Camera</th>
              <th className="text-left px-4 py-3 text-[var(--text-muted)] text-xs uppercase tracking-wide font-semibold">Status</th>
              <th className="text-left px-4 py-3 text-[var(--text-muted)] text-xs uppercase tracking-wide font-semibold">Confidence</th>
              <th className="text-left px-4 py-3 text-[var(--text-muted)] text-xs uppercase tracking-wide font-semibold">Region</th>
            </tr>
          </thead>
          <tbody>
            {mockHistory.map((record) => (
              <tr
                key={record.id}
                className="border-b border-[var(--vf-border)] last:border-b-0 hover:bg-[var(--surface-raised)] transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 text-[var(--text-primary)] font-mono font-semibold tracking-wider">
                  {record.plate}
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-sm">
                  {record.date}
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-sm">
                  {record.time}
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-sm">
                  {record.camera}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${getStatusColor(record.status)}1A`,
                      color: getStatusColor(record.status),
                    }}
                  >
                    {record.statusLabel}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-sm">
                  {record.confidence}
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)] text-sm">
                  {record.region}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
