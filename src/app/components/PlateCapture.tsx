import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PlateCaptureProps {
  cameraId: string;
}

const plateData: Record<string, { plate: string; status: 'alert' | 'clear'; confidence: string; region: string }> = {
  'CAM-01': { plate: '7XYZ492', status: 'alert', confidence: '98.4%', region: 'California' },
  'CAM-02': { plate: 'ABC-1234', status: 'clear', confidence: '99.2%', region: 'New York' },
  'CAM-03': { plate: 'FL8923K', status: 'clear', confidence: '97.8%', region: 'Florida' },
  'CAM-04': { plate: 'NY5HJ729', status: 'clear', confidence: '96.7%', region: 'New York' },
};

export function PlateCapture({ cameraId }: PlateCaptureProps) {
  const data = plateData[cameraId] || plateData['CAM-01'];
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg p-4 flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide">Last captured plate</span>
        <div className="font-mono font-bold text-3xl tracking-[0.25em] text-[var(--text-primary)]">
          BFZ N63X
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[var(--red-tint)] rounded-md w-fit">
          <AlertTriangle size={14} className="text-[var(--alert-red)]" />
          <span className="text-[var(--alert-red)] text-xs font-semibold">Alert — Hotlist match</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
        <div>
          <span className="text-[var(--text-muted)]">Confidence:</span>
          <span className="text-[var(--text-primary)] ml-2 font-mono">{data.confidence}</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)]">Region:</span>
          <span className="text-[var(--text-primary)] ml-2">{data.region}</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)]">Camera:</span>
          <span className="text-[var(--text-primary)] ml-2 font-mono">{cameraId}</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)]">Time:</span>
          <span className="text-[var(--text-primary)] ml-2 font-mono">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </span>
        </div>
      </div>
    </div>
  );
}
