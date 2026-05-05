import { useState, useEffect } from 'react';
import { TODAY_STATS } from '../../data/vehicleConfig';

// ── Shared data type ───────────────────────────────────────────────────────

type ReadEntry = {
  plate: string; state: string; region: string; time: string; location: string;
  status: 'HOTLIST' | 'VALID' | 'EXPIRED REG'; camImg: string;
  speed: string; lane: string; watchlistHit: string; conf: string;
  make: string; model: string; year: number; color: string; bodyType: string;
  vin: string; registration: string; insurance: string; owner: string;
  ncicEntry?: string; entryDate?: string;
};

const READS: ReadEntry[] = [
  {
    plate: 'JLW·8931', state: 'TX', region: 'Texas',      time: '10:42:03 AM', location: 'TX-114 & Freeport Pkwy',
    status: 'HOTLIST',     camImg: '/cam-feed-1.png', conf: '98.7%',
    speed: '28 mph', lane: 'Southbound · Lane 2', watchlistHit: 'YES — STOLEN VEHICLE',
    make: 'Ford',     model: 'F-150 XLT',      year: 2019, color: 'Silver',    bodyType: 'Pickup Truck — 4-Door',
    vin: '1FTEW1EP3KFA58392', registration: 'EXPIRED 04/2024', insurance: 'LAPSED — State Farm',
    owner: 'D. HARLAN (REPORTED STOLEN)', ncicEntry: '#TX-2024-087341', entryDate: 'Nov 12, 2024 · DPD',
  },
  {
    plate: '8SAM415',  state: 'CA', region: 'California', time: '10:41:58 AM', location: 'TX-114 & Freeport Pkwy',
    status: 'VALID',       camImg: '/cam-feed-2.png', conf: '96.1%',
    speed: '31 mph', lane: 'Southbound · Lane 1', watchlistHit: 'NO',
    make: 'Toyota',   model: 'Camry SE',        year: 2021, color: 'Navy Blue', bodyType: 'Sedan — 4-Door',
    vin: '4T1B11HK4MU456789', registration: 'Valid — 06/2026', insurance: 'Active — Geico',
    owner: 'M. SOLIS',
  },
  {
    plate: 'GHJ4521',  state: 'IL', region: 'Illinois',   time: '10:41:52 AM', location: 'Grapevine Mills Blvd',
    status: 'VALID',       camImg: '/cam-feed-1.png', conf: '95.4%',
    speed: '29 mph', lane: 'Northbound · Lane 2', watchlistHit: 'NO',
    make: 'Chevrolet', model: 'Malibu LT',      year: 2020, color: 'White',    bodyType: 'Sedan — 4-Door',
    vin: '1G1ZD5ST3LF067432', registration: 'Valid — 09/2026', insurance: 'Active — Progressive',
    owner: 'T. KOWALSKI',
  },
  {
    plate: 'MPF8837',  state: 'FL', region: 'Florida',    time: '10:41:47 AM', location: 'SH-26 & Bass Pro Dr',
    status: 'EXPIRED REG', camImg: '/cam-feed-2.png', conf: '92.6%',
    speed: '26 mph', lane: 'Eastbound · Lane 1', watchlistHit: 'NO',
    make: 'Honda',    model: 'Civic EX',        year: 2018, color: 'Gray',     bodyType: 'Sedan — 4-Door',
    vin: '2HGFC2F54JH789012', registration: 'EXPIRED 02/2025', insurance: 'Active — Allstate',
    owner: 'R. DOMINGUEZ',
  },
  {
    plate: 'LKP2294',  state: 'NV', region: 'Nevada',     time: '10:41:41 AM', location: 'Grapevine Mills Blvd',
    status: 'VALID',       camImg: '/cam-feed-1.png', conf: '94.8%',
    speed: '33 mph', lane: 'Southbound · Lane 3', watchlistHit: 'NO',
    make: 'Nissan',   model: 'Altima SV',       year: 2022, color: 'Black',    bodyType: 'Sedan — 4-Door',
    vin: '1N4BL4EV5NN345678', registration: 'Valid — 12/2026', insurance: 'Active — State Farm',
    owner: 'J. BRIGHTWELL',
  },
  {
    plate: 'TXK9823',  state: 'TX', region: 'Texas',      time: '10:41:35 AM', location: 'TX-114 & Intl Pkwy',
    status: 'VALID',       camImg: '/cam-feed-1.png', conf: '97.2%',
    speed: '36 mph', lane: 'Westbound · Lane 1', watchlistHit: 'NO',
    make: 'Ford',     model: 'F-250 XL',        year: 2017, color: 'White',    bodyType: 'Pickup Truck — 2-Door',
    vin: '1FT7W2A60HEE12345', registration: 'Valid — 11/2026', insurance: 'Active — USAA',
    owner: 'B. MCALLISTER',
  },
  {
    plate: 'CA7PQ456', state: 'CA', region: 'California', time: '10:41:29 AM', location: 'Grapevine Mills Blvd',
    status: 'HOTLIST',     camImg: '/cam-feed-2.png', conf: '99.1%',
    speed: '22 mph', lane: 'Northbound · Lane 1', watchlistHit: 'YES — FELONY WARRANT',
    make: 'BMW',      model: '330i',            year: 2020, color: 'Black',    bodyType: 'Sedan — 4-Door',
    vin: 'WBA5R1C51LFK92345', registration: 'EXPIRED 10/2024', insurance: 'LAPSED — AAA',
    owner: 'K. CHEN (FELONY WARRANT)', ncicEntry: '#CA-2024-112847', entryDate: 'Oct 03, 2024 · LAPD',
  },
  {
    plate: 'AZ2MN781', state: 'AZ', region: 'Arizona',    time: '10:41:22 AM', location: 'SH-26 & Bass Pro Dr',
    status: 'VALID',       camImg: '/cam-feed-1.png', conf: '93.8%',
    speed: '27 mph', lane: 'Southbound · Lane 2', watchlistHit: 'NO',
    make: 'Jeep',     model: 'Grand Cherokee',  year: 2019, color: 'Red',      bodyType: 'SUV — 4-Door',
    vin: '1C4RJFBG9KC567890', registration: 'Valid — 03/2026', insurance: 'Active — Nationwide',
    owner: 'P. HERNANDEZ',
  },
  {
    plate: 'FL6WX342', state: 'FL', region: 'Florida',    time: '10:41:15 AM', location: 'TX-114 & Freeport Pkwy',
    status: 'EXPIRED REG', camImg: '/cam-feed-2.png', conf: '91.4%',
    speed: '24 mph', lane: 'Eastbound · Lane 2', watchlistHit: 'NO',
    make: 'Dodge',    model: 'Charger SE',      year: 2016, color: 'Blue',     bodyType: 'Sedan — 4-Door',
    vin: '2C3CDXBG8GH234567', registration: 'EXPIRED 08/2024', insurance: 'Active — Liberty Mutual',
    owner: 'A. WASHINGTON',
  },
  {
    plate: 'NY8JK517', state: 'NY', region: 'New York',   time: '10:41:08 AM', location: 'Grapevine Mills Blvd',
    status: 'VALID',       camImg: '/cam-feed-1.png', conf: '96.5%',
    speed: '30 mph', lane: 'Northbound · Lane 3', watchlistHit: 'NO',
    make: 'Toyota',   model: 'RAV4 LE',         year: 2023, color: 'Silver',   bodyType: 'SUV — 4-Door',
    vin: 'JTMH1RFV5PD123456', registration: 'Valid — 07/2026', insurance: 'Active — Farmers',
    owner: 'S. PATEL',
  },
];

