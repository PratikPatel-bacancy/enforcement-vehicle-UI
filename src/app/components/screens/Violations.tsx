import { useState, useRef } from 'react';
import { Search, Download, X } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────

interface ViolationRecord {
  id: number;
  plate: string; state: string; date: string; time: string;
  camera: string; location: string; region: string;
  violationType: string; duration: string; violationNote: string;
  status: 'active' | 'pending' | 'resolved';
  camImg: string;
  make: string; model: string; year: number; color: string; bodyType: string;
  vin: string; registration: string; insurance: string; owner: string;
  speed: string; lane: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const mockViolations: ViolationRecord[] = [
  { id: 1,  plate: '7XYZ492',  state: 'TX', date: '05/05/2026', time: '11:54:53 AM', camera: 'LYNET-01', location: 'TX-114 & Freeport Pkwy',    region: 'Texas',       violationType: 'Overstay',                     duration: '2h 15m', violationNote: 'Time limit 2h — exceeded by 15 min', status: 'active',  camImg: '/cam-feed-1.png', make: 'Ford',      model: 'Expedition XLT', year: 2020, color: 'White',      bodyType: 'SUV',          vin: '1FMJU1KT2LEA12345', registration: 'Valid — 09/2026',    insurance: 'Active — USAA',           owner: 'R. ADAMS',      speed: '0 mph',  lane: 'Parked · Lot A'         },
  { id: 2,  plate: 'ABC1234',  state: 'CA', date: '05/05/2026', time: '11:53:44 AM', camera: 'LYNET-02', location: 'Grapevine Mills Blvd',        region: 'California',  violationType: 'No Payment',                   duration: '0h 45m', violationNote: 'No active payment session detected', status: 'active',  camImg: '/cam-feed-2.png', make: 'Honda',     model: 'Accord Sport',   year: 2022, color: 'Sonic Gray', bodyType: 'Sedan',        vin: '1HGCV1F35NA234567', registration: 'Valid — 03/2027',    insurance: 'Active — Geico',          owner: 'L. TORRES',     speed: '0 mph',  lane: 'Parked · Lot B'         },
  { id: 3,  plate: 'FL8923K',  state: 'FL', date: '05/05/2026', time: '11:48:20 AM', camera: 'LYNET-02', location: 'SH-26 & Bass Pro Dr',         region: 'Florida',     violationType: 'Expired Payment Session',      duration: '0h 45m', violationNote: 'Payment expired 45 min ago',         status: 'active',  camImg: '/cam-feed-1.png', make: 'Nissan',    model: 'Altima SR',      year: 2019, color: 'Pearl White',bodyType: 'Sedan',        vin: '1N4AL3AP7KC345678', registration: 'Valid — 11/2026',    insurance: 'Active — Progressive',    owner: 'C. MORGAN',     speed: '0 mph',  lane: 'Parked · Zone 3'        },
  { id: 4,  plate: 'TX7BK891', state: 'TX', date: '05/05/2026', time: '11:41:05 AM', camera: 'LYNET-01', location: 'TX-114 & Intl Pkwy',          region: 'Texas',       violationType: 'Re-Park Detected',             duration: '0h 12m', violationNote: 'Vehicle moved 3 spaces, same block',  status: 'pending', camImg: '/cam-feed-2.png', make: 'Toyota',    model: 'Tacoma TRD',     year: 2021, color: 'Midnight Black', bodyType: 'Pickup Truck', vin: '3TMCZ5AN5MM456789', registration: 'Valid — 07/2026',    insurance: 'Active — State Farm',     owner: 'J. WALKER',     speed: '0 mph',  lane: 'Parked · Zone 1'        },
  { id: 5,  plate: 'NY5HJ729', state: 'NY', date: '05/05/2026', time: '11:38:15 AM', camera: 'LYNET-01', location: 'TX-114 & Freeport Pkwy',    region: 'New York',    violationType: 'Handicap Stall',               duration: '0h 28m', violationNote: 'No valid ADA placard detected',      status: 'active',  camImg: '/cam-feed-1.png', make: 'Chevrolet', model: 'Equinox LT',     year: 2020, color: 'Summit White',bodyType: 'SUV',          vin: '2GNAXUEV4L6567890', registration: 'Valid — 05/2026',    insurance: 'Active — Allstate',       owner: 'M. JENSEN',     speed: '0 mph',  lane: 'Handicap · Stall 4'     },
  { id: 6,  plate: 'IL3BN456', state: 'IL', date: '05/05/2026', time: '11:35:42 AM', camera: 'LYNET-02', location: 'Grapevine Mills Blvd',        region: 'Illinois',    violationType: 'No Standing Violation',        duration: '0h 08m', violationNote: 'Parked in No Standing zone',          status: 'pending', camImg: '/cam-feed-2.png', make: 'Hyundai',   model: 'Elantra SEL',    year: 2022, color: 'Titanium Gray',bodyType: 'Sedan',        vin: '5NPD84LF9NH678901', registration: 'Valid — 05/2027',    insurance: 'Active — Progressive',    owner: 'L. WALSH',      speed: '0 mph',  lane: 'No Standing · Bus Zone' },
  { id: 7,  plate: 'CA8WP234', state: 'CA', date: '05/05/2026', time: '11:32:18 AM', camera: 'LYNET-01', location: 'SH-26 & Bass Pro Dr',         region: 'California',  violationType: 'Street Cleaning Violation',    duration: '0h 18m', violationNote: 'Parked during street cleaning (8–10am)', status: 'pending', camImg: '/cam-feed-1.png', make: 'Kia',       model: 'Sorento EX',     year: 2021, color: 'Gravity Gray', bodyType: 'SUV',          vin: '5XYPHDA58MG789012', registration: 'Valid — 12/2026',    insurance: 'Active — Nationwide',     owner: 'D. PARK',       speed: '0 mph',  lane: 'Street Parking · Oak Ave'},
  { id: 8,  plate: 'AZ4MR567', state: 'AZ', date: '05/05/2026', time: '11:28:05 AM', camera: 'LYNET-02', location: 'TX-114 & Intl Pkwy',          region: 'Arizona',     violationType: 'Govt Vehicle Exemption Misuse',duration: '0h 35m', violationNote: 'Invalid govt. credentials — unverified', status: 'pending', camImg: '/cam-feed-2.png', make: 'Dodge',     model: 'Durango GT',     year: 2019, color: 'Destroyer Gray',bodyType:'SUV',          vin: '1C4SDJCT1KC890123', registration: 'EXPIRED 03/2025',    insurance: 'Active — GEICO',          owner: 'B. STEELE',     speed: '0 mph',  lane: 'Reserved · City Hall'   },
  { id: 9,  plate: 'OH2XK381', state: 'OH', date: '05/04/2026', time: '03:22:10 PM', camera: 'LYNET-01', location: 'TX-114 & Freeport Pkwy',    region: 'Ohio',        violationType: 'Expired Registration',         duration: '—',      violationNote: 'Registration expired Jan 2025',      status: 'resolved',camImg: '/cam-feed-1.png', make: 'GMC',       model: 'Sierra 1500',    year: 2018, color: 'Onyx Black', bodyType: 'Pickup Truck', vin: '3GTU9CED2JG901234', registration: 'EXPIRED 01/2025',    insurance: 'Active — Liberty Mutual', owner: 'T. HARRIS',     speed: '0 mph',  lane: 'Parked · Lot C'         },
  { id: 10, plate: 'WA6TL294', state: 'WA', date: '05/04/2026', time: '02:14:07 PM', camera: 'LYNET-02', location: 'Grapevine Mills Blvd',        region: 'Washington',  violationType: 'No Payment',                   duration: '1h 02m', violationNote: 'No active payment session detected', status: 'resolved',camImg: '/cam-feed-2.png', make: 'Subaru',    model: 'Forester Sport', year: 2023, color: 'Crystal White',bodyType: 'SUV',          vin: 'JF2SKARC7PH012345', registration: 'Valid — 08/2027',    insurance: 'Active — Farmers',        owner: 'S. YAMAMOTO',   speed: '0 mph',  lane: 'Parked · Zone 2'        },
];

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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', borderBottom: '1px solid rgba(11,31,92,0.35)' }}>
      <span style={{ fontSize: 12, color: '#9ab8dc' }}>{label}</span>
      <span style={{ fontSize: small ? 11 : 13, fontWeight: 600, color: color ?? '#c8d8f0', fontFamily: mono ? 'ui-monospace,monospace' : undefined, letterSpacing: mono ? '0.05em' : undefined, maxWidth: '58%', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

// ── Violation status helpers ───────────────────────────────────────────────

function vStatusColor(s: string) {
  switch (s) {
    case 'active':   return '#ef4444';
    case 'pending':  return '#f59e0b';
    case 'resolved': return '#22c55e';
    default:         return '#a8c4e0';
  }
}

// ── Detail Panel ──────────────────────────────────────────────────────────

function ViolationDetail({ record, onClose }: { record: ViolationRecord; onClose: () => void }) {
  const [tab, setTab] = useState<'image' | 'video'>('image');

  const sColor = vStatusColor(record.status);
  const sBg    = record.status === 'active' ? 'rgba(239,68,68,0.1)' : record.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)';

  return (
    <div style={{ width: 400, flexShrink: 0, background: '#071c48', borderLeft: '1px solid #0b1f5c', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* Header */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid #0b1f5c', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#e8f2ff', fontFamily: 'ui-monospace,monospace', letterSpacing: '0.1em' }}>{record.plate}</span>
          <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 10, background: sBg, color: sColor, border: `1px solid ${sColor}44`, fontWeight: 700, letterSpacing: '0.07em' }}>{record.status.toUpperCase()}</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ab8dc', padding: 4, display: 'flex', alignItems: 'center' }}>
          <X size={15} />
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Image / Video tabs */}
        <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #0b1f5c', flexShrink: 0 }}>
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
          <div style={{ position: 'relative', height: 250, background: '#010518' }}>
            {tab === 'image' ? (
              <>
                <img src={record.camImg} alt="capture" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.85) saturate(0.78) contrast(1.06)' }} />
                <div style={{ position: 'absolute', bottom: '13%', left: '50%', transform: 'translateX(-50%)', width: 136, height: 40 }}>
                  <div style={{ position: 'absolute', inset: 0, border: `2px solid ${sColor}cc`, borderRadius: 3, boxShadow: `0 0 10px ${sColor}33` }} />
                  {[{top:-2,left:-2,borderTop:`2px solid ${sColor}`,borderLeft:`2px solid ${sColor}`},{top:-2,right:-2,borderTop:`2px solid ${sColor}`,borderRight:`2px solid ${sColor}`},{bottom:-2,left:-2,borderBottom:`2px solid ${sColor}`,borderLeft:`2px solid ${sColor}`},{bottom:-2,right:-2,borderBottom:`2px solid ${sColor}`,borderRight:`2px solid ${sColor}`}].map((s,i)=>(
                    <div key={i} style={{ position:'absolute', width:10, height:10, ...s }} />
                  ))}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ background: 'rgba(245,242,236,0.97)', borderRadius: 2, padding: '1px 8px', fontWeight: 900, fontSize: 13, letterSpacing: '0.16em', color: '#111', fontFamily: 'ui-monospace,monospace' }}>{record.plate}</span>
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

        {/* Violation banner */}
        <div style={{ background: sBg, border: `1px solid ${sColor}44`, borderRadius: 6, padding: '10px 12px' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: sColor, letterSpacing: '0.08em', marginBottom: 4 }}>
            ⚠  {record.violationType.toUpperCase()}
          </div>
          <div style={{ fontSize: 12, color: '#e0d0c0', marginBottom: 2 }}>{record.violationNote}</div>
          {record.duration !== '—' && (
            <div style={{ fontSize: 12, color: '#c8def4' }}>Duration on-site: <span style={{ color: sColor, fontWeight: 600 }}>{record.duration}</span></div>
          )}
        </div>

        {/* Scan Details */}
        <Section title="SCAN DETAILS">
          <InfoRow label="Date / Time" value={`${record.date} · ${record.time}`} />
          <InfoRow label="Camera"      value={record.camera} mono />
          <InfoRow label="Location"    value={record.location} />
          <InfoRow label="Lane / Zone" value={record.lane} />
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

// ── Violations ─────────────────────────────────────────────────────────────

export function Violations() {
  const [selected,   setSelected]   = useState<ViolationRecord | null>(null);
  const [search,     setSearch]     = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hoveredId,  setHoveredId]  = useState<number | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = mockViolations.filter(r => {
    const okSearch = !search || r.plate.toLowerCase().includes(search.toLowerCase()) || r.violationType.toLowerCase().includes(search.toLowerCase());
    const okStatus = statusFilter === 'all' || r.status === statusFilter;
    return okSearch && okStatus;
  });

  const STATUS_FILTERS = [
    { key: 'all',      label: 'All' },
    { key: 'active',   label: 'Active' },
    { key: 'pending',  label: 'Pending' },
    { key: 'resolved', label: 'Resolved' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* ── Left: table + filter ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 10, gap: 10, minWidth: 0 }}>

        {/* Filter bar */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--vf-border)', borderRadius: 8, padding: '10px 14px', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>

            {/* Search */}
            <div style={{ flex: 2, position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ab8dc', pointerEvents: 'none' }} />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search plate or violation type..."
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: '#051535', border: '1px solid #1e3a70',
                  borderRadius: 6, padding: '7px 10px 7px 32px',
                  fontSize: 13, color: '#c8d8f0', outline: 'none',
                  transition: 'border-color 0.15s', caretColor: '#4d72e8',
                }}
                onFocus={e => { e.target.style.borderColor = '#4a72c0'; e.target.style.boxShadow = '0 0 0 2px rgba(42,74,136,0.25)'; }}
                onBlur={e  => { e.target.style.borderColor = '#1e3a70'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Status filter chips */}
            <div style={{ display: 'flex', gap: 6 }}>
              {STATUS_FILTERS.map(f => {
                const active = statusFilter === f.key;
                const col = f.key === 'active' ? '#ef4444' : f.key === 'pending' ? '#f59e0b' : f.key === 'resolved' ? '#22c55e' : '#4d72e8';
                return (
                  <button key={f.key} onClick={() => setStatusFilter(f.key)} style={{
                    padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    background: active ? `${col}22` : 'transparent',
                    color: active ? col : '#9ab8dc',
                    border: active ? `1px solid ${col}66` : '1px solid #1e3a70',
                    transition: 'all 0.15s',
                  }}>{f.label}</button>
                );
              })}
            </div>

            {/* Export */}
            <button style={{ background: 'rgba(5,48,173,0.14)', color: '#4d72e8', border: '1px solid #1e3a70', borderRadius: 6, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--vf-border)', borderRadius: 8, overflow: 'hidden', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Fixed header */}
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', flexShrink: 0 }}>
            <colgroup>
              <col style={{ width: '16%' }} /><col style={{ width: '26%' }} />
              <col style={{ width: '14%' }} /><col style={{ width: '13%' }} />
              <col style={{ width: '13%' }} /><col style={{ width: '18%' }} />
            </colgroup>
            <thead>
              <tr style={{ background: 'var(--surface-raised)', borderBottom: '1px solid var(--vf-border)' }}>
                {['Plate','Violation Type','Date','Time','Camera','Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '9px 14px', color: 'var(--text-muted)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
          </table>

          {/* Scrollable rows */}
          <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '16%' }} /><col style={{ width: '26%' }} />
                <col style={{ width: '14%' }} /><col style={{ width: '13%' }} />
                <col style={{ width: '13%' }} /><col style={{ width: '18%' }} />
              </colgroup>
              <tbody>
                {filtered.map(r => {
                  const isSel = selected?.id === r.id;
                  const isHov = hoveredId === r.id && !isSel;
                  const sc    = vStatusColor(r.status);
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
                      <td style={{ padding: '9px 14px', color: 'var(--text-secondary)', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.violationType}</td>
                      <td style={{ padding: '9px 14px', color: 'var(--text-secondary)', fontFamily: 'ui-monospace,monospace', fontSize: 13 }}>{r.date}</td>
                      <td style={{ padding: '9px 14px', color: 'var(--text-secondary)', fontFamily: 'ui-monospace,monospace', fontSize: 13 }}>{r.time}</td>
                      <td style={{ padding: '9px 14px', color: 'var(--text-secondary)', fontFamily: 'ui-monospace,monospace', fontSize: 13 }}>{r.camera}</td>
                      <td style={{ padding: '9px 14px' }}>
                        <span style={{ padding: '2px 10px', borderRadius: 10, fontSize: 12, fontWeight: 700, background: `${sc}1A`, color: sc }}>
                          {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Right: detail panel ── */}
      {selected && <ViolationDetail record={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
