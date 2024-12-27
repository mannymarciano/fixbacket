import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Database } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { NodeButton } from './NodeButton';
import { useBubbleApi } from '@/hooks/useBubbleApi';

export default function SourceNode({ id, data }: { id: string, data: any }) {
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { validateUrl } = useBubbleApi();
  const { setNodes, setEdges, getNode } = useReactFlow();

  const handleNext = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await validateUrl(url, apiKey);
      
      // Update source node data
      setNodes(nodes => nodes.map(node => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, baseUrl: result.baseUrl, apiKey }
          };
        }
        return node;
      }));

      // Connect to scanner node and pass data
      const scannerNode = getNode('2');
      if (scannerNode) {
        setNodes(nodes => nodes.map(node => {
          if (node.id === '2') {
            return {
              ...node,
              data: { ...node.data, baseUrl: result.baseUrl, apiKey }
            };
          }
          return node;
        }));

        setEdges(edges => [...edges, {
          id: `${id}-2`,
          source: id,
          target: '2',
          animated: true,
          style: { stroke: '#22c55e' }
        }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-lg border border-border w-[300px]">
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-5 h-5" />
        <h3 className="font-medium">Source Configuration</h3>
      </div>
      
      <div className="space-y-3">
        <Select defaultValue="bubble">
          <SelectTrigger>
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bubble">Bubble.io</SelectItem>
            <SelectItem value="adalo" disabled>Adalo (Coming Soon)</SelectItem>
            <SelectItem value="other" disabled>Others (Coming Soon)</SelectItem>
          </SelectContent>
        </Select>
        
        <Input 
          placeholder="Bubble.io Application URL" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={error ? 'border-red-500' : ''}
        />
        <Input 
          type="password" 
          placeholder="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className={error ? 'border-red-500' : ''}
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <NodeButton 
          onClick={handleNext}
          loading={loading}
          disabled={loading || !url || !apiKey}
        >
          Next
        </NodeButton>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-primary border-2 border-background"
      />
    </div>
  );
}