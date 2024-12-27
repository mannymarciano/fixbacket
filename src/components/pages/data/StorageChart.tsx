import React from 'react';

interface StorageChartProps {
  used: number;
  total: number;
}

export function StorageChart({ used, total }: StorageChartProps) {
  const percentage = (used / total) * 100;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle
            className="text-muted stroke-current"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="48"
            cy="48"
          />
          <circle
            className="text-primary stroke-current"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="48"
            cy="48"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium">{Math.round(percentage)}%</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="text-sm text-muted-foreground">
          {(used / 1024).toFixed(1)}GB / {(total / 1024).toFixed(1)}GB
        </p>
      </div>
    </div>
  );
}