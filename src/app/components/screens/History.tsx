import { Search, Download, Calendar } from 'lucide-react';

interface HistoryRecord {
  id: number;
  plate: string;
  date: string;
  time: string;
  camera: string;
  status: 'alert' | 'clear' | 'unknown' | 'expired';
  statusLabel: string;
  confidence: string;
  region: string;
}

const mockHistory: HistoryRecord[] = [
  // ── Today 05/04/2026 — matches LiveMonitor Recent Reads ──
  { id: 1,  plate: 'JLW8931',  date: '05/04/2026', time: '10:42:03 AM', camera: 'LYNET-01', status: 'alert',   statusLabel: 'Hotlist',     confidence: '98.7%', region: 'Texas'      },
  { id: 2,  plate: '8SAM415',  date: '05/04/2026', time: '10:41:58 AM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       confidence: '96.1%', region: 'California' },
  { id: 3,  plate: 'GHJ4521',  date: '05/04/2026', time: '10:41:52 AM', camera: 'LYNET-02', status: 'clear',   statusLabel: 'Clear',       confidence: '95.4%', region: 'Illinois'   },
  { id: 4,  plate: 'MPF8837',  date: '05/04/2026', time: '10:41:47 AM', camera: 'LYNET-01', status: 'expired', statusLabel: 'Expired Reg', confidence: '92.6%', region: 'Florida'    },
  { id: 5,  plate: 'LKP2294',  date: '05/04/2026', time: '10:41:41 AM', camera: 'LYNET-02', status: 'clear',   statusLabel: 'Clear',       confidence: '94.8%', region: 'Nevada'     },
  { id: 6,  plate: 'TXK9823',  date: '05/04/2026', time: '10:41:35 AM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       confidence: '97.2%', region: 'Texas'      },
  { id: 7,  plate: 'CA7PQ456', date: '05/04/2026', time: '10:41:29 AM', camera: 'LYNET-02', status: 'alert',   statusLabel: 'Hotlist',     confidence: '99.1%', region: 'California' },
  { id: 8,  plate: 'AZ2MN781', date: '05/04/2026', time: '10:41:22 AM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       confidence: '93.8%', region: 'Arizona'    },
  { id: 9,  plate: 'FL6WX342', date: '05/04/2026', time: '10:41:15 AM', camera: 'LYNET-02', status: 'expired', statusLabel: 'Expired Reg', confidence: '91.4%', region: 'Florida'    },
  { id: 10, plate: 'NY8JK517', date: '05/04/2026', time: '10:41:08 AM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       confidence: '96.5%', region: 'New York'   },
  // ── Yesterday 05/03/2026 ──
  { id: 11, plate: 'TX5KM987', date: '05/03/2026', time: '09:14:03 AM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       confidence: '97.8%', region: 'Texas'      },
  { id: 12, plate: 'IL3BN456', date: '05/03/2026', time: '09:13:55 AM', camera: 'LYNET-02', status: 'clear',   statusLabel: 'Clear',       confidence: '98.9%', region: 'Illinois'   },
  { id: 13, plate: 'OH4RT729', date: '05/03/2026', time: '08:47:22 AM', camera: 'LYNET-01', status: 'alert',   statusLabel: 'Stolen',      confidence: '99.5%', region: 'Ohio'       },
  { id: 14, plate: 'CO9XB412', date: '05/03/2026', time: '08:31:14 AM', camera: 'LYNET-02', status: 'expired', statusLabel: 'Expired Reg', confidence: '90.2%', region: 'Colorado'   },
  { id: 15, plate: 'WA7PM635', date: '05/03/2026', time: '08:12:48 AM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       confidence: '96.4%', region: 'Washington' },
  // ── 05/02/2026 ──
  { id: 16, plate: 'NV2PQ890', date: '05/02/2026', time: '03:32:18 PM', camera: 'LYNET-02', status: 'unknown', statusLabel: 'Unknown',     confidence: '82.6%', region: 'Nevada'     },
  { id: 17, plate: 'GA8WP234', date: '05/02/2026', time: '03:31:05 PM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       confidence: '97.3%', region: 'Georgia'    },
  { id: 18, plate: 'TN5KL927', date: '05/02/2026', time: '02:14:33 PM', camera: 'LYNET-02', status: 'alert',   statusLabel: 'Hotlist',     confidence: '98.8%', region: 'Tennessee'  },
  { id: 19, plate: 'MO3BJ481', date: '05/02/2026', time: '01:58:22 PM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       confidence: '95.1%', region: 'Missouri'   },
  { id: 20, plate: 'SC6WX318', date: '05/02/2026', time: '01:44:07 PM', camera: 'LYNET-02', status: 'expired', statusLabel: 'Expired Reg', confidence: '89.7%', region: 'S. Carolina' },
];

export function History() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'alert': return 'var(--alert-red)';
      case 'clear': return 'var(--success-green)';
      case 'unknown': return 'var(--warning-amber)';
      case 'expired': return '#f97316';
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
