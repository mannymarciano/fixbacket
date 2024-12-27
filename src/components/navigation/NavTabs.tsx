import React from 'react';
import { cn } from '@/lib/utils';
import { Settings, LayoutDashboard, FileJson } from 'lucide-react';

const tabs = [
  { id: 'builder', label: 'Builder', icon: LayoutDashboard },
  { id: 'data', label: 'Data', icon: FileJson },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface NavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  return (
    <div className="border-b border-border bg-background">
      <div className="px-4">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-3 py-3 text-sm font-medium border-b-2 transition-colors',
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}