import { Search, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface CameraSidebarProps {
  selectedCamera: string;
  onCameraSelect: (cameraId: string) => void;
}

export function CameraSidebar({ selectedCamera, onCameraSelect }: CameraSidebarProps) {
  const cameras = [
    { id: 1, name: 'CAM-01', location: 'North Entrance', status: 'online' },
    { id: 2, name: 'CAM-02', location: 'Employee Parking', status: 'online' },
    { id: 3, name: 'CAM-03', location: 'Exit Gate South', status: 'online' },
    { id: 4, name: 'CAM-04', location: 'Loading Dock', status: 'online' },
  ];

  const alerts = [
    { id: 1, plate: '7XYZ492', type: 'Hotlist match', time: '2m ago', severity: 'high' },
    { id: 2, plate: 'TX7BK891', type: 'Stolen vehicle', time: '8m ago', severity: 'high' },
    { id: 3, plate: 'FL8923K', type: 'Unregistered plate', time: '15m ago', severity: 'medium' },
  ];

  const hotlistTags = [
    { label: 'Stolen', count: 124, color: 'var(--alert-red)' },
    { label: 'Wanted', count: 58, color: 'var(--warning-amber)' },
    { label: 'Permit', count: 312, color: 'var(--success-green)' },
  ];

  return (
    <div className="w-72 bg-[var(--surface)] border-l border-[var(--vf-border)] flex flex-col">
      {/* Cameras Section */}
      <div className="p-4 border-b border-[var(--vf-border)]">
        <h4 className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide mb-3">Cameras</h4>
        <div className="flex flex-col gap-2">
          {cameras.map((camera) => {
            const isSelected = selectedCamera === camera.name;
            return (
            <div
              key={camera.id}
              onClick={() => onCameraSelect(camera.name)}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors relative ${
                isSelected
                  ? 'bg-[var(--blue-tint)] border-l-2 border-[var(--pure-blue)]'
                  : 'hover:bg-[var(--surface-raised)]'
              }`}
            >
              <div className="w-12 h-8 bg-[var(--app-bg)] rounded border border-[var(--vf-border)] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-primary)] text-sm font-semibold font-mono">
                    {camera.name}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--success-green)]" />
                </div>
                <div className="text-[var(--text-muted)] text-xs truncate">{camera.location}</div>
              </div>
              <span className="text-[var(--success-green)] text-[10px] font-semibold">Online</span>
            </div>
          );
          })}
        </div>
      </div>

      {/* Active Alerts Section */}
      <div className="p-4 border-b border-[var(--vf-border)]">
        <h4 className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide mb-3">Active alerts</h4>
        <div className="flex flex-col gap-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-2 rounded hover:bg-[var(--surface-raised)] cursor-pointer transition-colors"
            >
              <div
                className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                  alert.severity === 'high' ? 'bg-[var(--red-tint)]' : 'bg-[var(--amber-tint)]'
                }`}
              >
                {alert.severity === 'high' ? (
                  <ShieldAlert size={16} className="text-[var(--alert-red)]" />
                ) : (
                  <AlertCircle size={16} className="text-[var(--warning-amber)]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[var(--text-primary)] text-sm font-semibold font-mono">
                  {alert.plate}
                </div>
                <div className="text-[var(--text-secondary)] text-xs">{alert.type}</div>
                <div className="text-[var(--text-muted)] text-[10px] mt-1">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotlist Lookup Section */}
      <div className="p-4 flex-1">
        <h4 className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide mb-3">Hotlist lookup</h4>
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Enter plate number..."
            className="w-full bg-[var(--surface-raised)] border border-[var(--vf-border)] rounded px-9 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--pure-blue)] focus:ring-opacity-40"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {hotlistTags.map((tag) => (
            <div
              key={tag.label}
              className="px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-2"
              style={{
                borderColor: tag.color,
                backgroundColor: `${tag.color}1A`,
                color: tag.color,
              }}
            >
              <span>{tag.label}</span>
              <span className="font-mono">{tag.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
