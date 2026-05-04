// ── Types ──────────────────────────────────────────────────────────────────

export type HistoryStatus = 'alert' | 'clear' | 'unknown' | 'stolen';
export type ViolationStatus = 'active' | 'pending' | 'resolved';
export type ViolationSeverity = 'high' | 'medium' | 'low';

export interface HistoryRecord {
  id: number;
  plate: string;
  state: string;
  date: string;
  time: string;
  camera: string;
  status: HistoryStatus;
  statusLabel: string;
  confidence: string;
  make: string;
  model: string;
  color: string;
  gps: string;
  officer: string;
  unit: string;
  imageSrc?: string;
}

export interface ViolationDetail {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface ViolationRecord {
  id: number;
  type: string;
  plate: string;
  state: string;
  camera: string;
  time: string;
  date: string;
  location: string;
  zone: string;
  status: ViolationStatus;
  severity: ViolationSeverity;
  duration: string;
  make: string;
  model: string;
  color: string;
  priorViolations: number;
  officer: string;
  unit: string;
  notes: string;
  details: ViolationDetail[];
}

// ── History Mock Data ──────────────────────────────────────────────────────

export const mockHistory: HistoryRecord[] = [
  {
    id: 1,
    plate: '7XYZ492',
    state: 'CA',
    date: '2026-05-01',
    time: '14:23:45',
    camera: 'LYNET-01',
    status: 'alert',
    statusLabel: 'Hotlist',
    confidence: '98.4%',
    make: 'Toyota',
    model: 'Camry',
    color: 'White',
    gps: '33.7490° N  84.3880° W',
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
  },
  {
    id: 2,
    plate: 'ABC1234',
    state: 'NY',
    date: '2026-05-01',
    time: '14:22:18',
    camera: 'LYNET-02',
    status: 'clear',
    statusLabel: 'Clear',
    confidence: '99.2%',
    make: 'Ford',
    model: 'F-150',
    color: 'Black',
    gps: '33.7488° N  84.3875° W',
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
  },
  {
    id: 3,
    plate: 'TX5KM987',
    state: 'TX',
    date: '2026-05-01',
    time: '14:21:03',
    camera: 'LYNET-01',
    status: 'clear',
    statusLabel: 'Clear',
    confidence: '97.8%',
    make: 'Chevrolet',
    model: 'Silverado',
    color: 'Red',
    gps: '33.7492° N  84.3882° W',
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
  },
  {
    id: 4,
    plate: 'FL8923K',
    state: 'FL',
    date: '2026-05-01',
    time: '14:19:47',
    camera: 'LYNET-03',
    status: 'unknown',
    statusLabel: 'Unknown',
    confidence: '85.3%',
    make: 'Chevrolet',
    model: 'Malibu',
    color: 'Blue',
    gps: '33.7485° N  84.3878° W',
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
  },
  {
    id: 5,
    plate: 'NY5HJ729',
    state: 'NY',
    date: '2026-05-01',
    time: '14:18:22',
    camera: 'LYNET-04',
    status: 'clear',
    statusLabel: 'Clear',
    confidence: '96.7%',
    make: 'Honda',
    model: 'Civic',
    color: 'Gray',
    gps: '33.7496° N  84.3870° W',
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
  },
  {
    id: 6,
    plate: 'IL3BN456',
    state: 'IL',
    date: '2026-05-01',
    time: '14:16:55',
    camera: 'LYNET-02',
    status: 'clear',
    statusLabel: 'Clear',
    confidence: '98.9%',
    make: 'Nissan',
    model: 'Altima',
    color: 'Silver',
    gps: '33.7480° N  84.3865° W',
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
  },
  {
    id: 7,
    plate: 'TX7BK891',
    state: 'TX',
    date: '2026-05-01',
    time: '14:15:30',
    camera: 'LYNET-01',
    status: 'stolen',
    statusLabel: 'Stolen',
    confidence: '99.5%',
    make: 'BMW',
    model: '3 Series',
    color: 'Black',
    gps: '33.7478° N  84.3860° W',
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
  },
  {
    id: 8,
    plate: 'CA8WP234',
    state: 'CA',
    date: '2026-05-01',
    time: '14:14:12',
    camera: 'LYNET-03',
    status: 'clear',
    statusLabel: 'Clear',
    confidence: '97.3%',
    make: 'Tesla',
    model: 'Model 3',
    color: 'White',
    gps: '33.7474° N  84.3855° W',
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
  },
  {
    id: 9,
    plate: 'AZ4MR567',
    state: 'AZ',
    date: '2026-05-01',
    time: '14:12:45',
    camera: 'LYNET-02',
    status: 'clear',
    statusLabel: 'Clear',
    confidence: '98.1%',
    make: 'Hyundai',
    model: 'Sonata',
    color: 'Blue',
    gps: '33.7470° N  84.3850° W',
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
  },
  {
    id: 10,
    plate: 'NV2PQ890',
    state: 'NV',
    date: '2026-05-01',
    time: '14:11:30',
    camera: 'LYNET-04',
    status: 'unknown',
    statusLabel: 'Unknown',
    confidence: '82.6%',
    make: 'Kia',
    model: 'Optima',
    color: 'Green',
    gps: '33.7466° N  84.3845° W',
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
  },
];

// ── Violations Mock Data ───────────────────────────────────────────────────

export const mockViolations: ViolationRecord[] = [
  {
    id: 1,
    type: 'Overstay',
    plate: '7XYZ492',
    state: 'CA',
    camera: 'LYNET-01',
    time: '11:54:53',
    date: '2026-05-01',
    location: 'Main Street',
    zone: 'Zone 2A',
    status: 'active',
    severity: 'high',
    duration: '2:15:22',
    make: 'Toyota',
    model: 'Camry',
    color: 'White',
    priorViolations: 3,
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
    notes: '',
    details: [
      { label: 'Location', value: 'Main Street - Zone 2A' },
      { label: 'Overstay', value: '2h 15m (limit 2h)', highlight: true },
      { label: 'Duration', value: '2:15:22' },
    ],
  },
  {
    id: 2,
    type: 'No Payment',
    plate: 'ABC1234',
    state: 'NY',
    camera: 'LYNET-02',
    time: '11:53:44',
    date: '2026-05-01',
    location: 'City Center Garage',
    zone: 'Level 3',
    status: 'active',
    severity: 'high',
    duration: '0:45:12',
    make: 'Ford',
    model: 'F-150',
    color: 'Black',
    priorViolations: 1,
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
    notes: '',
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
    state: 'FL',
    camera: 'LYNET-03',
    time: '11:48:20',
    date: '2026-05-01',
    location: 'Park Avenue',
    zone: 'Metered Zone',
    status: 'active',
    severity: 'medium',
    duration: '0:45:33',
    make: 'Chevrolet',
    model: 'Malibu',
    color: 'Blue',
    priorViolations: 0,
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
    notes: '',
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
    state: 'TX',
    camera: 'LYNET-04',
    time: '11:41:05',
    date: '2026-05-01',
    location: 'Broadway',
    zone: 'Zone 1B',
    status: 'pending',
    severity: 'medium',
    duration: '0:12:08',
    make: 'BMW',
    model: '3 Series',
    color: 'Black',
    priorViolations: 5,
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
    notes: 'Vehicle moved 3 spaces, same block',
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
    state: 'NY',
    camera: 'LYNET-01',
    time: '11:38:15',
    date: '2026-05-01',
    location: 'Shopping Plaza',
    zone: 'Lot A',
    status: 'active',
    severity: 'high',
    duration: '0:28:47',
    make: 'Honda',
    model: 'Civic',
    color: 'Gray',
    priorViolations: 2,
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
    notes: '',
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
    state: 'IL',
    camera: 'LYNET-03',
    time: '11:35:42',
    date: '2026-05-01',
    location: 'Jefferson Street',
    zone: 'Bus Zone',
    status: 'pending',
    severity: 'medium',
    duration: '0:08:15',
    make: 'Nissan',
    model: 'Altima',
    color: 'Silver',
    priorViolations: 0,
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
    notes: 'Parked in No Standing zone',
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
    state: 'CA',
    camera: 'LYNET-02',
    time: '11:32:18',
    date: '2026-05-01',
    location: 'Oak Avenue',
    zone: 'Residential',
    status: 'pending',
    severity: 'low',
    duration: '0:18:35',
    make: 'Tesla',
    model: 'Model 3',
    color: 'White',
    priorViolations: 1,
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
    notes: 'Parked during street cleaning (8–10am)',
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
    state: 'AZ',
    camera: 'LYNET-04',
    time: '11:28:05',
    date: '2026-05-01',
    location: 'City Hall',
    zone: 'Reserved Parking',
    status: 'pending',
    severity: 'high',
    duration: '0:35:52',
    make: 'Hyundai',
    model: 'Sonata',
    color: 'Blue',
    priorViolations: 0,
    officer: 'OFC. J. ANDERSON',
    unit: 'UNIT 12',
    notes: 'Invalid govt. credentials',
    details: [
      { label: 'Location', value: 'City Hall - Reserved Parking' },
      { label: 'Note', value: 'Invalid govt. credentials', highlight: true },
      { label: 'Duration', value: '0:35:52' },
    ],
  },
];
