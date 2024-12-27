import React from 'react';
import { Download, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StorageChart } from './StorageChart';

interface BackupFile {
  id: string;
  name: string;
  status: 'completed' | 'scheduled' | 'failed' | 'manual';
  size: string;
  timestamp: string;
  rowsFetched: number;
}

const mockFiles: BackupFile[] = [
  { id: '1', name: 'users_backup_2024.sql', status: 'completed', size: '2.3MB', timestamp: '2024-03-10 14:30', rowsFetched: 1234 },
  { id: '2', name: 'products_backup.sql', status: 'scheduled', size: '4.1MB', timestamp: '2024-03-11 00:00', rowsFetched: 5678 },
  { id: '3', name: 'orders_backup.sql', status: 'failed', size: '1.8MB', timestamp: '2024-03-09 23:45', rowsFetched: 912 },
  { id: '4', name: 'manual_backup.sql', status: 'manual', size: '3.5MB', timestamp: '2024-03-08 16:20', rowsFetched: 3456 },
];

const statusStyles = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  manual: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
};

export function DataPage() {
  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Backup Files</h2>
          <StorageChart used={716} total={1024} />
        </div>
        <div className="divide-y">
          {mockFiles.map((file) => (
            <div key={file.id} className="p-4 flex items-center justify-between hover:bg-muted/50">
              <div className="flex items-center space-x-4">
                <FileDown className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {file.timestamp} • {file.rowsFetched.toLocaleString()} rows
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={cn(
                  'px-2.5 py-0.5 rounded-full text-xs font-medium',
                  statusStyles[file.status]
                )}>
                  {file.status}
                </span>
                <span className="text-sm text-muted-foreground">{file.size}</span>
                <button className="p-2 hover:bg-accent rounded-full">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}