export function StatsStrip() {
  const stats = [
    { label: 'Reads today', value: '1,482', color: 'var(--text-primary)' },
    { label: 'Alerts today', value: '7', color: 'var(--alert-red)' },
    { label: 'Accuracy', value: '99.1%', color: 'var(--text-primary)' },
    { label: 'Online', value: '4/4', color: 'var(--success-green)' },
  ];

  return (
    <div className="grid grid-cols-4 bg-[var(--surface)] rounded-lg overflow-hidden border border-[var(--vf-border)]">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="px-4 py-3 flex flex-col items-center justify-center border-r border-[var(--vf-border)] last:border-r-0"
        >
          <span className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">
            {stat.label}
          </span>
          <span className="font-mono font-bold text-xl" style={{ color: stat.color }}>
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
