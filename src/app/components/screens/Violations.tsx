import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Violation {
  id: number;
  type: string;
  plate: string;
  camera: string;
  time: string;
  location: string;
  status: 'active' | 'pending';
  details: { label: string; value: string; highlight?: boolean }[];
}

const mockViolations: Violation[] = [
  {
    id: 1,
    type: 'Overstay',
    plate: '7XYZ492',
    camera: 'CAM-01',
    time: '11:54:53',
    location: 'Main Street - Zone 2A',
    status: 'active',
    details: [
      { label: 'Location', value: 'Main Street - Zone 2A' },
      { label: 'Overstay', value: '2h 15m (limit 2h)', highlight: true },
      { label: 'Duration', value: '2:15:22' },
    ],
  },
  {
    id: 2,
    type: 'No Payment',
    plate: 'ABC-1234',
    camera: 'CAM-02',
    time: '11:53:44',
    location: 'City Center Garage - Level 3',
    status: 'active',
    details: [
      { label: 'Location', value: 'City Center Garage - Level 3' },
      { label: 'Payment', value: 'No active session detected', highlight: true },
      { label: 'Duration', value: '0:45:12' },
    ],
  },
  {
    id: 3,
    type: 'Expired Payment Session',
    plate: 'FL8923K',
    camera: 'CAM-03',
    time: '11:48:20',
    location: 'Park Avenue - Metered Zone',
    status: 'active',
    details: [
      { label: 'Location', value: 'Park Avenue - Metered Zone' },
      { label: 'Expired', value: '45 minutes ago', highlight: true },
      { label: 'Duration', value: '0:45:33' },
    ],
  },
  {
    id: 4,
    type: 'Re-Park Detected',
    plate: 'TX7BK891',
    camera: 'CAM-04',
    time: '11:41:05',
    location: 'Broadway - Zone 1B',
    status: 'pending',
    details: [
      { label: 'Location', value: 'Broadway - Zone 1B' },
      { label: 'Note', value: 'Vehicle moved 3 spaces, same block' },
      { label: 'Duration', value: '0:12:08' },
    ],
  },
  {
    id: 5,
    type: 'Handicap Stall',
    plate: 'NY5HJ729',
    camera: 'CAM-01',
    time: '11:38:15',
    location: 'Shopping Plaza - Lot A',
    status: 'active',
    details: [
      { label: 'Location', value: 'Shopping Plaza - Lot A' },
      { label: 'Permit', value: 'No valid placard detected', highlight: true },
      { label: 'Duration', value: '0:28:47' },
    ],
  },
  {
    id: 6,
    type: 'No Standing Violation',
    plate: 'IL3BN456',
    camera: 'CAM-03',
    time: '11:35:42',
    location: 'Jefferson Street - Bus Zone',
    status: 'pending',
    details: [
      { label: 'Location', value: 'Jefferson Street - Bus Zone' },
      { label: 'Note', value: 'Parked in No Standing zone' },
      { label: 'Duration', value: '0:08:15' },
    ],
  },
  {
    id: 7,
    type: 'Street Cleaning Violation',
    plate: 'CA8WP234',
    camera: 'CAM-02',
    time: '11:32:18',
    location: 'Oak Avenue - Residential',
    status: 'pending',
    details: [
      { label: 'Location', value: 'Oak Avenue - Residential' },
      { label: 'Note', value: 'Parked during street cleaning (8-10am)' },
      { label: 'Duration', value: '0:18:35' },
    ],
  },
  {
    id: 8,
    type: 'Government Vehicle Exemption Misuse',
    plate: 'AZ4MR567',
    camera: 'CAM-04',
    time: '11:28:05',
    location: 'City Hall - Reserved Parking',
    status: 'pending',
    details: [
      { label: 'Location', value: 'City Hall - Reserved Parking' },
      { label: 'Note', value: 'Invalid govt. credentials', highlight: true },
      { label: 'Duration', value: '0:35:52' },
    ],
  },
];

