const STATS = [
  { label: 'Reads',    value: '1,482', color: '#dce5f5' },
  { label: 'Alerts',   value: '7',     color: '#ef4444' },
  { label: 'Accuracy', value: '99.1%', color: '#22c55e' },
  { label: 'Online',   value: '4/4',   color: '#22c55e' },
];

export function StatsStrip() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      flexShrink: 0,
      background: '#020b2e',
      borderBottom: '1px solid #0b1f5c',
    }}>
      {STATS.map((s, i) => (
        <div key={s.label} style={{
          padding: '6px 8px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          borderRight: i < STATS.length - 1 ? '1px solid #0b1f5c' : 'none',
          gap: 1,
        }}>
          <span style={{ fontSize: 9, color: '#7a9cc8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            {s.label}
          </span>
          <span style={{ fontSize: 16, fontWeight: 700, color: s.color, lineHeight: 1.2 }}>
            {s.value}
          </span>
        </div>
      ))}
    </div>
  );
}
