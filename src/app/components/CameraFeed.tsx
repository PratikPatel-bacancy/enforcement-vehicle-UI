import { Maximize2 } from 'lucide-react';

interface CameraFeedProps {
  cameraId: string;
}

const cameraData: Record<string, { plate: string; location: string }> = {
  'CAM-01': { plate: '7XYZ492', location: 'North Entrance' },
  'CAM-02': { plate: 'ABC-1234', location: 'Employee Parking' },
  'CAM-03': { plate: 'FL8923K', location: 'Exit Gate South' },
  'CAM-04': { plate: 'NY5HJ729', location: 'Loading Dock' },
};

export function CameraFeed({ cameraId }: CameraFeedProps) {
  const camera = cameraData[cameraId] || cameraData['CAM-01'];
  return (
    <div className="relative aspect-video bg-[var(--app-bg)] rounded-lg overflow-hidden border border-[var(--vf-border)]">
      {/* Simulated CCTV footage background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001433] via-[var(--app-bg)] to-[#000820]" />
      </div>

      {/* ROI Box with corner brackets */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-80 h-32 border-2 border-[var(--pure-blue)] border-opacity-60 rounded">
          {/* Corner brackets */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-[var(--pure-blue)]" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-[var(--pure-blue)]" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-[var(--pure-blue)]" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-[var(--pure-blue)]" />

          {/* License plate simulation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white px-6 py-2 rounded-sm shadow-xl">
              <div className="text-black font-mono font-bold text-2xl tracking-[0.3em]">{camera.plate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--pure-blue)] to-transparent opacity-60"
          style={{
            animation: 'scan 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* Top-left overlay */}
      <div className="absolute top-3 left-3 text-[var(--text-secondary)] text-xs font-mono flex items-center gap-2">
        <span>{cameraId}</span>
        <span>·</span>
        <span>{camera.location}</span>
        <span>·</span>
        <div className="flex items-center gap-1">
          <span>REC</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--alert-red)] animate-pulse" />
        </div>
      </div>

      {/* Top-right overlay */}
      <div className="absolute top-3 right-3 text-[var(--success-green)] text-xs font-mono">
        29.97 fps
      </div>

      {/* Bottom-right controls */}
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button className="px-2 py-1 bg-[var(--surface-raised)] border border-[var(--vf-border)] text-[var(--text-secondary)] text-xs rounded hover:border-[var(--pure-blue)] transition-colors">
          HD
        </button>
        <button className="px-2 py-1 bg-[var(--surface-raised)] border border-[var(--vf-border)] text-[var(--text-secondary)] text-xs rounded hover:border-[var(--pure-blue)] transition-colors">
          PTZ
        </button>
        <button className="p-1 bg-[var(--surface-raised)] border border-[var(--vf-border)] text-[var(--text-secondary)] rounded hover:border-[var(--pure-blue)] transition-colors">
          <Maximize2 size={14} />
        </button>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
