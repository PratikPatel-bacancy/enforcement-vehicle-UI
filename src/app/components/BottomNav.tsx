import { Monitor, Clock, BarChart3, Settings, ShieldAlert } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'monitor', label: 'Monitor', icon: Monitor },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'violations', label: 'Violations', icon: ShieldAlert },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="h-14 bg-[var(--surface)] border-t border-[var(--vf-border)] flex">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 relative transition-colors ${
              isActive ? 'bg-[#0000FF0D]' : ''
            }`}
          >
            {isActive && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            )}
            <Icon
              size={20}
              className={isActive ? 'text-white' : 'text-white opacity-50'}
            />
            <span
              className={`text-xs font-semibold ${
                isActive ? 'text-white' : 'text-white opacity-50'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
