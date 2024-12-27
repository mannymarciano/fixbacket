import React from 'react';
import { User, Shield, Bell, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SettingsOverview } from './sections/SettingsOverview';
import { SettingsSecurity } from './sections/SettingsSecurity';
import { SettingsNotifications } from './sections/SettingsNotifications';
import { SettingsBilling } from './sections/SettingsBilling';

const tabs = [
  { id: 'overview', label: 'Overview', icon: User, component: SettingsOverview },
  { id: 'security', label: 'Security', icon: Shield, component: SettingsSecurity },
  { id: 'notifications', label: 'Notifications', icon: Bell, component: SettingsNotifications },
  { id: 'billing', label: 'Billing', icon: CreditCard, component: SettingsBilling },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || SettingsOverview;

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex gap-6">
        <div className="w-64 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center w-full gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="flex-1">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}