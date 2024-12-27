import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

export function useNodeConnections() {
  const { getNodes, getEdges } = useReactFlow();

  const isValidConnection = useCallback(() => {
    const nodes = getNodes();
    const edges = getEdges();
    
    // Check if we have all required node types
    const hasSource = nodes.some(node => node.type === 'source');
    const hasScanner = nodes.some(node => node.type === 'scanner');
    const hasDestination = nodes.some(node => node.type === 'destination');

    // Check if nodes are properly connected
    const sourceToScanner = edges.some(
      edge => 
        nodes.find(n => n.id === edge.source)?.type === 'source' &&
        nodes.find(n => n.id === edge.target)?.type === 'scanner'
    );

    const scannerToDestination = edges.some(
      edge => 
        nodes.find(n => n.id === edge.source)?.type === 'scanner' &&
        nodes.find(n => n.id === edge.target)?.type === 'destination'
    );

    return hasSource && hasScanner && hasDestination && sourceToScanner && scannerToDestination;
  }, [getNodes, getEdges]);

  return { isValidConnection };
}