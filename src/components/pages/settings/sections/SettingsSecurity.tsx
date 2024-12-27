import React from 'react';

export function SettingsSecurity() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Security</h2>
      <div className="rounded-lg border bg-card divide-y">
        <div className="p-6 space-y-4">
          <h3 className="font-medium">Change Password</h3>
          <div className="space-y-4 max-w-md">
            <input
              type="password"
              placeholder="Current password"
              className="w-full rounded-md border bg-transparent px-3 py-1"
            />
            <input
              type="password"
              placeholder="New password"
              className="w-full rounded-md border bg-transparent px-3 py-1"
            />
            <button className="px-4 py-1 rounded-md bg-primary text-primary-foreground">
              Update Password
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <button className="px-4 py-1 rounded-md border">Enable 2FA</button>
          </div>
        </div>
      </div>
    </div>
  );
}