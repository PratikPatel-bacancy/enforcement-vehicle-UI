import { useState, useEffect, useRef } from 'react';
import { Search, Download, Calendar, X } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────

interface HistoryRecord {
  id: number;
  plate: string; state: string; date: string; time: string;
  camera: string; status: 'alert' | 'clear' | 'unknown' | 'expired';
  statusLabel: string; region: string; camImg: string;
  make: string; model: string; year: number; color: string; bodyType: string;
  vin: string; registration: string; insurance: string; owner: string;
  speed: string; lane: string; location: string;
  ncicEntry?: string; entryDate?: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const mockHistory: HistoryRecord[] = [
  // ── Today 05/04/2026 ──
  { id: 1,  plate: 'JLW8931',  state: 'TX', date: '05/04/2026', time: '10:42:03 AM', camera: 'LYNET-01', status: 'alert',   statusLabel: 'Hotlist',     region: 'Texas',       camImg: '/cam-feed-1.png', make: 'Ford',      model: 'F-150 XLT',      year: 2019, color: 'Silver',      bodyType: 'Pickup Truck', vin: '1FTEW1EP3KFA58392', registration: 'EXPIRED 04/2024', insurance: 'LAPSED — State Farm',     owner: 'D. HARLAN',              speed: '28 mph', lane: 'Southbound · Lane 2', location: 'TX-114 & Freeport Pkwy',  ncicEntry: '#TX-2024-087341', entryDate: 'Nov 12, 2024 · DPD'  },
  { id: 2,  plate: '8SAM415',  state: 'CA', date: '05/04/2026', time: '10:41:58 AM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       region: 'California',  camImg: '/cam-feed-2.png', make: 'Toyota',    model: 'Camry SE',       year: 2021, color: 'Navy Blue',    bodyType: 'Sedan',        vin: '4T1B11HK4MU456789', registration: 'Valid — 06/2026',    insurance: 'Active — Geico',          owner: 'M. SOLIS',               speed: '31 mph', lane: 'Southbound · Lane 1', location: 'TX-114 & Freeport Pkwy'  },
  { id: 3,  plate: 'GHJ4521',  state: 'IL', date: '05/04/2026', time: '10:41:52 AM', camera: 'LYNET-02', status: 'clear',   statusLabel: 'Clear',       region: 'Illinois',    camImg: '/cam-feed-1.png', make: 'Chevrolet', model: 'Malibu LT',      year: 2020, color: 'White',        bodyType: 'Sedan',        vin: '1G1ZD5ST3LF067432', registration: 'Valid — 09/2026',    insurance: 'Active — Progressive',    owner: 'T. KOWALSKI',            speed: '29 mph', lane: 'Northbound · Lane 2', location: 'Grapevine Mills Blvd'    },
  { id: 4,  plate: 'MPF8837',  state: 'FL', date: '05/04/2026', time: '10:41:47 AM', camera: 'LYNET-01', status: 'expired', statusLabel: 'Expired Reg', region: 'Florida',     camImg: '/cam-feed-2.png', make: 'Honda',     model: 'Civic EX',       year: 2018, color: 'Gray',         bodyType: 'Sedan',        vin: '2HGFC2F54JH789012', registration: 'EXPIRED 02/2025',    insurance: 'Active — Allstate',       owner: 'R. DOMINGUEZ',           speed: '26 mph', lane: 'Eastbound · Lane 1',  location: 'SH-26 & Bass Pro Dr'     },
  { id: 5,  plate: 'LKP2294',  state: 'NV', date: '05/04/2026', time: '10:41:41 AM', camera: 'LYNET-02', status: 'clear',   statusLabel: 'Clear',       region: 'Nevada',      camImg: '/cam-feed-1.png', make: 'Nissan',    model: 'Altima SV',      year: 2022, color: 'Black',        bodyType: 'Sedan',        vin: '1N4BL4EV5NN345678', registration: 'Valid — 12/2026',    insurance: 'Active — State Farm',     owner: 'J. BRIGHTWELL',          speed: '33 mph', lane: 'Southbound · Lane 3', location: 'Grapevine Mills Blvd'    },
  { id: 6,  plate: 'TXK9823',  state: 'TX', date: '05/04/2026', time: '10:41:35 AM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       region: 'Texas',       camImg: '/cam-feed-1.png', make: 'Ford',      model: 'F-250 XL',       year: 2017, color: 'White',        bodyType: 'Pickup Truck', vin: '1FT7W2A60HEE12345', registration: 'Valid — 11/2026',    insurance: 'Active — USAA',           owner: 'B. MCALLISTER',          speed: '36 mph', lane: 'Westbound · Lane 1',  location: 'TX-114 & Intl Pkwy'      },
  { id: 7,  plate: 'CA7PQ456', state: 'CA', date: '05/04/2026', time: '10:41:29 AM', camera: 'LYNET-02', status: 'alert',   statusLabel: 'Hotlist',     region: 'California',  camImg: '/cam-feed-2.png', make: 'BMW',       model: '330i',           year: 2020, color: 'Black',        bodyType: 'Sedan',        vin: 'WBA5R1C51LFK92345', registration: 'EXPIRED 10/2024',    insurance: 'LAPSED — AAA',            owner: 'K. CHEN',                speed: '22 mph', lane: 'Northbound · Lane 1', location: 'Grapevine Mills Blvd',   ncicEntry: '#CA-2024-112847', entryDate: 'Oct 03, 2024 · LAPD' },
  { id: 8,  plate: 'AZ2MN781', state: 'AZ', date: '05/04/2026', time: '10:41:22 AM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       region: 'Arizona',     camImg: '/cam-feed-1.png', make: 'Jeep',      model: 'Grand Cherokee', year: 2019, color: 'Red',          bodyType: 'SUV',          vin: '1C4RJFBG9KC567890', registration: 'Valid — 03/2026',    insurance: 'Active — Nationwide',     owner: 'P. HERNANDEZ',           speed: '27 mph', lane: 'Southbound · Lane 2', location: 'SH-26 & Bass Pro Dr'     },
  { id: 9,  plate: 'FL6WX342', state: 'FL', date: '05/04/2026', time: '10:41:15 AM', camera: 'LYNET-02', status: 'expired', statusLabel: 'Expired Reg', region: 'Florida',     camImg: '/cam-feed-2.png', make: 'Dodge',     model: 'Charger SE',     year: 2016, color: 'Blue',         bodyType: 'Sedan',        vin: '2C3CDXBG8GH234567', registration: 'EXPIRED 08/2024',    insurance: 'Active — Liberty Mutual', owner: 'A. WASHINGTON',          speed: '24 mph', lane: 'Eastbound · Lane 2',  location: 'TX-114 & Freeport Pkwy'  },
  { id: 10, plate: 'NY8JK517', state: 'NY', date: '05/04/2026', time: '10:41:08 AM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       region: 'New York',    camImg: '/cam-feed-1.png', make: 'Toyota',    model: 'RAV4 LE',        year: 2023, color: 'Silver',       bodyType: 'SUV',          vin: 'JTMH1RFV5PD123456', registration: 'Valid — 07/2026',    insurance: 'Active — Farmers',        owner: 'S. PATEL',               speed: '30 mph', lane: 'Northbound · Lane 3', location: 'Grapevine Mills Blvd'    },
  // ── Yesterday 05/03/2026 ──
  { id: 11, plate: 'TX5KM987', state: 'TX', date: '05/03/2026', time: '09:14:03 AM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       region: 'Texas',       camImg: '/cam-feed-1.png', make: 'Ram',       model: '1500 Big Horn',  year: 2021, color: 'Blue',         bodyType: 'Pickup Truck', vin: '1C6SRFFT9MN123456', registration: 'Valid — 08/2026',    insurance: 'Active — GEICO',          owner: 'C. BRIGGS',              speed: '32 mph', lane: 'Southbound · Lane 1', location: 'TX-114 & Freeport Pkwy'  },
  { id: 12, plate: 'IL3BN456', state: 'IL', date: '05/03/2026', time: '09:13:55 AM', camera: 'LYNET-02', status: 'clear',   statusLabel: 'Clear',       region: 'Illinois',    camImg: '/cam-feed-2.png', make: 'Hyundai',   model: 'Elantra SEL',    year: 2022, color: 'Titanium Gray',bodyType: 'Sedan',        vin: '5NPD84LF9NH234567', registration: 'Valid — 05/2027',    insurance: 'Active — Progressive',    owner: 'L. WALSH',               speed: '29 mph', lane: 'Northbound · Lane 2', location: 'Grapevine Mills Blvd'    },
  { id: 13, plate: 'OH4RT729', state: 'OH', date: '05/03/2026', time: '08:47:22 AM', camera: 'LYNET-01', status: 'alert',   statusLabel: 'Stolen',      region: 'Ohio',        camImg: '/cam-feed-1.png', make: 'Chevrolet', model: 'Silverado 1500', year: 2020, color: 'Black',        bodyType: 'Pickup Truck', vin: '3GCUYHEL4LG345678', registration: 'EXPIRED 01/2025',    insurance: 'LAPSED — Nationwide',     owner: 'T. BYRD (REPORTED STOLEN)', speed: '25 mph', lane: 'Eastbound · Lane 1', location: 'SH-26 & Bass Pro Dr', ncicEntry: '#OH-2025-003821', entryDate: 'Jan 08, 2025 · CPD'  },
  { id: 14, plate: 'CO9XB412', state: 'CO', date: '05/03/2026', time: '08:31:14 AM', camera: 'LYNET-02', status: 'expired', statusLabel: 'Expired Reg', region: 'Colorado',    camImg: '/cam-feed-2.png', make: 'Subaru',    model: 'Outback Premium',year: 2019, color: 'Wilderness Green', bodyType: 'Wagon', vin: '4S4BSACC0K3456789', registration: 'EXPIRED 06/2025',    insurance: 'Active — State Farm',     owner: 'M. PRICE',               speed: '31 mph', lane: 'Westbound · Lane 2',  location: 'TX-114 & Intl Pkwy'      },
  { id: 15, plate: 'WA7PM635', state: 'WA', date: '05/03/2026', time: '08:12:48 AM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       region: 'Washington',  camImg: '/cam-feed-1.png', make: 'Honda',     model: 'CR-V EX',        year: 2023, color: 'Pearl White',  bodyType: 'SUV',          vin: '7FARW2H55PE567890', registration: 'Valid — 10/2026',    insurance: 'Active — Allstate',       owner: 'D. NGUYEN',              speed: '34 mph', lane: 'Northbound · Lane 1', location: 'Grapevine Mills Blvd'    },
  // ── 05/02/2026 ──
  { id: 16, plate: 'NV2PQ890', state: 'NV', date: '05/02/2026', time: '03:32:18 PM', camera: 'LYNET-02', status: 'unknown', statusLabel: 'Unknown',     region: 'Nevada',      camImg: '/cam-feed-2.png', make: '—',         model: '—',              year: 0,    color: '—',            bodyType: 'Sedan',        vin: 'UNVERIFIED',        registration: 'UNVERIFIED',          insurance: 'UNVERIFIED',              owner: 'UNVERIFIED',             speed: '27 mph', lane: 'Southbound · Lane 2', location: 'SH-26 & Bass Pro Dr'     },
  { id: 17, plate: 'GA8WP234', state: 'GA', date: '05/02/2026', time: '03:31:05 PM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       region: 'Georgia',     camImg: '/cam-feed-1.png', make: 'Kia',       model: 'Telluride EX',   year: 2022, color: 'Snow White',   bodyType: 'SUV',          vin: '5XYP5DHC4NG678901', registration: 'Valid — 04/2027',    insurance: 'Active — Geico',          owner: 'R. FREEMAN',             speed: '28 mph', lane: 'Eastbound · Lane 1',  location: 'TX-114 & Freeport Pkwy'  },
  { id: 18, plate: 'TN5KL927', state: 'TN', date: '05/02/2026', time: '02:14:33 PM', camera: 'LYNET-02', status: 'alert',   statusLabel: 'Hotlist',     region: 'Tennessee',   camImg: '/cam-feed-2.png', make: 'Dodge',     model: 'Durango GT',     year: 2018, color: 'Gunmetal',     bodyType: 'SUV',          vin: '1C4SDJCT3JC789012', registration: 'EXPIRED 11/2024',    insurance: 'LAPSED — Allstate',       owner: 'V. ROSS',                speed: '23 mph', lane: 'Northbound · Lane 3', location: 'Grapevine Mills Blvd',   ncicEntry: '#TN-2024-056130', entryDate: 'Sep 14, 2024 · MPD' },
  { id: 19, plate: 'MO3BJ481', state: 'MO', date: '05/02/2026', time: '01:58:22 PM', camera: 'LYNET-01', status: 'clear',   statusLabel: 'Clear',       region: 'Missouri',    camImg: '/cam-feed-1.png', make: 'GMC',       model: 'Sierra 1500 SLE',year: 2020, color: 'Dark Sky Blue',bodyType: 'Pickup Truck', vin: '3GTU9CED9LG890123', registration: 'Valid — 03/2026',    insurance: 'Active — USAA',           owner: 'T. HAMILTON',            speed: '30 mph', lane: 'Southbound · Lane 1', location: 'SH-26 & Bass Pro Dr'     },
  { id: 20, plate: 'SC6WX318', state: 'SC', date: '05/02/2026', time: '01:44:07 PM', camera: 'LYNET-02', status: 'expired', statusLabel: 'Expired Reg', region: 'S. Carolina', camImg: '/cam-feed-2.png', make: 'Ford',      model: 'Explorer XLT',   year: 2017, color: 'Oxford White', bodyType: 'SUV',          vin: '1FM5K7D80HGA01234', registration: 'EXPIRED 12/2024',    insurance: 'Active — State Farm',     owner: 'N. COOK',                speed: '26 mph', lane: 'Westbound · Lane 2',  location: 'TX-114 & Intl Pkwy'      },
];

// ── Mini Calendar ──────────────────────────────────────────────────────────

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_ABBR    = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function MiniCalendar({ value, onChange, onClose }: { value: string; onChange: (v: string) => void; onClose: () => void }) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const todayStr     = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }
  function pick(d: number) {
    const ds = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    onChange(ds); onClose();
  }

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 200,
      background: '#071c48', border: '1px solid #1e3a70', borderRadius: 8,
      padding: 12, width: 230, boxShadow: '0 8px 32px rgba(0,0,0,0.75)',
    }}>
      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0d8f0', fontSize: 18, padding: '0 6px', lineHeight: 1 }}>‹</button>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#c8d8f0', letterSpacing: '0.04em' }}>{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0d8f0', fontSize: 18, padding: '0 6px', lineHeight: 1 }}>›</button>
      </div>
      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, marginBottom: 4 }}>
        {DAY_ABBR.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, color: '#8aacd4', fontWeight: 700, padding: '2px 0' }}>{d}</div>)}
      </div>
      {/* Day cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const ds = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
          const isSel   = ds === value;
          const isToday = ds === todayStr;
          return (
            <button key={i} onClick={() => pick(d)} style={{
              background: isSel ? '#0530AD' : isToday ? 'rgba(5,48,173,0.18)' : 'transparent',
              border: isToday && !isSel ? '1px solid rgba(5,48,173,0.5)' : '1px solid transparent',
              borderRadius: 4, color: isSel ? '#fff' : isToday ? '#4d72e8' : '#dceeff',
              fontSize: 13, padding: '4px 0', cursor: 'pointer', textAlign: 'center',
              fontWeight: isSel || isToday ? 700 : 400,
            }}>{d}</button>
          );
        })}
      </div>
      {value && (
        <button onClick={() => { onChange(''); onClose(); }} style={{
          marginTop: 8, width: '100%', background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.25)', borderRadius: 4,
          color: '#ef4444', fontSize: 13, padding: '4px 0', cursor: 'pointer',
        }}>Clear Date</button>
      )}
    </div>
  );
}

// ── Plate Graphic ──────────────────────────────────────────────────────────

function PlateGraphic({ plate, state, region }: { plate: string; state: string; region: string }) {
  const isTX = state === 'TX', isCA = state === 'CA';
  const bg       = isTX ? 'linear-gradient(180deg,#f5f2ec,#ebe6da)' : isCA ? 'linear-gradient(180deg,#fff,#f0f4ff)' : 'linear-gradient(180deg,#f4f6ff,#e8ecfa)';
  const border   = isTX ? '#8b7355' : isCA ? '#1a4fad' : '#8aacd4';
  const hdrColor = isTX ? '#8b4513' : isCA ? '#b22234' : '#1a3a7a';
  const hdr      = isTX ? '★ TEXAS ★' : isCA ? 'California' : region.toUpperCase();
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
        background: bg, border: `2px solid ${border}`, borderRadius: 5,
        padding: '4px 18px 5px', boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.18),0 3px 10px rgba(0,0,0,0.55)',
        position: 'relative', minWidth: 140,
      }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: hdrColor, letterSpacing: '0.15em', lineHeight: 1, fontFamily: isCA ? 'Georgia,serif' : undefined }}>{hdr}</span>
        <span style={{ fontSize: 26, fontWeight: 900, color: '#1a1a1a', letterSpacing: '0.14em', lineHeight: 1.15, fontFamily: 'ui-monospace,monospace' }}>{plate}</span>
        <div style={{ position: 'absolute', left: 5, top: '50%', transform: 'translateY(-50%)', width: 5, height: 5, borderRadius: '50%', background: border }} />
        <div style={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)', width: 5, height: 5, borderRadius: '50%', background: border }} />
      </div>
      <div style={{ fontSize: 12, color: '#6a9ae8', fontWeight: 600, letterSpacing: '0.1em', marginTop: 4 }}>{region.toUpperCase()} · {state}</div>
    </div>
  );
}

// ── Detail panel helpers ───────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#051535', border: '1px solid #0b1f5c', borderRadius: 6 }}>
      <div style={{ padding: '5px 12px', background: '#020f30', borderBottom: '1px solid #0b1f5c' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#8aacd4', letterSpacing: '0.14em' }}>{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function InfoRow({ label, value, mono, small, color }: { label: string; value: string; mono?: boolean; small?: boolean; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 12px', borderBottom: '1px solid rgba(11,31,92,0.35)' }}>
      <span style={{ fontSize: 12, color: '#9ab8dc' }}>{label}</span>
      <span style={{ fontSize: small ? 11 : 13, fontWeight: 600, color: color ?? '#c8d8f0', fontFamily: mono ? 'ui-monospace,monospace' : undefined, letterSpacing: mono ? '0.05em' : undefined, maxWidth: '58%', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

// ── Record Detail Panel ────────────────────────────────────────────────────

function RecordDetail({ record, onClose }: { record: HistoryRecord; onClose: () => void }) {
  const [tab, setTab] = useState<'image' | 'video'>('image');

  const sColor = record.status === 'alert' ? '#ef4444' : record.status === 'expired' ? '#f97316' : record.status === 'unknown' ? '#f59e0b' : '#22c55e';
  const sBg    = record.status === 'alert' ? 'rgba(239,68,68,0.1)' : record.status === 'expired' ? 'rgba(249,115,22,0.1)' : record.status === 'unknown' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)';

  return (
    <div style={{ width: 400, flexShrink: 0, background: '#071c48', borderLeft: '1px solid #0b1f5c', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* Header */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid #0b1f5c', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#e8f2ff', fontFamily: 'ui-monospace,monospace', letterSpacing: '0.1em' }}>{record.plate}</span>
          <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 10, background: sBg, color: sColor, border: `1px solid ${sColor}44`, fontWeight: 700, letterSpacing: '0.07em' }}>{record.statusLabel.toUpperCase()}</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ab8dc', padding: 4, display: 'flex', alignItems: 'center' }}>
          <X size={15} />
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Image / Video tabs */}
        <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #0b1f5c', flexShrink: 0 }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', background: '#051535', borderBottom: '1px solid #0b1f5c' }}>
            {(['image', 'video'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: '8px 0', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
                color: tab === t ? '#4d72e8' : '#9ab8dc',
                borderBottom: tab === t ? '2px solid #4d72e8' : '2px solid transparent',
                transition: 'color 0.15s',
              }}>
                {t === 'image' ? 'CAPTURE IMAGE' : 'VIDEO CLIP'}
              </button>
            ))}
          </div>
          {/* Content */}
          <div style={{ position: 'relative', height: 250, background: '#010518' }}>
            {tab === 'image' ? (
              <>
                <img src={record.camImg} alt="capture" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.85) saturate(0.78) contrast(1.06)' }} />
                {/* Plate bounding box */}
                <div style={{ position: 'absolute', bottom: '13%', left: '50%', transform: 'translateX(-50%)', width: 136, height: 40 }}>
                  <div style={{ position: 'absolute', inset: 0, border: `2px solid ${sColor}cc`, borderRadius: 3, boxShadow: `0 0 10px ${sColor}33` }} />
                  {[{top:-2,left:-2,borderTop:`2px solid ${sColor}`,borderLeft:`2px solid ${sColor}`},{top:-2,right:-2,borderTop:`2px solid ${sColor}`,borderRight:`2px solid ${sColor}`},{bottom:-2,left:-2,borderBottom:`2px solid ${sColor}`,borderLeft:`2px solid ${sColor}`},{bottom:-2,right:-2,borderBottom:`2px solid ${sColor}`,borderRight:`2px solid ${sColor}`}].map((s,i)=>(
                    <div key={i} style={{ position:'absolute', width:10, height:10, ...s }} />
                  ))}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ background: 'rgba(245,242,236,0.97)', borderRadius: 2, padding: '1px 8px', fontWeight: 900, fontSize: 15, letterSpacing: '0.16em', color: '#111', fontFamily: 'ui-monospace,monospace' }}>{record.plate}</span>
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 6, left: 8, fontSize: 11, color: '#d4e8ff', fontFamily: 'ui-monospace,monospace' }}>{record.camera}</div>
                <div style={{ position: 'absolute', bottom: 5, left: 8, fontSize: 11, color: '#d4e8ff', fontFamily: 'ui-monospace,monospace' }}>{record.date} · {record.time} CST</div>
              </>
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#051535' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(77,114,232,0.12)', border: '1px solid #1e3a70', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 18, color: '#4d72e8', marginLeft: 3 }}>▶</span>
                </div>
                <span style={{ fontSize: 13, color: '#8aacd4', letterSpacing: '0.08em' }}>VIDEO NOT AVAILABLE</span>
                <span style={{ fontSize: 11, color: '#6a88b8' }}>Archived footage · Contact dispatch</span>
              </div>
            )}
          </div>
        </div>

        {/* Plate graphic */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
          <PlateGraphic plate={record.plate} state={record.state} region={record.region} />
        </div>

        {/* Alert banner */}
        {/* {(record.status === 'alert' || record.status === 'expired' || record.status === 'unknown') && (
          <div style={{ background: sBg, border: `1px solid ${sColor}44`, borderRadius: 6, padding: '9px 12px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: sColor, letterSpacing: '0.08em', marginBottom: record.ncicEntry ? 4 : 0 }}>
              {record.status === 'alert' ? '⚠  HOTLIST — FBI NCIC MATCH' : record.status === 'expired' ? '⚠  EXPIRED REGISTRATION' : '⚠  PLATE UNVERIFIED'}
            </div>
            {record.ncicEntry && <div style={{ fontSize: 12, color: '#e0d0c0', fontFamily: 'ui-monospace,monospace', marginTop: 2 }}>{record.ncicEntry} · {record.entryDate}</div>}
            {record.status === 'expired' && <div style={{ fontSize: 12, color: '#f0c080', marginTop: 2 }}>{record.registration} — Citation eligible</div>}
            {record.status === 'unknown' && <div style={{ fontSize: 12, color: '#e0c060', marginTop: 2 }}>Unable to verify plate — manual review required</div>}
          </div>
        )} */}

        {/* Scan Details */}
        <Section title="SCAN DETAILS">
          <InfoRow label="Date / Time" value={`${record.date} · ${record.time}`} />
          <InfoRow label="Camera"      value={record.camera} mono />
          <InfoRow label="Location"    value={record.location} />
          <InfoRow label="Speed"       value={record.speed} mono />
          <InfoRow label="Lane"        value={record.lane} />
        </Section>

        {/* Vehicle Info */}
        <Section title="VEHICLE INFO">
          <InfoRow label="Make / Model" value={`${record.make} ${record.model}`} />
          <InfoRow label="Year"         value={record.year > 0 ? String(record.year) : '—'} mono />
          <InfoRow label="Color"        value={record.color} />
        </Section>

      </div>
    </div>
  );
}

