import React from 'react';
import { LogOut, Database } from 'lucide-react';

export function TopBar() {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6" />
          <span className="font-semibold">Backup Builder</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}