export function Violations() {
  const [filter, setFilter] = useState('all');

  const filters = ['All', 'Overstay', 'No Payment', 'Expired Payment', 'Re-Park', 'Handicap', 'No Standing', 'Street Cleaning', 'Govt Vehicle'];

  const getBorderColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#FF3B3B';
      case 'pending':
        return '#FF8C00';
      case 'resolved':
        return '#00C896';
      default:
        return '#002456';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active':
        return 'var(--red-tint)';
      case 'pending':
        return 'var(--amber-tint)';
      case 'resolved':
        return 'var(--green-tint)';
      default:
        return 'var(--blue-tint)';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'var(--alert-red)';
      case 'pending':
        return 'var(--warning-amber)';
      case 'resolved':
        return 'var(--success-green)';
      default:
        return 'var(--pure-blue)';
    }
  };

  return (
    <div className="p-3 space-y-3 overflow-y-auto h-full bg-[var(--app-bg)]">
      {/* Summary Strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg p-3 flex flex-col items-center justify-center">
          <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide mb-1">
            Active now
          </span>
          <span className="text-[var(--alert-red)] font-mono font-bold text-2xl">5</span>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg p-3 flex flex-col items-center justify-center">
          <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide mb-1">
            Resolved today
          </span>
          <span className="text-[var(--success-green)] font-mono font-bold text-2xl">24</span>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg p-3 flex flex-col items-center justify-center">
          <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide mb-1">
            Pending review
          </span>
          <span className="text-[var(--warning-amber)] font-mono font-bold text-2xl">4</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg p-3 flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => {
            const isActive = filter === f.toLowerCase();
            return (
              <button
                key={f}
                onClick={() => setFilter(f.toLowerCase())}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[var(--pure-blue)] text-white'
                    : 'border border-[var(--vf-border)] text-[var(--text-secondary)] hover:border-[var(--pure-blue)]'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
        <div className="relative">
          <select className="bg-[var(--surface-raised)] border border-[var(--vf-border)] text-[var(--text-primary)] text-xs rounded px-3 py-1 pr-8 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--pure-blue)] focus:ring-opacity-40">
            <option>Sort: Recent first</option>
            <option>Sort: Oldest first</option>
            <option>Sort: Severity</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
          />
        </div>
      </div>

      {/* Violation Cards */}
      <div className="space-y-2.5">
        {mockViolations.map((violation) => (
          <div
            key={violation.id}
            className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg p-3.5 relative"
            style={{ borderLeft: `3px solid ${getBorderColor(violation.status)}` }}
          >
            {/* Top Row */}
            <div className="flex items-start justify-between mb-2">
              <div
                className="px-2.5 py-1 rounded text-xs font-semibold"
                style={{
                  backgroundColor: getStatusBg(violation.status),
                  color: getStatusColor(violation.status),
                }}
              >
                {violation.type}
              </div>
              <span className="text-[var(--text-muted)] text-xs font-mono">{violation.time}</span>
            </div>

            {/* Middle Row */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[var(--text-primary)] font-mono font-bold text-lg tracking-[0.15em]">
                {violation.plate}
              </span>
              <ArrowRight size={14} className="text-[var(--text-muted)]" />
              <span className="text-[var(--text-secondary)] text-sm font-mono">{violation.camera}</span>
            </div>

            {/* Bottom Row - Details */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {violation.details.map((detail, idx) => (
                <div key={idx} className="text-[11px]">
                  <span className="text-[var(--text-muted)]">{detail.label}: </span>
                  <span
                    className={`${
                      detail.highlight ? 'text-[var(--alert-red)]' : 'text-[var(--text-primary)]'
                    } font-semibold`}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Status Badge and Action Buttons */}
            <div className="flex items-center justify-between">
              <div
                className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide"
                style={{
                  backgroundColor: getStatusBg(violation.status),
                  color: getStatusColor(violation.status),
                }}
              >
                {violation.status}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[var(--blue-tint)] text-[var(--pure-blue)] border border-[var(--royal-navy)] rounded text-[11px] font-semibold hover:bg-[var(--royal-navy)] hover:text-white transition-colors">
                  View footage
                </button>
                <button className="px-3 py-1.5 bg-[var(--pure-blue)] text-white rounded text-[11px] font-semibold hover:bg-[var(--royal-navy)] transition-colors">
                  Resolve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
