import { useEffect, useState } from 'react';

export function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-9 bg-[var(--surface)] border-b border-[var(--vf-border)] flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--pure-blue)]" />
          <span className="text-[var(--text-primary)] font-bold tracking-wide">Veriflow</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-0.5 bg-[var(--red-tint)] rounded">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--alert-red)] animate-pulse" />
          <span className="text-[var(--alert-red)] text-xs font-semibold">LIVE</span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="text-[var(--success-green)] font-mono">4/4 cameras</span>
        <span className="text-[var(--text-secondary)] font-mono">
          {time.toLocaleTimeString('en-US', { hour12: false })}
        </span>
      </div>
    </div>
  );
}
