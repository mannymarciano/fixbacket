import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import SourceNode from './nodes/SourceNode';
import ScannerNode from './nodes/ScannerNode';
import DestinationNode from './nodes/DestinationNode';
import { TestNode } from './nodes/TestNode';
import { useNodeConnections } from '../hooks/useNodeConnections';

const nodeTypes = {
  source: SourceNode,
  scanner: ScannerNode,
  destination: DestinationNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'source',
    position: { x: 100, y: 100 },
    data: {},
  },
  {
    id: '2',
    type: 'scanner',
    position: { x: 500, y: 100 },
    data: {},
  },
  {
    id: '3',
    type: 'destination',
    position: { x: 900, y: 100 },
    data: {},
  },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { isValidConnection } = useNodeConnections();

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [setEdges],
  );

  React.useEffect(() => {
    if (isValidConnection()) {
      setEdges(edges.map(edge => ({
        ...edge,
        style: { stroke: '#22c55e' },
      })));
    }
  }, [edges, isValidConnection]);

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        minZoom={0.2}
        maxZoom={4}
        className="bg-background"
      >
        <Background color="#2a2a2a" gap={16} />
      </ReactFlow>
      {isValidConnection() && <TestNode onTest={() => console.log('Testing...')} />}
    </div>
  );
}

export default function BuilderCanvas() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}