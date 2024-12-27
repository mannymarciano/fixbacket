import React from 'react';
import BuilderCanvas from './components/BuilderCanvas';
import { TopBar } from './components/navigation/TopBar';
import { NavTabs } from './components/navigation/NavTabs';
import { DataPage } from './components/pages/data/DataPage';
import { SettingsPage } from './components/pages/settings/SettingsPage';

function App() {
  const [activeTab, setActiveTab] = React.useState('builder');

  const renderContent = () => {
    switch (activeTab) {
      case 'data':
        return <DataPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <BuilderCanvas />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="h-[calc(100vh-7rem)]">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;