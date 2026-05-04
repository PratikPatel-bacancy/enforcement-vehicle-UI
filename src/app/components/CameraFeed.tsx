import { Maximize2 } from 'lucide-react';

const CAM_META: Record<string, { plate: string; location: string }> = {
  'LYNET-01': { plate: '7XYZ492', location: 'North Entrance' },
  'LYNET-02': { plate: 'ABC1234', location: 'Employee Parking' },
  'LYNET-03': { plate: 'FL8923K', location: 'Exit Gate South' },
  'LYNET-04': { plate: 'NY5HJ729', location: 'Loading Dock' },
};

export function CameraFeed({ cameraId }: { cameraId: string }) {
  const cam = CAM_META[cameraId] ?? CAM_META['LYNET-01'];

  return (
    <div style={{
      height: '100%',
      position: 'relative',
      background: '#010518',
      borderBottom: '1px solid #0b1f5c',
      overflow: 'hidden',
    }}>
      {/* Dark gradient bg */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#010620 0%,#01061a 60%,#040711 100%)' }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(77,114,232,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(77,114,232,0.03) 1px,transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(77,114,232,0.5),transparent)',
        animation: 'scanline 3s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Center — detection box + plate */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 200, height: 80 }}>
          {/* Outer glow border */}
          <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(77,114,232,0.4)', borderRadius: 2, boxShadow: '0 0 12px rgba(77,114,232,0.15)' }} />
          {/* Corner brackets */}
          {[
            { top: -2, left: -2, borderTop: '2px solid #0530AD', borderLeft: '2px solid #0530AD' },
            { top: -2, right: -2, borderTop: '2px solid #0530AD', borderRight: '2px solid #0530AD' },
            { bottom: -2, left: -2, borderBottom: '2px solid #0530AD', borderLeft: '2px solid #0530AD' },
            { bottom: -2, right: -2, borderBottom: '2px solid #0530AD', borderRight: '2px solid #0530AD' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 12, height: 12, ...s }} />
          ))}
          {/* Plate */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#f0f0f0', padding: '4px 16px', borderRadius: 2, boxShadow: '0 0 16px rgba(77,114,232,0.25)' }}>
              <span style={{ color: '#111', fontWeight: 800, fontSize: 20, letterSpacing: '0.22em' }}>{cam.plate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top-left — cam id + location + REC */}
      <div style={{ position: 'absolute', top: 7, left: 9, display: 'flex', alignItems: 'center', gap: 6, color: '#7a9cc8', fontSize: 10 }}>
        <span>{cameraId}</span>
        <span style={{ color: '#0b1f5c' }}>|</span>
        <span>{cam.location}</span>
        <span style={{ color: '#0b1f5c' }}>|</span>
        <span style={{ color: '#ef4444', letterSpacing: '0.05em' }}>REC</span>
        <span style={{
          display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#ef4444',
          animation: 'blink 1.2s step-start infinite',
        }} />
      </div>

      {/* Top-right — fps */}
      <div style={{ position: 'absolute', top: 7, right: 9, color: '#22c55e', fontSize: 10 }}>
        29.97 fps
      </div>

      {/* Bottom-right — badges */}
      <div style={{ position: 'absolute', bottom: 7, right: 9, display: 'flex', gap: 4 }}>
        {['HD', 'PTZ'].map(b => (
          <span key={b} style={{
            padding: '1px 6px', border: '1px solid #0b1f5c', borderRadius: 2,
            color: '#7a9cc8', fontSize: 9, background: 'rgba(1,5,24,0.8)',
          }}>{b}</span>
        ))}
        <button style={{
          padding: '2px 4px', border: '1px solid #0b1f5c', borderRadius: 2,
          color: '#7a9cc8', background: 'rgba(1,5,24,0.8)', display: 'flex', alignItems: 'center',
        }}>
          <Maximize2 size={10} />
        </button>
      </div>
    </div>
  );
}
