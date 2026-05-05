import { Camera, User, Hash, Wifi, WifiOff } from 'lucide-react';
import { VEHICLE_CONFIG } from '../../data/vehicleConfig';

// ── Types ──────────────────────────────────────────────────────────────────

interface CameraInfo {
  id: number;
  name: string;
  label: string;
  position: string;
  resolution: string;
  fps: string;
  status: 'online' | 'offline';
  lastSeen: string | null;
  zone: string;
}

// ── Mock data — matches dashboard CamerasPanel ─────────────────────────────

const CAMERAS: CameraInfo[] = [
  {
    id: 1,
    name: 'LYNET-01',
    label: 'LYNET FRONT',
    position: 'Front — Bumper Mount',
    resolution: '1080p',
    fps: '30 fps',
    status: 'online',
    lastSeen: null,
    zone: 'TX-114 & Freeport Pkwy',
  },
  {
    id: 2,
    name: 'LYNET-02',
    label: 'LYNET REAR',
    position: 'Rear — Trunk Mount',
    resolution: '1080p',
    fps: '30 fps',
    status: 'offline',
    lastSeen: '12:00 PM · 42 min ago',
    zone: 'TX-114 & Freeport Pkwy',
  },
];

// ── Static info ────────────────────────────────────────────────────────────

const { name: VEHICLE_NAME, unitNumber: UNIT_NUMBER } = VEHICLE_CONFIG;

// ── Component ──────────────────────────────────────────────────────────────

export function Settings() {
  return (
    <div style={{
      height: '100%',
      overflowY: 'auto',
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>

      {/* ── Vehicle info ─────────────────────────────────────────────────── */}
      <div style={{
        background: '#071c48',
        border: '1px solid #0b1f5c',
        borderRadius: 10,
        padding: '18px 20px',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#8aaad8', marginBottom: 16, textTransform: 'uppercase' }}>
          Vehicle Info
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 16px',
            background: '#0a2255', borderRadius: '6px 0 0 6px',
            border: '1px solid #0b1f5c',
          }}>
            <User size={15} color="#8aaad8" />
            <div>
              <div style={{ fontSize: 11, color: '#8aaad8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>Name</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#f0f6ff' }}>{VEHICLE_NAME}</div>
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 16px',
            background: '#0a2255', borderRadius: '0 6px 6px 0',
            border: '1px solid #0b1f5c', borderLeft: 'none',
          }}>
            <Hash size={15} color="#8aaad8" />
            <div>
              <div style={{ fontSize: 11, color: '#8aaad8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>Unit Number</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#f0f6ff', fontFamily: 'monospace' }}>{UNIT_NUMBER}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Camera details ───────────────────────────────────────────────── */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#8aaad8', marginBottom: 14, textTransform: 'uppercase' }}>
          Cameras
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {CAMERAS.map(cam => (
            <CameraCard key={cam.id} cam={cam} />
          ))}
        </div>
      </div>

    </div>
  );
}

// ── CameraCard ─────────────────────────────────────────────────────────────

function CameraCard({ cam }: { cam: CameraInfo }) {
  const online = cam.status === 'online';

  return (
    <div style={{
      background: '#071c48',
      border: `1px solid ${online ? '#0b1f5c' : 'rgba(239,68,68,0.2)'}`,
      borderRadius: 10,
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>

      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#f0f6ff', lineHeight: 1.2 }}>{cam.label}</div>
          <div style={{ fontSize: 12, color: '#8aaad8', marginTop: 3, letterSpacing: '0.04em' }}>{cam.name}</div>
        </div>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontSize: 11, fontWeight: 700, padding: '3px 10px',
          background: online ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
          color: online ? '#22c55e' : '#ef4444',
          borderRadius: 4, border: `1px solid ${online ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
          letterSpacing: '0.06em', flexShrink: 0, marginTop: 2,
        }}>
          {online ? <Wifi size={11} /> : <WifiOff size={11} />}
          {online ? 'ONLINE' : 'OFFLINE'}
        </span>
      </div>

      {/* Position */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c0d8f8', fontSize: 14 }}>
        <Camera size={14} color="#8aaad8" />
        {cam.position}
      </div>

      {/* Last-seen row */}
      <div style={{
        marginTop: 2,
        paddingTop: 12,
        borderTop: '1px solid #0b1f5c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
        {!online && cam.lastSeen && (
          <span style={{ fontSize: 11, color: '#ef4444', letterSpacing: '0.04em' }}>
            Last heartbeat: {cam.lastSeen}
          </span>
        )}
        {online && (
          <span style={{ fontSize: 11, color: '#22c55e', letterSpacing: '0.04em' }}>
            Live feed active
          </span>
        )}
      </div>
    </div>
  );
}

