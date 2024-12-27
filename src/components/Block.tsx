import React from 'react';
import { Settings, Database, HardDrive, ArrowRight } from 'lucide-react';
import { BlockType, Position } from '../types';

interface BlockProps extends BlockType {
  onDrag: (position: Position) => void;
}

export default function Block({ id, type, position, data, onDrag }: BlockProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const blockRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      onDrag({
        x: e.clientX - startX,
        y: e.clientY - startY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const blockContent = {
    source: {
      title: 'Source Configuration',
      icon: <Database className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <select className="w-full p-2 border rounded">
            <option value="bubble">Bubble.io</option>
            <option value="adalo" disabled>Adalo (Coming Soon)</option>
            <option value="other" disabled>Others (Coming Soon)</option>
          </select>
          <input
            type="text"
            placeholder="Bubble.io Application URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="API Key"
            className="w-full p-2 border rounded"
          />
        </div>
      )
    },
    scanner: {
      title: 'Data Scanner',
      icon: <Settings className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Available Data Types</span>
            <button className="text-blue-600 hover:text-blue-700">
              Rescan
            </button>
          </div>
          <div className="max-h-24 overflow-y-auto">
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Users</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Products</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Orders</div>
          </div>
        </div>
      )
    },
    destination: {
      title: 'Destination',
      icon: <HardDrive className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <select className="w-full p-2 border rounded">
            <option value="cloud">Cloud Storage</option>
            <option value="email" disabled>Email (Coming Soon)</option>
            <option value="drive" disabled>Google Drive (Coming Soon)</option>
            <option value="bucket" disabled>Personal Bucket (Coming Soon)</option>
          </select>
          <select className="w-full p-2 border rounded">
            <option value="us-east">US East</option>
            <option value="us-west">US West</option>
            <option value="eu-central">EU Central</option>
          </select>
          <select className="w-full p-2 border rounded">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      )
    }
  };

  const content = blockContent[type as keyof typeof blockContent];

  return (
    <div
      ref={blockRef}
      className={`absolute w-[300px] bg-white rounded-lg shadow-lg ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.2s'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          {content.icon}
          <h3 className="font-medium">{content.title}</h3>
        </div>
      </div>
      <div className="p-4">
        {content.content}
      </div>
    </div>
  );
}