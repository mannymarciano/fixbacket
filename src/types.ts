export interface Position {
  x: number;
  y: number;
}

export interface BlockType {
  id: string;
  type: 'source' | 'scanner' | 'destination';
  position: Position;
  data: Record<string, any>;
}