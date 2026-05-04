import { useEffect, useState } from 'react';

const PLATE_META: Record<string, { confidence: string; region: string }> = {
  'LYNET-01': { confidence: '98.4%', region: 'California' },
  'LYNET-02': { confidence: '99.2%', region: 'New York' },
  'LYNET-03': { confidence: '97.8%', region: 'Florida' },
  'LYNET-04': { confidence: '96.7%', region: 'New York' },
};

export function PlateCapture({ cameraId }: { cameraId: string }) {
  const meta = PLATE_META[cameraId] ?? PLATE_META['LYNET-01'];
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const sep = <span style={{ color: '#0b1f5c', padding: '0 6px' }}>|</span>;

  return (
    <div style={{
      height: 32,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px',
      background: '#020b2e',
      borderBottom: '1px solid #0b1f5c',
      gap: 0,
      fontSize: 11,
    }}>
      {/* Label */}
      <span style={{ color: '#2d4280', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.07em', marginRight: 8 }}>
        Last Plate
      </span>

      {/* Plate number */}
      <span style={{ color: '#dce5f5', fontWeight: 700, fontSize: 13, letterSpacing: '0.18em' }}>BFZ N63X</span>

      {/* Hotlist badge */}
      <span style={{
        marginLeft: 8, padding: '1px 6px',
        background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: 3, color: '#ef4444', fontSize: 9, fontWeight: 700,
      }}>⚠ HOTLIST</span>

      {/* Meta right */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', color: '#7a9cc8' }}>
        <span style={{ color: '#2d4280', fontSize: 9 }}>CONF</span>
        <span style={{ marginLeft: 4, color: '#dce5f5' }}>{meta.confidence}</span>
        {sep}
        <span style={{ color: '#2d4280', fontSize: 9 }}>REGION</span>
        <span style={{ marginLeft: 4, color: '#dce5f5' }}>{meta.region}</span>
        {sep}
        <span style={{ color: '#2d4280', fontSize: 9 }}>CAM</span>
        <span style={{ marginLeft: 4, color: '#dce5f5' }}>{cameraId}</span>
        {sep}
        <span style={{ color: '#2d4280', fontSize: 9 }}>TIME</span>
        <span style={{ marginLeft: 4, color: '#dce5f5' }}>{time.toLocaleTimeString('en-US', { hour12: false })}</span>
      </div>
    </div>
  );
}