// ── History ────────────────────────────────────────────────────────────────

export function History() {
  const [selected,     setSelected]     = useState<HistoryRecord | null>(null);
  const [search,       setSearch]       = useState('');
  const [dateFilter,   setDateFilter]   = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [hoveredId,    setHoveredId]    = useState<number | null>(null);
  const calRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (calRef.current && !calRef.current.contains(e.target as Node)) setShowCalendar(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function isoToDisplay(iso: string) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${m}/${d}/${y}`;
  }
  function isoToLabel(iso: string) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[+m-1]} ${+d}, ${y}`;
  }

  const filtered = mockHistory.filter(r => {
    const okSearch = !search     || r.plate.toLowerCase().includes(search.toLowerCase());
    const okDate   = !dateFilter || r.date === isoToDisplay(dateFilter);
    return okSearch && okDate;
  });



  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* ── Left: table + filter ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 10, gap: 10, minWidth: 0 }}>

        {/* Filter bar */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--vf-border)', borderRadius: 8, padding: '10px 14px', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 10 }}>

            {/* Search input */}
            <div style={{ flex: 2, position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ab8dc', pointerEvents: 'none' }} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search plate number..."
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: '#051535', border: '1px solid #1e3a70',
                  borderRadius: 6, padding: '7px 10px 7px 32px',
                  fontSize: 15, color: '#c8d8f0',
                  outline: 'none', transition: 'border-color 0.15s',
                  caretColor: '#4d72e8',
                }}
                onFocus={e => { e.target.style.borderColor = '#4a72c0'; e.target.style.boxShadow = '0 0 0 2px rgba(42,74,136,0.25)'; }}
                onBlur={e  => { e.target.style.borderColor = '#1e3a70'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Date picker trigger */}
            <div style={{ flex: 1, position: 'relative' }} ref={calRef}>
              <div
                onClick={() => setShowCalendar(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: '#051535', border: `1px solid ${showCalendar ? '#4a72c0' : '#1e3a70'}`,
                  borderRadius: 6, padding: '7px 12px',
                  fontSize: 15, color: dateFilter ? '#c8d8f0' : '#8aacd4',
                  cursor: 'pointer', userSelect: 'none',
                  boxShadow: showCalendar ? '0 0 0 2px rgba(42,74,136,0.25)' : 'none',
                  transition: 'border-color 0.15s',
                }}
              >
                <Calendar size={14} style={{ color: '#9ab8dc', flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{dateFilter ? isoToLabel(dateFilter) : 'Filter by date'}</span>
                {dateFilter && (
                  <span onClick={e => { e.stopPropagation(); setDateFilter(''); }} style={{ color: '#9ab8dc', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</span>
                )}
              </div>
              {showCalendar && (
                <MiniCalendar value={dateFilter} onChange={setDateFilter} onClose={() => setShowCalendar(false)} />
              )}
            </div>

            <button style={{ background: '#0530AD', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 20px', fontSize: 15, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em' }}>
              Search
            </button>
            <button style={{ background: 'rgba(5,48,173,0.14)', color: '#4d72e8', border: '1px solid #1e3a70', borderRadius: 6, padding: '7px 14px', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--vf-border)', borderRadius: 8, overflow: 'hidden', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Fixed header */}
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', flexShrink: 0 }}>
            <colgroup>
              <col style={{ width: '25%' }} /><col style={{ width: '22%' }} />
              <col style={{ width: '25%' }} /><col style={{ width: '28%' }} />
            </colgroup>
            <thead>
              <tr style={{ background: 'var(--surface-raised)', borderBottom: '1px solid var(--vf-border)' }}>
                {['Plate','Date','Time','Camera'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '9px 14px', color: 'var(--text-muted)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
          </table>

          {/* Scrollable rows */}
          <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '25%' }} /><col style={{ width: '22%' }} />
                <col style={{ width: '25%' }} /><col style={{ width: '28%' }} />
              </colgroup>
              <tbody>
                {filtered.map(r => {
                  const isSel  = selected?.id === r.id;
                  const isHov  = hoveredId === r.id && !isSel;
                  return (
                    <tr
                      key={r.id}
                      onClick={() => setSelected(isSel ? null : r)}
                      onMouseEnter={() => setHoveredId(r.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{
                        borderBottom: '1px solid var(--vf-border)',
                        cursor: 'pointer',
                        background: isSel ? 'rgba(77,114,232,0.12)' : isHov ? 'var(--surface-raised)' : 'transparent',
                        borderLeft: isSel ? '3px solid #4d72e8' : '3px solid transparent',
                        transition: 'background 0.1s',
                      }}
                    >
                      <td style={{ padding: '9px 14px', color: 'var(--text-primary)', fontFamily: 'ui-monospace,monospace', fontWeight: 700, letterSpacing: '0.08em', fontSize: 15 }}>{r.plate}</td>
                      <td style={{ padding: '9px 14px', color: 'var(--text-secondary)', fontFamily: 'ui-monospace,monospace', fontSize: 14 }}>{r.date}</td>
                      <td style={{ padding: '9px 14px', color: 'var(--text-secondary)', fontFamily: 'ui-monospace,monospace', fontSize: 14 }}>{r.time}</td>
                      <td style={{ padding: '9px 14px', color: 'var(--text-secondary)', fontFamily: 'ui-monospace,monospace', fontSize: 14 }}>{r.camera}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Right: detail panel ── */}
      {selected && <RecordDetail record={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
