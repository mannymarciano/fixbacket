import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { HardDrive } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { detectUserTimezone, TIMEZONE_OPTIONS } from '@/utils/timezone';
import { NodeButton } from './NodeButton';

export default function DestinationNode({ data, isConnectable }: any) {
  const [loading, setLoading] = useState(false);
  const [timezone, setTimezone] = useState('UTC');
  const [schedule, setSchedule] = useState('daily');
  const [region, setRegion] = useState('us-east');

  const handleBackup = async () => {
    if (!data?.baseUrl || !data?.apiKey || !data?.dataTypes?.length) {
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement backup process using the new utility functions
      console.log('Starting backup process...');
    } catch (error) {
      console.error('Backup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-lg border border-border w-[300px]">
      <div className="flex items-center gap-2 mb-4">
        <HardDrive className="w-5 h-5" />
        <h3 className="font-medium">Destination</h3>
      </div>

      <div className="space-y-3">
        <Select defaultValue="cloud">
          <SelectTrigger>
            <SelectValue placeholder="Select destination" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cloud">Cloud Storage</SelectItem>
            <SelectItem value="email" disabled>Email (Coming Soon)</SelectItem>
            <SelectItem value="drive" disabled>Google Drive (Coming Soon)</SelectItem>
            <SelectItem value="bucket" disabled>Personal Bucket (Coming Soon)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger>
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us-east">US East</SelectItem>
            <SelectItem value="us-west">US West</SelectItem>
            <SelectItem value="eu-central">EU Central</SelectItem>
          </SelectContent>
        </Select>

        <Select value={schedule} onValueChange={setSchedule}>
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timezone} onValueChange={setTimezone}>
          <SelectTrigger>
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            {TIMEZONE_OPTIONS.map(tz => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <NodeButton
          onClick={handleBackup}
          loading={loading}
          disabled={loading || !data?.dataTypes?.length}
        >
          Start Backup
        </NodeButton>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary border-2 border-background"
      />
    </div>
  );
}