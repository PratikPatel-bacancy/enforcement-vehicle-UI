import { useState } from 'react';
import { StatusBar } from './components/StatusBar';
import { BottomNav } from './components/BottomNav';
import { LiveMonitor } from './components/screens/LiveMonitor';
import { History } from './components/screens/History';
import { Violations } from './components/screens/Violations';
import { Reports } from './components/screens/Reports';
import { Settings } from './components/screens/Settings';

export default function App() {
  const [activeTab, setActiveTab] = useState('monitor');

  const renderScreen = () => {
    switch (activeTab) {
      case 'monitor':
        return <LiveMonitor />;
      case 'history':
        return <History />;
      case 'violations':
        return <Violations />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <LiveMonitor />;
    }
  };

  return (
    <div className="size-full flex flex-col bg-[var(--app-bg)]">
      <StatusBar />
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}