import React from 'react';

const notifications = [
  { id: 'backup-complete', label: 'Backup Complete Notifications' },
  { id: 'backup-failed', label: 'Backup Failed Alerts' },
  { id: 'scheduled-backup', label: 'Scheduled Backup Reminders' },
  { id: 'system-updates', label: 'System Updates' },
];

export function SettingsNotifications() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Notifications</h2>
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <label
                key={notification.id}
                className="flex items-center justify-between"
              >
                <span className="text-sm">{notification.label}</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}