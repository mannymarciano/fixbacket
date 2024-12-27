import React from 'react';
import { User } from 'lucide-react';

export function SettingsOverview() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Overview</h2>
      <div className="rounded-lg border bg-card">
        <div className="p-6 flex items-start space-x-4">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full rounded-md border bg-transparent px-3 py-1"
                defaultValue="John Doe"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-md border bg-transparent px-3 py-1"
                defaultValue="john@example.com"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}