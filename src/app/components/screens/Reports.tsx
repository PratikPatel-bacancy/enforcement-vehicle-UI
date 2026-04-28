import { BarChart3, AlertTriangle, Target, Calendar } from 'lucide-react';

export function Reports() {
  const reportTypes = [
    { icon: BarChart3, title: 'Daily reads summary', description: 'Complete breakdown of all license plate reads' },
    { icon: AlertTriangle, title: 'Alert log report', description: 'Detailed log of all security alerts' },
    { icon: Target, title: 'Accuracy report', description: 'System accuracy and confidence metrics' },
    { icon: Calendar, title: 'Weekly trend', description: 'Traffic patterns and weekly analytics' },
  ];

  const hourlyData = [
    { hour: '00', reads: 45 },
    { hour: '01', reads: 32 },
    { hour: '02', reads: 28 },
    { hour: '03', reads: 22 },
    { hour: '04', reads: 35 },
    { hour: '05', reads: 58 },
    { hour: '06', reads: 142 },
    { hour: '07', reads: 238 },
    { hour: '08', reads: 312 },
    { hour: '09', reads: 287 },
    { hour: '10', reads: 265 },
    { hour: '11', reads: 243 },
    { hour: '12', reads: 221 },
    { hour: '13', reads: 198 },
    { hour: '14', reads: 356 },
    { hour: '15', reads: 289 },
    { hour: '16', reads: 267 },
    { hour: '17', reads: 245 },
    { hour: '18', reads: 198 },
    { hour: '19', reads: 156 },
    { hour: '20', reads: 123 },
    { hour: '21', reads: 98 },
    { hour: '22', reads: 76 },
    { hour: '23', reads: 54 },
  ];

  const maxReads = Math.max(...hourlyData.map(d => d.reads));

  const alertBreakdown = [
    { type: 'Stolen', count: 124, color: 'var(--alert-red)' },
    { type: 'Wanted', count: 58, color: 'var(--warning-amber)' },
    { type: 'Unknown', count: 203, color: 'var(--text-muted)' },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Report Type Cards */}
      <div className="grid grid-cols-2 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.title}
              className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg p-4 hover:border-[var(--royal-navy)] transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[var(--blue-tint)] rounded flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-[var(--pure-blue)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[var(--text-primary)] font-semibold mb-1">{report.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm">{report.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bar Chart */}
      <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg p-4">
        <h3 className="text-[var(--text-primary)] font-semibold mb-4">Reads per hour — today</h3>
        <div className="flex items-end gap-1 h-48">
          {hourlyData.map((item) => {
            const height = (item.reads / maxReads) * 100;
            const isMax = item.reads === maxReads;

            return (
              <div key={item.hour} className="flex-1 flex flex-col items-center gap-2">
                <div className="flex-1 w-full flex items-end">
                  <div
                    className="w-full rounded-t transition-all hover:opacity-80 cursor-pointer relative group"
                    style={{
                      height: `${height}%`,
                      backgroundColor: isMax ? 'var(--pure-blue)' : 'var(--royal-navy)',
                    }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--surface-raised)] border border-[var(--vf-border)] px-2 py-1 rounded text-xs font-mono text-[var(--text-primary)] whitespace-nowrap">
                      {item.reads}
                    </div>
                  </div>
                </div>
                <span className="text-[var(--text-muted)] text-[10px] font-mono">{item.hour}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alert Type Breakdown */}
      <div className="bg-[var(--surface)] border border-[var(--vf-border)] rounded-lg p-4">
        <h3 className="text-[var(--text-primary)] font-semibold mb-4">Alert type breakdown</h3>
        <div className="space-y-3">
          {alertBreakdown.map((alert) => (
            <div key={alert.type} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: alert.color }}
              />
              <span className="text-[var(--text-primary)] flex-1">{alert.type}</span>
              <span className="text-[var(--text-primary)] font-mono font-semibold">{alert.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
