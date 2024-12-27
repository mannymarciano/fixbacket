import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface NodeButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export function NodeButton({ onClick, disabled, loading, children }: NodeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="flex items-center gap-2 w-full justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          {children}
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}