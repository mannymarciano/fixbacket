import React, { useState, useEffect } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Settings, RotateCw, Loader2 } from 'lucide-react';
import { useBubbleApi } from '@/hooks/useBubbleApi';
import { NodeButton } from './NodeButton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { compareDataTypes } from '@/utils/dataTypeComparison';

export default function ScannerNode({ id, data }: { id: string, data: any }) {
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [scanning, setScanning] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const { fetchMetadata } = useBubbleApi();
  const { setNodes, setEdges, getNode } = useReactFlow();

  // Auto-scan when receiving data from source node
  useEffect(() => {
    if (data?.baseUrl && data?.apiKey && !dataTypes.length) {
      handleScan();
    }
  }, [data?.baseUrl, data?.apiKey]);

  const handleScan = async () => {
    if (!data.baseUrl || !data.apiKey) return;
    
    setScanning(true);
    try {
      const types = await fetchMetadata(data.baseUrl, data.apiKey);
      setDataTypes(types);
      
      // Compare with previously selected types
      const { added, removed } = compareDataTypes(selectedTypes, types);
      if (added.length || removed.length) {
        setSelectedTypes(types);
      }
      
      setNodes(nodes => nodes.map(node => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, dataTypes: types }
          };
        }
        return node;
      }));
    } catch (err) {
      console.error('Scanning failed:', err);
    } finally {
      setScanning(false);
    }
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleNext = () => {
    const destinationNode = getNode('3');
    if (destinationNode) {
      setNodes(nodes => nodes.map(node => {
        if (node.id === '3') {
          return {
            ...node,
            data: { 
              ...node.data, 
              baseUrl: data.baseUrl,
              apiKey: data.apiKey,
              dataTypes: selectedTypes
            }
          };
        }
        return node;
      }));

      setEdges(edges => [...edges, {
        id: `${id}-3`,
        source: id,
        target: '3',
        animated: true,
        style: { stroke: '#22c55e' }
      }]);
    }
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-lg border border-border w-[300px]">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5" />
        <h3 className="font-medium">Data Scanner</h3>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Available Data Types</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={handleScan}
                  disabled={scanning || !data.baseUrl}
                  className="p-1 hover:bg-accent rounded-full transition-colors disabled:opacity-50"
                >
                  {scanning ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RotateCw className="w-4 h-4" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rescan Database</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {scanning ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-2">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Scanning database...</span>
          </div>
        ) : (
          <div className="max-h-32 overflow-y-auto space-y-1">
            {dataTypes.map((type) => (
              <label
                key={type}
                className="flex items-center p-2 text-sm rounded hover:bg-accent cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        )}

        {selectedTypes.length > 0 && (
          <NodeButton onClick={handleNext}>
            Next
          </NodeButton>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-primary border-2 border-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-primary border-2 border-background"
      />
    </div>
  );
}