// ── Plate graphic ──────────────────────────────────────────────────────────

function PlateGraphic({ plate, state, region }: { plate: string; state: string; region: string }) {
  const isTX = state === 'TX';
  const isCA = state === 'CA';
  const bg    = isTX ? 'linear-gradient(180deg,#f5f2ec 0%,#ebe6da 100%)' : isCA ? 'linear-gradient(180deg,#fff 0%,#f0f4ff 100%)' : 'linear-gradient(180deg,#f4f6ff 0%,#e8ecfa 100%)';
  const border = isTX ? '#8b7355' : isCA ? '#1a4fad' : '#8aacd4';
  const hdrColor = isTX ? '#8b4513' : isCA ? '#b22234' : '#1a3a7a';
  const hdr = isTX ? '★ TEXAS ★' : isCA ? 'California' : region.toUpperCase();
  const hdrFont = isCA ? 'Georgia, serif' : undefined;

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
        background: bg, border: `2px solid ${border}`, borderRadius: 5,
        padding: '4px 20px 5px', boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.18), 0 3px 10px rgba(0,0,0,0.55)',
        position: 'relative', minWidth: 148,
      }}>
        <span style={{ fontSize: 9, fontWeight: 800, color: hdrColor, letterSpacing: '0.15em', lineHeight: 1, fontFamily: hdrFont }}>{hdr}</span>
        <span style={{ fontSize: 27, fontWeight: 900, color: '#1a1a1a', letterSpacing: '0.14em', lineHeight: 1.1, fontFamily: 'ui-monospace, monospace' }}>{plate}</span>
        <div style={{ position: 'absolute', left: 5, top: '50%', transform: 'translateY(-50%)', width: 5, height: 5, borderRadius: '50%', background: border }} />
        <div style={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)', width: 5, height: 5, borderRadius: '50%', background: border }} />
      </div>
      <div style={{ fontSize: 11, color: '#6a9ae8', fontWeight: 600, letterSpacing: '0.1em', marginTop: 5 }}>{region.toUpperCase()} · {state}</div>
    </div>
  );
}

