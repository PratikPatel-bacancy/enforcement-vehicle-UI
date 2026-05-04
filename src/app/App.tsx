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

  const screen = {
    monitor:    <LiveMonitor onNavigate={setActiveTab} />,
    history:    <History />,
    violations: <Violations />,
    reports:    <Reports />,
    settings:   <Settings />,
  }[activeTab] ?? <LiveMonitor />;

  return (
    /* Ambient dark background — simulates the environment outside the tablet */
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'radial-gradient(ellipse at 50% 40%, #010c35 0%, #010412 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Tablet frame */}
      <div style={{
        width: 'min(1280px, 98vw)',
        height: 'min(800px, 96vh)',
        display: 'flex',
        flexDirection: 'column',
        background: '#01061a',
        borderRadius: 18,
        border: '2px solid #0b1f5c',
        boxShadow:
          '0 0 0 1px rgba(77,114,232,0.06), ' +
          '0 8px 48px rgba(0,0,0,0.85), ' +
          'inset 0 1px 0 rgba(77,114,232,0.06)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Subtle top-bezel shine */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
          pointerEvents: 'none',
          zIndex: 10,
        }} />

        <StatusBar />
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {screen}
        </div>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
