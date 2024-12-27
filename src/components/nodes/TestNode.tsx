import React from 'react';
import { Play } from 'lucide-react';

interface TestNodeProps {
  onTest: () => void;
}

export function TestNode({ onTest }: TestNodeProps) {
  return (
    <div className="absolute bottom-8 right-8 z-10">
      <button
        onClick={onTest}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <Play className="w-4 h-4" />
        Test Backup
      </button>
    </div>
  );
}