// ── Camera Feed (Top Col 1) ────────────────────────────────────────────────

function CameraFeed({ read }: { read: ReadEntry }) {
  const [ts, setTs] = useState(() => new Date().toLocaleTimeString('en-US', { hour12: false }));
  useEffect(() => {
    const t = setInterval(() => setTs(new Date().toLocaleTimeString('en-US', { hour12: false })), 1000);
    return () => clearInterval(t);
  }, []);

  const alertColor = read.status === 'HOTLIST' ? '#ef4444' : read.status === 'EXPIRED REG' ? '#f97316' : '#22c55e';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#040e30' }}>
      <img
        key={read.camImg}
        src={read.camImg}
        alt="camera feed"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.85) saturate(0.78) contrast(1.06)' }}
        onError={e => {
          const t = e.target as HTMLImageElement;
          if (!t.dataset.failed) { t.dataset.failed = '1'; t.src = read.camImg === '/cam-feed-1.png' ? '/cam-feed-2.png' : '/cam-feed-1.png'; }
        }}
      />

      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)', pointerEvents: 'none' }} />
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(77,114,232,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(77,114,232,0.035) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      {/* Scan line */}
      <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(77,114,232,0.5),transparent)', animation: 'scanline 3s ease-in-out infinite', pointerEvents: 'none' }} />

      {/* Bounding box — positioned over rear license plate area */}
      <div style={{ position: 'absolute', bottom: '14%', left: '50%', transform: 'translateX(-50%)', width: 168, height: 52 }}>
        {/* Outer glow */}
        <div style={{ position: 'absolute', inset: -4, borderRadius: 4, boxShadow: `0 0 18px 4px ${alertColor}44`, pointerEvents: 'none' }} />
        {/* Border frame */}
        <div style={{ position: 'absolute', inset: 0, border: `2px solid ${alertColor}bb`, borderRadius: 3 }} />
        {/* Corner brackets */}
        {[
          { top: -2, left: -2,     borderTop:    `3px solid ${alertColor}`, borderLeft:   `3px solid ${alertColor}` },
          { top: -2, right: -2,    borderTop:    `3px solid ${alertColor}`, borderRight:  `3px solid ${alertColor}` },
          { bottom: -2, left: -2,  borderBottom: `3px solid ${alertColor}`, borderLeft:   `3px solid ${alertColor}` },
          { bottom: -2, right: -2, borderBottom: `3px solid ${alertColor}`, borderRight:  `3px solid ${alertColor}` },
        ].map((s, i) => <div key={i} style={{ position: 'absolute', width: 12, height: 12, ...s }} />)}
        {/* Plate overlay */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <span style={{
            background: 'rgba(245,242,236,0.97)',
            borderRadius: 3,
            padding: '2px 12px',
            fontWeight: 900,
            fontSize: 16,
            letterSpacing: '0.18em',
            color: '#111',
            fontFamily: 'ui-monospace, monospace',
            lineHeight: 1,
            boxShadow: '0 1px 6px rgba(0,0,0,0.6)',
          }}>{read.plate}</span>
        </div>
        {/* "DETECTED" label above box */}
        <div style={{
          position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.14em',
          color: alertColor, whiteSpace: 'nowrap',
          textShadow: '0 0 8px rgba(0,0,0,0.9)',
        }}>▶ PLATE DETECTED</div>
      </div>

      {/* Top-left — REC */}
      <div style={{ position: 'absolute', top: 8, left: 10, display: 'flex', alignItems: 'center', gap: 5, color: '#c8d8f0', fontSize: 11 }}>
        <span>LYNET-01</span><span style={{ color: '#1e3a70' }}>|</span>
        <span style={{ color: '#ef4444', fontWeight: 700, letterSpacing: '0.06em' }}>REC</span>
        <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#ef4444', animation: 'blink 1.2s step-start infinite' }} />
      </div>

      {/* Top-center — status badge */}
      <div style={{
        position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
        background: `${alertColor}22`, border: `1px solid ${alertColor}70`,
        borderRadius: 3, padding: '2px 10px', fontSize: 11, fontWeight: 700,
        color: alertColor, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
      }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: alertColor, display: 'inline-block', animation: 'blink 1s step-start infinite' }} />
        {read.status === 'HOTLIST' ? 'HOTLIST ALERT' : read.status === 'EXPIRED REG' ? 'EXPIRED REG' : 'PLATE DETECTED'}
      </div>


      {/* Bottom-left */}
      <div style={{ position: 'absolute', bottom: 8, left: 10, color: '#d4e8ff', fontSize: 11, fontFamily: 'ui-monospace, monospace', lineHeight: 1.5 }}>
        <div>{ts} CST</div>
        <div>32.9226° N &nbsp;97.0897° W</div>
      </div>

      {/* Bottom-right badges */}
      <div style={{ position: 'absolute', bottom: 8, right: 10, display: 'flex', gap: 4 }}>
        {['HD', '1080p', 'PTZ'].map(b => (
          <span key={b} style={{ padding: '1px 5px', border: '1px solid #1e3a70', borderRadius: 2, color: '#c0d8f0', fontSize: 10, background: 'rgba(1,5,24,0.8)' }}>{b}</span>
        ))}
      </div>
    </div>
  );
}

