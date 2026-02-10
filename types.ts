export interface Character {
  name: string;
  role: string;
  age: number;
  description: string;
  tags: string[];
}

export interface Quote {
  id: string;
  text: string;
  context: string;
  emotion: 'happy' | 'sad' | 'angry' | 'shy';
}

export enum RoomType {
  GATE = '대문',
  SERVANT = '행랑채',
  SARANG = '사랑채',
  YARD = '안마당',
  TOILET = '측간',
  ANCHAE = '안채',
  KITCHEN = '부엌/장독대',
}

export interface RoomNode {
  id: string;
  type: RoomType;
  description: string;
  x: number;
  y: number;
  children?: string[]; // IDs of connected rooms
}