// ── Alerts Panel (Top Col 2) ───────────────────────────────────────────────

function AlertsPanel({ read }: { read: ReadEntry }) {
  const [tab, setTab] = useState<'alerts' | 'vehicle'>('alerts');

  const isHotlist  = read.status === 'HOTLIST';
  const isExpired  = read.status === 'EXPIRED REG';
  const alertColor = isHotlist ? '#ef4444' : isExpired ? '#f97316' : '#22c55e';
  const alertBg    = isHotlist ? 'rgba(239,68,68,0.12)' : isExpired ? 'rgba(249,115,22,0.1)' : 'rgba(34,197,94,0.1)';
  const alertBorder = isHotlist ? 'rgba(239,68,68,0.42)' : isExpired ? 'rgba(249,115,22,0.4)' : 'rgba(34,197,94,0.4)';
  const alertTitle  = isHotlist ? 'HOTLIST ALERT — FBI NCIC' : isExpired ? 'EXPIRED REGISTRATION' : 'VEHICLE CLEAR';
  const alertSub    = isHotlist ? 'Stolen Vehicle · Immediate Response Required'
                    : isExpired ? 'Registration Past Due · Citation Eligible'
                    : 'No Active Alerts · Plates Valid';

  const confNum = parseFloat(read.conf);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#071c48', overflow: 'hidden' }}>
      {/* Tab switcher */}
      <div style={{ display: 'flex', borderBottom: '1px solid #0b1f5c', flexShrink: 0 }}>
        {(['alerts', 'vehicle'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '8px 0', background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            color: tab === t ? '#4d72e8' : '#a8c4e0',
            borderBottom: tab === t ? '2px solid #4d72e8' : '2px solid transparent',
            transition: 'color 0.15s',
          }}>
            {t === 'alerts' ? 'ALERTS' : 'VEHICLE DETAILS'}
          </button>
        ))}
      </div>

      {tab === 'alerts' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Alert banner */}
          <div style={{ background: alertBg, border: `1px solid ${alertBorder}`, borderRadius: 5, padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{ fontSize: 17, color: alertColor, lineHeight: 1 }}>{isHotlist || isExpired ? '⚠' : '✓'}</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: alertColor, letterSpacing: '0.08em' }}>{alertTitle}</div>
              <div style={{ fontSize: 10, color: alertColor, opacity: 0.8, marginTop: 2 }}>{alertSub}</div>
            </div>
          </div>

          {/* Plate graphic */}
          <PlateGraphic plate={read.plate} state={read.state} region={read.region} />

          {/* Confidence */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: '#c8def4', letterSpacing: '0.06em' }}>OCR CONFIDENCE</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e' }}>{read.conf}</span>
            </div>
            <div style={{ height: 5, background: '#0b1f5c', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${confNum}%`, background: 'linear-gradient(90deg, #16a34a, #22c55e)', borderRadius: 3 }} />
            </div>
          </div>

          {/* Detail rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flexShrink: 0 }}>
            {[
              ['Timestamp',      `${read.time} CST`],
              ['Lane Direction', read.lane],
              ['Location',       read.location],
              ['Speed',          read.speed],
              ['Watchlist Hit',  read.watchlistHit],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid rgba(11,31,92,0.5)' }}>
                <span style={{ fontSize: 11, color: '#c0d8f0', fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 11, fontWeight: label === 'Watchlist Hit' ? 700 : 500, color: label === 'Watchlist Hit' && read.watchlistHit !== 'NO' ? '#ef4444' : '#dce8f8' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexShrink: 0 }}>
            <div style={{ flex: 1, background: '#051535', border: '1px solid #0b1f5c', borderRadius: 5, padding: '6px 10px' }}>
              <div style={{ fontSize: 9, color: '#c0d8f0', letterSpacing: '0.06em', marginBottom: 2 }}>MAKE / MODEL</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#e8f2ff' }}>{read.make} {read.model}</div>
            </div>
            <div style={{ flex: 1, background: '#051535', border: '1px solid #0b1f5c', borderRadius: 5, padding: '6px 10px' }}>
              <div style={{ fontSize: 9, color: '#c0d8f0', letterSpacing: '0.06em', marginBottom: 2 }}>YEAR / COLOR</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#e8f2ff' }}>{read.year} · {read.color}</div>
            </div>
          </div>
          {([
            ['Body Type',    read.bodyType,     'normal'],
            ['State',        `${read.region} (${read.state})`, 'normal'],
            ['VIN',          read.vin,          'normal'],
            ['Registration', read.registration, 'reg'],
            ['Insurance',    read.insurance,    'ins'],
            ['Owner',        read.owner,        'owner'],
            ...(read.ncicEntry ? [['NCIC Entry', read.ncicEntry, 'ncic'] as [string,string,string]] : []),
            ...(read.entryDate ? [['Entry Date', read.entryDate, 'normal'] as [string,string,string]] : []),
          ] as [string, string, string][]).map(([label, value, type]) => {
            const color = type === 'reg' && value.startsWith('EXPIRED') ? '#f97316'
                        : type === 'ins' && value.startsWith('LAPSED') ? '#f97316'
                        : type === 'owner' && (value.includes('STOLEN') || value.includes('WARRANT')) ? '#ef4444'
                        : type === 'ncic' ? '#fcd34d'
                        : '#dce8f8';
            return (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '5px 0', borderBottom: '1px solid rgba(11,31,92,0.4)' }}>
                <span style={{ fontSize: 11, color: '#c0d8f0', fontWeight: 500, whiteSpace: 'nowrap', marginRight: 8 }}>{label}</span>
                <span style={{ fontSize: 11, fontWeight: 500, textAlign: 'right', color }}>{value}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Map Panel (Top Col 3) ──────────────────────────────────────────────────

function MapPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#071c48', overflow: 'hidden' }}>
      <div style={{ padding: '6px 10px', borderBottom: '1px solid #0b1f5c', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#c8d8f0', letterSpacing: '0.12em' }}>MAP</span>
          <span style={{ fontSize: 10, color: '#c0d8f0' }}>· UNIT 12 · GRAPEVINE, TX</span>
        </div>
        <span style={{ fontSize: 9, color: '#22c55e', letterSpacing: '0.06em' }}>LIVE</span>
      </div>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, filter: 'invert(92%) hue-rotate(180deg) brightness(0.85) saturate(0.60) contrast(0.92)' }}>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6686.1!2d-97.0897!3d32.9226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1714500000000!5m2!1sen!2sus"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,12,40,0.18)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(6,12,30,0.92)', backdropFilter: 'blur(6px)', border: '1px solid rgba(77,114,232,0.35)', borderRadius: 5, padding: '5px 9px' }}>
          <div style={{ fontSize: 10, color: '#c8def4', letterSpacing: '0.08em' }}>UNIT LOCATION</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#e8f2ff' }}>UNIT 12 · PATROL</div>
          <div style={{ fontSize: 10, color: '#6a9ae8', fontFamily: 'ui-monospace, monospace' }}>32.9226° N &nbsp;97.0897° W</div>
        </div>
        <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(6,12,30,0.92)', backdropFilter: 'blur(6px)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 5, padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e', animation: 'blink 2s ease-in-out infinite' }} />
          <div>
            <div style={{ fontSize: 9, color: '#c8def4', letterSpacing: '0.08em' }}>RTK LOCK</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#22c55e' }}>FIXED · ±0.02m</div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <div style={{ background: 'rgba(239,68,68,0.9)', border: '1px solid #ef4444', borderRadius: 3, padding: '2px 7px', fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>JLW·8931</div>
          <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '7px solid rgba(239,68,68,0.9)' }} />
        </div>
      </div>
    </div>
  );
}

// ── Cameras Panel (Bottom Col 1) ───────────────────────────────────────────

const CAMERAS = [
  { name: 'LYNET FRONT', online: true,  lastHeartbeat: null,       timeDiff: null         },
  { name: 'LYNET REAR',  online: false, lastHeartbeat: '12:00 PM', timeDiff: '42 min ago' },
];

function CamerasPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#071c48', overflow: 'hidden' }}>
      <div style={{ padding: '6px 10px', borderBottom: '1px solid #0b1f5c', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#c8d8f0', letterSpacing: '0.12em' }}>CAMERAS</span>
        <span style={{ fontSize: 9, color: '#22c55e' }}>1 / 2 ONLINE</span>
      </div>
      <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
        {CAMERAS.map(cam => (
          <div key={cam.name} style={{ flex: 1, background: '#051535', border: '1px solid #0b1f5c', borderRadius: 6, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {/* Camera device image */}
            <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at 50% 55%, #0c1a3a 0%, #040a1c 70%, #020710 100%)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(77,114,232,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(77,114,232,0.04) 1px,transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />
              <img
                src="/lynet-camera.png"
                alt={cam.name}
                style={{ height: '82%', width: 'auto', objectFit: 'contain', filter: cam.online ? 'drop-shadow(0 0 10px rgba(34,197,94,0.35))' : 'drop-shadow(0 0 8px rgba(239,68,68,0.25)) grayscale(0.5) brightness(0.7)' }}
              />
              {cam.online && (
                <div style={{ position: 'absolute', top: 6, left: 8, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'blink 1.2s step-start infinite' }} />
                  <span style={{ fontSize: 9, color: '#ef4444', fontWeight: 700 }}>REC</span>
                </div>
              )}
              {!cam.online && (
                <div style={{ position: 'absolute', top: 6, left: 8, fontSize: 9, color: '#ef4444', fontWeight: 700, letterSpacing: '0.06em' }}>OFFLINE</div>
              )}
            </div>
            <div style={{ padding: '6px 10px', borderTop: `1px solid ${cam.online ? '#0b1f5c' : 'rgba(239,68,68,0.25)'}`, flexShrink: 0, background: cam.online ? 'transparent' : 'rgba(239,68,68,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#dce8f8', letterSpacing: '0.06em' }}>{cam.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: cam.online ? '#22c55e' : '#ef4444', display: 'inline-block', boxShadow: cam.online ? '0 0 5px #22c55e' : '0 0 5px #ef4444' }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: cam.online ? '#22c55e' : '#ef4444', letterSpacing: '0.06em' }}>{cam.online ? 'Online' : 'Offline'}</span>
                </div>
              </div>
              {!cam.online && cam.lastHeartbeat && (
                <div style={{ marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 9, color: '#c0d8f0' }}>Last heartbeat:</span>
                  <span style={{ fontSize: 9, color: '#f97316', fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}>{cam.lastHeartbeat}</span>
                  <span style={{ fontSize: 9, color: '#a8c4e0' }}>·</span>
                  <span style={{ fontSize: 9, color: '#f97316' }}>{cam.timeDiff}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Analytics Panel (Bottom Col 2) ────────────────────────────────────────

const METRICS = [
  { name: 'Total Scans Today',   value: String(TODAY_STATS.totalScans)                       },
  { name: 'Unique Plates',       value: String(TODAY_STATS.uniquePlates)                     },
  { name: 'Read Success Rate',   value: `${TODAY_STATS.readSuccessRate}%`                    },
  { name: 'Hit Rate',            value: `${TODAY_STATS.hitRate}%`                            },
  { name: 'Violations Today',    value: String(TODAY_STATS.violationsToday)                  },
  { name: 'Enforcement Actions', value: String(TODAY_STATS.enforcementActions)               },
];

function AnalyticsPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#071c48', overflow: 'hidden' }}>
      <div style={{ padding: '6px 10px', borderBottom: '1px solid #0b1f5c', flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#c8d8f0', letterSpacing: '0.12em' }}>ANALYTICS</span>
        <span style={{ fontSize: 9, color: '#c0d8f0', marginLeft: 6 }}>Grapevine, TX · Today</span>
      </div>
      <div style={{ flex: 1, padding: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', gap: 6, overflow: 'hidden' }}>
        {METRICS.map(m => (
          <div key={m.name} style={{ background: '#051535', border: '1px solid #0b1f5c', borderRadius: 5, padding: '7px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6, minHeight: 0 }}>
            <div style={{ fontSize: 10, color: '#c0d8f0', letterSpacing: '0.05em', lineHeight: 1.2 }}>{m.name}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#e8f2ff', letterSpacing: '0.02em', lineHeight: 1 }}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Recent Reads Panel (Bottom Col 3) ─────────────────────────────────────

function RecentReadsPanel({ onNavigate, onSelect, selectedIdx }: {
  onNavigate?: (tab: string) => void;
  onSelect: (idx: number) => void;
  selectedIdx: number;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#071c48', overflow: 'hidden' }}>
      <div style={{ padding: '6px 10px', borderBottom: '1px solid #0b1f5c', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#c8d8f0', letterSpacing: '0.12em' }}>RECENT READS</span>
          <span style={{ fontSize: 9, color: '#c0d8f0', marginLeft: 6 }}>Last 5 min</span>
        </div>
        <button onClick={() => onNavigate?.('history')} style={{ fontSize: 10, color: '#4d72e8', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 }}>
          View All
        </button>
      </div>

      {/* Table header */}
      <div style={{ display: 'grid', gridTemplateColumns: '22% 10% 24% 44%', padding: '5px 10px', borderBottom: '1px solid #0b1f5c', flexShrink: 0 }}>
        {['PLATE', 'ST', 'TIME', 'LOCATION'].map(h => (
          <span key={h} style={{ fontSize: 9, fontWeight: 700, color: '#a8c4e0', letterSpacing: '0.07em' }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {READS.map((r, idx) => {
          const isSelected = idx === selectedIdx;
          const isHot = r.status === 'HOTLIST';
          return (
            <div
              key={r.plate + idx}
              onClick={() => onSelect(idx)}
              style={{
                display: 'grid', gridTemplateColumns: '22% 10% 24% 44%',
                padding: '7px 10px', borderBottom: '1px solid rgba(11,31,92,0.4)',
                alignItems: 'center', cursor: 'pointer',
                background: isSelected
                  ? 'rgba(77,114,232,0.15)'
                  : isHot ? 'rgba(239,68,68,0.07)' : 'transparent',
                borderLeft: isSelected ? '2px solid #4d72e8' : '2px solid transparent',
                transition: 'background 0.12s',
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: isHot ? '#fca5a5' : '#e8f2ff', fontFamily: 'ui-monospace, monospace', letterSpacing: '0.06em' }}>{r.plate}</span>
              <span style={{ fontSize: 10, color: '#c8def4', fontFamily: 'ui-monospace, monospace' }}>{r.state}</span>
              <span style={{ fontSize: 10, color: '#dceeff', fontFamily: 'ui-monospace, monospace' }}>{r.time}</span>
              <span style={{ fontSize: 10, color: '#c0d8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.location}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── LiveMonitor ────────────────────────────────────────────────────────────

export function LiveMonitor({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const read = READS[selectedIdx];

  const cardStyle: React.CSSProperties = {
    minHeight: 0, overflow: 'hidden', borderRadius: 8, border: '1px solid #0d2460',
  };

  return (
    <div style={{ display: 'grid', gridTemplateRows: '60% 40%', height: '100%', overflow: 'hidden', background: '#00030c' }}>
      {/* Top row */}
      <div style={{ display: 'grid', gridTemplateColumns: '40fr 35fr 25fr', gap: 10, padding: '10px 10px 5px 10px', minHeight: 0 }}>
        <div style={cardStyle}><CameraFeed read={read} /></div>
        <div style={cardStyle}><AlertsPanel read={read} /></div>
        <div style={cardStyle}><MapPanel /></div>
      </div>
      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '25fr 35fr 40fr', gap: 10, padding: '5px 10px 10px 10px', minHeight: 0 }}>
        <div style={cardStyle}><CamerasPanel /></div>
        <div style={cardStyle}><AnalyticsPanel /></div>
        <div style={cardStyle}><RecentReadsPanel onNavigate={onNavigate} onSelect={setSelectedIdx} selectedIdx={selectedIdx} /></div>
      </div>
    </div>
  );
}
